
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
        말 += "260레벨 선물 상자는 #r계정당 1회#k"+검정+"만 받을 수 있습니다! (꼭 인벤토리의 공간을 여유롭게남겨두세요)"
        cm.sendYesNoS(말, 0x04, 9401232);
    } else if (status == 1) {
        leftslot = cm.getPlayer().getInventory(MapleInventoryType.ETC).getNumFreeSlot();
        leftslot1 = cm.getPlayer().getInventory(MapleInventoryType.EQUIP).getNumFreeSlot();
        if (leftslot < 2 && leftslot1 < 2) {
           cm.sendOk("#fs11##r장비창과 기타창 2 칸 이상을 확보하게.");
           cm.dispose();
           return;
        }
        말 = "#fs11#"+검정+"선물이 지급되었습니다. 인벤토리를 확인해주세요.\r\n\r\n"
        cm.gainItem(4310248, 5000); //코인
        cm.gainItem(5068300, 3); //원기베리
        cm.gainItem(5069100, 1); //크리스탈
        cm.gainItem(2048717, 500); //영환불
        cm.gainItem(2048767, 500); //검환불
        cm.gainItem(5062006, 10); //플미큐
        cm.gainItem(5062002, 10); //마미큐
        cm.gainItem(5060048, 10); //애플
        cm.gainItem(5062005, 10); //어메이징
        cm.gainItem(1713000, 30); //세르니움
        cm.gainItem(2437133, -1); //회수
        cm.sendOkS(말, 0x04, 9401232);
        cm.dispose();
    }
}
