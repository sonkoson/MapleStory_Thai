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
	if (status == 6) {
	    qm.sendNext("Oh, is 5 not enough? If you feel the need to train further, please feel free to slay more than that. If you slay all of them, I''ll just have to look the other way even if it breaks my heart, since they will have been sacrificed for a good cause...");
	    qm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	qm.sendNextS("���� ������� �ο� ������.. �׵鿡 ���� ������ ���� ����\n\r ���� �ʾƿ�. ���𼭿��� �ܿ� ������ �ټ� ���̶�� ��ϸ�\n\r ������, �ܸ� ���� �ܼ��� ���� �����. Ȥ�� ���� ��ﳪ\n\r �� �� �����Ű���?", 8);
    } else if (status == 1) {
	qm.sendNextPrevS("��ﳪ�� ���� ���� ���µ�..", 2);
    } else if (status == 2) {
	qm.sendNextPrevS("���� �׷�����. �ϱ� ���� �������� ���ְ� �׸� ȣ��ȣ����\n\r �� ����. ������ �׷��� �ص� ����� ������ Ȯ���� �̻�\n\r ���� ������ ��� ���� �� ������. ���� �������? ����\n\r �������� ���⳪ �ʵ� ��� �Ҿ�����˰�. ��, �׷��� #b����!#k", 8);
    } else if (status == 3) {
	qm.sendNextPrevS("����?", 2);
    } else if (status == 4) {
	qm.sendNextPrevS("������ ���� �ӿ��� �������� �߱��ϴٰ� ������ ���⸦ ��\n\r ���߾��. �Ƹ��� ������ ����ϴ� ������ �����Ǿ ����\n\r �߾ӿ� ������ ������. �������ٰ� ���� �����̳���?\n\r #b���� #p1201001##k��... \r\r#i4032372#\r\r�̷��� ���� �ǵ�..", 8);
    } else if (status == 5) {
	qm.sendNextPrevS("�׷��� ���� �̻��� ������ �Ŵ��� ������ ������ �־���.", 2);
    } else if (status == 6) {
	qm.askAcceptDecline("��, �ٷ� �װſ���. ��Ͽ� ���ϸ� ������ ����� ������ ��\n\r �ƺ��ٰ� �ؿ�. ���� ����� #p1201001#�� ����ϴ� ������\n\r ���, #p1201001#�� ������� ���� ������ �� �ſ���. �\n\r ���� #b#p1201001#�� Ŭ���� �ּ���.#k");
    } else if (status == 7) {
	if (qm.getQuestStatus(21100) == 0) {
	    qm.forceCompleteQuest();
	}
	qm.showWZEffect("Effect/Direction1.img/aranTutorial/ClickPoleArm");
	qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}
