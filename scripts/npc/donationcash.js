﻿var enter = "\r\n";
var seld = -1;
importPackage(Packages.constants);
importPackage(Packages.server);

하트 = "#fs11##fMap/MapHelper.img/minimap/match#"
파랑 = "#fc0xFF6B66FF#"
네모 = "#fMap/MapHelper.img/minimap/rune#"
검정 = "#fc0xFF191919#";
var sssss = 0;
var coin = 4310007; // 재화
var price = 0; // 가격
var allstat = 30000, atk = 30000; // 1회당 올스텟, 공마 증가치
var hoo = 0, items = 0, item;
var needPrice = 1000000000;

function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == 1) {
        if (status == 1) {
            if (sssss == 1) {
                status++;
            }
        }
        status++;
        if (status == 4 && selection == 0 && sssss == 0) {
            status = 1;
        }
    } else {
        if (status == 2) {
            cm.sendOkS("그래, 알겠네 마음이 바뀌면 다시 찾아오게나.", 4, 9075000);
        }
        cm.dispose();
        return;
    }
    if (status == 0) {
        말 = "#fs11#" + 검정 + "안녕하세요 #b#h ##k" + 검정 + "님! [후원] 치장아이템 스탯부여 NPC 입니다.\r\n\r\n"
        말 += "#b후원포인트 1,000포인트#k를 사용해 치장 아이템을 강화할 수 있는 시스템입니다.\r\n\r\n"
        말 += "강화 수치 : #r올스탯+5, 공격력+3, 마력+3 #d씩 증가합니다\r\n\r\n"
        말 += "한 아이템에 #r최대 100회 (올스탯+500, 공/마+300)#k까지 강화가 가능하지만 #r펫 장비를 비롯한 일부 아이템#d에는 사용할 수 없습니다.\r\n\r\n"
        말 += "이미 #r하얀 결정 - F으로 치장강화#k를 하지 않으셨을경우 손해를 보실 수 있으니 이 점 유의하시길 바랍니다.\r\n"
        말 += "#fc0xFFD5D5D5#─────────────────────────────#k\r\n";
        말 += "#L0##fc0xFF6B66FF#치장아이템#k" + 검정 + "을 후원 강화해보고 싶어요.\r\n"
        //말 += "#L1#설명을 듣고 싶어요."
        cm.sendSimpleS(말, 0x04, 9075000);
    } else if (status == 1) {
        sssss = selection;
        if (selection == 0) {
            var txt = "#fs11#" + 검정 + "어떤 아이템을 강화하실건가요?\r\n";
            txt += "#fc0xFFD5D5D5#─────────────────────────────#k\r\n";
            for (i = 0; i < cm.getInventory(6).getSlotLimit(); i++) {
                if (cm.getInventory(6).getItem(i) != null) {
                    if (cm.isCash(cm.getInventory(6).getItem(i).getItemId())) {
                        txt += "#L" + i + "# #i" + cm.getInventory(6).getItem(i).getItemId() + "# #fc0xFF6B66FF##z" + cm.getInventory(6).getItem(i).getItemId() + "#\r\n";
                    }
                }
            }
            cm.sendSimpleS(txt, 0x04, 9075000);
        } else if (selection == 1) {
            cm.Entertuto(false, false);
        }
    } else if (status == 2) {
        items = selection;
        item = cm.getInventory(6).getItem(items);
        if (item == null) {
            cm.sendOkS("오류가 발생했습니다. 재시도 부탁드립니다.", 4, 9075000);
            cm.dispose();
            return;
        }
        cm.sendNextS("#fs11#정말 #r#i" + item.getItemId() + ":# #z" + item.getItemId() + ":##k을 강화 하시겠나요? 선택은 되돌릴 수 없으니 신중하게 선택하여 주세요.", 4, 9075000);
    } else if (status == 3) {
        if (sssss == 1) {
            cm.sendScreenText("#fs27##fn나눔고딕 Extrabold##fc0xFF6B66FF#치장아이템 강화#k에 대해 설명 드리겠습니다.", false);
        } else {

            if (item == null) {
                cm.dispose();
                return;
            }
            if (item.getItemId() >= 1112000 && item.getItemId() <= 1112099 || item.getItemId() >= 1112800 && item.getItemId() <= 1112899) {
                cm.sendOkS("#fs11#" + 검정 + "커플링과 우정링은 강화가 불가능해요.", 0x04, 9075000);
                cm.dispose();
                return;
            }
            if (item.getStr() > 499 || item.getDex() > 499 || item.getInt() > 499 || item.getLuk() > 499 || item.getWatk() > 299 || item.getMatk() > 299 || item.getHp() > 2490) {
                cm.sendOkS("#fs11#" + 검정 + "더 이상 강화는 불가능해요! 한 아이템에 최대 #r100회#d 까지만 강화할 수 있습니다.", 0x04, 9075000);
                cm.dispose();
                return;
            }
            if (item.getItemId() >= 1802000 && item.getItemId() <= 1802999) {
                cm.sendOkS("#fs11#" + 검정 + "펫 장비는 강화가 불가능해요.", 0x04, 9075000);
                cm.dispose();
                return;
            }
            if (!cm.isCash(item.getItemId())) {
                cm.sendOkS("#fs11#" + 검정 + "비정상적인 아이템인것 같습니다.", 0x04, 9075000);
                cm.dispose();
                return;
            }
            var suc = false;
            if (Randomizer.isSuccess(100 + hoo)) {
                suc = true;
            }
            if (cm.getClient().getQuestStatus(50002) == 1 && cm.getClient().getCustomKeyValue(50002, "1") != 1) {
                suc = true;
                cm.getClient().setCustomKeyValue(50002, "1", "1");
                cm.forceCompleteQuest(true);
                cm.getPlayer().dropMessage(5, "성장 퀘스트로 인해 강화가 성공 하였습니다.");
            }
            if (!suc) {
                item.setStr(item.getStr() - allstat);
                item.setDex(item.getDex() - allstat);
                item.setInt(item.getInt() - allstat);
                item.setLuk(item.getLuk() - allstat);
                item.setWatk(item.getWatk() - atk);
                item.setMatk(item.getMatk() - atk);
                item.setHp(item.getHp() - 10);
                cm.getPlayer().gainDonationPoint(-1000);
                cm.getPlayer().forceReAddItem(item, Packages.client.inventory.MapleInventoryType.getByType(6));
                말 = "#fs11#" + 검정 + "강화 실패시 뜨는 문구인데 뜨면 운영자에게 스샷과 함께 복구신청 부탁드립니다.\r\n"
                말 += "#fc0xFFD5D5D5#───────────────────────────#k#l\r\n";
                말 += "#i" + item.getItemId() + "# #fc0xFF4641D9##z" + item.getItemId() + "##k\r\n"
                말 += "#fc0xFF6799FF#STR : + " + (item.getStr() + item.getEnchantStr()) + "\r\n"
                말 += "DEX : + " + (item.getDex() + item.getEnchantDex()) + "\r\n"
                말 += "INT : + " + (item.getInt() + item.getEnchantInt()) + "\r\n"
                말 += "LUK : + " + (item.getLuk() + item.getEnchantLuk()) + "\r\n"
                말 += "MAXHP : + " + (item.getHp() + item.getEnchantHp()) + "\r\n"
                말 += "공격력 : + " + (item.getWatk() + item.getEnchantWatk()) + "\r\n"
                말 += "마력 : + " + (item.getMatk() + item.getEnchantMatk()) + "\r\n"
                말 += "#L0##b한번 더 강화하겠습니다.\r\n"
                말 += "#L1##r더이상 강화를 하지 않겠습니다.\r\n"
                cm.sendSimpleS(말, 0x04, 9075000);
            } else {
                item.setStr(item.getStr() + allstat);
                item.setDex(item.getDex() + allstat);
                item.setInt(item.getInt() + allstat);
                item.setLuk(item.getLuk() + allstat);
                item.setWatk(item.getWatk() + atk);
                item.setMatk(item.getMatk() + atk);
                item.setHp(item.getHp() + 10);
                cm.getPlayer().gainDonationPoint(-1000); // 후원포인트
                cm.getPlayer().forceReAddItem(item, Packages.client.inventory.MapleInventoryType.getByType(6));
                말 = "#fs11#" + 검정 + "강화가 완료되었습니다. #b#h ##k" + 검정 + "님이 강화하신 아이템의 옵션입니다. \r\n"
                말 += "#fc0xFFD5D5D5#───────────────────────────#k#l\r\n";
                말 += "#i" + item.getItemId() + "# #fc0xFF4641D9##z" + item.getItemId() + "##k\r\n"
                말 += "#fc0xFF6799FF#STR : + " + (item.getStr() + item.getEnchantStr()) + "\r\n"
                말 += "DEX : + " + (item.getDex() + item.getEnchantDex()) + "\r\n"
                말 += "INT : + " + (item.getInt() + item.getEnchantInt()) + "\r\n"
                말 += "LUK : + " + (item.getLuk() + item.getEnchantLuk()) + "\r\n"
                말 += "MAXHP : + " + (item.getHp() + item.getEnchantHp()) + "\r\n"
                말 += "공격력 : + " + (item.getWatk() + item.getEnchantWatk()) + "\r\n"
                말 += "마력 : + " + (item.getMatk() + item.getEnchantMatk()) + "\r\n"
                말 += "#L0##b한번 더 강화하겠습니다.\r\n"
                말 += "#L1##r더이상 강화를 하지 않겠습니다.\r\n"
                cm.sendSimpleS(말, 0x04, 9075000);
            }
        }
    } else if (status == 4) { //여긴 다 설명인데 쓸거면 다 바꿔야함
        if (sssss == 1) {
            cm.sendScreenText("#fs18#코디 아이템이라면 어떤 아이템이든 가능합니다.　　　　　　　　　　　 　#fs15##r단, 커플링, 우정링, 펫 장비는 강화가 불가능합니다.#k", false);
        } else {
            if (selection == 0) {
            } else {
                cm.dispose();
            }
        }
    } else if (status == 5) {
        cm.sendScreenText("#fs18#강화마다 #i4310012# #fc0xFFFFBB00##z4310012##k #r10개#k가 필요하며,", false);
    } else if (status == 6) {
        cm.sendScreenText("최대 스탯은 #fc0xFFCCA63D#'50'#k 입니다.", false);
    } else if (status == 7) {
        cm.sendScreenText("#fs15##fc0xFF4641D9#강화 성공#k 시, #fc0xFF6799FF#올스탯 + 1 공/마 + 1 HP + 10#k이 부여됩니다.", false);
    } else if (status == 8) {
        cm.sendScreenText("#fs15##fc0xFFCC3D3D#강화 실패#k 시, #fc0xFFF15F5F#올스탯 - 1 공/마 - 1 HP - 10#k이 부여됩니다.", false);
    } else if (status == 9) {
        cm.sendScreenText("#fs18#강화 확률은 #r60%#k 입니다.", true);
    } else if (status == 10) {
        cm.Endtuto(false);
        cm.dispose();
    }
}