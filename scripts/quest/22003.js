var status = -1;

function start(mode, type, selection) {
    status++;
	if (mode != 1) {
	    if(type == 1 && mode == 0)
		    status -= 2;
		else{
			qm.sendNext("�����ٰ� �ɺθ��� �����ϸ� �����. ��, ������? �ٽ� �� �� ���� �ɷ�.");
			qm.dispose();
			return;
		}
	}
	if (status == 0)
		qm.sendAcceptDecline("���忡 ���Ϸ� ���� #b�ƺ�#k�� �׸� ���ö��� ���� �ذ� ������ ����. �װ� #b���� �߽���#k�� ��� �ƺ����� #b���ö��� ���#k���ַ�. ������?");	
	else if (status == 1) {
		qm.forceStartQuest();
		qm.sendNext("����, ���� ������ ���� ���̶�ϱ�~ �׷� �ٷ� #b�� ������ ���� �������� �޿�#k ����. �Ƹ� ��ô �谡 ������ �״� ���ѷ� �ָ� ���ڱ���.");
	if(!qm.haveItem(4032448))
	qm.gainItem(4032448, 1);
	} else if (status == 2)
		qm.sendNextPrev("Ȥ�� ���ö��� �Ҿ������ ������ ���� ���ƿ���. �ٽ� �� ���״ϱ�.");
	 else if (status == 3){
		qm.evanTutorial("UI/tutorial/evan/5/0" , 1);
		qm.dispose();
	}
}

function end(mode, type, selection) {

}