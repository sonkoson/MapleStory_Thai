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
	qm.sendYesNo("��ī���� �ְ�ܰ迡 �ٰ����� ���ϳ���?");
    } else if (status == 1) {
	qm.sendNext("����� �������׽��ϴ�. ���ÿ� ���� ���� �� �ִ� �ְ��� �κ����� ��Ƚ��ϴ�. ���μ��� �� ������ �� ���� ����� �ٷ��� ���ϰ� �־�����... �ƹ����� ����̶�� ��¾�� �س� �͸� ������. ���������� �ְ��� ��ī�����μ� ���Դϴ�.");
	if (qm.getJob() == 3511) {
	    qm.changeJob(3512);
	    qm.forceCompleteQuest();
	}
    } else if (status == 2) {
	qm.sendNextPrev("�̰ɷ� �� ������ ��...�� �����������. ������ ���� ���� �ƴմϴ�. ����� ������ �������� ���������, �׷��� ���� ���� ���� ������ ���� �״ϱ��. �׷��� ���� ������ �˽ô�. ���� ���۵��� �� �� ���� ����������... �׶����� �����������μ� ������ Ȱ���ϱ� ����ϰڽ��ϴ�.");
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
	qm.sendYesNo("��ī���� �ְ�ܰ迡 �ٰ����� ���ϳ���?");
    } else if (status == 1) {
	qm.sendNext("����� �������׽��ϴ�. ���ÿ� ���� ���� �� �ִ� �ְ��� �κ����� ��Ƚ��ϴ�. ���μ��� �� ������ �� ���� ����� �ٷ��� ���ϰ� �־�����... �ƹ����� ����̶�� ��¾�� �س� �͸� ������. ���������� �ְ��� ��ī�����μ� ���Դϴ�.");
	if (qm.getJob() == 3511) {
	    qm.changeJob(3512);
	    qm.forceCompleteQuest();
	}
    } else if (status == 2) {
	qm.sendNextPrev("�̰ɷ� �� ������ ��...�� �����������. ������ ���� ���� �ƴմϴ�. ����� ������ �������� ���������, �׷��� ���� ���� ���� ������ ���� �״ϱ��. �׷��� ���� ������ �˽ô�. ���� ���۵��� �� �� ���� ����������... �׶����� �����������μ� ������ Ȱ���ϱ� ����ϰڽ��ϴ�.");
	qm.safeDispose();
    }
}