﻿
var status = -1;
importPackage(java.sql);
importPackage(java.lang);
importPackage(Packages.database);
importPackage(Packages.handling.world);
importPackage(Packages.constants);
importPackage(java.util);
importPackage(java.io);
importPackage(Packages.client.inventory);
importPackage(Packages.client);
importPackage(Packages.server);
importPackage(Packages.tools.packet);
function start() {
    status = -1;
    action (1, 0, 0);
}
검정 = "#fc0xFF000000#"
var day = 14; //유효기간 옵션 설정(일)
function action(mode, type, selection) {

    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status --;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
        말 = "#fs11#"+검정+"정말 이 캐릭터로 보상을 받으시겠습니까?\r\n"
        말 += "(꼭 인벤토리의 공간을 여유롭게남겨두세요)"
        cm.sendYesNoS(말, 0x04, 3005560);
    } else if (status == 1) {
        leftslot = cm.getPlayer().getInventory(MapleInventoryType.ETC).getNumFreeSlot();
        leftslot1 = cm.getPlayer().getInventory(MapleInventoryType.EQUIP).getNumFreeSlot();
        if (leftslot < 2 && leftslot1 < 2) {
           cm.sendOkS("#fs11##r장비창과 기타창 2 칸 이상을 확보하게.", 0x04, 3005560);
           cm.dispose();
           return;
        }
        /*
        (어미큐)5062005 5개
(화에큐)5062503 5개
(10억)4001716 1개
(드롭률 2배) 2023072 1개
(ARK코인)4310248 500개
(네오코어)4310308 100개

        */
        말 = "#fn나눔고딕##fs11#"+검정+"선물이 지급되었습니다. 인벤토리를 확인해주세요.\r\n\r\n"
        cm.gainItem(5062005, 10); //화에큡
        cm.gainItem(5062503, 10); //어미큡
        cm.gainItem(4001716, 2); //10억메소
        cm.gainItem(4319999, 2000); //사냥코인
        cm.gainItem(4319997, 100); //하인즈 코어
		cm.gainItem(5060048, 5); //황금사과
        cm.gainItem(2434311, -1); //핫타임상자 -1
        cm.sendOkS(말, 0x04, 3005560);
        cm.dispose();
    }
}
