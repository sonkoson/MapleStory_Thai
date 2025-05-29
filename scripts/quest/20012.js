/*
	NPC Name: 		Kinu
	Description: 		Quest - Cygnus tutorial helper
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 2) {
	    qm.sendNext("X");
	    qm.safeDispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	qm.sendNext("��ٸ��� �־����ϴ�. #h0# �� �� �̸��� #p1102006#. ���� �� ��° �Դϴ�. �Ϲݰ��ݿ� ���� ���̴ٰ��? �׷� ���� �ܰ�� �翬�� �����ϰ� ��ð���? �ٷ� #b��ų#k�Դϴ�. ������ ���忡���� ��ų������ ���� �߿��ϴ�ϴ�.");
    } else if (status == 1) {
	qm.sendNextPrev("�������� �ϸ� ��ų ����Ʈ�� ���� �� �ֽ��ϴ�. ��ſ��Ե� ���\n\r ���� ��ų ����Ʈ�� ���� �ٵ���, #bK Ű#k�� ���� ��ųâ���� ���ϴ�\n\r ��ų�� ������ ��ų ����Ʈ�� �����Ͽ� ��ų�� �÷� ������. �̷�\n\r �� �ø� #b��ų�� �����Կ� �÷� ������ �ξ� ����ϱ� ���մϴ�.#k");
    } else if (status == 2) {
	qm.askAcceptDecline("��, �׷� ��Ա� ���� �ٷ� ���������Դϴ�. �� �ֺ����� #o100121#����\n\r ���� �ִµ���, #b������ ������ ��ų�� �����#k #r#o100121##k #r3����#k�� ���\n\r �� �� �� ���ŷ� #b#t4000483##k�� 1�� ������ �ּ���. �׷� ��ٸ���\n\r ���ϴ�.");
    } else if (status == 3) {
	qm.forceStartQuest();
	qm.summonMsg(8);
	qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	status--;
    }
    if (status == 0) {
	qm.sendNext("#o100121#�� ��ġ�ϰ� #t4000483#�� �������̱���. �Ǹ��մϴ�. #b����\n\r ���� ��簡 �Ǹ� �������� �� ������ ��ų ����Ʈ�� 3��#k ������\n\r �� �ֽ��ϴ�. �׷�, ȭ��ǥ�� ���� �������� �޿� ���� ���� �ܰ�\n\r �� ����ϰ� �ִ� #b#p1102007##k�� ������ �� ���� �̴ϴ�. \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#fUI/UIWindow.img/QuestIcon/8/0# 40 exp");
    } else if (status == 1) {
	qm.gainItem(4000483, -1);
	qm.forceCompleteQuest();
	qm.gainExp(40);
	qm.dispose();
    }
}