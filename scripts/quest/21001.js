/*
 *
 * BTF ��α�(st_world@naver.com)
 * �缳 ���� & �Ǹſ� ���� ��ũ��Ʈ
 * �ƶ� Ʃ�丮�� �ѱ�ȭ
 *
 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 0) {
	    qm.sendNext("���ƾ�! �ƶ����� �����߾�!");
	    qm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
         qm.askAcceptDecline("����.. �������� ȥ�����.. ��½.. � �ﷹ���Բ� ������ �ּ���!");
    //} else if (status == 1) {
         //qm.askAcceptDecline("����.. �������� ȥ�����.. ��½.. � �ﷹ���Բ� ������ �ּ���!");
    } else if (status == 1) {
	 if (qm.getQuestStatus(21001) == 0) {
	     qm.gainItem(4001271, 1);
	     qm.forceStartQuest(21001, null);
	}
	qm.warp(914000300, 0);
	qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 0) {
	    qm.sendNext("Where's the kid? If you brought the kid with you, hand him over to me!");
	    qm.dispose();
	    return;
	} else if (status == 8) { // watching the introduction
	    if (qm.haveItem(4001271)) {
		qm.gainItem(4001271, -1);
	    }
	    qm.MovieClipIntroUI(true);
	    qm.forceCompleteQuest();
	    qm.warp(914090010, 0);
	    qm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	qm.sendYesNo("�ƾ�, �����ϼ̱���? ���̴�? ���̴� �������̳���?");
    } else if (status == 1) {
	qm.sendNext("�����̿���.. ���� �����̴�..");
    } else if (status == 2) {
	qm.sendNextPrevS("� ���༱�� Ÿ! �� �̻� �ð��� ����!", 3);
    } else if (status == 3) {
	qm.sendNextPrev("��, �¾ƿ�. �̷� ���� �ƴ���, ���� �������� ����� ���� ��������� �־��! �ƹ����� ������ ��ġ�� �˾Ƴ� ����̿���! ���� ������� ������ ���ع����� �� �ſ���!");
    } else if (status == 4) {
	qm.sendNextPrevS("���� �����!", 3);
    } else if (status == 5) {
	qm.sendNextPrev("�ƶ�! ��ŵ� ���ֿ� Ÿ����! �ο�� ���� ����� ������ ������.. �̹� �ʾ����! �ο��� ����鿡�� �ñ�� �Բ� ���丮�� ���Ϸ���� ����!");
    } else if (status == 6) {
	qm.sendNextPrevS("�׷� �� ����!", 3);
    } else if (status == 7) {
	qm.sendNextPrevS("�ﷹ��, ����� ���� ���丮�� ���Ϸ���� ����. ���� ���� �ʰ� ���߿� �� �շ��Ұ�. �� ������ ���� ������� �ο�ھ�!", 3);
    } else if (status == 8) { // ���� �ٷ� ����
	if (qm.haveItem(4001271)) {
	    qm.gainItem(4001271, -1);
	}
        qm.MovieClipIntroUI(true);
        qm.forceCompleteQuest();
        qm.warp(914090010, 0);
        qm.dispose();
    }
}