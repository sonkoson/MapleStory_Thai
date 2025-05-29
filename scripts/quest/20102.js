/*
 * Cygnus 1st Job advancement - Flame Wizard
 */

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
	qm.sendOk("���� ��ȸ���� ������ ����Ұ�!");
    } else if (status == 1) {
	qm.sendNext("���� �Ϸ�");
	if (qm.getJob() != 1200) {
	    qm.gainItem(1372043, 1);
	    qm.gainItem(1142066, 1);
	    qm.expandInventory(1, 4);
	    qm.expandInventory(4, 4);
	    qm.changeJob(1200);
	}
	qm.forceCompleteQuest();
	qm.safeDispose();
    }
}