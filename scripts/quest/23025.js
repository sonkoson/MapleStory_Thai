var status = -1;

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
	qm.sendYesNo("���� ���� ��ī������ �ŵ쳪�� �ͳ���?");
    } else if (status == 1) {
	qm.sendNext("����� �������׽��ϴ�. ���� �� �̻� ������ ����� �ƴմϴ�. �� �پ��ϰ� ������, �׸�ŭ ������ ��ų�� ����� ������ �̴ϴ�. ����� �� ���ٰ��? ���� ���ʽÿ�. ����̶�� ��������� �ٷ� �� ���� �̴ϴ�.");
	if (qm.getJob() == 3500) {
	    qm.changeJob(3510);
	}
	qm.forceCompleteQuest();
    } else if (status == 2) {
	qm.sendNextPrev("�׷� ���� ������ ������ ����. �׶����� �����������μ� ������ Ȱ���ϱ� ����մϴ�.");
	qm.safeDispose();
    }
}