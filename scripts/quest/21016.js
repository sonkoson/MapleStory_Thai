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
	    qm.sendNext("Are you not ready to hunt the #o0100132#s yet? Always proceed if and only if you are fully ready. There''s nothing worse than engaging in battles without sufficient preparation.");
	    qm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	qm.askAcceptDecline("�׷� ����ؼ� ���� ü�� �ܷ��� �ұ��? �غ�� �Ǽ̾��?\n\r ���� ����� ��� �ϼ̴��� ��ų�� ������ �����Կ� �÷� ��\n\r ������ �ٽ� �� �� Ȯ���Ͻ� �� ������ �ּ���.");
    } else if (status == 1) {
	qm.forceStartQuest();
	qm.AranTutInstructionalBubble("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow3");
	qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}
