/* ===========================================================
			Resonance
	NPC Name: 		Maple Administrator
	Description: 	Quest -  Kingdom of Mushroom in Danger
=============================================================
Version 1.0 - Script Done.(17/7/2010)
=============================================================
*/

var status = -1;

function start(mode, type, selection) {
    status++;
	if (mode != 1) {
	    if(type == 1 && mode == 0)
		    status -= 2;
		else{
			if(status == 0){
				qm.sendOk("������? �ð��� �ǽŴٸ� �ٽ� ã�ƿ��ּ���. ����� ������� �ϴ�����.");
				qm.dispose();
				return;
			} else if(status == 3){
				qm.sendNext("Okay. In that case, I'll just give you the routes to the Kingdom of Mushroom. #bNear the west entrance of Henesys,#k you'll find an #bempty house#k. Enter the house, and turn left to enter#b<Themed Dungeon : Mushroom Castle>#k. That's the entrance to the Kingdom of Mushroom. There's not much time!");
				qm.forceStartQuest();
				return;
			}
		}
	}
	if(status == 0) 
		qm.sendAcceptDecline("���� ������ �߰�, ����� �ڰ��� ���� �� ����. �ڳ׿��� ���� ��Ź �ϰ� �������� �ִµ� ������ �� �ְڳ�?");
	if(status == 1)
		qm.sendNext("�ٸ��� �ƴ϶� #b�ӽ�ŷ �ձ�#k�� ���� ū ���Ⱑ ���ƴٳ�. �ӽ�ŷ �ձ��� ��׽ý� ūó�� ��ġ�� �����ձ����ν� ������ �ӽ�ŷ�� ��ȭ�� ����ϰ� ������ ��ġ�� ��ġ�� ������ ����� ���� ���̼���. �׷��� �ֱٿ� �ǰ��� ��ȭ�Ǿ� ���� �ϳ� ���� �� #b��÷�Ÿ ����#k���� ������ �����ְ� ��� ���̶�� �˰� �־��µ� ���� ���� ���� ����̳�.");
	if(status == 2)
		qm.sendNext("���������� �ڼ��� ������ �𸣰����� ū ������� ��ģ �� ������ �ѹ� ���� ������ ���� �����ִ� �� ���� �� ����. �ڳ� ������ ���⿡ ���� �ӽ�ŷ �ձ��� ���س� �� ���� �ɼ�. ��, ���� #b��õ��#k�� ���״� � �ӽ�ŷ �ձ����� �����Գ�. #b��ȣ����#k�� ã�ư��� �ɰɼ�.\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v4032375# #t4032375#");
	if(status == 3)
		qm.sendYesNo("�׷���, �ڳ� �ӽ�ŷ �ձ��� ��ġ�� �˰� �ֳ�? ȥ�� ã�ư� �� ������ ��� ������, �����ٸ� �Ա����� �����ְڳ�.");
	if(status == 4){
		qm.gainItem(4032375, 1);
		qm.forceStartQuest();
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
	if(status == 0)
		qm.sendNext("Hmmm? Is that a #brecommendation letter from the job instructor#k??! What is this, are you the one that came to save us, the Kingdom of Mushroom?");
	if(status == 1)
		qm.sendNextPrev("Hmmm... okay. Since the letter is from the job instructor, I suppose you are really the one. I apologize for not introducing myself to you earlier. I'm the #bHead Security Officer#k in charge of protecting King Mush. As you can see, this temporary hideout is protected by the team of security and soldiers. Our situation may be dire, but nevertheless, welcome to Kingdom of Mushroom.");
	if(status == 2){
		qm.gainItem(4032375, -1);
		qm.forceCompleteQuest();
		qm.forceStartQuest(2312);
		qm.dispose();
	}
}
