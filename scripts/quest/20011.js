var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 2) {
	    qm.sendNext("You don't want to? It's not even that hard, and you'll receive special equipment as a reward! Well, give it some thought and let me know if you change your mind.");
	    qm.safeDispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	qm.sendNext("����ϴ� ������� ���� ������ ������, ���� �������ΰ� #b�Ϲݰ�\n\r ��#k���� �����ϴ� �ž�. �տ� ���⸸ ��� �ִٸ� �������� �� ��\n\r �־�. ���� �տ� ���� �ֵθ��⸸ �ϸ� �ǰŵ�.");
    } else if (status == 1) {
	qm.sendNextPrev("#bCtrl#k Ű�� ������ �Ϲݰ����� �� �� �־�. ������#Ű���� �� ����\n\r �Ʒ�#k�� �ִµ�.. Ȥ�� ��ġ�� ������ �ʰ���? ��, �� �� Ȯ����\n\r ��.");
    } else if (status == 2) {
	qm.askAcceptDecline("Ȯ�������� �ٷ� ������ �غ��߰���? �� �ֺ����� �����꿡�� ��\n\r �� ���� #r#o100120##k�� ���� ������ �� �� ����� ������ ��. #r1����#k ���\n\r �� �Ŀ� ���ƿ��� ������ �ֵ��� �Ұ�.");
    } else if (status == 3) {
	qm.forceStartQuest();
	qm.summonMsg(4);
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
	qm.sendNext("�� #o100120#�� ������ ���� ����̳�? �? �������� ��������? ��\n\r �ݰ����� ���������� �׸�ŭ ����. ������ �� ������ ��ų�� ����\n\r ��... �װ� #p1102006#�� �˷��� �ž�. �׺��� ����Ʈ ������� �ٰ�.");
    } else if (status == 1) {
	qm.sendNextPrev("������� ����. �԰� �ִ� �ʺ��ٴ� ������ ���� �� ���� �ž�. ���⿡�� ������. ȭ��ǥ�� ���� �������� �� ���� ������ #b#p1102006##k�� �ִµ�, �� �ָ� ������ ���� ���� �����Դ� �� ���? \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#i1002869# #t1002869# 1�� \r\n#i1052177# #t1052177# 1�� \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 30 exp");
    } else if (status == 2) {
	qm.gainItem(1002869, 1);
	qm.gainItem(1052177, 1);
	qm.forceCompleteQuest();
	qm.gainExp(30);
	qm.summonMsg(6);
	qm.dispose();
    }
}