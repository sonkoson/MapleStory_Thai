package server.movement;

import tools.data.MaplePacketLittleEndianWriter;

import java.awt.*;

public class UnknownMovement3 extends AbstractLifeMovement {

    private Point pixelsPerSecond;

    private byte ForcedStop;

    private int unnow;

    public UnknownMovement3(int type, Point position, int duration, int newstate, short FH, byte unk) {
        super(type, position, duration, newstate, FH, unk);
    }

    public Point getPixelsPerSecond() {
        return this.pixelsPerSecond;
    }

    public void setPixelsPerSecond(Point wobble) {
        this.pixelsPerSecond = wobble;
    }

    public int getUnow() {
        return this.unnow;
    }

    public void setUnow(int unk) {
        this.unnow = unk;
    }

    public void serialize(MaplePacketLittleEndianWriter packet) {
        //System.out.println("UnknownMovement3");
        packet.write(getType());
        packet.writeInt(this.unnow);
        packet.write(getNewstate());
        packet.writeShort(getDuration());
        packet.write(getUnk());
    }
}
