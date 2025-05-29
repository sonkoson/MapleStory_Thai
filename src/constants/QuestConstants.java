package constants;

import tools.Pair;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.*;

public class QuestConstants {

    public static Map<Integer, List<Pair<Integer, Integer>>> subQuestCheck = new HashMap<>();

    public static List<Integer> blockQuest = new ArrayList<>();

    static {
        for (File f : (new File("resources\\bin\\Quest.wz\\Check_sub")).listFiles()) {
            try {
                FileInputStream setting = new FileInputStream(f);
                int qid = Integer.parseInt(f.getName().replaceAll(".info", ""));
                Properties setting_ = new Properties();
                setting_.load(setting);
                setting.close();
                String[] mobs = setting_.getProperty("mobs").split(",");
                List<Pair<Integer, Integer>> mobs_int = new ArrayList<>();
                for (String m : mobs) {
                    String[] sp = m.split("=");
                    mobs_int.add(new Pair<>(Integer.valueOf(Integer.parseInt(sp[0])), Integer.valueOf(Integer.parseInt(sp[1]))));
                }
                subQuestCheck.put(Integer.valueOf(qid), mobs_int);
            } catch (FileNotFoundException ex) {
                ex.printStackTrace();
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
    }
}
