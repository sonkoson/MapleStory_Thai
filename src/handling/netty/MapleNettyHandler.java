// 
// Decompiled by Procyon v0.5.36
// 
package handling.netty;

import client.*;
import client.inventory.*;
import constants.GameConstants;
import constants.ServerConstants;
import constants.ServerType;
import static constants.ServerType.AUCTION;
import static constants.ServerType.BUDDYCHAT;
import static constants.ServerType.CASHSHOP;
import static constants.ServerType.CHANNEL;
import static constants.ServerType.LOGIN;
import constants.programs.ControlUnit;
import handling.RecvPacketOpcode;
import handling.SendPacketOpcode;
import handling.auction.handler.AuctionHandler;
import handling.cashshop.handler.CashShopOperation;
import handling.channel.handler.*;
import handling.login.LoginServer;
import handling.login.handler.CharLoginHandler;
import handling.world.MaplePartyCharacter;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.timeout.IdleStateEvent;
import handling.channel.handler.FishingHandler;
import io.netty.util.AttributeKey;
import scripting.NPCScriptManager;
import server.MapleInventoryManipulator;
import server.enchant.EquipmentEnchant;
import server.life.MapleLifeFactory;
import server.life.MapleNPC;
import server.quest.party.MapleNettPyramid;
import tools.*;
import tools.data.LittleEndianAccessor;
import tools.packet.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import static handling.RecvPacketOpcode.AUTO_AGGRO;
import static handling.RecvPacketOpcode.CHAR_INFO_REQUEST_OTHER;
import static handling.RecvPacketOpcode.GENERAL_CHAT_ITEM;
import static handling.RecvPacketOpcode.HEARTBEAT_RECV;
import static handling.RecvPacketOpcode.ITEM_SORT_LOCK;
import static handling.RecvPacketOpcode.MOVE_LIFE;
import static handling.RecvPacketOpcode.MOVE_MONSTER_SPAWN_MIST;
import static handling.RecvPacketOpcode.QUEST_ACTION;
import handling.channel.handler.boss.BossHandler;
import handling.channel.handler.boss.KalosPattern;
import java.awt.Point;
import java.awt.Rectangle;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.EnumMap;
import server.SecondaryStatEffect;
import server.life.MapleMonster;

public class MapleNettyHandler extends SimpleChannelInboundHandler<LittleEndianAccessor> {

    private final ServerType serverType;
    private final int channel;
    private final List<String> BlockedIP;
    private final Map<String, Pair<Long, Byte>> tracker;

    public MapleNettyHandler(final ServerType serverType, final int channel) {
        this.BlockedIP = new ArrayList<String>();
        this.tracker = new ConcurrentHashMap<String, Pair<Long, Byte>>();
        this.serverType = serverType;
        this.channel = channel;
    }

    public void channelActive(final ChannelHandlerContext ctx) {
        final String address = ctx.channel().remoteAddress().toString().split(":")[0];
        if (this.BlockedIP.contains(address)) {
            ctx.close();
            return;
        }
        final Pair<Long, Byte> track = this.tracker.get(address);
        byte count;
        if (track == null) {
            count = 1;
        } else {
            count = track.right;
            final long difference = System.currentTimeMillis() - track.left;
            if (difference < 2000L) {
                ++count;
            } else if (difference > 20000L) {
                count = 1;
            }
            if (count >= 10) {
                this.BlockedIP.add(address);
                this.tracker.remove(address);
                ctx.close();
                return;
            }
        }
        this.tracker.put(address, new Pair<Long, Byte>(System.currentTimeMillis(), count));
        boolean check = true;
        if (address.contains("219.250.30.201") || address.contains("1.248.193.246") || address.contains("36.39.235.217") || address.contains("103.226.79.71")) {
            check = false;
        }
        // Edited
        /*  System.out.println("[debug] 메시지 핸들러: " + address + "에서 연결이 확인되었습니다.");
        switch (this.serverType) {
            case LOGIN: {
                System.out.println("[알림] " + address + " 에서 로그인 서버에 접속했습니다.");
                break;
            }
            case CHANNEL: {
                System.out.println("[알림] " + address + " 에서 채널 서버에 접속했습니다.");
                break;
            }
            case CASHSHOP: {
                System.out.println("[알림] " + address + " 에서 캐시샵 서버에 접속했습니다.");
                break;
            }
            case BUDDYCHAT: {
                System.out.println("[알림] " + address + " 에서 친구 서버에 접속했습니다.");
                break;
            }
            case AUCTION: {
                System.out.println("[알림] " + address + " 에서 경매장 서버에 접속했습니다.");
                break;
            }
            case FARM: {
                System.out.println("[알림] " + address + " 에서 농장 서버에 접속했습니다.");
                break;
            }
        }*/
        final byte serverRecv[]
                = {
                    (byte) 0xBA, (byte) 0x68, (byte) 0x54, (byte) 0x63
                };
        final byte serverSend[]
                = {
                    (byte) 0xC8, (byte) 0x46, (byte) 0xD6, (byte) 0x76
                };
        final byte ivRecv[] = serverRecv;
        final byte ivSend[] = serverSend;
        final MapleClient client = new MapleClient(
                ctx.channel(),
                new MapleAESOFB(ivSend, (short) (0xFFFF - ServerConstants.MAPLE_VERSION), serverType == ServerType.CHANNEL || serverType == ServerType.CASHSHOP || serverType == ServerType.AUCTION, true), // Sent Cypher
                new MapleAESOFB(ivRecv, ServerConstants.MAPLE_VERSION, serverType == ServerType.CHANNEL || serverType == ServerType.CASHSHOP || serverType == ServerType.AUCTION));
        client.setChannel(this.channel);

        ctx.writeAndFlush(LoginPacket.initializeConnection((short) ServerConstants.MAPLE_VERSION, ivSend, ivRecv, !this.serverType.equals(ServerType.LOGIN)));
        if (serverType == LOGIN) {
            LoginServer.Channels.put(address, ctx.channel());
        }
        ctx.channel().attr(MapleClient.CLIENTKEY).set(client);
    }

    public void channelInactive(final ChannelHandlerContext ctx) throws Exception {
        final MapleClient client = (MapleClient) ctx.channel().attr((AttributeKey) MapleClient.CLIENTKEY).get();
        if (serverType == LOGIN) {
            if (LoginServer.Channels.containsKey(client.getSessionIPAddress())) {
                LoginServer.Channels.remove(client.getSessionIPAddress());
            }
        }
        if (client != null) {
            client.disconnect(true, false);
            //     System.out.println(client.getSessionIPAddress() + " disconnected.");
        }
        ctx.channel().attr((AttributeKey) MapleClient.CLIENTKEY).set((Object) null);
    }

    public void exceptionCaught(final ChannelHandlerContext ctx, final Throwable cause) {
        MapleClient client = ctx.channel().attr(MapleClient.CLIENTKEY).get();
        if (cause instanceof IOException) {
            if (ctx.channel().isActive()) {
                ctx.close();
            }

            if (client != null) {
                client.disconnect(true, false);
                ctx.channel().attr(MapleClient.CLIENTKEY).set(null);
            }
        } else {
            cause.printStackTrace();
        }
    }

    public void userEventTriggered(final ChannelHandlerContext ctx, final Object evt) throws Exception {
        if (evt instanceof IdleStateEvent) {
            final IdleStateEvent idleStateEvent = (IdleStateEvent) evt;
        }
    }

