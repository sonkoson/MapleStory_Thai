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
	    qm.sendNext("No, Aran... There's no point of leaving here if we're to just leave the kid here all by himself. I know it's a lot to ask... but please reconsider!");
	    qm.dispose();
	    return;
	}
	status--
    }
    if (status == 0) {
	qm.askAcceptDecline("�̷�! ���� �� ���� ���� ������ ����̿���! ���̸� �ΰ� �츮�鸸 ����ĥ ���� �����! �ƶ� .. �̾������� ���̸� ���Ϸ� �� �ּ��� ! �λ���� ���� ��Ų� �̷� ���� �ؼ��� �� �Ǵ� �� �˰� ������ .. ��Źۿ� �����.");
    } else if (status == 1) {
	qm.forceStartQuest(21000, "..w?PGAE."); // Idk what data lol..
	qm.forceStartQuest(21000, "..w?PGAE."); // Twice, intended..
	qm.sendNext("#b���̴� �Ƹ��� �� ���� ���� �����ſ���#k! ���� �����簡 �̰��� �˾Ƴ��� ���� ���ָ� ��߽��Ѿ� �ϴ� ���ѷ��� ���̸� ������ �ּž� �ؿ�!");
    } else if (status == 1) {
	qm.sendNextPrev("The most important thing right now is not to panic, Aran. If you want to see how far you've gone with your quest, press #bQ#k to open the quest window.");
    } else if (status == 2) {
	qm.sendNextPrev("��Ź�ؿ�, �ƶ�! ���̸� ���� �ּ���! ���̻� ���� �����翡�� ������ �����Ű�� ���� �ʾƿ�!");
    } else if (status == 3) {
	qm.AranTutInstructionalBubble("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow1");
	qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}