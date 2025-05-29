
import java.io.File;


public class FindQuestAPI {

    private static String path = "E:\\Development\\Source\\Java\\391\\wz\\Quest.wz\\QuestData";
    
    public static void main(String[] args) {
        File dir = new File(path);
        File[] files = dir.listFiles();
        
        int size = files.length;
        
        String result = "";
        
        for (int i = 0; i < size; i++) {
            if (i != (size - 1)) {
                result += files[i].getName().split(".img")[0] + ", ";
            } else {
                result += files[i].getName().split(".img")[0];
            }
        }
        
        System.out.println(result);
    }
}
