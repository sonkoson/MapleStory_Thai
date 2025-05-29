var status;

var 전사 = [1004422, 1102775, 1082636, 1042254, 1062165, 1073030, 1152174, 1003797];
var 마법사 = [1004423, 1102794, 1082637, 1042255, 1062166, 1073032, 1152176, 1003798];
var 궁수 = [1004424, 1102795, 1082638, 1042256, 1062167, 1073033, 1152177, 1003799];
var 도적 = [1004425, 1102796, 1082639, 1042257, 1062168, 1073034, 1152178, 1003800];
var 해적 = [1004426, 1102797, 1082640, 1042258, 1062169, 1073035, 1152179, 1003801];
var 보스장신구 = [1032241, 1012478, 1022231, 1113149, 1122254, 1132272, 1113282];
var 무기 = [1212115, 1213017, 1214017, 1222109, 1232109, 1242116, 1242120, 1262017, 1272016, 1282016, 1292017, 1302333, 1312199, 1322250, 1332274, 1362135, 1372222, 1382259, 1402251, 1404017, 1412177, 1422184, 1432214, 1442268, 1452252, 1462239, 1472261, 1482216, 1492231, 1522138, 1532144, 1582017, 1592019];
var 아케인심볼 = [1712001, 1712002, 1712003, 1712004, 1712005, 1712006];

var sel;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1 || mode == 0) {
		cm.dispose();
		return;
	} else {
		status++;
	}

	if (status == 0) {
		var chat = "#fs11#당신의 직업군을 선택해 주세요 !\r\n\r\n#r* 자신의 실수로 인한 복구는 받으실 수 없습니다.#k\r\n\r\n";
		chat += "#L0##b전사#k#l\r\n";
		chat += "#L1##b마법사#k#l\r\n";
		chat += "#L2##b궁수#k#l\r\n";
		chat += "#L3##b도적#k#l\r\n";
		chat += "#L4##b해적#k#l";
		cm.sendSimple(chat);
	} else if (status == 1) {
		sel = selection;
		var chat = "#fs11#당신의 직업군과 맞는 무기를 선택해 주세요 !\r\n\r\n#r* 자신의 실수로 인한 복구는 받으실 수 없습니다.#k\r\n\r\n";
		
		chat += "#fUI/UIWindow2.img/QuestIcon/3/0#\r\n";

		var length = 무기.length;
		for (var i = 0; i < length; i++) {
			chat += "#L" + 무기[i] + "##i" + 무기[i] + "# #b#z" + 무기[i] + "##k#l\r\n";
		}

		cm.sendSimple(chat);
	} else if (status == 2) {
		var list;
		var arcStat;
		switch (sel) {
			case 0:
				list = 전사;
				arcStat = 1;
				break;
			case 1:
				list = 마법사;
				arcStat = 2;
				break;
			case 2:
				list = 궁수;
				arcStat = 3;
				break;
			case 3:
				list = 도적;
				arcStat = 4;
				break;
			case 4:
				list = 해적;
				arcStat = 5;
				break;
		}

		if (list == null) {
			cm.sendOk("#fs11#오류가 발생 하였습니다. GM 에게 문의 바랍니다.");
			cm.dispose();
			return;
		}


		// 앱솔랩스 방어구 세트 지급
		var length = list.length;
		for (var i = 0; i < length; i++) {
			var item = Packages.server.MapleItemInformationProvider.getInstance().getEquipById(list[i]);
		    	item.setState(20);
		    	item.setPotential1(30086);
		    	item.setPotential2(30086);
		    	item.setPotential3(30086);
		    	item.setPotential4(20086);
		    	item.setPotential5(20086);
		    	item.setPotential6(20086);
		    	item.setFlag(item.getFlag() + Packages.client.inventory.ItemFlag.UNTRADEABLE.getValue());
		    	item.setOwner("프레이");

		    	Packages.server.MapleInventoryManipulator.addbyItem(cm.getClient(), item);
		}

		// 보스 장신구 세트 지급
		var bossAcc = 보스장신구.length;
		for (var i = 0; i < bossAcc; i++) {
			var item = Packages.server.MapleItemInformationProvider.getInstance().getEquipById(보스장신구[i]);
		    	item.setState(20);
		    	item.setPotential1(30086);
		    	item.setPotential2(30086);
		    	item.setPotential3(30086);
		    	item.setPotential4(20086);
		    	item.setPotential5(20086);
		    	item.setPotential6(20086);
			item.setFlag(item.getFlag() + Packages.client.inventory.ItemFlag.UNTRADEABLE.getValue());
		    	item.setOwner("프레이");

		    	Packages.server.MapleInventoryManipulator.addbyItem(cm.getClient(), item);
		}

		// 앱솔랩스 무기 지급
		var item = Packages.server.MapleItemInformationProvider.getInstance().getEquipById(selection);


		var selectPotential = (item.getWatk() > item.getMatk() ? 20051 : 20052);

		item.setState(20);
		item.setPotential1(selectPotential);
		item.setPotential2(selectPotential);
		item.setPotential3(selectPotential);
		item.setPotential4(selectPotential);
		item.setPotential5(selectPotential);
		item.setPotential6(selectPotential);
		item.setFlag(item.getFlag() + Packages.client.inventory.ItemFlag.UNTRADEABLE.getValue());
		item.setOwner("프레이");

		Packages.server.MapleInventoryManipulator.addbyItem(cm.getClient(), item);


		cm.gainItem(1182087, 1); // 크리스탈 웬투스 뱃지
		cm.gainItem(1162025, 1); // 핑크빛 성배
		cm.gainItem(2000054, 1); // 무한물약
		cm.gainItem(3700510, 1); // 연합의 용사
		cm.gainItem(1190302, 1); // 크리스탈 메이플리프 엠블렘
		cm.gainItem(2438871, 1); // 기본 데미지 유닛
		cm.gainItem(2634282, -1);

		if (cm.getClient().getKeyValue("firstSymbol") == 1) {
			cm.sendOk("#fs11#아케인,어센틱 심볼을 제외한 초기 지원 보상 지급이 완료 되었습니다.");
			cm.dispose();
			return;
		} else if (cm.getClient().getKeyValue("firstSymbol") == 0 || cm.getClient().getKeyValue("firstSymbol") == null) {
			cm.getClient().setKeyValue("firstSymbol", "1");
			cm.gainItem(2636135, 2304); // 아케인심볼 상자
			cm.gainItem(2636375, 470); // 어센틱심볼 상자
			cm.sendOk("#fs11#초기 지원 보상 지급이 완료 되었습니다.");
			cm.dispose();
		}
	}
}