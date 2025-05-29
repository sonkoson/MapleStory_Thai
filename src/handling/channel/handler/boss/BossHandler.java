package handling.channel.handler.boss;

import client.MapleCharacter;
import client.MapleClient;
import java.awt.Point;
import java.util.ArrayList;
import scripting.NPCScriptManager;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import tools.Pair;
import tools.data.LittleEndianAccessor;
import tools.packet.CWvsContext;

public class BossHandler {

    public static void bossUIEnter(LittleEndianAccessor lea, MapleClient c) {
        boolean debug = true; // 기존 true
        
        if (c.getPlayer().getParty() == null) {
            c.getPlayer().dropMessage(1, "파티가 존재하지 않습니다.");
            return;
        }

        if (!c.getPlayer().isLeader()) {
            c.getPlayer().dropMessage(1, "파티장이 아니면 입장할 수 없습니다.");
            return;
        }

        int bossNumber = lea.readByte();

        lea.skip(5);

        int bossDifficulty = lea.readByte();

        lea.skip(5);

        boolean isReactorBoss = false;

        long screenDuration = -1L;

        int mapId = -1;
        int minute = -1;
        byte deathCount = -1;
        int bossId = -1;
        Point pos = null;
        ArrayList<Pair<Integer, Point>> bonusMonsterIdAndPositions = new ArrayList<>();

        /*
            이지 : 0
            노멀 : 1
            하드 : 2
            카오스 : 3
            익스트림 : 4
         */
        switch (bossNumber) {
            case 0: { // 발록
                if (bossDifficulty == 0) { // 이지
                }
                break;
            }
            case 1: { // 자쿰
                if (bossDifficulty == 0) { // 이지
            c.getSession().writeAndFlush(CWvsContext.serverNotice(1, "", "현재 이지 자쿰은 점검 중 입니다."));
                } else if (bossDifficulty == 1) { // 노멀
            c.removeClickedNPC();

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 2030008, "Zakum051");
                } else if (bossDifficulty == 3) { // 카오스
            c.removeClickedNPC();

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 2030008, "Zakum05");
                }
                break;
            }
            case 2: { // 혼테일
                if (bossDifficulty == 0) { // 이지
                } else if (bossDifficulty == 1) { // 노멀
                } else if (bossDifficulty == 3) { // 카오스
                }
                break;
            }
            case 3: { // 힐라
                if (bossDifficulty == 1) { // 노멀

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 2184000, "2184000");
                } else if (bossDifficulty == 2) { // 하드

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 2184001, "2184001");
                            }
                break;
            }
            case 4: { // 피에르
                if (bossDifficulty == 1) { // 노멀

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 2184001, "1064012");
                } else if (bossDifficulty == 3) { // 카오스

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 2184001, "1064012a");
                }
                break;
            }
            case 5: { // 반반
                if (bossDifficulty == 1) { // 노멀

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 2184001, "1064013");
                } else if (bossDifficulty == 3) { // 카오스

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 2184001, "1064013a");
                }
                break;
            }
            case 6: { // 블러디 퀸
                if (bossDifficulty == 1) { // 노멀

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 9040009, "1064014a");
                } else if (bossDifficulty == 3) { // 카오스

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 9040009, "1064014");
                }
                break;
            }
            case 7: { // 벨룸
                if (bossDifficulty == 1) { // 노멀

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 9040009, "1064015");
                } else if (bossDifficulty == 3) { // 카오스

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 9040009, "1064015a");
                }
                break;
            }
            case 8: { // 반 레온
                if (bossDifficulty == 0) { // 이지

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 2159310, "von_in");
                    pos = new Point(-3, -181);
                } else if (bossDifficulty == 1) { // 노멀

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 2159310, "von_in1");
                    pos = new Point(-3, -181);
                } else if (bossDifficulty == 2) { // 하드

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 2159310, "von_in2");
                }
                break;
            }
            case 9: { // 아카이럼
                if (bossDifficulty == 0) { // 이지

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 3003405, "ark_in");
                } else if (bossDifficulty == 1) { // 노멀

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 3003405, "ark_in1");
                }
                break;
            }
            case 10: { // 매그너스
                if (bossDifficulty == 0) { // 이지

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 3000173, "magnus_in");
                } else if (bossDifficulty == 1) { // 노멀

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 3000173, "magnus_in1");
                } else if (bossDifficulty == 2) { // 하드

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 3000173, "magnus_in2");
                }
                break;
            }
            case 11: { // 핑크빈
                if (bossDifficulty == 1) { // 노멀


                } else if (bossDifficulty == 3) { // 카오스

                }
                break;
            }
            case 12: { // 시그너스
                if (bossDifficulty == 0) { // 이지

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 1540556, "in_cygnus1");
                } else if (bossDifficulty == 1) { // 노멀

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 1540556, "in_cygnus");
                }
                break;
            }
            case 13: { // 스우 (몹 코드, 좌표 못받음)
                screenDuration = 9000L;

                if (bossDifficulty == 1) { // 노멀

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 9075000, "blackHeaven_boss");
                } else if (bossDifficulty == 2) { // 하드

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 9075000, "blackHeaven_boss1");
                } else if (bossDifficulty == 4) { // 익스트림
            c.getSession().writeAndFlush(CWvsContext.serverNotice(1, "", "현재 익스트림 스우는 점검 중 입니다."));
                }
                break;
            }
            case 15: { // 데미안
                screenDuration = 9000L;

                if (bossDifficulty == 1) { // 노멀

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 1540809, "fallenWT_boss");
                } else if (bossDifficulty == 2) { // 하드

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 1540809, "fallenWT_boss1");
                }
                break;
            }
            case 19: { // 루시드
                screenDuration = 9000L;

                if (bossDifficulty == 0) { // 이지

                } else if (bossDifficulty == 1) { // 노멀

                } else if (bossDifficulty == 2) { // 하드

                }
                break;
            }
            case 21: { // 카웅
                if (bossDifficulty == 1) { // 노멀

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 2184001, "2184001");
                }
                break;
            }
            case 22: { // 파풀라투스 (좌표 안맞는 듯 ?)
                isReactorBoss = true;

                if (bossDifficulty == 0) { // 이지

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 2041024, "Populatus00");
                    pos = new Point(1, 179);
                } else if (bossDifficulty == 1) { // 노멀

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 2041024, "Populatus01");
                } else if (bossDifficulty == 3) { // 카오스

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 2041024, "Populatus02");
                }
                break;
            }
            case 23: { // 윌
                screenDuration = 6000L;
                if (bossDifficulty == 0) { // 이지
                } else if (bossDifficulty == 1) { // 노멀
                } else if (bossDifficulty == 2) { // 하드
                }
                break;
            }
            case 24: { // 진 힐라
                screenDuration = 15000L;

                if (bossDifficulty == 1) { // 노멀

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 3005305, "jinHillah_enter");
                } else if (bossDifficulty == 2) { // 하드

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 3005305, "jinHillah_enter1");
                }
                break;
            }
            case 25: { // 검은 마법사
                screenDuration = 6000L;

                if (bossDifficulty == 2) { // 하드

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 2550000, "bossBlackMage_pt");
                } else if (bossDifficulty == 4) { // 익스트림

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 2550000, "bossBlackMage_pt1");
                }
                break;
            }
            case 26: { // 더스크
                if (bossDifficulty == 1) { // 노멀

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 2159442, "dusk_enter");
                } else if (bossDifficulty == 3) { // 카오스

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 2159442, "dusk_enter2");
                }
                break;
            }
            case 27: { // 듄켈
                if (bossDifficulty == 1) { // 노멀

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 2570110, "dunkel_enter");
                } else if (bossDifficulty == 2) { // 하드

            c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
            NPCScriptManager.getInstance().start(c, 2570110, "dunkel_enter2");
                }
                break;
            }
            case 28: { // 선택받은 세렌
                screenDuration = 12000L;

                if (bossDifficulty == 1) { // 노멀

                } else if (bossDifficulty == 2) { // 하드

                } else if (bossDifficulty == 4) { // 익스트림

                }
                break;
            }
            case 29: { // 가디언 엔젤 슬라임
                screenDuration = 6000L;

                if (bossDifficulty == 1) { // 노멀

                } else if (bossDifficulty == 3) { // 카오스

                }
                break;
            }
            case 30: { // 감시자 칼로스 (몹 코드 못받음)
                screenDuration = 6500L;

                if (bossDifficulty == 0) { // 이지

                } else if (bossDifficulty == 1) { // 노멀

                } else if (bossDifficulty == 3) { // 카오스

                } else if (bossDifficulty == 4) { // 익스트림

                }
                break;
            }
            case 31: { // 카링 (좌표 못 받음)
                screenDuration = 7500L;

                if (bossDifficulty == 0) { // 이지

                } else if (bossDifficulty == 1) { // 노멀

                } else if (bossDifficulty == 3) { // 카오스

                } else if (bossDifficulty == 4) { // 익스트림

                }
                break;
            }
        }

        if (c.getChannelServer().getMapFactory().getMap(mapId) != null) {
            if (c.getChannelServer().getMapFactory().getMap(mapId).getCharactersSize() > 0) {
                c.getPlayer().dropMessage(1, "이미 누군가가 도전 중 입니다.");
                return;
            }
        }

        if (mapId != -1 && minute != -1 && deathCount != -1 && bossId != -1 && pos != null && bonusMonsterIdAndPositions != null) {
            for (MapleCharacter member : c.getPlayer().getPartyMembers()) {
                if (member != null) {
                    member.bossTimeMoveMap(bossNumber, isReactorBoss, screenDuration, mapId, minute, deathCount, bossId, pos, bonusMonsterIdAndPositions);
                }
            }
        }
    }

    public static void bossInit(MapleClient c) {
        switch (c.getPlayer().getMap().getId()) { // 개별 처리
            case 410006020: { // 칼로스 1 페이즈 (카로테 : 카로테 마천루)
                MapleMonster monster = MapleLifeFactory.getMonster(8881010); // 칼로스 1 페이즈
                MapleMonster subMonster = MapleLifeFactory.getMonster(8881011);

                c.getPlayer().getMap().killMonster(monster.getId());
                c.getPlayer().getMap().killMonster(subMonster.getId());

                c.getPlayer().getMap().spawnMonsterOnGroundBelow(monster, new Point(462, 398));
                c.getPlayer().getMap().spawnMonsterOnGroundBelow(subMonster, new Point(462, 398));

                c.getPlayer().getParty().kalosPattern = new KalosPattern(monster);
                c.getPlayer().getParty().kalosPattern.kalosEnter();
            }

            break;
        }
    }

    public static void bossUIClose(LittleEndianAccessor lea, MapleClient c) {
        c.getSession().writeAndFlush(CWvsContext.enableActions(c.getPlayer()));
    }
}
