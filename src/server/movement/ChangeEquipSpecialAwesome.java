package server.movement;

import tools.data.MaplePacketLittleEndianWriter;

import java.awt.*;

public class ChangeEquipSpecialAwesome implements LifeMovementFragment {

    private final int type;

    private final int wui;

    public ChangeEquipSpecialAwesome(int type, int wui) {
        this.type = type;
        this.wui = wui;
    }

    public void serialize(MaplePacketLittleEndianWriter packet) {
        //System.out.println("ChangeEquipSpecialAwesome");
        packet.write(this.type);
        packet.write(this.wui);
    }

    public Point getPosition() {
        return new Point(0, 0);
    }
}
