importPackage(java.lang);
importPackage(Packages.constants);
importPackage(Packages.handling.channel.handler);

파랑 = "#fc0xFF0054FF#";
연파 = "#fc0xFF6B66FF#";
연보 = "#fc0xFF8041D9#";
보라 = "#fc0xFF5F00FF#";
노랑 = "#fc0xFFEDD200#";
검정 = "#fc0xFF191919#";
분홍 = "#fc0xFFFF5AD9#";
빨강 = "#fc0xFFF15F5F#";

앱솔랩스코인 = "#fUI/Basic.img/theblackcoin/0#";
스티그마코인 = "#fUI/Basic.img/theblackcoin/1#";
판타즈마코인 = "#fUI/Basic.img/theblackcoin/2#";
아라크노코인 = "#fUI/Basic.img/theblackcoin/3#";
소비 = "#fUI/Basic.img/theblackcoin/4#";
보조 = "#fUI/Basic.img/theblackcoin/5#";
보스 = "#fUI/Basic.img/theblackcoin/6#";
포인트 = "#fUI/Basic.img/theblackcoin/7#";
강화 = "#fUI/Basic.img/theblackcoin/8#";
악세 = "#fUI/Basic.img/theblackcoin/9#";
펫 = "#fUI/CashShop.img/CashItem_label/9#";
엠블렘 = "#fUI/Basic.img/theblackcoin/26#";
매그너스 = "#fUI/Basic.img/theblackcoin/27#";
십자 = "#fUI/Basic.img/theblackcoin/28#";
영웅의증표 = "#fUI/Basic.img/theblackcoin/34#";
뛰어라 = "#fUI/Basic.img/theblackcoin/33#";
더블랙 = "#fUI/Basic.img/theblackcoin/38#";
블라썸 = "#fUI/Basic.img/theblackcoin/11#";
유니온 = "#fUI/UIWindow4.img/pointShop/500629/iconShop#";
분홍콩 = "#fUI/UIWindow4.img/pointShop/501661/iconShop#";
네오젬 = "#fUI/UIWindow4.img/pointShop/100712/iconShop#";
검은콩 = "#fUI/UIWindow4.img/pointShop/100161/iconShop#";
잠수 = "#fUI/UIWindow4.img/pointShop/100161/iconShop#";
잠수2 = "#fUI/UIWindow4.img/pointShop/101130/iconShop#";
상점 = "#fUI/Basic.img/theblack/1#";
var status = -1,
    sel = 0,
    sel1 = 0;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
    var choose = "#fs11#";
    if (status == 0) {
		choose += "어서오세요 #h0#님! 일일 퀘스트를 시작하시겠습니까?\r\n\r\n";
		//choose += "아케인 리버 퀘스트\r\n\r\n";
        choose += "#fs11##L0##fc0xFF000000#" + 강화 + " [PRAY] 여로 퀘스트#l\r\n\r\n";
        choose += "#fs11##L2##fc0xFF000000#" + 강화 + " [PRAY] 츄츄 퀘스트#l\r\n\r\n";	
        choose += "#fs11##L1##fc0xFF000000#" + 강화 + " [PRAY] 레헬른 퀘스트#l\r\n\r\n";
        choose += "#fs11##L3##fc0xFF000000#" + 강화 + " [PRAY] 아르카나 퀘스트#l\r\n\r\n";	
        choose += "#fs11##L4##fc0xFF000000#" + 강화 + " [PRAY] 모라스 퀘스트#l\r\n\r\n";		
        choose += "#fs11##L5##fc0xFF000000#" + 강화 + " [PRAY] 에스페라 퀘스트#l\r\n\r\n";	
		//choose += "아케인 리버 퀘스트\r\n\r\n";
        choose += "#fs11##L6##fc0xFF000000#" + 강화 + " [PRAY] 리멘 퀘스트#l\r\n\r\n";
        //choose += "#fs11##L7##fc0xFF000000#" + 강화 + " [PRAY] 초월 라이징 승급#l\r\n\r\n";			
        cm.sendOkS(choose, 0x4);

    }  else if (status == 1) {
        sel = selection;
        if (selection == 0) {
            cm.dispose();
            cm.openNpc(3003131);
        } else if (selection == 1) {
            cm.dispose();
            cm.openNpc(3003251);
        } else if (selection == 2) {
            cm.dispose();
            cm.openNpc(3003158); 
        } else if (selection == 3) {
            cm.dispose();
            cm.openNpc(3003323); 
        } else if (selection == 4) {
            cm.dispose();
            cm.openNpc(3003490); 		
        } else if (selection == 5) {
            cm.dispose();
            cm.openNpc(3003534); 	
        } else if (selection == 6) {
            cm.dispose();
            cm.openNpc(9062210); 		
        } else if (selection == 7) {
            cm.dispose();
            cm.openNpc(2155007); 	
        }
    }
}