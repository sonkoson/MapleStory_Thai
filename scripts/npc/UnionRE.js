﻿var status = -1;

function start() {
    action(1, 0, 0);
}

time = new Date();

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
    wList = [];
    wGain = [];
    if (status == 0) {
        getItem();
        getItem2();

        if (cm.getPlayer().getClient().getKeyValue("UnionRE2") == null) {
            selStr = "유니온 8000을 달성하셨군요!! 서버에 도움이 되고자 아래의 아이템을 지급해드립니다~!.\r\n\r\n #b다음#l을 누르면 아이템이 수령됩니다.\r\n\r\n";
            for (i = 0; i < wList.length; i++) {
                selStr += "#i" + wList[i] + ":# #t" + wList[i] + ":# #b" + wGain[i] + "개#l\r\n";
            }
            cm.sendSimpleS(selStr, 4, 2007);
        } else {
            selStr = "이미 1회 보상을 획득 하셨습니다.";
            cm.sendOk(selStr);
            cm.dispose();
        }


    } else if (status == 1) {
        getItem();
        getItem2();
        selStr2 = "아래의 아이템이 수령되었습니다.\r\n\r\n";
        for (i = 0; i < wList.length; i++) {
            selStr2 += "#i" + wList[i] + ":# #t" + wList[i] + ":# #b" + wGain[i] + "개#l\r\n";
        }
        for (i = 0; i < wList.length; i++) {
            if (wList[i] == 1114305) {
                item = Packages.server.MapleItemInformationProvider.getInstance().getEquipById(1114305);
                item.setExpiration((new Date(time.getFullYear(), time.getMonth(), time.getDate(), 0, 0, 0, 0)).getTime() + (1000 * 60 * 60 * 24 * 21));
                item.setState(19);
                item.setPotential1(40656);
                item.setPotential2(40656);
                item.setPotential3(40656);
                Packages.server.MapleInventoryManipulator.addbyItem(cm.getClient(), item, false, true);
            } else if (wList[i] == 1114306) {
                item = Packages.server.MapleItemInformationProvider.getInstance().getEquipById(1114306);
                item.setExpiration((new Date(time.getFullYear(), time.getMonth(), time.getDate(), 0, 0, 0, 0)).getTime() + (1000 * 60 * 60 * 24 * 21));
                item.setState(19);
                item.setPotential1(40650);
                item.setPotential2(40650);
                item.setPotential3(40650);
                Packages.server.MapleInventoryManipulator.addbyItem(cm.getClient(), item, false, true);
            } else {
                cm.gainItem(wList[i], wGain[i]);
            }
        }

        cm.getPlayer().getClient().setKeyValue("UnionRE2", "1");
        cm.sendSimpleS(selStr2, 4, 2007);
        cm.dispose();
    }
}

function getItem() {
    wList.push(1114305),
        wList.push(1114306),
        wList.push(2630127),
        wList.push(4310229),
        wList.push(4310065);
}

function getItem2() {

    wGain.push(1),
        wGain.push(1),
        wGain.push(1),
        wGain.push(1000),
        wGain.push(100);
}