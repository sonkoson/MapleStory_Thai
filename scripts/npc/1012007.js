﻿
importPackage(java.lang);

var enter = "\r\n";
var year, month, date2, date, day
var hour, minute;

var questt = "jump_3"; // jump_고유번호
검정 = "#fc0xFF191919#"
var reward = [
	{ 'itemid': 2432423, 'qty': 200 },
	{ 'itemid': 4001715, 'qty': 1 }

]

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
		if (cm.getClient().getKeyValue(questt) == null)
			cm.getClient().setKeyValue(questt, "0");

		if (Integer.parseInt(cm.getClient().getKeyValue(questt)) > 0) {
			cm.sendOk("#fs11#" + 검정 + "오늘의 보상을 이미 받으셨습니다.");
			cm.dispose();
			return;
		}
		if (!(cm.getPlayer().getPosition().x < 693 && cm.getPlayer().getPosition().x > 356 && cm.getPlayer().getPosition().y >= -1206 && cm.getPlayer().getPosition().y <= -1038)) {
			cm.sendOk("#fs11#가까이 와서 클릭해주세요.");
			cm.dispose();
			return;
		}
		cm.sendYesNo("#fs11#" + 검정 + "클리어를 축하해요! 보상을 받으시겠어요?");

	} else if (status == 1) {
		if (Integer.parseInt(cm.getClient().getKeyValue(questt)) > 0) {
			cm.sendOk("#fs11#" + 검정 + "계정당 하루 1회만 보상을 받을수 있어요.");
			cm.dispose();
			return;
		}

		cm.getClient().setKeyValue(questt, "1");
		cm.gainItem(4310009, 500);
		cm.warp(993225700);
		말 = "#fs11#" + 검정 + "클리어 보상입니다.\r\n\r\n"
		말 += "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n"
		말 += "#i4310009# #z4310009# #r500개#k#k";
		cm.sendOk(말);
		cm.dispose();
	}
}

function getData() {
	time = new Date();
	year = time.getFullYear();
	month = time.getMonth() + 1;
	if (month < 10) {
		month = "0" + month;
	}
	date2 = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
	date = year + "" + month + "" + date2;
	day = time.getDay();
	hour = time.getHours();
	minute = time.getMinutes();
}