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
	qm.sendYesNo("���� ������ ��Ʋ�������� �ŵ쳪�� �ͳ�?");
    } else if (status == 1) {
	qm.sendNext("�� �������׾�. ���� �� �̻� ������ �װ� �ƴϾ�. �� �����ϰ� ȭ���� ��ų�� ���谡 ������ �ž�. �����̵��ϸ� ���� ������� ���İ��� ���� �����ϰ���. ���� �ʰ�����, �̳��� ���� �ְھ�? �� ����� �ӹ��� �س� ���ε� ���̾�.");
	if (qm.getJob() == 3210) {
	    qm.changeJob(3211);
	}
	qm.forceCompleteQuest();
    } else if (status == 2) {
	qm.sendNextPrev("�׷� ���� ������ ����. �׶����� �����������μ� ������ Ȱ���ϱ� �������.");
	qm.safeDispose();
    }
}