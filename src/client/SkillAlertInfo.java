package client;

import handling.SendPacketOpcode;
import tools.data.LittleEndianAccessor;
import tools.data.MaplePacketLittleEndianWriter;

public class SkillAlertInfo {
    enum KeyType {
        PREFIX("skill_alert"),
        SKILL_ID("skill_id"),
        STATE("state");

        private String key;
        KeyType(String key) {
            this.key = key;
        }

        @Override
        public String toString() {
            return this.key;
        }
    }

    private static final int MAX_INDEX = 6;
    private int skillId;
    private int index;
    private boolean isEnabled;
    public SkillAlertInfo(int skillId, int index, boolean isEnabled) {
        this.skillId = skillId;
        this.index = index;
        this.isEnabled = isEnabled;
    }

    public SkillAlertInfo(int index) {
        this(0, index, false);
    }

    public int getSkillId() {
        return skillId;
    }

    public int getIndex() {
        return index;
    }

    public boolean isEnabled() {
        return isEnabled;
    }

    public void encode(MaplePacketLittleEndianWriter mplew) {
        mplew.writeInt(getSkillId());
        mplew.writeInt(getIndex());
        mplew.write((byte)(isEnabled() ? 1 : 0));
    }

    public void apply(MapleCharacter character) {
        setSkillId(character, this);
        setEnabled(character, this);
    }

    public static void handlePacket(LittleEndianAccessor lea, MapleClient client) {
        final MapleCharacter chr = client.getPlayer();
        final SkillAlertType skillAlertType = SkillAlertType.getFromType(lea.readInt());
        SkillAlertInfo info = null;
        SkillAlertInfo swapInfo = null;

        switch(skillAlertType) {
            case ADD:
            case UPDATE_STATE:
                info = new SkillAlertInfo(lea.readInt(), lea.readInt(), lea.readByte() == 1);
                break;
            case REMOVE:
                info = new SkillAlertInfo(lea.readInt());
                break;
            case CHANGE_POSITION:
                info = new SkillAlertInfo(lea.readInt(), lea.readInt(), lea.readByte() == 1);
                swapInfo = new SkillAlertInfo(lea.readInt(), lea.readInt(), lea.readByte() == 1);
                break;
        }
        if(info != null) {
            info.apply(chr);
            if(swapInfo != null ){
                swapInfo.apply(chr);
            }
            client.getSession().writeAndFlush(encode(skillAlertType, info, swapInfo));
        }
    }

    private static byte[] encode(SkillAlertType type, SkillAlertInfo info, SkillAlertInfo swapInfo) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.SKILL_ALERT.getValue());

        mplew.writeInt(type.getType());
        switch(type) {
            case ADD:
            case UPDATE_STATE:
                info.encode(mplew);
            case REMOVE:
                mplew.writeInt(info.getIndex());
                break;
            case CHANGE_POSITION:
                info.encode(mplew);
                swapInfo.encode(mplew);
                break;
        }
        return mplew.getPacket();
    }

    public static void encodeForCharInfo(MaplePacketLittleEndianWriter mplew, MapleCharacter character) {
        for(int i = 0 ; i < MAX_INDEX; i++) {
            mplew.writeInt(getSkillId(character, i));
        }
        
        for(int i = 0 ; i < MAX_INDEX; i++) {
            mplew.write((isEnabled(character, i) ? (byte)1: (byte)0));
        }
    }

    private static void setEnabled(MapleCharacter character, int index, boolean state) {
        character.addKV(getKey(KeyType.STATE, index), String.valueOf(state));
    }
    private static void setEnabled(MapleCharacter character, SkillAlertInfo info) {
        setEnabled(character, info.getIndex(), info.isEnabled());
    }

    private static boolean isEnabled(MapleCharacter character, int index) {
        return Boolean.parseBoolean(getValue(character, getKey(KeyType.STATE, index), Boolean.toString(false)));
    }

    private static void setSkillId(MapleCharacter character, int index, int skillId) {
        character.addKV(getKey(KeyType.SKILL_ID, index), String.valueOf(skillId));
    }

    private static void setSkillId(MapleCharacter character, SkillAlertInfo info) {
        setSkillId(character, info.getIndex(), info.getSkillId());
    }

    private static int getSkillId(MapleCharacter character, int index) {
        return Integer.parseInt(getValue(character, getKey(KeyType.SKILL_ID, index), String.valueOf(0)));
    }

    private static String getValue(MapleCharacter character, String key, String defaultValue){
        if(character.getV(key) == null) {
            character.addKV(key, defaultValue);
        }
        return character.getV(key);
    }

    private static String getKey(KeyType keyType, int index) {
        switch(keyType) {
            case PREFIX: return String.format("%s_%s", keyType, index);
            default:
                return String.format("%s_%s", getKey(KeyType.PREFIX, index), keyType);
        }
    }
}
