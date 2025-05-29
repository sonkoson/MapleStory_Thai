package server.movement;

import tools.data.MaplePacketLittleEndianWriter;

import java.awt.*;

public class TunknownMovement extends AbstractLifeMovement {

    private Point offset;

    public TunknownMovement(int type, Point position, int duration, int newstate, byte unk) {
        super(type, position, duration, newstate, (short) 0, unk);
    }

    public void setOffset(Point wobble) {
        this.offset = wobble;
    }

    public void serialize(MaplePacketLittleEndianWriter packet) {
        //System.out.println("TunknownMovement");
        packet.write(getType());
        packet.writePos(getPosition());
        packet.writePos(this.offset);
        packet.write(getNewstate());
        packet.writeShort(getDuration());
        packet.write(getUnk());
    }
}
