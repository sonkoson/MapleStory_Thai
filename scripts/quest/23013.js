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
    //if (!qm.getPlayer().isGM()) { //not available, sry
	//qm.dispose();
	//return;
    //}
    if (status == 0) {
	qm.sendYesNo("���� �ٷ� ��ī���� �ǰڽ��ϱ�?");
    } else if (status == 1) {
	qm.sendNext("����� �������׽��ϴ�. �پ��ϰ� ������, �׸�ŭ ������ ��ų�� ����� ������ �̴ϴ�. ����� �� ���ٰ��? ���� ���ʽÿ�. ����̶�� ��������� �ٷ� �� ���� �̴ϴ�.");
	if (qm.getJob() == 3000) {
	    qm.gainItem(1492014,1); //1492065 desert eagle
	    qm.expandInventory(1, 4);
	    qm.expandInventory(2, 4);
	    qm.expandInventory(4, 4);
	    qm.changeJob(3500);
	    //30001061 = capture, 30001062 = call, 30001068 = mech dash
	    qm.teachSkill(30001068,1,0);
	}
	qm.forceCompleteQuest();
    } else if (status == 2) {
	qm.sendNextPrev("��ŵ� ���� ������������ �Ͽ��Դϴ�. ������Ÿ���� ���� ���̵��� �̷��� ���� ���� �ο�� �Ǿ����ϴ�.");
    } else if (status == 3) {
	qm.sendNextPrev("�׷� ���� ������ ������ ����. �׶����� �����������μ� ������ Ȱ���ϱ� ����մϴ�.");
	qm.safeDispose();
    }
}