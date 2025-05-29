/*
	NPC Name: 		Cygnus
	Description: 		Quest - Encounter with the Young Queen
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	qm.dispose();
	return;
    }
    if (status == 0) {
	qm.sendNext("�ȳ��ϼ���. �������. ���� ������ ����� ���� ������ ��Ȳ��\n\r �ϴ�. ���� ������κ��� �̰��� ���ѳ����� �� ���� ������ �ʿ�\n\r ������. �׸��� �� ���µ��� �� ������ ���� ���� ������� ���� ���谡 ��δԵ�� �Բ� ���� ������� �߽��ϴ�. ���谡 ���� �� ������ �ñ��� ���谡�� ����� �Ǿ����ϴ�.");
    } else if (status == 1) {
	qm.sendYesNo("�ñ��� ���谡�� �¾�� ���� 50������ ���ϸ�, Ư���� ��ų��\n\r ������ �¾�� �˴ϴ�. ���, ���� �ñ��� ���谡�� �¾��\n\r �ðڽ��ϱ�?");
    } else if (status == 2) {
	if (!qm.getClient().canMakeCharacter(qm.getPlayer().getWorld())) {
	    qm.sendOk("�������.. ĳ����â�� �����մϴ�.. �ٽ� ��ȭ�� �ɾ��ּ���..");
	} else {
	    qm.sendUltimateExplorer();
	}
	qm.dispose();
    }
}

function end(mode, type, selection) {
}