/*
 *
 * BTF ��α�(st_world@naver.com)
 * �缳 ���� & �Ǹſ� ���� ��ũ��Ʈ
 * �ƶ� Ʃ�丮�� �ѱ�ȭ
 *
 */

function start(mode, type, selection) {
    qm.dispose();
}
var status = -1;


function end(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 4) {
	    qm.sendNext("*sniff sniff* Isn''t this sword good enough for you, just for now? I''d be so honored...");
	    qm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	if (qm.getQuestStatus(21011) == 0) {
	    qm.forceStartQuest();
	    qm.dispose();
	    return;
	}
	qm.sendNext("��, �����԰� �Բ� ��� ����� ����... ����... ���� �����̽�\n\r ����? ������! �����ٴ� ���� ���� �������� ���� Ȯ����\n\r �����ּ���! �̺��� �ٷ� ����?!");
    } else if (status == 1) {
	qm.sendNextPrev("   #i4001171#");
    } else if (status == 2) {
	qm.sendNextPrev("..�˼��մϴ�. �����ؼ� �׸� �Ҹ��� ������ ���ҳ׿�. ��½.\n\r ������ ���� �����ؼ�.. ��, ������ ��������.. �����Բ�\n\r ���� ���� ��ڽðڱ���.");
    } else if (status == 3) {
	qm.sendNextPrev("�׷���.. �����Բ����� ���⸦ �� ��� ��ô±���. ������\n\r �� �ڽŸ��� ���Ⱑ �ִ� �ɷ� �ƴµ�.. ��, ���� ������� �ο��\n\r ���� �Ҿ������ ����̱���.");
    } else if (status == 4) {
	qm.sendYesNo("����̶�� �ϱ� �ʹ� �ʶ�������, #�ϴ� �� ���̶� ��� ��\n\r �� �ּ���#k. �����Բ� �帮�� �����̿���. ������ �� ������\n\r �ٴϴ� �� �ʹ� �̻��ϴϱ��. \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#i1302000# #t1302000# \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 35 exp");
    } else if (status == 5) {
	if (qm.getQuestStatus(21011) == 1) {
	    qm.gainItem(1302000, 1);
	    qm.gainExp(35);
	}
	qm.forceCompleteQuest();
	qm.sendNextPrevS("#b(��ų�� ���� �������� �ʾҴµ�.. �˸��� �ſ� ������. ����\n\r �� �� ���� ����� �� ���� �ֱ�� �� �ɱ�? ���� ��� ��\n\r ���ϴ� ����?)#k", 3);
    } else if (status == 6) {
	qm.summonMsg(16); // How to equip shiet
	qm.dispose();
    }
}