package client;

import java.util.ArrayList;
import java.sql.SQLException;
import java.sql.PreparedStatement;
import java.sql.Connection;
import tools.Pair;
import java.util.Map;
import java.io.Serializable;

public class MapleLinkSkillPreset implements Serializable {
    private int position;
    private int skillid;
    private int skillchar;
    private Map<Integer, Pair<Integer, Integer>> LinkSkillPreset;

    public MapleLinkSkillPreset(final int pos, final int skill, final int scharid) {
        this.position = pos;
        this.skillid = skill;
        this.skillchar = scharid;
    }

    public MapleLinkSkillPreset MapleLinkSkillPreset(final int pos, final int skill, final int scharid) {
        this.position = pos;
        this.skillid = skill;
        this.skillchar = scharid;
        return this;
    }

    public void saveToDB(final Connection connection) throws SQLException {
        try {
            final PreparedStatement lsp = connection.prepareStatement(
                    "UPDATE LinkPreset SET charid = ?,skillid = ?, skillchar = ?, preset = ? WHERE chrid = ?");
            lsp.setInt(1, 1);
            lsp.setInt(2, this.skillid);
            lsp.setInt(3, this.skillchar);
            lsp.setInt(4, this.position);
            lsp.executeUpdate();
            lsp.close();
            connection.close();
        } catch (Exception ex) {
        }
    }

    public static ArrayList<MapleLinkSkillPreset> loadFromDB(final Connection connection, final int characterId) {
        final ArrayList<MapleLinkSkillPreset> LinkSkillPreset = new ArrayList<MapleLinkSkillPreset>();
        return LinkSkillPreset;
    }

    public int getPosition() {
        return this.position;
    }

    public void setPosition(final int position) {
        this.position = position;
    }

    public int getSkillid() {
        return this.skillid;
    }

    public void setSkillid(final int skill) {
        this.skillid = skill;
    }

    public int getSkillCharid() {
        return this.skillchar;
    }

    public void setSkillCharid(final int level) {
        this.skillchar = level;
    }
}