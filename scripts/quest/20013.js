/*
	NPC Name: 		Kia
	Description: 		Quest - Cygnus tutorial helper
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 2) {
	    qm.sendNext("Hmm, was that too much to ask? Is it because you don''t know how to break Boxes? I'll tell you how if you accept my Quest. Let me know if you change your mind.");
	    qm.safeDispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	qm.sendNext("#b(�ҵ��ҵ�...)#k");
    } else if (status == 1) {
	qm.sendNextPrev("...��! ��¦�̾�! ������ ��� ���� �� �ٵ� �𸣰� �־���. �װ�\n\r #p1102006#�� ���ϴ� �� �������? �ݰ���! ���� #p1102007#��� ��. Ư���\n\r #b����#k�� ����� ����. �����꿡 �� ������� �ʿ��Ե� ���ڸ� �ϳ�\n\r ����� �� �����̾�.");
    } else if (status == 2) {
	qm.sendNextPrev("�׷���... ���ڸ� ������� ��ᰡ ���� ���ڶ�. ���ڶ�� ����\n\r �װ� ������� �� �� ����. �� �ֺ����� �������� ����ִ� ���ڵ�\n\r �� ���� �ִµ�, ���ڸ� �ν��� ���� #t4032267#�� #t4032268#�� ���� �� ����\n\r �ž�. �װ� �������� ��.");
    } else if (status == 3) {
	qm.sendNextPrev("���� ���� ���� �˾�? ���ڴ� ���͸� ������ ��ó�� ���⸦ ��\n\r �ѷ� �����ϸ� �ν��� �� �� �־�. ��, ���ʹ� ��ų�� ������ ��\n\r �������� #b���ڴ� �Ϲݰ������θ� ������ �ȴ�#k�� �� ����ؾ� ��.");
    } else if (status == 4) {
	qm.askAcceptDecline("���ڸ� ��� #b#t4032267##k�� #b#t4032268##k�� �ϳ����� ������! ��Ḹ ���̸� ��\n\r �� ���� ���ڸ� ����� �ٰ�. �׷� ��ٸ���!");
    } else if (status == 5) {
	qm.forceStartQuest();
	qm.summonMsg(9);
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
	qm.sendNext("#t4032267#�� #t4032268#�� ���ؿ� �ž�? ��� �� �� ����? ...�¾�! �̰� �ٷ�\n\r ������ ��ᰡ �Ǵ� #t4032267#�� #t4032268#�̾�! �׷� �ٷ� ���ڷ� �����\n\r �ٰ�.");
    } else if (status == 1) {
	qm.sendNextPrev("��, ����� ���ھ�. ������? #b�Ƿ��� �� ���ڿ� ������ HP�� ��\n\r �� ȸ��#k ��. �κ��丮 #b��ġâ#k�� �� ���� �״� Ȯ���� �� �Ŀ�\n\r #bŰ��#k���� ����. ȭ��ǥ�� ���� �������� ���� ���� �� �־�. \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#i3010060# #t3010060# 1�� \r\n#fUI/UIWindow.img/QuestIcon/8/0# 95 exp");
    } else if (status == 2) {
	qm.gainItem(4032267, -1);
	qm.gainItem(4032268, -1);
	qm.gainItem(3010060, 1);
	qm.forceCompleteQuest();
	qm.forceCompleteQuest(20000);
	qm.forceCompleteQuest(20001);
	qm.forceCompleteQuest(20002);
	qm.forceCompleteQuest(20015);
	qm.gainExp(95);
	qm.summonMsg(10);
	qm.dispose();
    }
}