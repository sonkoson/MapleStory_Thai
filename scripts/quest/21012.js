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
	if (status == 2) {
	    qm.sendNext("Hm... You don''t think that would help? Think about it. It could help, you know...");
	    qm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	qm.sendNext("������! �ȳ��ϼ���! ��? ����� ������ �� ��� �˾ҳİ��?\n\r �׾� �տ��� �� ���� �� ū ��Ҹ��� ���������� �翬�� ������.\n\r �̹� ���� �������� ���ƿ��˴ٴ� �ҹ��� ���� ������ �̴ϴ�.");
    } else if (status == 1) {
	qm.sendNextPrev("�׳�����, ��¾�� �������� ǥ���� �� �����ŵ���? ���� ��\n\r ���� �����Ű���? ��? ������ ���� �������� �𸣰ڴٰ��\n\r ? �����Բ��� ����� ������ �̴ϱ�?! �׷� ����.. ���� ��\n\r �̳� ���� �ӿ� ���� �ִ� ���ۿ��� ����̱���.");
    } else if (status == 2) {
	qm.askAcceptDecline("��, �����̽ô� ���� �ֵѷ� ���� ���� �������� ���� ����\n\r �������? #b���� ���#k�� �غ��ø� ����ϱ�?");
    } else if (status == 3) {
	qm.forceStartQuest();
	qm.sendNext("��ħ �� �ֺ��� #r#o9300383##k���� ���� ��µ�, �� #r3����#k��\n\r ��ġ�� ���ʽÿ�. ���� ���������� �𸨴ϴ�.");
    } else if (status == 4) {
	qm.sendNextPrevS("��, Ȥ�� ��ų ������ �ؾ������ �� �ƴմϱ�? #b��ų�� ��\n\r ���Կ� �÷� ������ ���ϰ� ����� �� �ֽ��ϴ�#k. ��ų�Ӹ� ��\n\r �϶� �Һ� �����۵� �ø� �� ������ �� Ȱ���Ͻʽÿ�.", 1);
    } else if (status == 5) {
	qm.summonMsg(17);
	qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 0) {
	    qm.sendNext("What? You don't want the potion?"); // ����Ʈ �Ϸ� x ���� ������ �ؼ� ��
	    qm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	qm.sendYesNo("��.. ǥ���� ���� ���� �������� �� ������ ����̳׿�.. ��\n\r ���� ���� ���ʽÿ�. ��Ե� �� �� �̴ϴ�. ��, ���� ����\n\r �� �帱 �״� ��������! \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#i2000022# 10 #t2000022# \r\n#i2000023# 10 #t2000023# \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 57 exp");
    } else if (status == 1) {
	qm.gainItem(2000022, 10);
	qm.gainItem(2000023, 10);
	qm.gainExp(57);
	qm.forceCompleteQuest();
	qm.sendOkS("#b(���� ��¥ �����̶�� �ص�.. �ƹ��� �ɷµ� ���� ������ ��\n\r �� ���� ������?)#k", 2);
	qm.dispose();
    }
}