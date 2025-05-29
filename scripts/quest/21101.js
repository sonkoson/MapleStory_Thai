var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 0) {
	    qm.sendNext("#b(You need to think about this for a second...)#k");
	    qm.dispose();
	    return;
	} else if (status == 2) {
	    qm.MovieClipIntroUI(true);
	    qm.warp(914090100, 0);
	    qm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	qm.sendYesNo("#b(���� �����θ� #p1201001#�� ����ϴ� �����̶�� Ȯ����\n\r ���ִ°�? Ȯ���Ѵٸ� ���� �־� #p1201001#�� ����. �и�\n\r ���� ������ �� ���̴�.)#k");
    } else if (status == 1) {
	if (qm.getJob() == 2000) {
	    qm.changeJob(2100);
	    qm.forceCompleteQuest();
	    qm.resetStats(35, 4, 4, 4);
	    qm.expandInventory(1, 4);
	    qm.expandInventory(2, 4);
	    qm.expandInventory(3, 4);
	    qm.expandInventory(4, 4);
	    qm.gainItem(1142129, 1);
	    qm.forceCompleteQuest(29924); //medal
	    qm.teachSkill(20009000, 0, -1);
	    qm.teachSkill(20009000, 1, 0);
	    qm.sendNextS("#b(���� ����� �������� �� ����..)#k", 3);
	    qm.MovieClipIntroUI(true);
	    qm.warp(914090100, 0);
	    qm.dispose();
	    return;
	}
    }
}

function end(mode, type, selection) {
    qm.dispose();
}
