
var status = -1;

function end(mode, type, selection) {
    status++;
	if (mode != 1) {
	    if(type == 1 && mode == 0)
		    status -= 2;
		else{
			qm.sendNext("�Ⱦ�? �׷� ��¿ �� ���� ��. ��ȭ��� ���� ������ ������.");
		    qm.dispose();
			return;
		}
	}
	if (status == 0)
		qm.sendNext("��. ����. ��ȭ�⸦ ����. ��� �� �ϳ��� ����. ������ �ް��� ������ ������� �ϼ̴µ� ���� �� �߰ŵ�. ��~ �����Ƽ� ���̾�. �װ� �ް� ���Ÿ� ���ָ� ��ȭ�⸦ �ֵ��� ����. �? �� �� �ְھ�?");
	else if (status == 1) {
		qm.forceStartQuest();
                   qm.sendPrev("����. �׷� �ٷ� #b�����ʿ� �ִ� �ް���#k���Լ� �ް��� ������. �ް����� Ŭ���ϸ� �ް��� ���� �� �־�. �ʹ� ���� �������� ����ϰ� #b1��#k�� ��.");
         }else if (status == 2){
		qm.dispose();
}
	}

function end(mode, type, selection) {
    status++;
	if (mode != 1) {
	    if(type == 1 && mode == 0)
		    status -= 2;
		else{
			qm.sendNext("��? �̻��ϳ�. ��ȭ�� ��ġ�� �� �� �ƾ�. �ٽ� �� �� �õ��غ�.");
		    qm.dispose();
			return;
		}
	}
	if (status == 0)
		qm.sendNext("��, �ް��� ������ �ž�? �׷� �ް��� �ǳ���. �׷� ��ȭ�⸦ �ٰ�.");
	if (status == 1)
qm.sendAcceptDecline("��, �������. ����ü ��� ������ ������ �𸣰�����...\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 360 exp");
	if (status == 2){
		qm.forceCompleteQuest();
		qm.gainExp(360);
		if (qm.haveItem(4032451)) {
			qm.gainItem(4032451, -1);
		}
		qm.evanTutorial("UI/tutorial/evan/9/0" , 1);
		qm.dispose();
		}
	}