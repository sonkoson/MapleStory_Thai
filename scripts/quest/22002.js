var status = -1;

function start(mode, type, selection) {
    status++;
	if (mode != 1) {
	    if(type == 1 && mode == 0)
		    status -= 2;
		else{
			qm.sendNext("��, ����? ��ħ�� �� ���� �����̾�? �Ļ縦 �Ÿ��� �� �� ����. ���� ������ ��� �ٽ� ���� �ɶ��. ���� �� ���ϸ� ���� �Ծ�����Ŵ�?");
			qm.dispose();
			return;
		}
	}
	if (status == 0)
		qm.sendNext("#p1013102#���� ���� �ְ� �� �ž�? �׷� ���� �ʵ� ��ħ�� �Ծ�. ���� ��ħ���� #t2022620#��. ���� ������ ���Ծ�. ����. ����� #p1013102#���� �����ֱ⸦ �� �����ָ� ��ħ�䵵 �� �ַ��� �ߴµ�.");
	else if (status == 1)
		qm.sendAcceptDecline("��, #b������ġ#k�� �� �״� #b�� ������ �������� ����#k. ���� ������ �� ���� �����ôٴµ�?");
	else if (status == 2){
		qm.forceStartQuest();
		qm.PlayerToNpc("#b(�� ��? ��·�� �ϴ� #t2022620#���� �԰� �ٽ� �� ������ ����.)#k");
		qm.gainItem(2022620, 1);
	}else if (status == 3){
		qm.evanTutorial("UI/tutorial/evan/3/0" , 1);
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
		qm.sendNext("��ħ���� �� �Ծ���, ����? �׷� ���� �ɺθ� �ϳ��� ������ ������?\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#i1003028#  #t1003028# 1��  \r\n#i2022621#  #t2022621# 5�� \r\n#i2022622#  #t2022622# 5�� \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 60 exp");
	 if (status == 1){
		qm.forceCompleteQuest();
		qm.evanTutorial("UI/tutorial/evan/4/0" , 1);
		qm.gainItem(1003028, 1);
		qm.gainItem(2022621, 5);
		qm.gainItem(2022622, 5);
		qm.gainExp(60);
		qm.dispose();
	}
}