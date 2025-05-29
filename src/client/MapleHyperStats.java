package client;

import tools.Pair;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Map;

public class MapleHyperStats implements Serializable {

    private int position;
    private int skillid;
    private int skilllevel;
    private Map<Integer, Pair<Integer, Integer>> hyperstats;

    public MapleHyperStats(int pos, int skill, int level) {
        this.position = pos;
        this.skillid = skill;
        this.skilllevel = level;
    }

    public MapleHyperStats MapleHyperStats(int pos, int skill, int level) {
        this.position = pos;
        this.skillid = skill;
        this.skilllevel = level;
        return this;
    }

    // 과부하 1
    public void saveToDB(Connection connection) throws SQLException {
        PreparedStatement hps = null;
        try {
            hps = connection.prepareStatement("UPDATE hyperstats SET chrid = ?, pos = ?, skillid = ?, skilllevel = ? WHERE chrid = ?");
            hps.setInt(1, 1);
            hps.setInt(2, position);
            hps.setInt(3, skillid);
            hps.setInt(4, skilllevel);
            hps.executeUpdate();
            hps.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (hps != null) {
                    hps.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public static ArrayList<MapleHyperStats> loadFromDB(Connection connection, int characterId) {
        ArrayList<MapleHyperStats> hyperStats = new ArrayList<MapleHyperStats>();
        try {

        } catch (Exception e) {

        } finally {

        }
        return hyperStats;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public int getSkillid() {
        return skillid;
    }

    public void setSkillid(int skill) {
        this.skillid = skill;
    }

    public int getSkillLevel() {
        return skilllevel;
    }

    public void setSkillLevel(int level) {
        this.skilllevel = level;
    }
}
