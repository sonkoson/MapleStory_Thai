﻿/*
?젣?옉?옄 : qudtlstorl79@nate.com
*/


var enter = "\r\n";

var sssss = 0;
var suc = 0;
var sel = 0;
var sell = 0;
var selching = 0;
var sel2 = 0;
var status = -1;
var succ = false;
var minusitemid = 0;
var rewarditemid = 0;
var etc = 0;
var etc1 = 0;
var sale = 0;
var sale1 = 0;
var ssssitem = 0;
var ssssitemc = 0;
var ssssitem2 = 0;
var ssssitemc2 = 0;
var ssssmeso = 0;



function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {

	if (mode == -1) {
		cm.dispose();
	} else {
		if (status == 0 && mode == 0) {
			cm.dispose();
			return;
		} else if (status == 1 && mode == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
	}
	if (status == 0) {
        var chat = enter
        chat += "#fs11#[Fancy]원클릭 환불 시스템#k" + enter
        chat += "#L0# #i2048716# 원클릭 강환불 #k#l" + enter
        chat += "#L1# #i2048757# 원클릭 카르마 영환불 #k#l" + enter
        cm.sendOk("#fs12#" + chat);

    } else if (status == 1) {
        sel = selection;
        if (sel == 0) { 
            cm.dispose();
            cm.openNpc(1103003);

		} else if (sel == 1) {
			cm.dispose()
			cm.openNpc(1103002);

		}
    }
}


