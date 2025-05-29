﻿importPackage(java.lang);
importPackage(Packages.server);

var 가격 = 50000;

function start() {
    St = -1;
    action(1, 0, 0);
}

function action(M, T, S) {
    if(M != 1) {
        cm.dispose();
        return;
    }

    if(M == 1)
        St++;

    if(St == 0) {
        var count = 0;

        var say = "#fs11##b스텟을 부여할 펫 장비#k를 선택해 주세요\r\n";
            say += "#fs12##r1개아이템당 [5만]후원포인트가 필요합니다.\r\n\r\n";
        for (i = 0; i < cm.getInventory(5).getSlotLimit(); i++) {
            if (cm.getInventory(6).getItem(i) != null) {
                if (Math.floor(cm.getInventory(6).getItem(i).getItemId() / 10000) == 180 && cm.getInventory(6).getItem(i).getState() != 20) {
                    say += "#L" + i + "##e#b#i" + cm.getInventory(6).getItem(i).getItemId() + "# #z" + cm.getInventory(6).getItem(i).getItemId() + "# (" + i + "번째 슬롯)#l\r\n";
                    count++;
                }
            }
        }
        if (count <= 0) {
            cm.sendOk("잠재능력을 부여할 펫 장비를 소지하고 있는지 확인해 주세요.");
            cm.dispose();
            return;
        }
        cm.sendSimple(say);
    } else if(St == 1){
        if(cm.getPlayer().getDonationPoint() < 가격) {
            cm.sendOk("후원 포인트가 부족한 거 아니야?!");
            cm.dispose();
            return;
        } else {
            vitem = cm.getInventory(6).getItem(S);
            vitem.setStr(vitem.getStr() + 50);
            vitem.setDex(vitem.getDex() + 50);
            vitem.setInt(vitem.getInt() + 50);
            vitem.setLuk(vitem.getLuk() + 50);
            vitem.setWatk(vitem.getWatk() + 50);
            vitem.setMatk(vitem.getMatk() + 50);
            vitem.setState(20);
            vitem.setPotential1(40086);
            vitem.setPotential2(40086);
            vitem.setPotential3(40086);
            vitem.setPotential4(0);
            vitem.setPotential5(0);
            vitem.setPotential6(0);
            cm.getPlayer().forceReAddItem(vitem, Packages.client.inventory.MapleInventoryType.CODY);
            cm.getPlayer().setDonationPoint(cm.getPlayer().getDonationPoint() - 가격);
            cm.sendOk("해당 펫장비 스텟부여가 완료되었습니다.");
            cm.dispose();
        }

    }
}

function msg2(text){
    cm.getPlayer().dropMessage(5, text);
}