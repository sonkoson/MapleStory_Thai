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
	    qm.sendNext("Oh, is 5 not enough? If you feel the need to train further, please feel free to slay more than that. If you slay all of them, I''ll just have to look the other way even if it breaks my heart, since they will have been sacrificed for a good cause...");
	    qm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	qm.sendNext("��, �׷� �̶����� ���� ü���� �� �� �׽�Ʈ �غ����� �Ұ�\n\r ��. ����� �����ؿ� �� ������ ���� ���ϰ� ������ ����.\n\r #o0100134#�� ��ġ�ϸ� �ſ� ��#r50����#k ��ġ�� �ֽø� ��������..");
    } else if (status == 1) {
	qm.askAcceptDecline("�� ���� ���� �������� �� ��ġ�� ������ �� ���°迡 ����\n\r ���� �� ������ 5������ ��ġ�ϵ��� �ҰԿ�. �ڿ��� ȯ����\n\r �����ϴ� �ܷ�! ��, �Ƹ���⵵ �ض�..");
    } else if (status == 2) {
	qm.forceStartQuest();
	qm.AranTutInstructionalBubble("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow1");
	qm.dispose();
    }
}
function end(mode, type, selection) {
    qm.dispose();
}
