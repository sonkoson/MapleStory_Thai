var status = -1;

function start(mode, type, selection) {
    status++;
	if (mode != 1) {
	    if(type == 1 && mode == 0)
		    status -= 2;
		else{
			qm.sendNext("��, ����. ������ ���찡 ������ �ž�? �� ������ �̷��� �������� ���̾�.");
			qm.dispose();
			return;
		}
	}
	if (status == 0)
		qm.sendAcceptDecline("�� �̻����� �ʾ�? ��� �ߵ��� ���� ���� ���ݾ�. �������� �ް��� �̰ź��� �ξ� ���� ���Ҵµ� ���� �پ��� �־�. Ȥ�� ���찡 ������ �� �����ϱ�? �׷��ٸ� �� ���� ��� ���ٵ�. �� �׷�?");
	else if (status == 1){
		qm.forceStartQuest();
		qm.sendNext("�׷���? �׷� �츮�� ���츦 ��ġ����. �װ� ���� #b�޸���#k���� ���� #r������ ���� 10����#k�� ����� ��. �׷� ���� �ڸ� ġ���� �Ұ�. ��, �׷� �� �޸������� ���~");
	} else if (status == 2){
		qm.evanTutorial("UI/tutorial/evan/10/0", 1);
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
		qm.sendNext("������ ����� ��ġ�ϰ� �� �ž�?");
	if (status == 1)
		qm.PlayerToNpc("#b������ �ڸ� ġ�ڴٴ��� ��� �� �ž�?");
	if (status == 2)
		qm.sendNextPrev("��, �װ�? �ڸ� �Ѿ� ���� �ߴµ� �߸� �����ٰ� �װ� ������ ���쿡�� ������ ������� �׳� ���� ��.");
	if (status == 3)
		qm.PlayerToNpc("#b���찡 �������� �����ִ� �� �ƴϰ�?");
	if (status == 4)
		qm.sendNextPrev("���� ���̾�?! ���� �� ���츦 �������ϴµ�?! �� ���� ������ �ϳ��� �� ������!");
	if (status == 5)
		qm.PlayerToNpc("#b...��, ���⿡ ������ ���찡!");
	if (status == 6)
		qm.sendNextPrev("����! ����!");
	if (status == 7)
		qm.PlayerToNpc("#b......");
	if (status == 8)
		qm.sendNextPrev("......");
	if (status == 9)
		qm.sendNextPrev("...�� �� �༮. ���� ��� ��! �� ���� ������ ���ؼ� ��� �� �ȴٰ�!");
	if (status == 10)
		qm.PlayerToNpc("#b(�̷��� ���̶�� �θ��� �ȴٴϱ�.)");
	if (status == 11)
		qm.sendNextPrev("����. �ƹ�ư ������ ���츦 �� ��ġ�ؼ� �����̾� ���������� ��� �������� ���� �������� ���谡�� �� ������ �ٰ�. ��, �޾�. \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#i1372043#  #t1372043# 1�� \r\n#i2022621# #t2022621# 25�� \r\n#i2022622# #t2022622# 25�� \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 910 exp");
	if (status == 12){
		qm.forceCompleteQuest();
		qm.gainItem(1372043, 1);
		qm.gainItem(2022621, 25);
		qm.gainItem(2022622, 25);
		qm.gainExp(910);
		qm.sendNextPrev("#b��������� ���ݹ����� �ϵ�#k��. ��, ���� ������ �ʿ��� ������ �ƴ� �� ������ ��� �ٴϸ� ������ �� �ž�. ������.");
	} if (status == 13){
		qm.sendPrev("�׳����� ������� �þ �� ����? �̻���. �� �̷��� ���찡 ���� ����? ���� ������ �� �ʿ䰡 �ִ� �� ����.");
		qm.dispose();
		}
	}