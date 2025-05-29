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
	if (status == 1) {
	    qm.sendNext("I'm sure it will come in handy during your journey. Please, don't decline my offer.");
	    qm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	qm.sendSimple("��, ������.. ��, ���� �˰� �;����.  \r\n#b#L0#(���ݾ��ϴ� �� ����.)#l");
    } else if (status == 1) {
	qm.askAcceptDecline("����, ���� �������� �������� ������ �����ϰ� ���� �� �־�\n\r �µ�.. ������ ������ �ٻڽ� �� ������.. �� ������ ������\n\r �� �޾��ֽðھ��?");
    } else if (status == 2) {
	qm.forceStartQuest();
	qm.sendNextS("������ ���� �� �ֺ��� �ִ� ���� �ȿ� �־� �ξ����. ��\n\r �ŷ���ð����� ���ڸ� �μ� �� �� �ȿ��� ����� #b#t4032309##k�� #b#t4032310##k�� ������ �ּ���. �׷� �ٷ� �����ؼ� �帱�Կ�.", 1);
    } else if (status == 3) {
	qm.summonMsg(18);
	qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 0) {
	    qm.sendNext("What? You don't want the potion?");
	    qm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	qm.sendNext("��Ḧ ��� �������̱���? �׷� ��ø���, �̷��� ������\n\r ������ �ϸ�.. \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#i3010062# #t3010062# \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 95 exp");
    } else if (status == 1) {
	if (qm.getQuestStatus(21013) == 1) {
	    qm.gainItem(3010062, 1);
	    qm.gainExp(95);
	    qm.forceCompleteQuest();
	}
	qm.sendNextPrevS("��, ���� �ϼ��̿���! ����, �ƹ��� �����̶� �ǰ��� ����\n\r ���� �Ŷ�� �����ؼ� �������� �����Կ��� ���ڸ� ������\n\r �帮�� �;����.", 1);
    } else if (status == 2) {
	qm.sendNextPrevS("�����̶�� �ؼ� ������ ���� �� �ִ� �� �ƴ϶�� �����ؿ�.\n\r ������ �и� ��ġ�� ���� ���� �ְ�, ������ ���� ���� �ſ�\n\r ��. ������ �װ��� �غ��� �� �ֱ⿡ �����̶�� �Ű���?", 1);
    } else if (status == 3) {
	qm.summonMsg(19);
	qm.dispose();
    }
}