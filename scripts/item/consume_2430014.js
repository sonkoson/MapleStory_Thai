
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
검정 = "#fc0xFF191919#"
var day = 7; //유효기간 옵션 설정(일)
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
        말 = "#fs11#"+검정+"정말 이 캐릭터로 보상을 받을텐가?\r\n"
        말 += "선물 상자는 #r계정당 1회#k"+검정+"만 지급받는거라네!"
        cm.sendYesNoS(말, 0x04, 9401232);
    } else if (status == 1) {
        leftslot = cm.getPlayer().getInventory(MapleInventoryType.ETC).getNumFreeSlot();
        if (leftslot < 2) {
           cm.sendOk("#fs11##r기타창 2 칸 이상을 확보하게.");
           cm.dispose();
           return;
        }
        말 = "#fs11#"+검정+"선물을 지급했네! 인벤토리를 확인해보게나. 크크\r\n\r\n"
        말 += "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n"
        말 += "#i4310291# #b#z4310291# 250개#k\r\n"
        말 += "#i5200002# #b25,000,000 메소#k\r\n"
        cm.gainItem(4310291, 250);
        cm.gainMeso(25000000);
        cm.gainItem(2430014, -1);
        cm.sendOkS(말, 0x04, 9401232);
        cm.dispose();
    }
}
