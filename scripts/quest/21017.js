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
	if (status == 5) {
	    qm.sendNextS("#b(You declined out of fear, but it''s not like you can run away like this. Take a big breath, calm down, and try again.)#k", 2);
	    qm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	qm.sendNextS("���� ���� ���� Ǯ���� �� ���׿�. �̷� ���߸��� ���� Ȥ��\n\r �ϰ� �ܷ��� ����� �Ϻ��� ���� ü���� ���� �Ǵ� ��. ��, ��\n\r �� ����ؼ� ���� ü�� �ܷ��� �غ���.", 8);
    } else if (status == 1) {
	qm.sendNextPrevS("�׷� �̹����� #r#o0100133#s#k�� ���� #b#m140020200##k�� ��ġ��\n\r ����. ��.. #r20����#k ���� ��ġ�ϸ� ü�� �ܷÿ� ������ �� �ſ�\n\r ��. ��, � ����.. ��? ���� �Ͻð� ���� �����̶� ����\n\r �Ű���?", 8);
    } else if (status == 2) {
	qm.sendNextPrevS("..���� ���� ���ڰ� �þ�� ���� �ʾ�?", 2);
    } else if (status == 3) {
	qm.sendNextPrevS("�þ�� �־��. ���, Ȥ�� 20�����δ� �����Ͻ� �ǰ���?\n\r �׷� �� 100������ ��ġ�� �����? �ƴ�, �ƴ���. �̿� ����\n\r �ϴ� �ǵ� �����ǿ���� ����ó�� 999���� ��� ������..", 8);
    } else if (status == 4) {
	qm.sendNextPrevS("��, �ƴ�. �̴�ε� ����ϴ�.", 2);
    } else if (status == 5) {
	qm.askAcceptDecline("��Ӿ��, �׷��� ����Ͻ� �� �����. ���� �������� ������\n\r �������� �����̶�� ��ںС����� �˰� �ִ� �ɿ�. ���� ��\n\r ������ ����Ͻôٴ�..");
    } else if (status == 6) {
	qm.forceStartQuest();
	qm.sendNextS('#b(�� �̻� ��� �ִٰ��� ���� 999���� ��ġ�� �ϰ� �� �� ���� ��\n\r ���� ���ȴ�..)#k', 2);
    } else if (status == 7) {
	qm.sendNextPrevS('�׷� #o0100133# 20���� ��ġ�� ��Ź �帱�Կ�.', 8);
    } else if (status == 8) {
	qm.AranTutInstructionalBubble("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow3");
	qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}
