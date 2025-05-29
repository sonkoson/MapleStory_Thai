/*
제작 : 판매요원 (267→295)
용도 : 판매요원 팩
*/

importPackage(Packages.client.inventory);

status = -1;

지급개수 = 1
템코드 = 2437750

심볼 = [
	1712001,
	1712002,
	1712003,
	1712004,
	1712005,
	1712006,
]

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1 || mode == 0) {
		cm.dispose();
		return;
	}
	if (mode == 1) {
		status++;
	}
	if (status == 0) {
		말 = "#fs11##i1712001# #b#z1712001# 10개#k를 정말로 받으시겠어요?\r\n\r\n"
		cm.sendYesNoS(말, 0x04, 9010061);
	} else if (status == 1) {
		if (cm.getPlayer().getInventory(MapleInventoryType.EQUIP).getNumFreeSlot() < 10) {
			cm.sendOkS("#fs11##r장비 슬롯 10 칸 이상의 인벤토리 공간이 필요합니다.", 0x04, 9010061);
			cm.dispose();
			return;
		}
		for (i = 0; i < 10; i++) {
			cm.gainItem(1712001, 1);
		}
		cm.gainItem(2632130, -1);
		cm.dispose();
		return;
	}
}