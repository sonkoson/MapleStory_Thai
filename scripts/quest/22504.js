/*
	Description: 	Quest - Tasty Milk 1
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 2) {
	    qm.sendNext("������ ȥ�� ����� ���� ���� �� ���� �� ����. #b�����ͺ��� ������ ������ �ִ� ���#k�� ã�ƺ���!");
	    qm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	qm.sendNext("����, �ƹ����� �� �ǰھ�. �ٸ� �� �ʿ���. Ǯ�� ��⵵ �ƴ� �ٸ� ��... �� ����? �����ʹ� ������ ���̰� ������ �� �� �� �ƴϾ�?");
    } else if (status == 1) {
	qm.sendNextPrevS("#b��, �׷��� ���ص� ���� �� �𸣰ڴµ�... ���̰� ���ٰ� �� �ƴ� �� �ƴѰ�...", 2);
    } else if (status == 2) {
	qm.askAcceptDecline("�׷��� ���̰� ������ ������ �����̶� �� ���� ������ ������ ���ĵ� �� ���� �� �翬���ݾ�. ��, �׷���! �����ͺ��� �� ���� ���� ������� ����� ������ ����!");
    } else if (status == 3) {
	qm.forceStartQuest();
	qm.sendOkS("#b(�ƺ����״� �̹� �� �� ����ôµ�... �׷��� Ȥ�� �𸣴� �ٽ� �� �� �ƺ����� �����.)#k", 2);
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
	qm.sendOk("��? ������ �������� �� �Դ��� ã�� ���� �Ŵ�? ���� �� �ܵ� �� �԰� ������⵵ �� �Դ´ٰ�? ��ٷο� �༮�̱���. �� �༮���� ������ �ִ� Ư¡ ���� �� ����? ��? �� �������� ���� �Ʊ���?");
    } else if (status == 1) {
	qm.gainExp(100);
	qm.forceCompleteQuest();
	qm.dispose();
    }
}