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
	qm.sendYesNo("���ϵ� ������ �ְ�ܰ迡 �ٰ����� ���ϳ�?");
    } else if (status == 1) {
	qm.sendNext("�� �������׾�. ���ÿ� ���� �˰� �ִ�, ������ ������ ��������� �ٷ��� ���� �ְ��� ��ų���� ��������. ���� �س��� ���� ������ �ƹ����� �ʶ�� �� �� ���� �� ���ŵ�. ��, �翬���ݾ�? �װ� �츮 ���������� �ְ��� �Ƿ����ε� ���̾�!");
	if (qm.getJob() == 3311) {
	    qm.changeJob(3312);
	    qm.forceCompleteQuest();
	}
    } else if (status == 2) {
	qm.sendNextPrev("�̰ɷ� �� ������ ������...�� �� �Ƴ�. �̷��ĵ� ���� �� �� �����ϴٰ�? �װ� ������ �������� ������, �׷��� ������ ��� �� ������ ������? �׷���...���� ������ ����. ���� ������ �� �� ���� ����������. �׶����� �����������μ� ������ Ȱ���ϱ� �������.");
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
	qm.sendYesNo("���ϵ� ������ �ְ�ܰ迡 �ٰ����� ���ϳ�?");
    } else if (status == 1) {
	qm.sendNext("�� �������׾�. ���ÿ� ���� �˰� �ִ�, ������ ������ ��������� �ٷ��� ���� �ְ��� ��ų���� ��������. ���� �س��� ���� ������ �ƹ����� �ʶ�� �� �� ���� �� ���ŵ�. ��, �翬���ݾ�? �װ� �츮 ���������� �ְ��� �Ƿ����ε� ���̾�!");
	if (qm.getJob() == 3311) {
	    qm.changeJob(3312);
	    qm.forceCompleteQuest();
	}
    } else if (status == 2) {
	qm.sendNextPrev("�̰ɷ� �� ������ ������...�� �� �Ƴ�. �̷��ĵ� ���� �� �� �����ϴٰ�? �װ� ������ �������� ������, �׷��� ������ ��� �� ������ ������? �׷���...���� ������ ����. ���� ������ �� �� ���� ����������. �׶����� �����������μ� ������ Ȱ���ϱ� �������.");
	qm.safeDispose();
    }
}