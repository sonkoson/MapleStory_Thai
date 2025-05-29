package client;

public class MapleSkillManager {


    public static boolean isKhaliAttackSkills(int skillId) {
        switch (skillId) {

            case 154001000: // 아츠 : 크로스 컷
            case 154101000: // 아츠 : 듀얼 엣지
            case 154111002: // 아츠 : 트리블 배쉬
            case 154121000: // 아츠 : 플러리
                return true;
            default:
                return false;
        }

    }

        public static boolean isKhaliHexSkills(int skillId){
            switch (skillId) {
                case 154111006: // 헥스 : 차크람 스윔
                case 154120033: // 헥스 - 보스 킬러
                case 154120032: // 헥스 - 이그노어 가드
                case 154120031: // 헥스 - 리인포스
                case 400041082: // 헥스 : 판데모니움
                case 400041083: // 헥스 : 판데모니움
                case 154121002: // 헥스 : 차크람 퓨리
                case 154121001: // 헥스 : 차크람 스플릿
                    return true;
                default:
                    return false;
            }
        }

        public static boolean isKhaliVoydSkills (int skillId){
            switch (skillId) {
                case 154121003: // 보이드 블리츠
                case 154121009: // 보이드 러쉬
                case 154121011: // 보이드 블리츠

                    return true;
                default:
                    return false;
            }
        }

}
