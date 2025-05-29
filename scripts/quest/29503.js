/*
 This file is part of the OdinMS Maple Story Server
 Copyright (C) 2008 ~ 2010 Patrick Huy <patrick.huy@frz.cc> 
 Matthias Butz <matze@odinms.de>
 Jan Christian Meyer <vimes@odinms.de>
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License version 3
 as published by the Free Software Foundation. You may not use, modify
 or distribute this program under any other version of the
 GNU Affero General Public License.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.
 
 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/*
 * Quest ID : 29503
 * Quest Name : Īȣ ���� - ��ο�
 * Quest Progress Info : #b#eĪȣ ���� - ��ο�#n(Ư�� Īȣ)\n#k\n - ���� �ð� : #Qminlimit#�� #Qseclimit#��\n - ��ξ׼� : #b#jmoney##k �޼�\n\n�ſ� �ʿ� ��� ������ ��� ����� �ʱ�ȭ�ȴ�. �޸���� �ܼ��� ���� �ݾ��� ����ϴ� �͸����δ� �� Īȣ�� ������ �� �� ���ٸ� ���ٸ� ������ �������� ���� ����Ͽ���. 
 * Quest End Info : #b#eĪȣ ���� - ��ο�#n(Ư�� Īȣ)\n#k\n - ���� �ð� : #Qminlimit#�� #Qseclimit#��\n - ����� ���� : #b#jm##k\n - ��ξ׼� : #b#jmoney##k �޼�\n\n�ſ� �ʿ� ��� ������ ��� ����� �ʱ�ȭ�ȴ�. �޸���� �ܼ��� ���� �ݾ��� ����ϴ� �͸����δ� �� Īȣ�� ������ �� �� ���ٸ� ���ٸ� ������ �������� ���� ����Ͽ���. 
 * Start NPC : 9000040
 * End NPC : 9000040
 * 
 * @author T-Sun
 *
 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1 && type != 1 && type != 11) {
        status++;
    } else {
        if ((type == 1 || type == 11) && mode == 1) {
            status++;
            selection = 1;
        } else if ((type == 1 || type == 11) && mode == 0) {
            status++;
            selection = 0;
        } else {
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendSimple("� ������ ��οտ� �����Ͻðڽ��ϱ�?\r\n#b#L0# ��׽ý� ��ο�.#l\r\n#L1# �����Ͼ� ��ο�.#l\r\n#L2# �丮�� ��ο�.#l\r\n#L3# Ŀ�׽�Ƽ ��ο�.#l\r\n#L4# �����ǿ�� ��ο�.#l\r\n#L5# ��ƿ���� ��ο�.#l\r\n#L6# �����ױ� ��ο�.#l");
    } else if (status == 1) {
        selectedTown = selection;
        qm.getPlayer().updateInfoQuest(29503, "money=0");
        qm.sendNext("#v"+getMedalByMap(getMap(selectedTown))+"# #e#b#t"+getMedalByMap(getMap(selectedTown))+"##k\r\n\r\n - ���ѽð� 1�ð�\r\n - ������ �ְ���� ���\r\n\r\n#n�� ������ ������ �� �ڰ��� �ִ��� ������ ���ðڼ�?");
    } else if (status == 2) {
        qm.sendNext(qm.getMedalRanking(getTown(selectedTown)) + "\r\n\r\n�� ��ο��� ��ξ׼��� ������ �� ������ ������ �ֽÿ�. \r\n�׸��� �ſ� �ʿ� ����� �ʱ�ȭ�ȴٴ� �͵� ���� ���ÿ�.");
    } else if (status == 3) {
        qm.forceStartQuest(29503, "time_" + (qm.getCurrentTime() + 3600000));
        qm.getPlayer().updateInfoQuest(29503, "money=0;trymap=" + getMap(selectedTown));
        qm.sendOk("�׷�, ����� ���ڼ�. 1�ð� �̳��� ������ ���ƿͼ� �ɻ縦 �����ÿ�. �׸��� �� ������ �Ϸ��ϰų� �������� �ʴ� �̻� �ٸ� Īȣ�� ������ ���� ���ٴ� ���� �˾Ƶνÿ�.");
        qm.dispose();
    }
}
function end(mode, type, selection) {
    if (mode == 1 && type != 1 && type != 11) {
        status++;
    } else {
        if ((type == 1 || type == 11) && mode == 1) {
            status++;
            selection = 1;
        } else if ((type == 1 || type == 11) && mode == 0) {
            status++;
            selection = 0;
        } else {
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendSimple("�״�� " + qm.getPlayer().getOneInfo(29503, "money") + " �޼Ҹ� ����Ͽ���. ������ �Ͻðڼ�? \r\n#b#L0# ���� ��ŷ�� ���� �ͽ��ϴ�.#l\r\n#L1# ����� ���忡 �����ϰڽ��ϴ�.#l\r\n#L3# ������ �����ϰ� �ͽ��ϴ�.#l");
    } else if (status == 1) {
        if (selection == 0) {
            status = 2;
            qm.sendSimple("��� ������ ��ŷ�� ���� �ͼ�?\r\n#b\
#L4#��׽ý� ��ο�#l\r\n\
#L5#�����Ͼ� ��ο�#l\r\n\
#L6#�丮�� ��ο�#l\r\n\
#L7#Ŀ�׽�Ƽ ��ο�#l\r\n\
#L8#�����ǿ�� ��ο�#l\r\n\
#L9#��ƿ���� ��ο�#l\r\n\
#L10#�����ױ� ��ο�#l");
        } else if (selection == 3) {
            status = 3;
            qm.askAcceptDecline("�� �̻� �������� ���� �׿�? �ٸ� Īȣ ����Ʈ�� �����ϱ� ���ؼ��� �� ����Ʈ�� �����ؾ� �Ͽ���...");
        } else if (selection == 1) {

            if (qm.getPlayer().getMapId() != qm.getPlayer().getOneInfo(29503, "trymap")) {
                qm.sendOk("�״밡 ��θ� �� ������ #b#m" + qm.getPlayer().getOneInfo(29503, "trymap") + "##k�� �ɷ� �ƿ���. �� ������ ����Ϸ��� ���� �ٸ� ������ ��θ� �����Ͻÿ�. ���� �ѹ� ����� ���� �������� �� ��������...");
                qm.dispose();
                return;
            }

            if (qm.getPlayer().getOneInfo(29503, "money") < 100000) {
                qm.sendOk("���� ���� ���� ���� ����. ������ ������ ����� ��θ� �ϰ� ���ÿ�.");
                qm.dispose();
                return;
            }

            if (qm.getInvSlots(1) >= 1) {
                var s = qm.checkMedalScore(getTown(getTownNumberByMap(qm.getPlayer().getMapId())), qm.getPlayer().getOneInfo(29503, "money"));
                if (s == 0) {
                    qm.sendOk("ȣ��, ����Ͽ�. ������ ���� �ڰ��� ����ϱ���.");
                    qm.removeItemFromWorld(getMedalByMap(qm.getPlayer().getMapId()), "��ο� �ڰ��� ��Ż�Ǿ�, Īȣ�� ȸ���Ǿ����ϴ�.", false);
                    qm.gainItem(getMedalByMap(qm.getPlayer().getMapId()), 1);
                    qm.forceCompleteQuest();
                    qm.showQuestCompleteEffect();
                } else {
                    qm.sendOk("�״�� " + qm.getPlayer().getOneInfo(29503, "money") + " �޼Ҹ� ����Ͽ��׸�... ��ο��� �Ǳ⿡�� ���ڶ�±�...\r\n ��� �ְ�� �ƴ����� �״뵵 ����ϴٴ� ���� Ʋ�� ����.");
                    qm.forceCompleteQuest();
                    qm.showQuestCompleteEffect();
                }
                qm.dispose();
            } else {
                qm.sendOk("��� �κ��丮 ������ ������� Ȯ�����ֽÿ�.");
                qm.dispose();
            }
        }
    } else if (status == 3) {
        if (selection >= 4 && selection <= 10)
            qm.sendOk(qm.getMedalRanking(getTown(selection - 4)) + "\r\n\r\n�� ��ο��� ��ξ׼��� ������ �� ������ ������ �ֽÿ�. \r\n�׸��� �ſ� �ʿ� ����� �ʱ�ȭ�ȴٴ� �͵� ���� ���ÿ�.");
        qm.dispose();
    } else if (status == 4) {
        qm.forfeitQuest(29503);
        qm.dispose();
    }
}

function getTownNumberByMap(it) {
    if (it == 100000200) {
        return 0;
    } else if (it == 101000000) {
        return 1;
    } else if (it == 102000000) {
        return 2;
    } else if (it == 103000000) {
        return 3;
    } else if (it == 105040300) {
        return 4;
    } else if (it == 120000000) {
        return 5;
    } else if (it == 104000000) {
        return 6;
    }
}
function getMedalByMap(it) {
    if (it == 100000200) {
        return 1142014;
    } else if (it == 101000000) {
        return 1142015;
    } else if (it == 102000000) {
        return 1142016;
    } else if (it == 103000000) {
        return 1142017;
    } else if (it == 105040300) {
        return 1142018;
    } else if (it == 120000000) {
        return 1142019;
    } else if (it == 104000000) {
        return 1142030;
    }
}

function getTown(it) {
    if (it == 0) {
        return "HenesysDonor";
    } else if (it == 1) {
        return "ElliniaDonor";
    } else if (it == 2) {
        return "PerionDonor";
    } else if (it == 3) {
        return "KerningDonor";
    } else if (it == 4) {
        return "SleepyWoodDonor";
    } else if (it == 5) {
        return "NautilusDonor";
    } else if (it == 6) {
        return "LithDonor";
    }
}

function getMap(it) {
    if (it == 0) {
        return 100000200;
    } else if (it == 1) {
        return 101000000;
    } else if (it == 2) {
        return 102000000;
    } else if (it == 3) {
        return 103000000;
    } else if (it == 4) {
        return 105040300;
    } else if (it == 5) {
        return 120000000;
    } else if (it == 6) {
        return 104000000;
    }
}
