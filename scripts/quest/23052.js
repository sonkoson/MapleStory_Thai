var status = -1;

function start(mode, type, selection) {
    if (mode == 0) {
	if (status == 0) {
	    qm.sendNext("This is an important decision to make.");
	    qm.safeDispose();
	    return;
	}
	status--;
    } else {
	status++;
    }
    if (status == 0) {
	qm.sendYesNo("��Ʋ�������� �ְ�ܰ迡 �ٰ����� ���ϳ�?");
    } else if (status == 1) {
	qm.sendNext("�� �������׾�. ���ÿ� ���� �˰� �ִ�, ������ �Ϻ��� �ٷ����� ���� �ְ��� ��ų���� ��������. ���� �ϼ����� ���� �͵������� �ʶ�� �س� �� ���� �Ŷ�� �Ͼ�. ���� �� ���� �ְھ�? �츮 ���������� �ְ��� �Ƿ����ε� ���̾�!");
	if (qm.getJob() == 3211) {
	    qm.changeJob(3212);
	    qm.forceCompleteQuest();
	}
    } else if (status == 2) {
	qm.sendNextPrev("�̰ɷ� �� ������ �������ΰ�... �ƴ� �׷����� ����. �̷��ĵ� �� �� ������ �����������ΰ�. ������ �װ� ������ ��������, �׷��� ������ ���� ������ ������? �׷���... ���� ������ ���� ���� ������ �� �� ���� ����������. �׶����� �����������μ� ������ Ȱ���ϱ� �������.");
	qm.safeDispose();
    }
}

function end(mode, type, selection) {
    if (mode == 0) {
	if (status == 0) {
	    qm.sendNext("This is an important decision to make.");
	    qm.safeDispose();
	    return;
	}
	status--;
    } else {
	status++;
    }
    if (status == 0) {
	qm.sendYesNo("��Ʋ�������� �ְ�ܰ迡 �ٰ����� ���ϳ�?");
    } else if (status == 1) {
	qm.sendNext("�� �������׾�. ���ÿ� ���� �˰� �ִ�, ������ �Ϻ��� �ٷ����� ���� �ְ��� ��ų���� ��������. ���� �ϼ����� ���� �͵������� �ʶ�� �س� �� ���� �Ŷ�� �Ͼ�. ���� �� ���� �ְھ�? �츮 ���������� �ְ��� �Ƿ����ε� ���̾�!");
	if (qm.getJob() == 3211) {
	    qm.changeJob(3212);
	    qm.forceCompleteQuest();
	}
    } else if (status == 2) {
	qm.sendNextPrev("�̰ɷ� �� ������ �������ΰ�... �ƴ� �׷����� ����. �̷��ĵ� �� �� ������ �����������ΰ�. ������ �װ� ������ ��������, �׷��� ������ ���� ������ ������? �׷���... ���� ������ ���� ���� ������ �� �� ���� ����������. �׶����� �����������μ� ������ Ȱ���ϱ� �������.");
	qm.safeDispose();
    }
}