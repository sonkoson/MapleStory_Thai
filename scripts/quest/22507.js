var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 14) {
	    qm.sendNext("���? ����̰���? ���� �̲����� ����? ��, �ٽ� �� �� �����ϱ⸦ ������~");
	    qm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	qm.sendNext("���� �����Ϳ� �� �̾��� �ִ� �� �и���! �����Ͱ� �������� ���� ��������, ���� �������� �� ���� �� �� �ִ� �����͵� �������� ����! �װ� �ٷ� �츮�� ����̾�! ���� �����Ϳ� ����ϱ� �� �ߴٴϱ�!");
    } else if (status == 1) {
	qm.sendNextPrevS("#b�쿡, �׷�����... �׷��� ����ü ��� �츮�� ����ϰ� �Ȱž�??#k", 2);
    } else if (status == 2) {
	qm.sendNextPrev("��... �װ� ���� �� ����. �� ���¿��� ���� �� ����� �� ���ŵ�. �� �� ���� ��ó�� ���ǲ�ϰ� ��ﳪ. �Ȱ� �� ������ �����Ͱ� �� ������ �ɾ���� �־���. �׸��� �� ���� ��¦ �����. �� �����͸� �ҷ���.");
    } else if (status == 3) {
	qm.sendNextPrevS("#b(��, �װ� �� ���ϰ� ����ѵ�? Ȥ�� �츮�� �޿��� ���� �ɱ�? Ȥ�� �� �ӿ��� �� Ŀ�ٶ� �巡���� �̸�?)#k", 2);
    } else if (status == 4) {
	qm.sendNextPrev("Master, you and I are one in spirit. I knew it the moment I saw you. That's why I wanted to make the pact with you. No one else. You had to pay the price I set, of course.");
    } else if (status == 5) {
	qm.sendNextPrevS("#b���� �� �ߴ���?#k", 2);
    } else if (status == 6) {
	qm.sendNextPrev("�� �˾������� ���� ���� ���ݾ�? �ؾ���� �ž�? �װ� ���� ���� ����� �����̾���. ���̾��� ���� ���� �� ���� ����� �����Ǹ鼭 �츮�� ��ȥ�� ����� ����.");
    } else if (status == 7) {
	qm.sendNextPrevS("#b��ȥ��... ����?", 2);
    } else if (status == 8) {
	qm.sendNextPrev("��! ������ �����Ϳ� ���� �� ���� ���� ���� �� ���̳� �ٸ� ����. �׷��� ���� �������� �����͵� ��������, �� �����Ͱ� �������� ���� �������� ����! ��������?");
    } else if (status == 9) {
	qm.sendNextPrevS("#b���� ������ ��û ����� �̾߱��� �� ������?#k", 2);
    } else if (status == 10) {
	qm.sendNextPrev("�翬�� �������! ���� ���� ������ ������ �� ����. ���������״� ���� �����ϱ� ���̾�. ���� ���Ϳ��Լ� �����ٰ�, ������! ��, ���� ������ ���� ����!");
    } else if (status == 11) {
	qm.sendNextPrevS("#b�ٵ�... ���� ��ȭ�ο� �����̶� ������ ���ʹ� ����.#k", 2);
    } else if (status == 12) {
	qm.sendNextPrev("����? �׷��� ���̾�? �װ� ��� ���µ�... �����ʹ� ���� ���� �� �� ��? ������� ���� ���Ϳ� �ο�� ������ ����ġ��, �̷� �� �� ��?");
    } else if (status == 13) {
	qm.sendNextPrevS("#b������ ������ ���µ�...#k", 2);
    } else if (status == 14) {
	qm.askAcceptDecline("����... ������ �巡�� �����Ͱ� �׷��� ��ȭ�Ӱ� �� �� �������� ����! �������� �� �Ƿ��� ������ ��ȸ�� �� �ž�! �� �� ���ϰ� ���� �����ϴ� �Ŵ�, ������?");
    } else if (status == 15) {
	qm.gainExp(810);
	qm.forceStartQuest();
	qm.sendNextS("������, �׷� �����ε� ��� �� ��Ź�Ұ�. ������.", 1);
    } else if (status == 16) {
	qm.sendNextPrevS("#b(���� ������ �巡�� �����Ͱ� �Ǿ� �̸��� �Բ� ������ �Ǿ���. �������� ������ ������ ������ �𸣰ڴ�.)#k", 3);
    } else if (status == 17) {
	qm.sendPrevS("#b(������ �ϴ� ���� �� �ɺθ��̴�. ���� �Ͻ� ������ �ִٰ� �ϼ����� �ƺ����� ������.)#k", 2);
	qm.dispose();
    }
}

function end(mode, type, selection) {
}