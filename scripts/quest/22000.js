var status = -1;

function start(mode, type, selection) {
    status++;
	if (mode != 1) {
	    if(type == 1 && mode == 0)
		    status -= 2;
		else{
			qm.sendNext("��? ��Ÿ���Դ� �����ֱ� ���� �Ŵ�? �굵 ��, ���������� ��\r\n�� ���� ��������.");
			qm.dispose();
			return;
		}
	}
	if (status == 0)
		qm.sendNext("�� ���, ����?");
	else if (status == 1)
		qm.PlayerToNpc("#b��... ������ �� �ֹ��̾��?#k");
	else if (status == 2)
		qm.sendNextPrev("�׷�... �׷��� �� ��° ���� ����� ���� ���� ���̱���.\r\n�����㿡 õ���ϰ� ������ ��û���� ����. �׷��� �׷���?");
	else if (status == 3) 
		qm.PlayerToNpc("#b�ƴ�. �װ� �ƴ϶� ���㿡 �̻��� ���� �㼭��.#k");
	else if (status == 4)
		qm.sendNextPrev("�̻��� ��? ���� ���ε� �׷���?");
	else if (status == 5)
		qm.PlayerToNpc("#b�׷��ϱ�...#k");
	else if (status == 6)
		qm.PlayerToNpc("#b(�Ȱ� �ӿ��� �巡���� ������ ���� ��ٰ� �����ߴ�.)");
	else if (status == 7)
		qm.sendAcceptDecline("ȣȣȣȣ, �巡���̶��? �װ� �����ѵ�? ��� ������ �ʾ�\r\n�� �����̱���. ����ִ� ���̴� ��Ÿ���Ե� �����ַ�. �и�\r\n������ �ž�.");
	else if (status == 8){
		qm.forceStartQuest();
		qm.sendNext("#b��Ÿ#k�� �ҵ����� ��ħ���� �ַ� #b�ո���#k�� �����ܴ�. �� ����\r\n�� ������ �ٷ� �� �� ���� �ž�.");
   }else if (status == 9){
		qm.evanTutorial("UI/tutorial/evan/1/0", 1);
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
		qm.sendNext("��, �Ͼ��. ����? ��ħ���� �� ���� �� �׷��� ����? �㿡\r\n�� ���? ��? �̻��� ���� ��ٰ�? ���� ���ε�? ����? �巡\r\n���� ������ ���� ��� ���̾�?");
	if (status == 1)
		qm.sendNextPrev("Ǫ��������~ �巡���̶��? �װ� �����ѵ�? ������ݾ�! ��\r\n�� Ȥ�� �� �޿� ���� �� ���� �� ���Գ�? ��������~\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 20 exp");
	if (status == 2){
		qm.gainExp(20);
		qm.evanTutorial("UI/tutorial/evan/2/0", 1);
		qm.forceCompleteQuest();
		qm.dispose();	
		}
	}