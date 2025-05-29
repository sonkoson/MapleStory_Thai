/*
 *
 * BTF ��α�(st_world@naver.com)
 * �缳 ���� & �Ǹſ� ���� ��ũ��Ʈ
 * �ƶ� Ʃ�丮�� �ѱ�ȭ
 *
 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 3) {
	    qm.sendNext("No no no, you don't have to say no. It's just a potion, anyway. Besides, for a hero like you, I can give you these all day! Let me know when you change your mind.");
	    qm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	qm.sendNext("��? �� ���� �� �������..? ���, ������ �ƴϽʴϱ�? �������� ������� ��¾ �Ϸ�.. ��, Ȥ�� �̺��� �����Բ��� �ƽô� ���Դϱ�? ��? �� ���� �����̶���?");
    } else if (status == 1) {
	qm.sendNextPrev("     #i4001170#");
    } else if (status == 2) {
	qm.sendNextPrev("�� ���� �ٷ� �������� ������ ���� �Ⱓ ��ٷ��� �ٷ� ��\n\r �����̽ñ���! ����, ��¾�� ô ���⿡�� ����� ���� �ƴ�\n\r �� �������..");
    } else if (status == 3) {
	qm.askAcceptDecline("�׷��� ���� �������� ���ַ� ���� �ӿ��� ���� ���� ����\n\r �輭�� �׷��� �����Բ��� ü���� �ſ� �������� �� ������.\n\r #b���� ü�� ȸ���� ������ �ϳ� �帱 �״� � ��ʽÿ�.#k.");
    } else if (status == 4) { // TODO HP set to half
	qm.sendNext("�ϴ� �޿� ����Ű�� �Ŀ� �ٽ� �̾߱� ����~");
	qm.gainItem(2000022, 1);
	qm.forceStartQuest();
    } else if (status == 5) {
	qm.sendNextPrevS("#b(������ ��� ���ô� ����? ..����� ���� �ʴµ�..)#k", 3);
    } else if (status == 6) {
	qm.summonMsg(0xE);
	qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	status--;
    }
    if (status == 0) {
	qm.sendNext("�������� ������ ������ ã�� ���� ���� �߱���������, ����\n\r �����Բ��� ��Ÿ���� ���̾�! ���� ������ Ʋ���� �ʾұ���!\n\r �����Բ����� ���� ������ �Ͻ� �̴ϴ�! �����Բ��� ��ȯ�ϼ�\n\r ���� ���� ���� ������� �η����� �ʿ� ������!");
    } else if (status == 1) {
	qm.sendNextPrev("��, �̷�. ���� �ʹ� �������� ���� ��Ƶΰ� �־�����. �ݰ�\n\r �� ������ �׸�.. �Ƹ� �ٸ� ��ϵ鵵 �ٵ� �׷� �̴ϴ�. ��\n\r �ڽ� ���� ������ ������ ���� �濡 #b�ٸ� ��� �༮�鿡�Ե�\n\r ���� �ɾ��ּ���#k. �����Բ��� ���� �ɾ� �ֽø� �ٵ� ���\n\r �̴ϴ�! \n\r #fUI/UIWindow.img/QuestIcon/4/0# \r #i2000022# #t2000022# 5 \r #i2000023# #t2000023# 5 \n\r\n\r #fUI/UIWindow.img/QuestIcon/8/0# 16 exp");
    } else if (status == 2) {
	qm.sendNextPrev("���������ϼ̱���? Ȥ�� ��ų ����Ʈ�� ȹ���ϼ����� ��\n\r �ڽ��ϴ�. ������ ���忡���� ���� 1�� �ö� ������ ��ų\n\r ����Ʈ 3�� ���� �� �ְŵ��. #bK#k �� ���� ��ųâ�� ���� Ȯ\n\r ���Ͻ� �� ���� �̴ϴ�.");
	if (qm.getQuestStatus(21010) == 1) {
	    qm.gainExp(16);
	    qm.gainItem(2000022, 5);
	    qm.gainItem(2000023, 5);
	    qm.forceCompleteQuest();
	}
    } else if (status == 3) {
	qm.sendNextPrevS("#b(�̷��Ա��� ģ���ѵ� ��ﳪ�� ���� �ƹ��͵� ����, �� ����\n\r ������ �ɱ�. �ϴ� ��ų�� Ȯ���� ����.. �ٵ� ��� Ȯ����\n\r ��?)#k");
    } else if (status == 4) {
	qm.summonMsg(0xF);
	qm.dispose();
    }
}