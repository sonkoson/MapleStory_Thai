/*
	NPC Name: 		Cygnus
	Description: 		Quest - Encounter with the Young Queen
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 2) {
	    qm.sendNext("Hmm, there is nothing to worry about. This will be a breeze for someone your level. Muster your courage and let me know when you're ready.");
	    qm.safeDispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	qm.sendNext("��? #p1101002#�� ���´ٰ�? ����! �̾�, �̹��� ���� ���� ����\n\r �ΰ�? �ݰ���. �ݰ��� �� �̸��� #p1102000#. �ڳ� ���� ��������� ��\n\r ��ġ�� ���ñ�������. ���� �ΰ��� �Ƴ�.");
    } else if (status == 1) {
	qm.sendNextPrev("�츮�� �ǿ��� �Ҹ��� �����̾�.� ���� �翡 �ִ� #p1101001#�� ��\n\r ���� ����? �ǿ�� #p1101001#�� ���� �����̾�. �迭�� �� �ٸ�����...\n\r �������. �����꿡���� ��� ������ ���������� �ݹ� �ͼ�����\n\r �ž�.");
    } else if (status == 2) {
	qm.sendNextPrev("��, Ȥ�� �˰� �־�? �� �����꿡�� ���ʹ� ���� ����. �����\n\r ���� ���� ����� �����꿡 �ߵ� ���� �� ���ŵ�. �׷��� ��������\n\r ��. ������ #p1101001#�� ���� ȯ����� ƼƼ�� ������� �� �Ŵϱ�.");
    } else if (status == 3) {
	qm.askAcceptDecline("������ ����� ����! �׷�... �ڳ��� ������ �����ϴ�, ƼƼ��\n\r �߿����� ���� ����� ƼƼ�� ��Ƶ� �ǰڱ�. #b#m130010100##k�� �ִ�\n\r #r#o100122##k #r15 ����#k ������ ��� �ϰڴ°�? ������ ��Ż�� Ÿ�� #b������\n\r ��2#k�� ���� ����ϵ��� �ϰ�.");
    } else if (status == 4) {
	qm.summonMsg(12);
	qm.forceStartQuest(20020);
	qm.forceCompleteQuest(20100);
	qm.forceStartQuest();
	qm.dispose();
    }
}

function end(mode, type, selection) {
}