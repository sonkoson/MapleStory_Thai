var enter = "\r\n";


function start() {
	status = -1;
	action(1, 0, 0);
}
function action(mode, type, sel) {
	if (mode == 1) {
		status++;
	} else {
		cm.dispose();
		return;
    	}
	if (status == 0) {


		

		var msg ="#fs11#안녕하세요 #b#h 0##k님! 캐시아이템에 #b아획 60 %#k를\r\n붙여드립니다! 원하시는 아이템을 골라주세요.\r\n#r#k"+enter;
				for (i = 0; i < cm.getInventory(6).getSlotLimit(); i++) {
					item = cm.getInventory(6).getItem(i);
           					if (item == null) continue;
					if (cm.isCash(item.getItemId())) msg += "#L"+i+"# #i"+item.getItemId()+"# #b#z"+item.getItemId()+"#\r\n";
				}
		cm.sendSimple(msg);
	} else if (status == 1) {
		item = cm.getInventory(6).getItem(sel);

		if (item == null) {
			cm.dispose();
			return;
		}
		item.setState(17);
		item.setLines(3);
		item.setPotential1(40656);
		item.setPotential2(40656);
		item.setPotential3(40656);
		item.setPotential4(40656);
		item.setPotential5(40656);
		item.setPotential6(40656);
		cm.sendOk("#fs11#아이템에 잠재능력을 부여했습니다. 이용해 주셔서 감사합니다.");
                cm.gainItem(2430043, -1);
		cm.getPlayer().forceReAddItem(item, Packages.client.inventory.MapleInventoryType.getByType(6));
                cm
		cm.dispose();
	}
}