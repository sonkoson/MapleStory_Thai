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
	if (status == 2) {
	    qm.sendNext("What are you so hesitant about? You're a hero! You gotta strike while the iron is hot! Come on, let''s do this!");
	    qm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	qm.sendNext("��, �׷� ���� ������ ��������� �� �ΰ� ���� �ܰ�� �Ѿ�\n\r ����, ���� �ܰ谡 ���İ��? ��� ���� ����ݾƿ�. ���� ��\n\r ���縦 �� �濡 ��ġ�� �� ���� �����ΰ����� ������ ������\n\r �� �ſ���.");
    } else if (status == 1) {
	qm.sendNextPrev("����� ���ſ� �����̾��� �� Ȯ�������� �װž� ���� �� ��\n\r �ֱ�, ���� �������� ���ְ� �ƴϷ���. ���� �ӿ� �׷��� ����\n\r �־����� ���� ������ �� �翬���ݾƿ�? �ϴ��� �� ���� ��\n\r ���� Ǯ����߰ھ��. ��� �ϴ��İ��?");
    } else if (status == 2) {
	qm.askAcceptDecline("ü���� �����̴�! ������ ���� ü�º���! ..��� ���� �𸣼�\n\r ��? �翬�� #b���� ü�� �ܷ�#k�� �ؾ��� ..��, ������Ҿ�����\n\r �𸣽ðڱ���. �� �𸣼ŵ� �����ƿ�. ���� �غ��ø� �� ��\n\r �ϱ�. �׷� �ٷ� ���� ü�� �ܷÿ� �����?");
    } else if (status == 3) {
	qm.forceStartQuest();
	qm.AranTutInstructionalBubble("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow3");
	qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}