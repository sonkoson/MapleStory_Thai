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

        말 = "#fn나눔고딕##fs11#"+검정+"선물이 지급되었습니다. 인벤토리를 확인해주세요.\r\n\r\n"
		cm.gainItem(2439549, 7); //아스칼론 방어구 선택상자
        cm.gainItem(2439544, -1); //상급방어구 A 상자 -1
        cm.sendOkS(말, 0x04, 3005560);
        cm.dispose();
    }
}
