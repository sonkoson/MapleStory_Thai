var status = -1;

function start(mode, type, selection) {
    status++;
	if (mode != 1) {
	    if(type == 1 && mode == 0)
		    status -= 2;
		else{
			qm.sendNext("��... ��Ÿ��� �� ���� ��Ź�� ������� �ٵ�.");
			qm.dispose();
			return;
		}
	}
	if (status == 0)
		qm.sendNext("����� ��� ������ �������� �� �̻��ϴܴ�. ���� ȭ�� ���ų� ¥���� �θ��� ���� ����. �װ� �����ż� ���õ� ���� ���ͺôµ�, �ƴϳ� �ٸ��� ������ �� �� ������ ��� ��Ÿ���� �հ� ������ ���ĳ��� ����̱���.");
	else if (status == 1)
		qm.sendAcceptDecline("�������� ã�ƿ��� ���� �ϴ� ������ ��Ÿ������ ���ĳ��� ���� �ʰڴ�? ������ �׷��� ���� ������ �� �ƴ϶� �����丷�� �� �� ������ ��ĥ �� ���� �� ������. ������ #b�����丷�� 3��#k�� ���ش� �ָ� ���� �ٵ�...");
	else if (status == 2){
		qm.forceStartQuest();
		qm.sendNext("��, ���� ������. #b�����丷#k�� �ֺ��� �ִ� #r������#k�鿡�� ���� �� �ִܴ�. ���� ���� �༮���� �ƴ����� Ȥ�ö� ����ϴ� ������ ������ �� ���� ������ ��ų�� �������� �� ����ϵ��� �Ϸ�.");
	}else if (status == 3){
		qm.evanTutorial("UI/tutorial/evan/6/0", 1);
		qm.dispose();
	}
}

function end(mode, type, selection) {
    status++;
	if (mode != 1) {
	    if(type == 1 && mode == 0)
		    status -= 2;
		else{
		    qm.dispose();
			return;
		}
	}
	if (status == 0)
			qm.sendNext("��, �����丷�� �� ���ؿ°Ŵ�? ���ϱ���. �׷� ������ ���ָ� �ɱ�... ����, �װ� �־���. \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#i3010097#  #t3010097# 1�� \r\n#i2022621#  #t2022621# 15�� \r\n#i2022622#  #t2022622# 15�� \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 210 exp");
	if (status == 1){
		qm.forceCompleteQuest();
		qm.gainItem(4032498, -3);
		qm.gainItem(3010097, 1);
		qm.gainItem(2022621, 15);
		qm.gainItem(2022622, 15);
		qm.gainExp(210);
		qm.sendNextPrev("��, ��Ÿ���� ����� ���� ���ڷ� ���� �� ���ڶ���. ����� �׷��� ưư�ؼ� ������ �ž�. �� ����.");
		}
	if(status == 2){
		qm.evanTutorial("UI/tutorial/evan/7/0", 1);
		qm.dispose();
	}
}