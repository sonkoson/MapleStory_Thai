/*
	Description: 	Quest - A Bite of Hay
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 0) {
	    qm.sendNext("��... �׷�? ���ʴ� �� ���� �� ����? ������ Ȥ�� ���ݴ�. �� ������ ������ ���� ��X ���̿� ���� ������ ũ�� ���ʸ� ��������...");
	    qm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	qm.askAcceptDecline("Ȥ�� �����쵵 ��ó�� #b���� �� ��#k�� ���� ���� ���� ������? �ֺ��� #b���ʴ���#k���� ���� ������ �ñ��ϴٸ� �� �� �Կ� ��������. �� ������ �� �� �ٸ� ���̸� ���� �ָ� ���ݴ�.");
    } else if (status == 1) {
	qm.forceStartQuest();
	qm.evanTutorial("UI/tutorial/evan/12/0", 1);
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
	qm.sendNext("Oh, I'm so hungry! Did you find something good for me to eat, master? Hmm... This looks like...grass. Can I really eat this? Okay master, I'll trust you.");
    } else if (status == 1) {
	qm.sendOk("Okay, here goes!");
    } else if (status == 2) {
	qm.gainExp(800);
	qm.gainItem(4032452, -3);
	qm.sendOk("Yuck! What is this? It's bitter and tought! Are you sure this is edible? Master, you eat it! I can't eat this! Find me something else!");
	qm.forceCompleteQuest();
	qm.dispose();
    }
}