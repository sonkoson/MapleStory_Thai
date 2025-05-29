/*
	Description: 	Quest - A Bite of Pork
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 2) {
	    qm.sendNext("�¾ �� �� ������ ���� ���� ����ٴ�, �̰� ���ħ�ؾ�! �쿡��~");
	    qm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	qm.sendNext("�̷� �� ���� �� ���ִ� �� ����? Ǯ�� ������ �� �¾�, �� ���簡 ���� �� �ʿ���, ������!");
    } else if (status == 1) {
	qm.sendNextPrevS("#b��... ä���� ���� �ž�? �巡���̴ϱ� ���� ������ �����ϴ� ������ �𸣰ڳ�. �׷� ������� ���� �� �� ��?#k", 2);
    } else if (status == 2) {
	qm.askAcceptDecline("������Ⱑ ���� �𸣰ھ�~ ������ ���ִ� �Ŷ�� ���� ����. �� �ƹ��ų� ������~ Ǯ�� ����!");
    } else if (status == 3) {
	qm.forceStartQuest();
	qm.sendOkS("#b(�׷� �̸����� ������⸦ �ֵ��� ����. ���忡 �ִ� �������� �� ������ ������ �ȴ�. �� 10���� ���ϸ� �ǰ���?)#k", 2);
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
	qm.sendOk("����, ���ο� ���� �� ���ؿ� �ž�? �̰� �ٷ� �����Ͱ� ���ϴ� �������? ��� �� �� �Ծ��? �ƾ�~.");
    } else if (status == 1) {
	qm.gainExp(980);
	qm.gainItem(4032453, -10);
	qm.sendNext("(�칰�칰, �ܲ�)");
	qm.forceCompleteQuest();
    } else if (status == 2) {
	qm.sendPrev("��... �̰� ���� ������ ������ �ʹ� ����. ��ȭ�� �� �� �� ����. �����Դ� �� �¾�");
	qm.dispose();
    }
}