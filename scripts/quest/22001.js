
var status = -1;

function start(mode, type, selection) {
    status++;
	if (mode != 1) {
	    if(type == 1 && mode == 0)
		    status -= 2;
		else{
			qm.sendNext("�ʾ�, �����ٰ� �����ҷ�? ���� �� ������ ������ �� ���� ��\r\n��? �� �ٽ� ���� �ɾ ����Ʈ�� ������!");
			qm.dispose();
			return;
		}
	}
	if (status == 0)
		qm.sendNext("��ħ���� ���� ������. ������. ��, �̻��� �Ҹ��� �׸��ϰ�\r\n#p1013102#���� ��ħ���̳� �� ��.");
	else if (status == 1)
		qm.PlayerToNpc("#b��? �װ� ��Ÿ�� �� �����ݾ�?#k");
	else if (status == 2)
		qm.sendAcceptDecline("�� �༮! ���̶�� �θ���ϱ�!#p1013102# �� ���� �󸶳� �Ⱦ��ϴ�\r\n���� �ʵ� �� ���ݾ�. �ٰ����� �и��� ������ �� �ž�. �ҵ�\r\n�� �� �����ϴϱ� �װ� ������ ��.");
	else if (status == 3){
		qm.gainItem(4032447,1);
		qm.sendNext("�� #bleft#k���� ���� #b#p1013102##k���� ��Ḧ �ְ� ���ƿ�. �� �༮\r\n�Ʊ���� �谡 ������ ¢���� �־�.");
		qm.forceStartQuest();
   }else if (status == 4){
		qm.sendPrev("#p1013102#���� ���̸� �� ������ ���� ���ƿ�.");
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
		qm.sendNext("#b(You place food in Bulldog's bowl.)#k");
	if (status == 1)
		qm.sendOk("#b(Bulldog is totally sweet. Utah is just a coward.)#k\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 35 exp");
	if (status == 2){
		qm.forceCompleteQuest();
		qm.gainItem(4032447, -1);
		qm.gainExp(35);
		qm.sendOk("#b(Looks like Bulldog has finished eating. Return to Utah and let him know.)#k");
		qm.dispose();
		}
	}