    protected void channelRead0(final ChannelHandlerContext ctx, final LittleEndianAccessor slea) throws Exception {
        final MapleClient c = (MapleClient) ctx.channel().attr((AttributeKey) MapleClient.CLIENTKEY).get();
        int header_num = slea.readShort();

        if (c.mEncryptedOpcode.containsKey(header_num)) {
            header_num = c.mEncryptedOpcode.get(header_num);
        }

        if (ServerConstants.DEBUG_RECEIVE) {
            boolean passRECV = false;
            switch (header_num) {
                case 379:
                case 700:
                    passRECV = false;
                    break;
                default:
                    passRECV = true;
            }

            if (passRECV
                    && QUEST_ACTION.getValue() != header_num
                    && AUTO_AGGRO.getValue() != header_num
                    && MOVE_LIFE.getValue() != header_num) {
                c.lastPacketRecvOpcode = RecvPacketOpcode.getOpcodeName(header_num) + " / " + slea.toString();

                System.out.println("[RECV : " + c.getSessionIPAddress() + " - " + RecvPacketOpcode.getOpcodeName(header_num) + "] " + "[" + header_num + "] : " + slea.toString());
            }
        }

        if (header_num != RecvPacketOpcode.MOVE_PLAYER.getValue()
                && header_num != RecvPacketOpcode.MOVE_LIFE.getValue()
                && header_num != RecvPacketOpcode.QUEST_ACTION.getValue()
                && header_num != RecvPacketOpcode.NPC_ACTION.getValue()
                && header_num != RecvPacketOpcode.AUTO_AGGRO.getValue()
                && header_num != RecvPacketOpcode.HACKSHIELD.getValue()
                && header_num != RecvPacketOpcode.TAKE_DAMAGE.getValue()
                && header_num != RecvPacketOpcode.CHANGE_MAP_SPECIAL.getValue()
                && header_num != RecvPacketOpcode.MOVE_PET.getValue()
                && header_num != RecvPacketOpcode.HEAL_OVER_TIME.getValue()
                && header_num != RecvPacketOpcode.PET_LOOT.getValue()
                && header_num != RecvPacketOpcode.SESSION_CHECK.getValue()
                && header_num != RecvPacketOpcode.HYPER_R.getValue()
                && header_num != RecvPacketOpcode.MOVE_ANDROID.getValue()
                && header_num != RecvPacketOpcode.PLAYER_INTERACTION.getValue()
                && header_num != RecvPacketOpcode.DEMIAN_SWORD_HANDLE.getValue()
                && header_num != RecvPacketOpcode.STACK_BUFF.getValue()
                //     && header_num != 376
                && header_num != 389) {
         //   System.out.println("[RECV " + RecvPacketOpcode.getOpcodeName(header_num) + "(" + header_num + ")] : " + slea.toString());
        }
        for (final RecvPacketOpcode recv : RecvPacketOpcode.values()) {
            if (recv.getValue() == header_num) {
                try {
                    handlePacket(recv, slea, c, serverType);
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
                return;
            }
        }
    }

    public static final void handlePacket(final RecvPacketOpcode header, final LittleEndianAccessor slea, final MapleClient c, final ServerType serverType) throws Exception {
        switch (header) {
            case PONG: {
                c.pongReceived();
                break;
            }
            case INGAME_PONG: {
                break;
            }
            case HID_VID_PID_CHECK: {
                break;
            }
            case CHECK_FIVE_MINUTE: {
                break;
            }
            case CHECK_FIVE_MINUTE2: {
                long lastPacketTime1 = slea.readLong();
                long lastPacketTime2 = slea.readLong();

                c.getSession().writeAndFlush(LoginPacket.checkFiveMinute(slea));
                break;
            }
            case HACKSHIELD: {
                if (slea.readByte() == 2) {
                    CharLoginHandler.HackShield(slea, c);
                    c.getSession().writeAndFlush(LoginPacket.check27()); // 1.2.390 ++
                    break;
                }
                break;
            }
            case CLIENT_HELLO: {
                slea.readByte();
                short mapleVersion = slea.readShort();
                short maplePatch = slea.readShort();
                if (mapleVersion != ServerConstants.MAPLE_VERSION && maplePatch != ServerConstants.MAPLE_PATCH) {
                }
                break;
            }
            case CHECK_HOTFIX: {
                c.getSession().writeAndFlush((Object) LoginPacket.getHotfix());
                break;
            }
            case LOAD_WZ_DATA: {
                CharLoginHandler.checkLoadWzData(slea, c);
                break;
            }
            case SESSION_CHECK: {
                CharLoginHandler.SessionCheck(slea, c);
                break;
            }
            case RESET_SECOND_PW: {
                CharLoginHandler.ResetSecondPW(slea, c);
                break;
            }
            case OTP_SETTING: {
                CharLoginHandler.OTPSetting(slea, c);
                break;
            }
            case INPUT_OTP: {
                CharLoginHandler.InputOTP(slea, c);
                break;
            }
            case LOGIN_PASSWORD: {
                CharLoginHandler.login(slea, c);
                break;
            }
            case SELECT_CHANNEL_LIST: {
                slea.skip(1);
                CharLoginHandler.SelectChannelList(c, slea.readInt());
                break;
            }
            case LEAVING_WORLD: {
                CharLoginHandler.ServerListRequest(c, true);
                break;
            }
            case LOGIN_REQUEST: {
                try {
                    CharLoginHandler.getLoginRequest(slea, c);
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
                break;
            }
            case CHARLIST_REQUEST: {
                try {
                    CharLoginHandler.CharlistRequest(slea, c);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                break;
            }
            case SESSION_DC_EVENT: {
                CharLoginHandler.SessionDCEvent(slea, c);
                break;
            }
            case CHECK_CHAR_NAME: {
                CharLoginHandler.CheckCharName(slea.readMapleAsciiString(), c);
                break;
            }
            case CHAR_NAME_CHANGE: {
                CharLoginHandler.CheckCharNameChange(slea, c);
                break;
            }
            case MARRIAGE_ITEM: {
                MarriageHandler.UseItem(slea, c, c.getPlayer());
                break;
            }
            case NAME_CHANGER:
            case NAME_CHANGER_SPW: {
                PlayerHandler.NameChanger(header == RecvPacketOpcode.NAME_CHANGER_SPW, slea, c);
                break;
            }
            case CREATE_CHAR: {
                CharLoginHandler.CreateChar(slea, c);
                break;
            }
            case CREATE_ULTIMATE: {
                CharLoginHandler.CreateUltimate(slea, c);
                break;
            }
            case DELETE_CHAR: {
                CharLoginHandler.DeleteChar(slea, c);
                break;
            }
            case CHAR_SELECT: {
                CharLoginHandler.Character_WithoutSecondPassword(slea, c);
                break;
            }
            case LOGIN_WITH_CREATE_CHAR: {
                CharLoginHandler.LoginWithCreateCharacter(slea, c);
                break;
            }
            case ONLY_REG_SECOND_PASSWORD: {
                CharLoginHandler.onlyRegisterSecondPassword(slea, c);
                break;
            }
            case AUTH_LOGIN_WITH_SPW: {
                CharLoginHandler.checkSecondPassword(slea, c);
                break;
            }
            case NEW_PASSWORD_CHECK: {
                CharLoginHandler.NewPassWordCheck(c);
                break;
            }
            case ACTIVATE_RECV: {
                c.send(LoginPacket.Activate());
                break;
            }
            case PACKET_ERROR: {
                if (slea.available() >= 6L) {
                    final short type = slea.readShort();
                    slea.skip(4);
                    if (type == 2) {
                        c.getPlayer().saveToDB(true, true);
                    }
                    final short badPacketSize = slea.readShort();
                    slea.skip(4);
                    final int pHeader = slea.readShort();
                    String pHeaderStr = Integer.toHexString(pHeader).toUpperCase();
                    pHeaderStr = StringUtil.getLeftPaddedStr(pHeaderStr, '0', 4);
                    final String op = SendPacketOpcode.getOpcodeName(pHeader);
                    String from = "";
                    if (c.getPlayer() != null) {
                        from = "Chr: " + c.getPlayer().getName() + " LVL(" + c.getPlayer().getLevel() + ") job: " + c.getPlayer().getJob() + " MapID: " + c.getPlayer().getMapId();
                    }
                    final String Recv = from + "\r\n" + "SendOP(-38): " + op + " [" + pHeaderStr + "] (" + (badPacketSize - 4) + ") [Length] : " + slea.available() + "\r\n" + slea.toString(true) + "\r\n\r\n";
                    System.out.println(Recv);
                    FileoutputUtil.log("ClientErrorPacket.txt", Recv);
                    break;
                }
                break;
            }
            case CHANGE_CHANNEL:
            case CHANGE_ROOM_CHANNEL: {
                InterServerHandler.ChangeChannel(slea, c, c.getPlayer(), header == RecvPacketOpcode.CHANGE_ROOM_CHANNEL);
                break;
            }
            case PLAYER_LOGGEDIN: {
                slea.skip(4);
                final int playerid = slea.readInt();
                if (serverType.equals(ServerType.CASHSHOP)) {
                    CashShopOperation.EnterCS(playerid, c);
                    break;
                }
                InterServerHandler.Loggedin(playerid, c);
                break;
            }
            case ENTER_CASH_SHOP: {
                final boolean isNpc = ServerConstants.csNpc > 0;
                InterServerHandler.EnterCS(c, c.getPlayer(), isNpc);
                break;
            }
            case ENTER_AUCTION: {
                AuctionHandler.EnterAuction(c.getPlayer(), c);
                break;
            }
            case ENTER_FARM: {
                //     FarmHandler.enterFarm(c.getPlayer(), c);
                break;
            }
            case MOVE_PLAYER: {
                PlayerHandler.MovePlayer(slea, c, c.getPlayer());
                break;
            }
            case CHAR_INFO_REQUEST_ME: {
                try {
                    PlayerHandler.charInfoRequestMe(c);
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
                break;
            }
            case CHAR_INFO_REQUEST_OTHER: {
                int objectId = slea.readInt();
                String name = slea.readMapleAsciiString();

                try {
                    PlayerHandler.charInfoRequestOther(objectId, name, c);
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
                break;
            }
            case CLOSE_RANGE_ATTACK:
            case SPOTLIGHT_ATTACK: {
                if (c.getPlayer().isGM()) {
                    PlayerHandler.closeRangeAttack(slea, c, c.getPlayer(), header == RecvPacketOpcode.SPOTLIGHT_ATTACK);
                } else {
                    PlayerHandler.closeRangeAttack(slea, c, c.getPlayer(), header == RecvPacketOpcode.SPOTLIGHT_ATTACK);
                    //PlayerHandler.LieDetecTer(c);
                }
                break;
            }
            case RANGED_ATTACK: {
                if (c.getPlayer().isGM()) {
                    PlayerHandler.rangedAttack(slea, c, c.getPlayer());
                } else {
                    PlayerHandler.rangedAttack(slea, c, c.getPlayer());
                    //PlayerHandler.LieDetecTer(c);
                }
                break;
            }
            case MAGIC_ATTACK: {
                if (c.getPlayer().isGM()) {
                    PlayerHandler.MagicDamage(slea, c, c.getPlayer(), false, false);
                } else {
                    PlayerHandler.MagicDamage(slea, c, c.getPlayer(), false, false);
                    //PlayerHandler.LieDetecTer(c);
                }
                break;
            }
            case BUFF_ATTACK: {
                if (c.getPlayer().isGM()) {
                    PlayerHandler.BuffAttack(slea, c, c.getPlayer());
                } else {
                    PlayerHandler.BuffAttack(slea, c, c.getPlayer());
                    //PlayerHandler.LieDetecTer(c);
                }
                break;
            }
            case SPECIAL_MOVE: {
                if (c.getPlayer().isGM()) {
                    PlayerHandler.SpecialMove(slea, c, c.getPlayer());
                } else {
                    PlayerHandler.SpecialMove(slea, c, c.getPlayer());
                    //PlayerHandler.LieDetecTer(c);
                }

                break;
            }
            case POSION_LEGION: {
                if (c.getPlayer().isGM()) {
                    PlayerHandler.PoisonLegion(slea, c);
                } else {
                    PlayerHandler.PoisonLegion(slea, c);
                    //PlayerHandler.LieDetecTer(c);
                }
                break;
            }
            case CHILLING_ATTACK: {
                if (c.getPlayer().isGM()) {
                    PlayerHandler.MagicDamage(slea, c, c.getPlayer(), true, false);
                } else {
                    PlayerHandler.MagicDamage(slea, c, c.getPlayer(), true, false);
                    //PlayerHandler.LieDetecTer(c);
                }
                break;
            }
            case ORBITAL_ATTACK: {
                if (c.getPlayer().isGM()) {
                    PlayerHandler.MagicDamage(slea, c, c.getPlayer(), false, true);
                } else {
                    PlayerHandler.MagicDamage(slea, c, c.getPlayer(), false, true);
                    //PlayerHandler.LieDetecTer(c);
                }
                break;
            }
            case INCREASE_DURATION: {
                PlayerHandler.IncreaseDuration(c.getPlayer(), slea.readInt());
                break;
            }
            case SHOW_SOULEFFECT_R: {
                c.getPlayer().getMap().broadcastMessage(CField.showSoulEffect(c.getPlayer(), slea.readByte()));
                break;
            }
            case SOUL_EFFECT_RECIVE: {
                int v1 = slea.readInt();
                int skilli = slea.readInt();
                c.getPlayer().getMap().broadcastMessage(c.getPlayer(), CField.showSoulEffect(c.getPlayer(), (byte) v1, skilli), false);
                break;
            }
            case PSYCHIC_GRAB_PREPARATION: {
                PlayerHandler.PsychicGrabPreparation(slea, c, false);
                break;
            }
            case PSYCHIC_GRAB: {
                PlayerHandler.PsychicGrabPreparation(slea, c, true);
                break;
            }
            case ULTIMATE_MATERIAL: {
                c.getSession().writeAndFlush((Object) CWvsContext.PsychicUltimateDamager(slea.readInt(), c.getPlayer()));
                break;
            }
            case RELEASE_ROCK: {
                CWvsContext.CancelPsychicGrep(slea, c);
                break;
            }
            case PSYCHIC_ATTACK_R: {
                PlayerHandler.CreateKinesisPsychicArea(slea, c);
                break;
            }
            case PSYCHIC_DAMAGE_R: {
                c.getSession().writeAndFlush((Object) CWvsContext.PsychicDamage(slea, c));
                break;
            }
            case CANCEL_PSYCHIC_GRAB_R: {
                slea.skip(8);
                CWvsContext.CancelPsychicGrep(slea, c);
                break;
            }
            case PSYCHIC_ULTIMATE_R: {
                PlayerHandler.psychicUltimateRecv(slea, c);
                break;
            }
            case KINESIS_GROUND_R: {
                PlayerHandler.KinesisGround(c, slea);
                break;
            }
            case DOT_ATTACK: {
                PlayerHandler.closeRangeAttack(slea, c, c.getPlayer(), true);
                break;
            }
            case TOUCH_MIST: {
                PlayerHandler.touchMist(slea, c);
                break;
            }
            case SPECIAL_STAT: {
                ItemMakerHandler.getSpecialStat(slea, c);
                break;
            }
            case CRAFT_DONE: {
                ItemMakerHandler.CraftComplete(slea, c, c.getPlayer());
                break;
            }
            case CRAFT_MAKE: {
                ItemMakerHandler.CraftMake(slea, c, c.getPlayer());
                break;
            }
            case CRAFT_EFFECT: {
                ItemMakerHandler.CraftEffect(slea, c, c.getPlayer());
                break;
            }
            case START_HARVEST: {
                ItemMakerHandler.StartHarvest(slea, c, c.getPlayer());
                break;
            }
            case STOP_HARVEST: {
                ItemMakerHandler.StopHarvest(slea, c, c.getPlayer());
                break;
            }
            case MAKE_EXTRACTOR: {
                ItemMakerHandler.MakeExtractor(slea, c, c.getPlayer());
                break;
            }
            case USE_BAG: {
                ItemMakerHandler.UseBag(slea, c, c.getPlayer());
                break;
            }
            case USE_RECIPE: {
                ItemMakerHandler.UseRecipe(slea, c, c.getPlayer());
                break;
            }
            case MOVE_ANDROID: {
                PlayerHandler.MoveAndroid(slea, c, c.getPlayer());
                break;
            }
            case MOVE_HAKU: {
                PlayerHandler.MoveHaku(slea, c, c.getPlayer());
                break;
            }
            case FACE_EXPRESSION: {
                PlayerHandler.ChangeEmotion(slea.readInt(), c.getPlayer());
                break;
            }
            case FACE_ANDROID: {
                PlayerHandler.ChangeAndroidEmotion(slea.readInt(), c.getPlayer());
                break;
            }
            case TAKE_DAMAGE: {
                PlayerHandler.TakeDamage(slea, c, c.getPlayer());
                break;
            }
            case BLACK_MAGE_BALL_RECV: {
                break;
            }
            case HEAL_OVER_TIME: {
                PlayerHandler.Heal(slea, c.getPlayer());
                break;
            }
            case CANCEL_BUFF: {
                PlayerHandler.CancelBuffHandler(slea, c.getPlayer());
                break;
            }
            case MECH_CANCEL: {
                PlayerHandler.CancelMech(slea, c.getPlayer());
                break;
            }
            case CANCEL_ITEM_EFFECT: {
                if (slea.available() >= 4L) {
                    PlayerHandler.CancelItemEffect(slea.readInt(), c.getPlayer());
                    break;
                }
                break;
            }
            case USE_TITLE: {
                PlayerHandler.UseTitle(slea, c, c.getPlayer());
                break;
            }
            case USE_CHAIR: {
                slea.readInt();
                PlayerHandler.UseChair(c, c.getPlayer(), slea);
                c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
                break;
            }
            case CANCEL_CHAIR: {
                PlayerHandler.CancelChair(slea.readShort(), c, c.getPlayer());
                break;
            }
            case USE_ITEMEFFECT: {
                PlayerHandler.UseItemEffect(slea.readInt(), c, c.getPlayer());
                break;
            }
            case SKILL_EFFECT: {
                PlayerHandler.SkillEffect(slea, c.getPlayer());
                break;
            }
            case MESO_DROP: {
                slea.readInt();
                PlayerHandler.DropMeso(slea.readInt(), c.getPlayer());
                break;
            }
            case CHANGE_KEYMAP: {
                PlayerHandler.ChangeKeymap(slea, c.getPlayer());
                break;
            }
            case PET_BUFF: {
                PetHandler.ChangePetBuff(slea, c.getPlayer());
                break;
            }
            case CHANGE_MAP: {
                if (serverType.equals(ServerType.CASHSHOP)) {
                    CashShopOperation.LeaveCS(slea, c, c.getPlayer());
                    break;
                }
                PlayerHandler.ChangeMap(slea, c, c.getPlayer());

                if (!c.getPlayer().getBuffedValue(80000757)) { // 환생 전용 버프
                    SkillFactory.getSkill(80000757).getEffect(1).applyTo(c.getPlayer());
                }

                if (c.getPlayer().getBuffedValue(80000783)) { // 유일 전용 버프
                    SkillFactory.getSkill(80000783).getEffect(1).applyTo(c.getPlayer());
                }

                if (c.getPlayer().getOneItemEquippedCount() > 0) { // 유일 전용 버프
                    SkillFactory.getSkill(80000783).getEffect(1).applyTo(c.getPlayer());
                }

                break;
            }
            // [SEX] 구동기 index 오류
            case CHANGE_MAP_SPECIAL: {
                slea.skip(1);
                //PlayerHandler.ChangeMapSpecial(slea.readMapleAsciiString(), c, c.getPlayer());
                break;
            }
            // [SEX] Boss Enter Portal
            case USE_INNER_PORTAL: {
                int type = slea.readByte();

                switch (type) {
                    case 2:
                        PlayerHandler.Respawn(c);
                        break;
                    default:
                        PlayerHandler.InnerPortal(slea, c, c.getPlayer());
                        break;
                }

                break;
            }
            case TROCK_ADD_MAP: {
                PlayerHandler.TrockAddMap(slea, c, c.getPlayer());
                break;
            }
            case AranCombo: {
                final int skillid = slea.readInt();
                PlayerHandler.AranCombo(c, c.getPlayer(), skillid);
                break;
            }
            case LOSE_AranCombo: {
                PlayerHandler.LossAranCombo(c, c.getPlayer(), 1);
                break;
            }
            case BLESS_OF_DARKNESS: {
                PlayerHandler.BlessOfDarkness(c.getPlayer());
                break;
            }
            case BOSS_MATCHING: {
                PlayerHandler.BossMatching(slea, c.getPlayer());
                break;
            }
            case BOSS_WARP: {
                PlayerHandler.BossWarp(slea, c.getPlayer());
                break;
            }
            case SKILL_MACRO: {
                PlayerHandler.ChangeSkillMacro(slea, c.getPlayer());
                break;
            }
            case GIVE_FAME: {
                PlayersHandler.GiveFame(slea, c, c.getPlayer());
                //c.getSession().writeAndFlush((Object) CWvsContext.enableActions(c.getPlayer()));
                break;
            }
            case NOTE_ACTION: {
                PlayersHandler.Note(slea, c.getPlayer());
                break;
            }
            case USE_DOOR: {
                PlayersHandler.UseDoor(slea, c.getPlayer());
                break;
            }
            case USE_RANDOM_DOOR: {
                PlayersHandler.UseRandomDoor(slea, c.getPlayer());
                break;
            }
            case USE_MECH_DOOR: {
                PlayersHandler.UseMechDoor(slea, c.getPlayer());
                break;
            }
            case ANDROID_EAR: {
                PlayerHandler.AndroidEar(c, slea);
                break;
            }
            case DAMAGE_REACTOR: {
                PlayersHandler.HitReactor(slea, c);
                break;
            }
            case CLICK_REACTOR:
            case TOUCH_REACTOR: {
                PlayersHandler.TouchReactor(slea, c);
                break;
            }
            case SPACE_REACTOR: {
                PlayersHandler.SpaceReactor(slea, c);
                break;
            }
            case CLOSE_CHALKBOARD: {
                c.getPlayer().setChalkboard(null);
                break;
            }
            case ITEM_SORT: {
                InventoryHandler.ItemGather(slea, c);
                break;
            }
            case ITEM_GATHER: {
                InventoryHandler.ItemGather(slea, c);
                break;
            }
            case ITEM_MOVE: {
                InventoryHandler.ItemMove(slea, c);
                break;
            }
            case MOVE_BAG: {
                InventoryHandler.MoveBag(slea, c);
                break;
            }
            case SWITCH_BAG: {
                InventoryHandler.SwitchBag(slea, c);
                break;
            }
            case ITEM_MAKER: {
                ItemMakerHandler.ItemMaker(slea, c);
                break;
            }
            case ITEM_PICKUP: {
                InventoryHandler.Pickup_Player(slea, c, c.getPlayer());
                break;
            }
            case CHANGED_COLOR: {
                break;
            }
            case USE_CASH_ITEM: {
                InventoryHandler.UseCashItem(slea, c);
                break;
            }
            case MIX_HAIR: {
                InventoryHandler.MixHair(slea, c);
                break;
            }
            case RUNE_TOUCH: {
                PlayersHandler.TouchRune(slea, c.getPlayer());
                break;
            }
            case RUNE_USE: {
                PlayersHandler.UseRune(slea, c.getPlayer());
                break;
            }
            case CONTENTS_GUIDE: {
                PlayerHandler.GuideWarp(slea, c.getPlayer());
                break;
            }
            case MANNEQUIN: {
                PlayerHandler.useMannequin(slea, c.getPlayer());
                break;
            }
            case HASTE_BOX: {
                PlayerHandler.openHasteBox(slea, c.getPlayer());
                break;
            }
            case USE_ADI_CUBE:
            case USE_CUBE: {
                slea.skip(4);
                InventoryHandler.UseCube(slea, c);
                break;
            }
            case USE_ITEM: {
                InventoryHandler.UseItem(slea, c, c.getPlayer());
                break;
            }
            case USE_CORE_SELECT_VALUE: {
                InventoryHandler.useCoreSelectValue(slea, c);
                break;
            }
            case FATE_SHUFFLE: {
                int skillId = slea.readInt();

                c.getPlayer().setKeyValue(1544, "24141003", skillId + "");

                break;
            }
            case USE_ITEM_SELECT_VALUE: {
                InventoryHandler.useItemSelectValue(slea, c);
                break;
            }
            case USE_MAGNIFY_GLASS: {
                InventoryHandler.UseMagnify(slea, c);
                break;
            }
            case USE_STAMP: {
                InventoryHandler.UseStamp(slea, c);
                break;
            }
            case USE_EDITIONAL_STAMP: {
                InventoryHandler.UseEditionalStamp(slea, c);
                break;
            }
            case USE_CHOOSE_CUBE: {
                InventoryHandler.UseChooseCube(slea, c);
                break;
            }
            case USE_CHOOSE_ABILITY: {
                PlayerHandler.UseChooseAbility(slea, c);
                break;
            }
            case USE_SCRIPTED_NPC_ITEM: {
                slea.skip(4);
            }
            case USE_CONSUME_ITEM: {
                InventoryHandler.UseScriptedNPCItem(slea, c, c.getPlayer());
                break;
            }
            case USE_RETURN_SCROLL: {
                InventoryHandler.UseReturnScroll(slea, c, c.getPlayer());
                break;
            }
            case WARP_GUILD_MAP: {
                PlayerHandler.warpGuildMap(slea, c.getPlayer());
                break;
            }
            case BLACK_MAGE_RECV: {
                PlayerHandler.BlackMageRecv(slea, c);
                break;
            }
            case USE_PET_LOOT: {
                InventoryHandler.UsePetLoot(slea, c);
                break;
            }
            case USE_PET_SKILL: {
                InventoryHandler.UsePetSkill(slea, c);
                break;
            }
            case VICIOUS_HAMMER_RES: {
                InventoryHandler.UseGoldenHammer(slea, c);
                break;
            }
            case VICIOUS_HAMMER_RESULT: {
                c.getSession().writeAndFlush((Object) CSPacket.ViciousHammer(false, !c.getPlayer().vh));
                break;
            }
            case USE_SILVER_KARMA: {
                InventoryHandler.useSilverKarma(slea, c.getPlayer());
                break;
            }
            case USE_EXCEPTIONAL_SCROLL:
            case USE_FLAG_SCROLL:
            case USE_POTENTIAL_SCROLL:
            case USE_UPGRADE_SCROLL:
            case USE_EQUIP_SCROLL:
            case USE_REBIRTH_SCROLL: {
                slea.readInt();
                final short scroll = slea.readShort();
                if (header == RecvPacketOpcode.USE_UPGRADE_SCROLL) {
                    slea.readShort();
                }
                InventoryHandler.UseUpgradeScroll(header, scroll, slea.readShort(), slea.readByte(), c, c.getPlayer());
                break;
            }
            case USE_BLACK_REBIRTH_SCROLL: { // 검환불
                slea.readInt();
                final short scroll = slea.readShort();
                if (header == RecvPacketOpcode.USE_UPGRADE_SCROLL) {
                    slea.readShort();
                }
                InventoryHandler.UseUpgradeScroll(header, scroll, slea.readShort(), slea.readByte(), c, c.getPlayer());
                break;
            }
            case USE_EDITIONAL_SCROLL: {
                InventoryHandler.UseEditionalScroll(slea, c);
                break;
            }
//            case USE_EXCEPTIONAL_SCROLL: {
//                InventoryHandler.UseExceptionalScroll(slea, c);
//                break;
//            }
            case USE_SUMMON_BAG: {
                InventoryHandler.UseSummonBag(slea, c, c.getPlayer());
                break;
            }
            case USE_SKILL_BOOK: {
                slea.readInt();
                InventoryHandler.UseSkillBook((byte) slea.readShort(), slea.readInt(), c, c.getPlayer());
                break;
            }
            case USE_CATCH_ITEM: {
                InventoryHandler.UseCatchItem(slea, c, c.getPlayer());
                break;
            }
            case USE_MOUNT_FOOD: {
                InventoryHandler.UseMountFood(slea, c, c.getPlayer());
                break;
            }
            case USE_SOUL_ENCHANTER: {
                InventoryHandler.UseSoulEnchanter(slea, c, c.getPlayer());
                break;
            }
            case USE_SOUL_SCROLL: {
                InventoryHandler.UseSoulScroll(slea, c, c.getPlayer());
                break;
            }
            case REWARD_ITEM: {
                InventoryHandler.UseRewardItem((byte) slea.readShort(), slea.readInt(), c, c.getPlayer());
                break;
            }
            case HYPNOTIZE_DMG: {
                MobHandler.HypnotizeDmg(slea, c.getPlayer());
                break;
            }
            case SPIRIT_HIT: {
                MobHandler.SpiritHit(slea, c.getPlayer());
                break;
            }
            case ORGEL_HIT: {
                MobHandler.OrgelHit(slea, c.getPlayer());
                break;
            }
            case MOB_NODE: {
                MobHandler.MobNode(slea, c.getPlayer());
                break;
            }
            case BIND_LIFE: {
                MobHandler.BindMonster(slea, c);
                break;
            }
            case MEDAL_DISPLAY: {
                PlayerHandler.UpdateMedalDisplay(slea, c.getPlayer());
                break;
            }
            case TITLE_DISPLAY: {
                PlayerHandler.UpdateTitleDisplay(slea, c.getPlayer());
                break;
            }
            case MOVE_LIFE: {
                MobHandler.MoveMonster(slea, c, c.getPlayer());
                break;
            }
            case AUTO_AGGRO: {
                MobHandler.AutoAggro(slea.readInt(), c.getPlayer());
                break;
            }
            case FRIENDLY_DAMAGE: {
                MobHandler.FriendlyDamage(slea, c.getPlayer());
                break;
            }
            case DAMAGE_SKIN_SAVE:
            case DAMAGE_SKIN: {
                PlayerHandler.UpdateDamageSkin(slea, c, c.getPlayer());
                break;
            }
            case MIRROR_DUNGEON: {
                PlayerHandler.MirrorDungeon(slea, c);
                break;
            }
            case MONSTER_BOMB: {
                MobHandler.MonsterBomb(slea.readInt(), c.getPlayer());
                break;
            }
            case ENTER_DUNGEN: {
                PlayerHandler.EnterDungen(slea, c);
                break;
            }
            case MOB_BOMB: {
                MobHandler.MobBomb(slea, c.getPlayer());
                break;
            }
            case NPC_SHOP: {
                NPCHandler.NPCShop(slea, c, c.getPlayer());
                break;
            }
            case NPC_TALK: {
                NPCHandler.NPCTalk(slea, c, c.getPlayer());
                break;
            }
            case NPC_TALK_MORE: {
                NPCHandler.NPCMoreTalk(slea, c);
                break;
            }
            case NPC_ACTION: {
                NPCHandler.NPCAnimation(slea, c);
                break;
            }
            case QUEST_ACTION: {
                NPCHandler.QuestAction(slea, c, c.getPlayer());
                break;
            }
            case STORAGE: {
                NPCHandler.Storage(slea, c, c.getPlayer());
                break;
            }
            case GENERAL_CHAT:
            case GENERAL_CHAT_ITEM: {
                try {
                    if (c.getPlayer() != null && c.getPlayer().getMap() != null) {
                        slea.readInt();
                        ChatHandler.GeneralChat(slea.readMapleAsciiString(), slea.readByte(), c, c.getPlayer(), slea, header);
                    }
                    //c.sendLieDetoctor(c.getPlayer(), false);
                } catch (Exception e3) {
                    e3.printStackTrace();
                }
                break;
            }
            case PARTYCHATITEM:
            case PARTYCHAT: {
                ChatHandler.Others(slea, c, c.getPlayer(), header);
                break;
            }
            case WHISPERITEM:
            case WHISPER: {
                ChatHandler.Whisper_Find(slea, c, header);
                break;
            }
            case MESSENGER: {
                ChatHandler.Messenger(slea, c);
                break;
            }
            case AUTO_ASSIGN_AP: {
                StatsHandling.AutoAssignAP(slea, c, c.getPlayer());
                break;
            }
            case DISTRIBUTE_AP: {
                StatsHandling.DistributeAP(slea, c, c.getPlayer());
                break;
            }
            case DISTRIBUTE_SP: {
                slea.readInt();
                StatsHandling.DistributeSP(slea.readInt(), slea.readInt(), c, c.getPlayer());
                break;
            }
            case ADD_HYPERSKILL: {
                HyperHandler.HyperStatHandler(slea, c);
                break;
            }
            case ADD_HYPERSTAT: {
                slea.readInt();
                HyperHandler.HyperStatHandler(slea, c);
                break;
            }
            case RESET_HYPERSKILL: {
                HyperHandler.ResetHyperSkill(c);
                break;
            }
            case RESET_HYPERSTAT: {
                slea.readInt();
                HyperHandler.ResetHyperStatHandler(slea, c);
                break;
            }
            case HYPERSTAT_PRESETS:
                HyperHandler.HyperStatPresets(slea, c);
                break;
            case PLAYER_INTERACTION: {
                PlayerInteractionHandler.PlayerInteraction(slea, c, c.getPlayer());
                break;
            }
            case GUILD_OPERATION: {
                GuildHandler.Guild(slea, c);
                break;
            }
            case DENY_GUILD_REQUEST: {
                slea.skip(4);
                GuildHandler.DenyGuildRequest(slea.readMapleAsciiString(), c);
                break;
            }
            case GUILD_REGISTER_REQUEST: {
                GuildHandler.GuildJoinRequest(slea, c.getPlayer());
                break;
            }
            case GUILD_REGISTER_CANCEL: {
                GuildHandler.GuildCancelRequest(slea, c, c.getPlayer());
                break;
            }
            case GUILD_REGISTER_ACCEPT: {
                GuildHandler.GuildRegisterAccept(slea, c.getPlayer());
                break;
            }
            case GUILD_REGISTER_DENY: {
                GuildHandler.GuildJoinDeny(slea, c.getPlayer());
                break;
            }
            case REQUEST_GUILD: {
                GuildHandler.GuildRequest(slea.readInt(), c.getPlayer());
                break;
            }
            case GUILD_RANKING_REQUEST: {
                GuildHandler.guildRankingRequest(slea.readByte(), c);
                break;
            }
            case CANCEL_GUILD_REQUEST: {
                GuildHandler.cancelGuildRequest(c, c.getPlayer());
                break;
            }
            case GUILD_OPTION: {
                GuildHandler.SendGuild(slea, c);
                break;
            }
            case ALLIANCE_OPERATION: {
                AllianceHandler.HandleAlliance(slea, c, false);
                break;
            }
            case DENY_ALLIANCE_REQUEST: {
                AllianceHandler.HandleAlliance(slea, c, true);
                break;
            }
            case PARTY_OPERATION: {
                PartyHandler.PartyOperation(slea, c);
                break;
            }
            case DENY_PARTY_REQUEST: {
                PartyHandler.DenyPartyRequest(slea, c);
                break;
            }
            case ALLOW_PARTY_INVITE: {
                break;
            }
            case BUDDYLIST_MODIFY: {
                BuddyListHandler.BuddyOperation(slea, c);
                break;
            }
            case CYGNUS_SUMMON: {
                UserInterfaceHandler.CygnusSummon_NPCRequest(c);
                break;
            }
            case SHIP_OBJECT: {
                UserInterfaceHandler.ShipObjectRequest(slea.readInt(), c);
                break;
            }
            case BUY_CS_ITEM: {
                CashShopOperation.BuyCashItem(slea, c, c.getPlayer());
                break;
            }
            case COUPON_CODE: {
                slea.skip(1);
                CashShopOperation.CouponCode(slea.readMapleAsciiString(), c);
                break;
            }
            case CS_CHARGE: {
                CashShopOperation.csCharge(c);
                break;
            }
            case CS_UPDATE: {
                CashShopOperation.CSUpdate(c);
                break;
            }
            case CS_GIFT: {
                CashShopOperation.csGift(slea, c);
                break;
            }
            case COODINATION_RESULT: {
                break;
            }
            case MVP_SPECIAL_PACK: {
                CashShopOperation.mvpSpecialPack(slea.readInt(), c);
                break;
            }
            case MVP_GIFT_PACK: {
                CashShopOperation.mvpGiftPack(c);
                break;
            }
            case DAMAGE_SUMMON: {
                SummonHandler.DamageSummon(slea, c.getPlayer());
                break;
            }
            case MOVE_SUMMON: {
                SummonHandler.MoveSummon(slea, c.getPlayer());
                break;
            }
            case SUMMON_ATTACK: {
                SummonHandler.SummonAttack(slea, c, c.getPlayer());
                break;
            }
            case MOVE_DRAGON: {
                SummonHandler.MoveDragon(slea, c.getPlayer());
                break;
            }
            case SUB_SUMMON: {
                SummonHandler.SubSummon(slea, c.getPlayer());
                break;
            }
            case REMOVE_SUMMON:
            case REMOVE_SUMMON2: {
                SummonHandler.RemoveSummon(slea, c);
                break;
            }
            case SPAWN_PET: {
                PetHandler.SpawnPet(slea, c, c.getPlayer());
                break;
            }
            case MOVE_PET: {
                PetHandler.MovePet(slea, c.getPlayer());
                break;
            }
            case PET_CHAT: {
                if (slea.available() < 12L) {
                    break;
                }
                final int petid = slea.readInt();
                slea.readInt();
                PetHandler.PetChat(petid, slea.readShort(), slea.readMapleAsciiString(), c.getPlayer());
                break;
            }
            case PET_COMMAND: {
                MaplePet pet = null;
                pet = c.getPlayer().getPet((byte) slea.readInt());
                slea.readByte();
                if (pet == null) {
                    return;
                }
                PetHandler.PetCommand(pet, PetDataFactory.getPetCommand(pet.getPetItemId(), slea.readByte()), c, c.getPlayer());
                break;
            }
            case PET_FOOD: {
                PetHandler.PetFood(slea, c, c.getPlayer());
                break;
            }
            case PET_LOOT: {
                InventoryHandler.Pickup_Pet(slea, c, c.getPlayer());
                break;
            }
            case PET_AUTO_POT: {
                PetHandler.Pet_AutoPotion(slea, c, c.getPlayer());
                break;
            }
            case PET_EXCEPTION_LIST: {
                PetHandler.petExceptionList(slea, c, c.getPlayer());
                break;
            }
            case DUEY_ACTION: {
                DueyHandler.DueyOperation(slea, c);
                break;
            }
            case REPAIR: {
                NPCHandler.repair(slea, c);
                break;
            }
            case REPAIR_ALL: {
                NPCHandler.repairAll(c);
                break;
            }
            case USE_ITEM_QUEST: {
                NPCHandler.UseItemQuest(slea, c);
                break;
            }
            case AUCTION_RESULT: {
                AuctionHandler.Handle(slea, c);
                break;
            }
            case AUCTION_EXIT: {
                AuctionHandler.LeaveAuction(c, c.getPlayer());
                break;
            }
            case UPDATE_QUEST: {
                NPCHandler.UpdateQuest(slea, c);
                break;
            }
            case RANDOM_MONSTER_ATTACK: {
                PlayerHandler.randomMonsterAttack(slea, c);
                break;
            }
            case SKILL_ALERT: {
                SkillAlertInfo.handlePacket(slea, c);
                break;
            }
            case MEMORY_CHOICE_R: {
                PlayerHandler.MemoryChoice(slea, c);
                break;
            }
            case FOLLOW_REQUEST: {
                PlayersHandler.FollowRequest(slea, c);
                break;
            }
            case FOLLOW_CANCEL: {
                PlayersHandler.followCancel(slea, c);
                break;
            }
            case AUTO_FOLLOW_REPLY:
            case FOLLOW_REPLY: {
                PlayersHandler.FollowReply(slea, c);
                break;
            }
            case USE_KAISER_COLOR: {
                InventoryHandler.UseKaiserColorChange(slea, c);
                break;
            }
            case USE_NAME_CHANGE: {
                InventoryHandler.UseNameChangeCoupon(slea, c);
                break;
            }
            case LINK_PRESETS_APPLY: {
                PlayerHandler.ApplyLinkPresets(slea, c);
                break;
            }
            case LINK_PRESET: {
                PlayersHandler.LinkPreset(slea, c);
                break;
            }
            case RING_ACTION: {
                PlayersHandler.RingAction(slea, c);
                break;
            }
            case WEDDING_PRESENT: {
                PlayersHandler.WeddingPresent(slea, c);
                break;
            }
            case USE_TELE_ROCK: {
                InventoryHandler.TeleRock(slea, c);
                break;
            }
            case REPORT: {
                PlayersHandler.Report(slea, c);
                break;
            }
            case MAPLE_EXIT:
            case GAME_EXIT: {
                try {
                    InterServerHandler.getGameQuitRequest(header, slea, c);
                } catch (Exception e4) {
                    e4.printStackTrace();
                }
                break;
            }
            case PQ_REWARD: {
                InventoryHandler.SelectPQReward(slea, c);
                break;
            }
            case INNER_CHANGE: {
                try {
                    PlayerHandler.ChangeInner(slea, c);
                } catch (Exception e4) {
                    e4.printStackTrace();
                }
                break;
            }
            case INNER_PRESET: {
                try {
                    int preset = slea.readByte();

                    c.getPlayer().setInnerSkillsPreset(preset);
                    c.getSession().writeAndFlush(CWvsContext.updateInnerPreset((byte) preset));
                } catch (Exception ex) {
                    ex.printStackTrace();
                }

                break;
            }
            case ABSORB_REGEN: {
                PlayerHandler.absorbingRegen(slea, c);
                break;
            }
            case ZERO_SCROLL_UI: {
                PlayerHandler.ZeroScrollUI(slea.readInt(), c);
                break;
            }
            case ZERO_SCROLL_LUCKY: {
                PlayerHandler.ZeroScrollLucky(slea, c);
                break;
            }
            case ZERO_SCROLL: {
                PlayerHandler.ZeroScroll(slea, c);
                break;
            }
            case ZERO_SCROLL_START: {
                PlayerHandler.ZeroScrollStart(header, slea, c);
                break;
            }
            case ZERO_WEAPON_INFO: {
                PlayerHandler.ZeroWeaponInfo(slea, c);
                break;
            }
            case UI_OPEN: {
                // PlayerHandler.ZeroScrollUI(slea.readInt(), c);
                break;
            }
            case ZERO_WEAPON_UPGRADE: {
                PlayerHandler.ZeroWeaponLevelUp(slea, c);
                break;
            }
            case ZERO_TAG: {
                PlayerHandler.ZeroTag(slea, c);
                break;
            }
            case ZERO_TAG_REMOVE: {
                PlayerHandler.ZeroTagRemove(c);
                break;
            }
            case SUB_ACTIVE_SKILL: {
                PlayerHandler.subActiveSkills(slea, c);
                break;
            }
            case ZERO_CLOTHES: {
                PlayerHandler.ZeroClothes(slea, c);
                break;
            }
            case WILL_OF_SWORD_COMBO: {
                PlayerHandler.absorbingSword(slea, c.getPlayer());
                break;
            }
            case WILL_OF_SWORD: {
                break;
            }
            case FIELD_ATTACK_OBJ_ATTACK: {
                PlayerHandler.FieldAttackObjAttack(slea, c.getPlayer());
                break;
            }
            case FIELD_ATTACK_OBJ_ACTION: {
                PlayerHandler.FieldAttackObjAction(slea, c.getPlayer());
                break;
            }
            case ORBITAL_FLAME: {
                PlayerHandler.OrbitalFlame(slea, c);
                break;
            }
            case VIEW_SKILLS: {
                PlayersHandler.viewSkills(slea, c);
                break;
            }
            case SKILL_SWIPE: {
                PlayersHandler.StealSkill(slea, c);
                break;
            }
            case CHOOSE_SKILL: {
                PlayersHandler.ChooseSkill(slea, c);
                break;
            }
            case VOYD_PRESSURE: {
                PlayerHandler.VoydPressure(slea, c.getPlayer());
                break;
            }
            case EQUIPMENT_ENCHANT: {
                EquipmentEnchant.handleEnchant(slea, c);
                break;
            }
            case DRESS_UP: {
                PlayerHandler.DressUpRequest(c.getPlayer(), slea);
                break;
            }
            case UNLOCK_TRINITY: {
                PlayerHandler.unlockTrinity(c);
                break;
            }
            case DRESSUP_TIME: {
                PlayerHandler.DressUpTime(slea, c);
                break;
            }
            case HYPER_R: {
                HyperHandler.getHyperSkill(slea, c);
                break;
            }
            case UPDATE_CORE: {
                MatrixHandler.updateCore(slea, c);
                break;
            }
            case MATRIX_SKILL: {
                PlayerHandler.MatrixSkill(slea, c);
                break;
            }
            case MEGA_SMASHER: {
                PlayerHandler.megaSmasherRequest(slea, c);
                break;
            }
            case SHADOW_SERVENT_EXTEND: {
                PlayerHandler.ShadowServentExtend(slea, c);
                break;
            }
            case JOKER_R: {
                PlayerHandler.joker(c);
                break;
            }
            case WEAPON_MOTION_CHANGE: {
                PlayerHandler.PlayerWeaponMotionChange(slea, c);
                break;
            }
            case SELECT_DICE: {
                PlayerHandler.selectDice(slea, c);
                break;
            }
            case SYMBOL_LEVELUP:
            case AUT_SYMBOL_LEVELUP: {
                final int t = slea.readInt();
                if (t == 1) {
                    PlayerHandler.UpdateSymbol(slea, c, t);
                    break;
                }
                if (t == 2) {
                    PlayerHandler.SymbolMultiExp(slea, c);
                    break;
                }
                PlayerHandler.SymbolExp(slea, c);
                break;
            }
            case UNLINK_SKILL: {
                PlayerHandler.UnlinkSkill(slea.readInt(), c);
                break;
            }
            case LINK_SKILL: {
                PlayerHandler.LinkSkill(slea.readInt(), slea.readInt(), slea.readInt(), c);
                break;
            }
            case ARK_GAUGE: {
                PlayerHandler.arkGauge(slea.readInt(), c.getPlayer());
                break;
            }
            case RESPAWN: {
                int type = slea.readInt();

                switch (type) {
                    case 0:
                        int skillId = slea.readInt();
                        Point position = slea.readIntPos();

                        break;
                    case 1:
                        break;
                    default:
                        break;
                }

                break;
            }
            case SOUL_MATCH: {
                PlayerHandler.SoulMatch(slea, c);
                break;
            }
            case DAILY_GIFT: {
                PlayerHandler.DailyGift(c);
                break;
            }
            case HAMMER_OF_TODD: {
                InventoryHandler.Todd(slea, c);
                break;
            }
            case NPC_OF_TODD: {
                NPCScriptManager.getInstance().start(c, 9900000, "todd");
                break;
            }
            case OPEN_UNION: {
                UnionHandler.openUnion(c);

                List<MapleUnion> unions = c.getPlayer().getUnions().getUnions();

                if (unions != null) {
                    c.getPlayer().updateInfoQuest(503153, "missionState=11111111111111111111111111111111111111111"); // 보스 미션

                    if (c.getPlayer().getKeyValue(503392, "start") != 1) {
                        c.getPlayer().artipactInit();
                    }
                }
                break;
            }
            case UNION_ARTIPACT: {
                int type = slea.readInt();

                switch (type) {
                    case 0: { // 기간 연장
                        int index = slea.readInt();
                        int point = slea.readInt();

                        c.getPlayer().gainArtipactPoint(-point, false);

                        long expirationTime = (System.currentTimeMillis() + (30L * 24L * 60L * 60L * 1000L));

                        c.getPlayer().getArtipacts().get(index).setExpirationTime(expirationTime);

                        c.getSession().writeAndFlush(CField.unionArtipactQuestMsg(2, 0, 0, index, expirationTime));

                        c.getPlayer().artipactReload(type, index);
                        break;
                    }
                    case 1: { // 일괄 연장
                        int point = slea.readInt();

                        c.getPlayer().gainArtipactPoint(-point, false);

                        long expirationTime = (System.currentTimeMillis() + (30L * 24L * 60L * 60L * 1000L));

                        for (MapleUnionArtipact artipact : c.getPlayer().getArtipacts()) {
                            artipact.setExpirationTime(expirationTime);
                        }

                        c.getSession().writeAndFlush(CField.unionArtipactQuestMsg(3, 0, 0, 0, expirationTime));

                        c.getPlayer().artipactReload(type, 0);
                        break;
                    }
                    case 2: { // 옵션 변환
                        int index = slea.readInt();

                        ArrayList<Integer> skills = new ArrayList<>();

                        skills.add(slea.readInt());
                        skills.add(slea.readInt());
                        skills.add(slea.readInt());

                        c.getPlayer().gainArtipactPoint(-500, false);

                        c.getPlayer().getArtipacts().get(index).setSkills(skills);

                        c.getPlayer().artipactReload(type, index);
                        break;
                    }
                    case 3: { // AP 초기화
                        for (MapleUnionArtipact artipact : c.getPlayer().getArtipacts()) {
                            artipact.setLevel(1);
                        }

                        c.getPlayer().artipactReload(type, 0);
                        break;
                    }
                    case 4: { // 등급 성장
                        int index = slea.readInt();

                        c.getPlayer().getArtipacts().get(index).levelUp();

                        c.getPlayer().artipactReload(type, index);
                        break;
                    }
                    case 7: { // 리로드
                        c.getPlayer().artipactReload(type, 0);
                        break;
                    }
                    case 8: { // 스페셜 미션 동기화
                        SimpleDateFormat format = new SimpleDateFormat("yy/MM/dd/HH/mm");
                        String now = format.format(System.currentTimeMillis());

                        c.getPlayer().updateInfoQuest(101842, "lastMissionSyncDate=" + now);

                        c.getPlayer().artipactReload(type, 0);
                        break;
                    }
                }

                break;
            }
            case PRAY: {
                PlayerHandler.activePrayBuff(c);
                break;
            }
            case RESOTRE: {
                PlayerHandler.activeRestoreBuff(c);
                break;
            }
            case LUCID_STATE_CHANGE: {
                MobHandler.lucidStateChange(c.getPlayer());
                break;
            }
            case INHUMAN_SPEED: {
                PlayerHandler.InhumanSpeed(slea, c);
                break;
            }
            case SET_UNION: {
                UnionHandler.setUnion(slea, c);
                break;
            }
            case SET_UNION_FREESET: {
                UnionHandler.setUnionPriset(slea, c);
                break;
            }
            case UPDATE_JAGUAR: {
                PlayerHandler.UpdateJaguar(slea, c);
                break;
            }
            case AURA_WEAPON: {
                PlayerHandler.auraWeapon(slea, c);
                break;
            }
            case REMOVE_MIST: {
                PlayerHandler.removeMist(slea, c);
                break;
            }
            // 피스메이커
            case PEACE_MAKER_1: {
                PlayerHandler.PeaceMaker(slea, c);
                break;
            }
            case PEACE_MAKER_2: {
                PlayerHandler.PeaceMaker2(slea, c);
                break;
            }
            case DEMON_FRENZY: {
                PlayerHandler.DemonFrenzy(c);
                break;
            }
            case KEYDOWN_MANAGEMENT: {
                PlayerHandler.keydownSkillManagement(slea, c);
                break;
            }
            case SKILL_SUB_EFFECT: {
                PlayerHandler.subSkillEffect(slea, c.getPlayer());
                break;
            }
            case CANCEL_SUB_EFFECT: {
                PlayerHandler.cancelSubEffect(slea, c.getPlayer());
                break;
            }
            case CHANGE_SUB_EFFECT: {
                PlayerHandler.changeSubEffect(slea, c.getPlayer());
                break;
            }
            case SHOW_ICBM: {
                PlayerHandler.showICBM(slea, c.getPlayer());
                break;
            }
            case ARK_LINK: {
                PlayerHandler.LinkofArk(slea, c.getPlayer());
                break;
            }
            case FLOW_OF_FIGHT: {
                PlayerHandler.FlowOfFight(c.getPlayer());
                break;
            }
            case UserTowerChairSetting: {
                slea.skip(4);
                PlayerHandler.TowerChair(slea, c);
                break;
            }
            case BlockGameRes: {
                PlayerHandler.HandleBlockGameRes(slea, c);
                break;
            }
            case ExitBlockGame: {
                PlayerHandler.ExitBlockGame(slea, c);
                break;
            }
            case ClickBingoCell: {
                slea.skip(8);
                PlayerHandler.HandleCellClick(slea.readInt(), c);
                break;
            }
            case ClickBingo: {
                PlayerHandler.HandleBingoClick(c);
                break;
            }
            case DREAM_BREAKER_SKILL: {
                slea.skip(4);
                PlayerHandler.HandleDreamBreakerSkill(c, slea.readInt());
                break;
            }
            case SPECIAL_GAME_EXIT: {
                PlayerHandler.ExitSpecialGame(c);
                break;
            }
            case HDetectiveGameInput: {
                PlayerHandler.HandleHundredDetectiveGame(slea, c);
                break;
            }
            case BALANCE_EXIT: {
                final MapleNPC npc = MapleLifeFactory.getNPC(1540445);
                if (npc != null && !npc.getName().equals("MISSINGNO")) {
                    npc.setPosition(c.getPlayer().getPosition());
                    npc.setCy(c.getPlayer().getPosition().y);
                    npc.setRx0(c.getPlayer().getPosition().x + 50);
                    npc.setRx1(c.getPlayer().getPosition().x - 50);
                    npc.setFh(c.getPlayer().getMap().getFootholds().findBelow(c.getPlayer().getPosition()).getId());
                    npc.setCustom(true);
                    c.getPlayer().getMap().addMapObject(npc);
                    c.getPlayer().getMap().broadcastMessage(CField.NPCPacket.spawnNPC(npc, true));
                    break;
                }
                break;
            }
            case UserClientResolutionResult: {
                PlayerHandler.HandleResolution(slea, c);
                break;
            }
            case CHARACTER_ORDER: {
                c.order(slea);
                break;
            }
            case PlatformerEnter: {
                break;
            }
            case EXIT_PLATFORMER: {
                PlayerHandler.HandlePlatformerExit(slea, c);
                break;
            }
            case REPLACE_SUMMON: {
                SummonHandler.replaceSummon(slea, c);
                break;
            }
            case ICBM: {
                PlayerHandler.ICBM(slea, c);
                break;
            }
            case DIMENTION_SWORD: {
                PlayerHandler.DimentionSword(slea, c);
                break;
            }
            case SPECIAL_SUMMON: {
                SummonHandler.specialSummon(slea, c);
                break;
            }
            case SPECIAL_SUMMON_5TH: {
                SummonHandler.specialSummon5th(slea, c);
                break;
            }
            case EFFECT_SUMMON: {
                SummonHandler.effectSummon(slea, c);
                break;
            }
            case CANCEL_EFFECT_SUMMON: {
                SummonHandler.cancelEffectSummon(slea, c);
                break;
            }
            case AFTER_CANCEL: {
                PlayerHandler.cancelAfter(slea, c);
                break;
            }
            case AUTO_SKILL: {
                PlayerHandler.autoSkill(slea, c);
                break;
            }
            case RESPAWN_LUCID: {
                PlayerHandler.RespawnLucid(slea, c);
                break;
            }
            case RAINBOW_RUSH_START: {
                PlayerHandler.RainBowRushStart(c);
                break;
            }
            case RAINBOW_RUSH_TIMER: {
                PlayerHandler.RainBowRushTimer(slea, c);
                break;
            }
            case RAINBOW_RUSH_DEAD: {
                if (c.getPlayer().isNoDeadRush()) {
                    break;
                }
                PlayerHandler.RainBowRushDead(c);
                break;
            }
            case RAINBOW_RUSH_RETURN_MAP: {
                PlayerHandler.RainBowRushReturnMap(c);
                break;
            }
            case RAINBOW_RUSH_TIMER_SECOND: {
                PlayerHandler.RainBowRushTimer(slea, c);
                break;
            }
            case POISON_NOVA: {
                PlayerHandler.PoisonNova(slea, c);
                break;
            }
            case USE_MOON_GAUGE: {
                PlayerHandler.useMoonGauge(c);
                break;
            }
            case WILL_MOON: {
                PlayerHandler.wiilMoon(slea, c);
                break;
            }
            case WILL_SPIDER_TOUCH: {
                PlayerHandler.touchSpider(slea, c);
                break;
            }
            case SKILL_TO_Crystal: {
                PlayerHandler.SkillToCrystal(slea, c);
                break;
            }
            case RETURN_RESULT: {
                InventoryHandler.returnScrollResult(slea, c);
                break;
            }
            case MINIGAME_OPERATION: {
                PlayerInteractionHandler.minigameOperation(slea, c);
                break;
            }
            case BUFF_FREEZER: {
                PlayerHandler.buffFreezer(slea, c);
                break;
            }
            case LOTUS_AIR_ATTACK: {
                break;
            }
            case QUICK_SLOT: {
                PlayerHandler.quickSlot(slea, c);
                break;
            }
            case CHECK_CORE_SECONDPW: {
                PlayerHandler.checkCoreSecondpw(slea, c);
                break;
            }
            case INVITE_CHAIR: {
                PlayerHandler.inviteChair(slea, c);
                break;
            }
            case RESULT_CHAIR: {
                PlayerHandler.resultChair(slea, c);
                break;
            }
            case BLOOD_FIST: {
                PlayerHandler.bloodFist(slea, c);
                break;
            }
            case YOYO_STACK:
            case STACK_BUFF:
            case CHARGE_SKILL: {
                PlayerHandler.Vmatrixstackbuff(c, false, slea);
                break;
            }
            case SMOKE_SHELL_3_SECOND: {
                if (c.getPlayer() != null) { // 분쇄 VI 구현
                    if (c.getPlayer().hexaMasterySkillStack < 5) {
                        c.getPlayer().hexaMasterySkillStack++;

                        EnumMap<SecondaryStat, Pair<Integer, Integer>> statupsT = new EnumMap<SecondaryStat, Pair<Integer, Integer>>(SecondaryStat.class);
                        statupsT.put(SecondaryStat.Smash_Stack, new Pair<Integer, Integer>(c.getPlayer().hexaMasterySkillStack, 0));
                        SecondaryStatEffect effT = SkillFactory.getSkill(4241004).getEffect(c.getPlayer().getSkillLevel(4241000));
                        c.getPlayer().getClient().getSession().writeAndFlush(CWvsContext.BuffPacket.giveBuff(statupsT, effT, c.getPlayer()));
                    }
                }

                break;
            }
            case UPDATE_MIST: {
                try {
                    PlayerHandler.updateMist(slea, c);
                } catch (Exception e5) {
                    e5.printStackTrace();
                }
                break;
            }
            case NETT_PYRAMID_CHECK: {
                final int type2 = slea.readInt();
                final MapleNettPyramid mnp = c.getPlayer().getNettPyramid();
                if (mnp == null) {
                    System.out.println("MapleNettPyramid = null");
                    break;
                }
                if (type2 == 1) {
                    final int sid = slea.readInt();
                    mnp.useSkill(c.getPlayer(), sid);
                    break;
                }
                if (type2 == 3) {
                    mnp.check();
                    break;
                }
                break;
            }
            case FISHING: {
                FishingHandler.fishing(slea, c);
                break;
            }
            case FISHING_END: {
                FishingHandler.fishingEnd(c);
                break;
            }
            case ADD_BULLET: {
                PlayerHandler.BlesterSkill(slea, c, false);
                break;
            }
            case REVOLVING_BUNKER_CANCEL: {
                if (c.getPlayer().getBuffedValue(37121004)) {
                    c.getPlayer().cancelEffect(c.getPlayer().getBuffedEffect(37121004));
                    break;
                }
                break;
            }
            case MAGUNM_BLOW: {
                PlayerHandler.Magunmblow(slea, c);
                break;
            }
            case ARCANE_CATALYST: {
                InventoryHandler.ArcaneCatalyst(slea, c);
                break;
            }
            case ARCANE_CATALYST2: {
                InventoryHandler.ArcaneCatalyst2(slea, c);
                break;
            }
            case ARCANE_CATALYST3: {
                InventoryHandler.ArcaneCatalyst3(slea, c);
                break;
            }
            case ARCANE_CATALYST4: {
                InventoryHandler.ArcaneCatalyst4(slea, c);
                break;
            }
            case RETURN_SYNTHESIZING: {
                InventoryHandler.ReturnSynthesizing(slea, c);
                break;
            }
            case DEMIAN_BIND: {
                MobHandler.demianBind(slea, c);
                break;
            }
            case DEMIAN_ATTACKED: {
                MobHandler.demianAttacked(slea, c);
                break;
            }
            case STIGMA_INCINERATE_USE: {
                MobHandler.useStigmaIncinerate(slea, c);
                break;
            }
            case STONE_ATTACKED: {
                MobHandler.stoneAttacked(slea, c);
                break;
            }
            case SPOTLIGHT_BUFF: {
                PlayerHandler.spotlightBuff(slea, c);
                break;
            }
            case UNION_FREESET: {
                UnionHandler.unionFreeset(slea, c);
                break;
            }
            case BLACK_HAND: {
                MobHandler.jinHillahBlackHand(slea, c);
                break;
            }
            case TOUCH_ALTER: {
                MobHandler.touchAlter(slea, c);
                break;
            }
            case QUICK_MOVE: {
                NPCHandler.quickMove(slea, c);
                break;
            }
            case UNK_JINHILLIA: {
                MobHandler.unkJinHillia(slea, c);
                break;
            }
            case DIMENTION_MIRROR: {
                NPCHandler.dimentionMirror(slea, c);
                break;
            }
            case USE_BLACK_REBIRTH_RESULT: {
                InventoryHandler.blackRebirthResult(slea, c);
                break;
            }
            case QUICK_PASS: {
                PlayerHandler.quickPass(slea, c);
                break;
            }
            case BATTLE_STATISTICS: {
                PlayerHandler.battleStatistics(slea, c);
                break;
            }
            case EVENTUI_RESULT: {
                PlayerHandler.eventUIResult(slea, c);
                break;
            }
            case MOBSKILL_DELAY: {
                MobHandler.mobSkillDelay(slea, c);
                break;
            }
            case REMOVE_SECOND_ATOM: {
                PlayerHandler.removeSecondAtom(slea, c);
                break;
            }
            case INFO_SECOND_ATOM: {
                PlayerHandler.InfoSecondAtom(slea, c);
                break;
            }
            case ROPE_CONNECT: {
                PlayerHandler.ropeConnect(slea, c);
                break;
            }
            case AURA_PARTY_BUFF: {
                PlayersHandler.auraPartyBuff(slea, c);
                break;
            }
            case FPS_SHOOT_REQUEST: {
                PlayerHandler.fpsShootRequest(slea, c);
                break;
            }
            case ZERO_LUCKY_SCROLL: {
                PlayerHandler.ZeroLuckyScroll(c, slea);
                break;
            }
            case COURTSHIP_COMMAND: {
                PlayerHandler.courtshipCommand(slea, c);
                break;
            }
            case FORCE_INFO: {
                PlayerHandler.forceInfo(slea, c);
                break;
            }
            case VSKILL_SPECIAL: {
                PlayerHandler.vSkillSpecial(slea, c);
                break;
            }
            case SPAWN_ORB: {
                OrbHandler.spawnOrb(slea, c);
                break;
            }
            case MOVE_ORB: {
                OrbHandler.moveOrb(slea, c);
                break;
            }
            case REMOVE_ORB: {
                OrbHandler.removeOrb(slea, c);
                break;
            }
            case ORIGIN_ANNIHULATION: {
                SecondaryStatEffect effect = SkillFactory.getSkill(slea.readInt()).getEffect(c.getPlayer().getSkillLevel(slea.readInt()));

                Rectangle rect = effect.calculateBoundingBox(slea.readIntPos(), slea.readByte() == 1);

                for (MapleMonster monster : c.getPlayer().getMap().getAllMonster()) {
                    if (rect.contains(monster.getPosition())) {
                        if (monster.getCustomValue0(63110011) < 20) {
                            monster.setCustomInfo(63110011, (int) monster.getCustomValue0(63110011) + 1, 90000);
                        }
                    }
                }

                ArrayList<MapleMonster> moblist = new ArrayList<MapleMonster>();

                for (MapleMonster mob : c.getPlayer().getMap().getAllMonster()) {
                    if (mob.getCustomValue0(63110011) > 0) {
                        moblist.add(mob);
                    }
                }

                c.getPlayer().getClient().getSession().writeAndFlush(CField.getDeathBlessStack(c.getPlayer(), moblist));

                break;
            }
            case REVENANT: {
                PlayerHandler.Revenant(slea, c);
                break;
            }
            case REVENANT_DAMAGE: {
                PlayerHandler.Revenantend(slea, c);
                break;
            }
            case SILHOUETTE_MIRAGE: {
                PlayerHandler.SilhouEtteMirage(c.getPlayer(), slea);
                break;
            }
            case MECH_CARRIER: {
                SummonHandler.mechCarrier(slea, c);
                break;
            }
            case PHOTON_RAY: {
                PlayerHandler.photonRay(slea, c);
                break;
            }
            case CRYSTAL_GATE: {
                PlayerHandler.crystalGate(slea, c);
                break;
            }
            case COOLTIME_END: {
                int skillId = slea.readInt();
                boolean unk = slea.readByte() == 1; // Unk

                if (skillId == 63141000) {
                    skillId = 63121002;
                }

                if (skillId == 63141009) {
                    skillId = 63101004;
                }

                if (GameConstants.isCain(c.getPlayer().getJob())) {
                    c.getPlayer().handleStackskill(skillId, false);
                }

                break;
            }
            case CANCEL_BUFF_FORCE: {
                PlayerHandler.cancelBuffForce(c);
                break;
            }
            case COMMAND_LOCK2:
            case COMMAND_LOCK:
            case EVENT_UI_SKILL: {
                PlayerHandler.CommandLockAction2(slea, c);
                break;
            }
            case CHANGE_DRAGON_ATTACK_IMG: {
                PlayerHandler.ChangeDragonImg(c.getPlayer(), slea);
                break;
            }
            case ATTACK_DRAGON_IMG: {
                PlayerHandler.AttackDragonImg(c.getPlayer(), slea);
                break;
            }
            case PHANTOM_SHRUOD: {
                PlayerHandler.PhantomShroud(slea, c);
                break;
            }
            case LIFT_BREAK: {
                PlayerHandler.LiftBreak(c.getPlayer(), slea);
                break;
            }
            case HARMONY_LINK: {
                PlayerHandler.HarmonyLink(slea, c);
                break;
            }
            case FORCEATOM_EFFECT: {
                PlayerHandler.ForceAtomEffect(slea, c);
                break;
            }
            case COLOR_CARD_COMMAND: {
                PlayersHandler.ColorCardHandler(slea, c);
                break;
            }
            case CONTENTS_WAITING: {
                PlayersHandler.ContentsWaiting(slea, c);
                break;
            }
            case MAPLE_YUT_HANDLER: {
                PlayersHandler.MapleYutHandler(slea, c);
                break;
            }
            case MESSENGER_SEARCH: {
                ChatHandler.Messengerserch(slea, c);
                break;
            }
            case SELECT_REINCARNATION: {
                PlayerHandler.SelectReincarnation(slea, c);
                break;
            }
            case SELECT_HOLY_UNITY: {
                PlayerHandler.SelectHolyUnity(slea, c);
                break;
            }
            case PYRET_BLESS: {
                PlayerHandler.PyretBless(slea, c);
                break;
            }
            case ZERO_SHOCK_WAVE: {
                PlayerHandler.ZeroShockWave(slea, c);
                break;
            }
            case REISSUE_MEDAL: {
                PlayerHandler.MedalReissuance(c, slea);
                break;
            }
            case PSYCHIC_OVER: {
                c.getPlayer().givePPoint((byte) 1);
                break;
            }
            case BATTLEGROUND_ATTACK: {
                //  MapleBattleGround.Attack(slea, c);
                break;
            }
            case BATTLEGROUND_ATTACK_REFRESH: {
                //  MapleBattleGround.AttackRefresh(slea, c);
                break;
            }
            case BATTLEGROUND_MOVE_ATTACK: {
                //    MapleBattleGround.MoveAttack(slea, c);
                break;
            }
            case BATTLEGROUND_DAMAGE: {
                //   MapleBattleGround.AttackDamage(slea, c);
                break;
            }
            case BATTLEGROUND_TAKE_DAMAGE: {
                //   MapleBattleGround.TakeDamage(slea, c);
                break;
            }
            case BATTLEGROUND_TIME: {
                //    MapleBattleGround.MainTime(slea, c);
                break;
            }
            case BATTLEGROUND_UPGRADE_SKILL: {
                //    MapleBattleGround.UpgradeSkill(slea, c);
                break;
            }
            case BATTLE_GROUND_RESPAWN: {
                //     MapleBattleGround.Respawn(slea, c);
                break;
            }
            case ROLLING_GRADE: {
                PlayerHandler.PinkBeanRollingGrade(c, slea);
                break;
            }
            case POISON_REGION:
                PlayerHandler.PoisonLegion(slea, c);
                break;
            case DEBUFF_OBJ_HIT: {
                PlayerHandler.DebuffObjHit(c, slea);
                break;
            }
            case SPAWN_MIST_MONSTER: {
                MobHandler.spawnMistArea(slea, c);
                break;
            }
            case HEXA_CORE_USE: {
                int type = slea.readInt();

                switch (type) {
                    case 0: // HEXA 스킬 활성화
                        HEXAHandler.activeHexaSkill(slea, c, type);
                        break;
                    case 1: // HEXA 스킬 강화
                        HEXAHandler.enhanceHexaSkill(slea, c, type);
                        break;
                    case 2: // HEXA 스텟 활성화
                        HEXAHandler.activeHexaStat(slea, c, type);
                        break;
                    case 3: // HEXA 스텟 강화
                        HEXAHandler.enhanceHexaStat(slea, c, type);
                        break;
                    case 4: // HEXA 스텟 저장
                        HEXAHandler.saveHexaStat(slea, c, type);
                        break;
                    case 5: // HEXA 스텟 슬롯 변경
                        HEXAHandler.changeHexaStatSlot(slea, c, type);
                        break;
                    case 6: // HEXA 스텟 초기화
                        HEXAHandler.resetHexaStat(slea, c, type);
                        break;
                    case 7: // HEXA 스텟 변경
                        HEXAHandler.changeHexaStat(slea, c, type);
                        break;
                    case 8: // 능력치 변경 시 2차 비밀번호 확인
                        HEXAHandler.checkSecondPW(slea, c, type);
                        break;
                }
                break;
            }
            case MOVE_MONSTER_SPAWN_MIST: {
                MobHandler.SpawnMoveMobMist(slea, c.getPlayer());
                break;
            }
            case PAPULATUS_BOMB:
            case PAPULATUS_BOMB_DAMAGE: {
                MobHandler.PapulaTusBomb(slea, c, (header == RecvPacketOpcode.PAPULATUS_BOMB_DAMAGE) ? 1 : 0);
                break;
            }
            case PAPULATUS_PINCERS: {
                MobHandler.PapulaTusPincers(slea, c);
                break;
            }
            case PAPULATUS_PINCERS_RESET: {
                MobHandler.PapulaTusPincersreset(slea, c);
                break;
            }
            case BLOOD_QUEEN_BREATH: {
                MobHandler.BloodyQueenBress(slea, c);
                break;
            }
            case TOUCH_MONSTER: {
                MobHandler.BloodyQueenMirror(slea, c);
                break;
            }
            case VANVAN_TIMEOVER: {
                MobHandler.VanVanTimeOver(slea, c);
                break;
            }
            case SPAWN_BELLUM_MIST: {
                MobHandler.SpawnBellumMist(slea, c);
                break;
            }
            case HEXA_SOL_JANUS: {
                PlayerHandler.selectSolJanus(slea, c);
                break;
            }
            case REMOVE_OBSTACLE: {
                MobHandler.RemoveObstacle(slea, c);
                break;
            }
            case REMOVE_ENERGYSPHERE: {
                MobHandler.RemoveEnergtSphere(slea, c);
                break;
            }
            case DEMIAN_SWORD_HANDLE: {
                MobHandler.DemianSwordHandle(slea, c);
                break;
            }
            case NOTE_HANDLE: {
                PlayerHandler.NoteHandle(c, slea);
                break;
            }
            case NOTE_HANDLER: {
                PlayerHandler.NoteHandler(c, slea);
                break;
            }
            case MAPLE_CABINET: {
                PlayerHandler.MapleCabiNet(c, slea);
                break;
            }
            case EXP_POCKET: {
                PlayerHandler.ExpPocket(c, slea);
                break;
            }
            case CHAT_EMOTICON: {
                PlayerHandler.ChatEmoticon(slea, c);
                break;
            }
            case BATTLEGROUND_SELECT_AVATER: {
                //   MapleBattleGround.SelectAvater(slea, c);
                break;
            }
            case CREATE_CORE: {
                c.send(CWvsContext.CreateCore(1));
                c.getSession().writeAndFlush((Object) CWvsContext.enableActions(c.getPlayer()));
                NPCScriptManager.getInstance().dispose(c);
                c.removeClickedNPC();
                NPCScriptManager.getInstance().start(c, 2007, "Create_Core");
                break;
            }
            case USE_AP_RESET_SCROLL: {
                slea.skip(4);
                final short pos = slea.readShort();
                final int itemid = slea.readInt();
                c.getPlayer().resetStats(4, 4, 4, 4);
                c.getPlayer().dropMessage(5, "AP 리셋이 완료되었습니다..");
                c.send(CWvsContext.enableActions(c.getPlayer()));
                MapleInventoryManipulator.removeFromSlot(c, GameConstants.getInventoryType(itemid), pos, (short) 1, false);
                break;
            }
            case USE_ITEM_LOCK: {
                PlayerHandler.ItemSortLock(c, slea);
                break;
            }
            case ITEM_SORT_LOCK: {
                PlayerHandler.ItemSortLock(c, slea);
                break;
            }
            case HIT_ERDA_SPECTRUM: {
                PlayerHandler.HitErdaSpectrum(c, slea);
                break;
            }
            case ACT_ERDA_SPECTRUM: {
                PlayerHandler.ActErdaSpectrum(c, slea);
                break;
            }
            case BALL_ERDA_SPECTRUM: {
                PlayerHandler.BallErdaSpectrum(c, slea);
                break;
            }

            // 작업 - 플레임 위자드 인피니티 플레임 서클 -  4
            case INFINITY_FLAME_CIRCLE: {
                PlayerHandler.InfinityFlameCircle(c, slea);
                break;
            }
            case AFTER_CANCEL2: {
                PlayerHandler.AfterCancel2(c, slea);
                break;
            }
            case SP_PORTAL_USE: {
                PlayerHandler.SpPortalUse(c, slea);
                break;
            }
            case START_QUEST: {
                final int questid = slea.readInt();
                final int npcid = slea.readInt();
                final int types = slea.readByte();
                slea.skip(4);
                c.getPlayer().setKeyValue(questid, "start", types + "");
                c.getPlayer().setKeyValue(questid, "NpcSpeech", npcid + "" + types);
                NPCScriptManager.getInstance().startQuest(c, npcid, questid);
                break;
            }
            case FREE_CHANGE_JOB: {
                PlayerHandler.JobChange(slea, c, c.getPlayer());
                break;
            }
            case ITEMMAKER_COOLDOWN: {
                c.send(CField.ItemMakerCooldown(slea.readInt(), 0));
                break;
            }
            case SUDDEN_MISSION_CLEAR: {
                /*final int[][] itemlist = {{2049153, 1}, {5062010, 10}, {5062500, 20}, {5062503, 10}, {4310012, 35}, {2049751, 1}, {2049752, 1}, {2048759, 5}, {2048757, 5}, {2048766, 3}, {5069000, 1}, {5069001, 1}, {5064000, 1}, {5064100, 1}, {2431480, 1}, {5064400, 1}, {5064400, 1}, {2433019, 1}, {2049153, 1}, {5062010, 20}, {5062500, 20}, {5062503, 10}, {4310012, 35}, {2049751, 1}, {2049752, 1}, {2048759, 5}, {2048757, 5}, {2048766, 3}, {5069000, 1}, {5069001, 1}, {5064000, 1}, {5064100, 1}, {2431480, 1}, {5064400, 1}, {5064400, 1}, {2433019, 1}, {2049153, 1}, {5062010, 20}, {5062500, 20}, {5062503, 10}, {4310012, 35}, {2049751, 1}, {2049752, 1}, {2048759, 5}, {2048757, 5}, {2048766, 3}, {5069000, 1}, {5069001, 1}, {5064000, 1}, {5064100, 1}, {2430452, 1}, {5064400, 1}, {5064400, 1}, {2433019, 1}, {4310005, 1}, {2431421, 1}, {5062009, 15}, {5068300, 1}};
                if (c.getPlayer().getKeyValue(51351, "queststat") == 3L) {
                    if (c.getQuestStatus(100825) == 2) {
                        c.getPlayer().setKeyValue(100835, "suddenMK", "1");
                        c.getPlayer().setKeyValue(100835, "state", "1");
                    }
                    c.send(CWvsContext.updateSuddenQuest((int) c.getPlayer().getKeyValue(51351, "midquestid"), false, 0L, "count=0;Quest=0;day=0;state=0;"));
                    c.getPlayer().removeKeyValue(51351);
                    final int rand = Randomizer.rand(0, itemlist.length - 1);
                    c.getPlayer().gainCabinetItemPlayer(itemlist[rand][0], itemlist[rand][1], 1, "여기 원래 무슨 문구가 들어가나요.");
                    c.getPlayer().getClient().getSession().writeAndFlush((Object) CField.EffectPacket.showNormalEffect(c.getPlayer(), 15, true));
                    c.getPlayer().getMap().broadcastMessage(c.getPlayer(), CField.EffectPacket.showNormalEffect(c.getPlayer(), 15, false), false);
                    break;
                }*/
                break;
            }
            case TYOONKITCHEN_COOK_SUC: {
                PlayersHandler.MapleTyoonKitchenSuc(slea, c);
                break;
            }
            case TYOONKITCHEN_COOK_MAKE: {
                PlayersHandler.MapleTyoonKitchenMake(slea, c);
                break;
            }
            case ICE_AURA:
                PlayerHandler.IceAura(slea, c);
                break;
            case LARA_POINT: {
                PlayerHandler.LaraPoint(c, slea);
                break;
            }
            case USE_SECOND_ATOM: {
                PlayerHandler.UseSecondAtom(c, slea);
                break;
            }
            case USE_CIRCULATOR:
            case USE_LEVEL_CIRCULATOR:
            case USE_CHAOS_CIRCULATOR: {
                InventoryHandler.UseCirculator(slea, c);
                break;
            }
            case Lotus:
                PlayerHandler.Lotus(slea, c);
                break;
            case Lotus2:
                PlayerHandler.Lotus2(slea, c);
                break;
            case TANGYOON_COOKING:
                int salt = slea.readByte();
                if (salt == 0) {
                    PlayerHandler.TangyoonCooking(slea, c);
                } else {
                    PlayerHandler.TangyoonSalt(slea, c);
                }
                break;
            case HEARTBEAT_RECV: {
                c.getSession().writeAndFlush(LoginPacket.heartBeat());
                break;
            }
            case HEARTBEAT_RECV_FIRST: {
                int recv = slea.readInt();

                c.getSession().writeAndFlush(LoginPacket.heartBeatFirst(recv));
                break;
            }
            case CODY_PRESET_RECV: {
                PlayerHandler.CodyPresetApply(slea, c);
                break;
            }
            case FLASH_MIRAGE:
                PlayerHandler.FlashMirage(slea, c);
                break;
            case BOSS_UI_ENTER: {
                BossHandler.bossUIEnter(slea, c);
                break;
            }
            case BOSS_UI_CLOSE: {
                BossHandler.bossUIClose(slea, c);
                break;
            }
            case CURSE_ENCHANT:
                PlayerHandler.CurseEnchant(slea, c);
                break;
            case CURSE_ENCHANT_SELECT:
                PlayerHandler.CurseEnchantSelect(slea, c);
                break;
            case LIE_DETECTOR:
                PlayerHandler.LieDetector(slea, c);
                break;
            case SEND_LIE_DETECTOR:
                PlayerHandler.SendLieDetector(slea, c);
                break;
            case CHARGE_SEED:
                PlayerHandler.ChargeSeed(slea, c);
                break;
            case BLESS_5TH:
                PlayerHandler.bless5th(slea, c);
                break;

            case URS_RECV:
                int test = slea.readInt();
                if (c.getPlayer().getParty() != null) {
                    for (MaplePartyCharacter chr1 : c.getPlayer().getParty().getMembers()) {
                        MapleCharacter curChar = c.getPlayer().getClient().getChannelServer().getPlayerStorage().getCharacterById(chr1.getId());
                        curChar.getStat().setHp(curChar.getStat().getCurrentMaxHp(curChar), curChar);
                        curChar.getStat().setMp(curChar.getStat().getCurrentMaxMp(curChar), curChar);
                        curChar.updateSingleStat(MapleStat.HP, curChar.getStat().getCurrentMaxMp(curChar));
                        curChar.updateSingleStat(MapleStat.MP, curChar.getStat().getCurrentMaxMp(curChar));
                    }
                }
                break;
            case DOJANG_HANDLER: {
                PlayerHandler.DojangHandler(slea, c);
                break;
            }
            case KALOS_RECV: {
                KalosPattern.KalosRecv(c, slea);
                break;
            }
            default: {
                System.out.println("[UNHANDLED] Recv [" + header.toString() + "] found");
                break;
            }
        }
    }
}
