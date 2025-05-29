﻿importPackage(Packages.client);
importPackage(Packages.constants);
importPackage(Packages.server.maps);
importPackage(Packages.tools.packet);
importPackage(Packages.server);
importPackage(java.lang);
importPackage(java.util);

파랑 = "#fc0xFF0054FF#";
연파 = "#fc0xFF6B66FF#";
연보 = "#fc0xFF8041D9#";
보라 = "#fc0xFF5F00FF#";
노랑 = "#fc0xFFEDD200#";
검정 = "#fc0xFF191919#";
화이트 = "#fc0xFFFFFFFF#";

틀 = "#fUI/Basic.img/actMark/15#";
사냥터 = "#fUI/Basic.img/actMark/9#";
피로도 = "#fUI/Basic.img/actMark/10#";
보스 = "#fUI/Basic.img/actMark/11#";
마을 = "#fUI/Basic.img/actMark/12#";
이벤트 = "#fUI/Basic.img/actMark/13#";
기타 = "#fUI/Basic.img/actMark/14#";

mTown = ["SixPath", "Henesys", "Ellinia", "Perion", "KerningCity",
	"Rith", "Dungeon", "Nautilus", "Ereb", "Rien",
	"Orbis", "ElNath", "Ludibrium", "Folkvillige", "AquaRoad",
	"Leafre", "Murueng", "WhiteHerb", "Ariant", "Magatia",
	"Edelstein", "Eurel", "critias", "Haven", "Road of Vanishing", "ChewChew", "Lacheln", "Arcana", "Morass", "esfera", "aliance", "moonBridge", "TheLabyrinthOfSuffering", "Limen"];

cTown = [104020000, 100000000, 101000000, 102000000, 103000000,
	104000000, 105000000, 120000000, 130000000, 140000000,
	200000000, 211000000, 220000000, 224000000, 230000000,
	240000000, 250000000, 251000000, 260000000, 261000000,
	310000000, 101050000, 241000000, 310070000, 450001000, 450002000, 450003000, 450005000, 450006130, 450007040, 450009050, 450009100, 450011500, 450012300];


var 별1 = "#fUI/UIWindow.img/ToolTip/WorldMap/StarForce#";
var 별2 = "#fUI/UIWindow.img/ToolTip/WorldMap/ArcaneForce#";
var 별3 = "#fUI/UIWindow.img/ToolTip/WorldMap/AuthenticForce#";
var 티켓 = 4033235;
var 갯수 = 1;

var status = -1;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
		return;
	}
	if (mode == 0) {
		status--;
	}
	if (mode == 1) {
		status++;
	}

	if (status == 0) {

        var msg = "                    " + 틀 + "#l\r\n";
                msg += "#fc0xFFD5D5D5#──────────────────────────#l\r\n";
		msg += "#L2##fc0xFFFF3636#" + 사냥터 + "#l";
		msg += "#L4##fc0xFFFF3636#" + 피로도 + "#l";
                msg += "#L5##fc0xFFFF3636#" + 보스 + "#l\r\n";
		msg += "#L1##fc0xFFFF3636#" + 마을 + "#l";
		msg += "#L3##fc0xFFFF3636#" + 이벤트 + "#l";
		msg += "#L6##fc0xFFFF3636#" + 기타 + "#l\r\n";

		if (GameConstants.isWildHunter(cm.getPlayer().getJob()))
			msg += "#L9##fs11#b재규어 포획#n #k\r\n";

		cm.sendSimpleS(msg, 4);

	} else if (status == 1) {
		ans_01 = selection;
		selStr = "";
		switch (ans_01) {
			case 1:
				cm.dispose();
				cm.openNpc(3000012);
				break;
			case 5:
                cm.sendOk("#fs11# #b#r(!)#k키보드 #b[T]#k 버튼을 눌러 이동 바랍니다.");
                cm.dispose();
                return;
			case 2:
				selStr += "\r\n";
				selStr += "#L1##fs11# #e#b일반#n#b 사냥터#l\r\n";
				selStr += "#L2# #e#b스타포스#n#b 사냥터#l\r\n";
				selStr += "#L3#" + 별2 + "#e#b 아케인포스#n#b 사냥터#l\r\n";
				selStr += "#L4#" + 별3 + "#e#b 어센틱포스#n#b 사냥터#l";
				selStr += "";
				break;
			case 3:
				selStr += "#L1# #fs11##r(Fancy)#k #b도박장 아케이드#k#l\r\n\r\n";
				selStr += "#fc0xFFD5D5D5#───────────────────────────#k\r\n";
				selStr += "#L4# #fs11##d끈기의 숲#n #k이동\r\n";
				selStr += "#L5# #d인내의 숲#n #k이동\r\n";
				selStr += "#L6# #d고지를 향해서#n #k이동\r\n";
				selStr += "#L7# #d펫 산책로[헤네시스]#n #k이동\r\n";
				selStr += "#L8# #d펫 산책로[루디브리엄]#n #k이동\r\n";
				break;
			case 4:
			selStr += "#fs11#\r\n#fc0xFF000000#피로도 사냥터는 #e#fc0xFFFF9436피로회복제를 통한 회복 후 #피로도#k#n를 소모하며 #b#e일반적인 사냥터#fc0xFF000000##n와는 달리 #b#e많은 아이템을 획득#fc0xFF000000##n할 수 있네\r\n\r\n#fc0xFF000000#또한 피로도를 모두 소진하면 이용할 수 없네.\r\n#r주의 : 피로도는 자정이 지나면 0으로 초기화됩니다.\r\n\r\n";
	selStr += "#b#L321##fMap/MapHelper.img/minimap/anothertrader# #fc0xFF6799FF#Lv.220 #fc0xFFFF9436#알카드노 연구소 - 연구소 A-3 구역 #b(하급)#l\r\n";
	selStr += "#b#L322##fMap/MapHelper.img/minimap/anothertrader# #fc0xFF6799FF#Lv.260 #fc0xFFFF9436#제뉴미스트 연구소 - 연구소 203호 #b(중급)#l\r\n";
			break;

			case 6:
				selStr += "#fs11#[자동] #b일반사냥터#k \r\n";
				selStr += "#L2##fs11# #e#d일반 사냥터#n #k이동\r\n\r\n#l";
				selStr += "[자동] #b후원사냥터#k ( #r입장 티켓 필요#k )\r\n";
				selStr += "#L6# #e#d후원 사냥터#n #k이동\r\n";
			break;

		}
	if (ans_01 == 2 || ans_01 == 3 || ans_01 == 4 || ans_01 == 6 || ans_01 == 7 || ans_01 == 8)
		cm.sendSimpleS(selStr, 4);

	} else if (status == 2) {
		ans_02 = selection;

		if (ans_01 == 3) {
			switch (ans_02) {
				case 1:
					cm.dispose();
					cm.warp(993050400, 0);
					return;
				case 2:
					cm.dispose();
					cm.warp(221023300, 0);
					break;
				case 321:
					cm.dispose();
					cm.warp(261020700, 0);
					break;
				case 2:
					cm.dispose();
					cm.warp(221023300, 0);
					break;
				case 3:
					cm.dispose();
					cm.warp(300030010, 0);
					return;
					break;
				case 4:
					cm.dispose();
					cm.warp(910530000, 0);
					break;
				case 5:
					cm.dispose();
					cm.warp(910130000, 0);
					return;
					break;
				case 6:
					cm.dispose();
					cm.warp(109040000, 0);
					return;
					break;
				case 7:
					cm.dispose();
					cm.warp(100000202, 0);
					return;
					break;
				case 8:
					cm.dispose();
					cm.warp(220000006, 0);
					return;
					break;

			}
		} else if (ans_01 == 4) {
			switch (ans_02) {
				case 321:
					cm.dispose();
					cm.warp(261020700, 0);
					break;
				case 322:
					cm.dispose();
					cm.warp(261010103, 0);
					break;
				case 1:
					cm.dispose();
					cm.warp(101, 0);
					break;
				case 2:
					cm.dispose();
					cm.warp(102, 0);
					return;
					break;
				case 3:
					cm.dispose();
					cm.warp(103, 0);
					return;
					break;
				case 4:
					cm.dispose();
					cm.warp(109, 0);
					return;
					break;
				case 5:
					cm.dispose();
					cm.warp(105, 0);
					return;
					break;
				case 6:
					cm.dispose();
					cm.warp(100, 0);
					return;
					break;
				case 7:
					cm.dispose();
					cm.warp(106, 0);
					return;
					break;
				case 8:
					cm.dispose();
					cm.warp(107, 0);
					return;
					break;
				case 9:
					cm.dispose();
					cm.warp(108, 0);
					return;
					break;
				case 10:
					cm.dispose();
					cm.warp(104, 0);
					return;
					break;
			}


		} else if (ans_01 == 8) {
			switch (ans_02) {
				case 1:
					cm.dispose();
					cm.warp(910530000, 0);
					break;
				case 2:
					cm.dispose();
					cm.warp(910130000, 0);
					return;
					break;
				case 3:
					cm.dispose();
					cm.warp(109040000, 0);
					return;
					break;
				case 4:
					cm.dispose();
					cm.warp(100000202, 0);
					return;
					break;
				case 5:
					cm.dispose();
					cm.warp(220000006, 0);
					return;
					break;
				case 50:
					cm.dispose();
					cm.warp(701000000, 0);
					return;
					break;
				case 6:
					cm.dispose();
					cm.warp(740000000, 0);
					return;
					break;
				case 7:
					cm.dispose();
					cm.warp(500000000, 0);
					return;
					break;
				case 8:
					cm.dispose();
					cm.warp(910130000, 0);
					return;
					break;
			}
			} if (ans_01 == 6) {
			switch (ans_02) {
				case 2:
					cm.dispose();
					cm.warp(921170004, 0); //기존 일반
					return;
					break;
				case 3:
					cm.dispose();
					cm.warp(13000, 0); //신규 일반
					return;
					break;
				case 4:
					cm.dispose();
					cm.warp(13001, 0);
					return;
					break;
				case 5:
					cm.dispose();
					cm.warp(13002, 0);
					return;
					break;
				case 6:
					cm.dispose();
						cm.warp(921170011, 0); //기존 후원사냥터
					return;
					break;
				case 7:
					cm.dispose();
					if(cm.haveItem(티켓, 갯수)) {
						cm.warp(13004, 0); //신규 후원사냥터
					}
					return;
					break;
				case 8:
					cm.dispose();
					if(cm.haveItem(티켓, 갯수)) {
						cm.warp(13005, 0); 
					}
					return;
					break;
				case 9:
					cm.dispose();
					if(cm.haveItem(티켓, 갯수)) {
						cm.warp(13006, 0); 
					}		
					return;
					break;
				case 10:
					cm.dispose();
					if(cm.haveItem(티켓, 갯수)) {
						cm.warp(13007, 0); 
					}
					return;
					break;
			}
		} else if (ans_01 == 7) {
			switch (ans_02) {
				case 1:
					cm.dispose();
					cm.warp(993016000, 0);
					break;
				case 2:
					cm.dispose();
					cm.warp(993050000, 0);
					return;
					break;
				case 3:
					cm.dispose();
					cm.warp(993110000, 0);
					return;
					break;
				case 4:
					cm.dispose();
					cm.warp(993177000, 0);
					return;
					break;
				case 5:
					cm.dispose();
					cm.warp(993189100, 0);
					return;
					break;
				case 50:
					cm.dispose();
					cm.warp(701000000, 0);
					return;
					break;
				case 6:
					cm.dispose();
					cm.warp(740000000, 0);
					return;
					break;
				case 7:
					cm.dispose();
					cm.warp(500000000, 0);
					return;
					break;
				case 8:
					cm.dispose();
					cm.warp(910130000, 0);
					return;
					break;
			}
		} else {
			selStr = "";
			switch (ans_02) {
				case 1:
					selStr += "#fs11#\r\n사냥터에 등장하는 #fc0xFF1DDB16##e몬스터의 평균 레벨#n#k을 확인하고 이동하세요.#fs11#\r\n";
					selStr += "#d#L931000500#Lv.0   │ 특별 사냥터      │ 재규어 서식지#l\r\n";
					selStr += "#d#L101020000#Lv.7   │ 솟아오른나무      │ 바람과 가까운 곳#l\r\n";
					selStr += "#r#L100020000#Lv.10  │ 버섯노래숲        │ 포자언덕#l\r\n";
					selStr += "#r#L100040000#Lv.15  │ 골렘사원          │ 골렘의 사원 입구#l\r\n";
					selStr += "#d#L101020401#Lv.20  │ 동쪽숲            │ 바람이 불어오는 곳#l\r\n";
					selStr += "#r#L120040100#Lv.35  │ 골드비치          │ 해변가 풀숲1#l\r\n";
					selStr += "#r#L120041800#Lv.42  │ 골드비치          │ 거친 파도#l\r\n";
					selStr += "#d#L103020420#Lv.45  │ 커닝시티지하철    │ 2호선 3구간#l\r\n";
					selStr += "#r#L102030000#Lv.55  │ 불타버린땅        │ 와일드보어의 땅#l\r\n";
					selStr += "#r#L102040301#Lv.62  │ 유적발굴지        │ 제1군영#l\r\n";
					selStr += "#r#L105010000#Lv.66  │ 습지              │ 조용한 습지#l\r\n";
					selStr += "#r#L260020600#Lv.90  │ 선셋로드          │ 사헬지대2#l\r\n";
					selStr += "#r#L261020400#Lv.95  │ 제뉴미스트 연구소 │ 연구소 C-2 구역#l\r\n";
					selStr += "#r#L220020600#Lv.114 │ 루디브리엄성      │ 장난감공장<기계실>#l\r\n";
					selStr += "#d#L401053001#Lv.115 │ 폭군의 성채       │ 폭군의 성채 3층 복도#l\r\n";
					selStr += "#d#L211040600#Lv.121 │ 폐광              │ 날카로운절벽4#l\r\n";
					selStr += "#d#L250020000#Lv.126 │ 무릉사원          │ 초급 수련장#l\r\n";
					selStr += "#r#L251010402#Lv.130 │ 무릉도원          │ 빨간코 해적단 소굴2#l\r\n";
					selStr += "#d#L240040000#Lv.136 │ 미나르숲          │ 용의 협곡#l\r\n";
					selStr += "#d#L271030400#Lv.176 │ 기사단 요새       │ 기사단 제 4구역#l\r\n";
					selStr += "#r#L221030800#Lv.179 │ UFO 내부          │ 조종간1#l\r\n";
					selStr += "#d#L241000213#Lv.186 │ 킹덤로드          │ 시작되는 비극의 숲3#l\r\n";
					selStr += "#r#L273040300#Lv.196 │ 황혼의 페리온     │ 버려진 발굴지역 4#l\r\n";
					selStr += "#d#L241000216#Lv.200 │ 킹덤로드          │ 타락한 마력의 숲1#l\r\n";
					selStr += "#d#L241000206#Lv.205 │ 킹덤로드          │ 타락한 마력의 숲2#l\r\n";
					selStr += "#r#L310070140#Lv.205 │ 기계무덤          │ 기계무덤 언덕4#l\r\n";
					selStr += "#d#L241000226#Lv.210 │ 킹덤로드          │ 타락한 마력의 숲3#l\r\n";
					selStr += "#d#L310070210#Lv.218 │ 스카이라인        │ 스카이라인1#l\r\n";
					selStr += "#d#L310070300#Lv.218 │ 블랙헤븐 갑판     │ 블랙헤븐#l\r\n";
					selStr += "#r#L105300301#Lv.226 │ 타락한 세계수     │ 상단 줄기 갈림길#l\r\n ";
					break;

				case 2:
					selStr += "#fs11#\r\n사냥터의 #e#fc0xFFFF9436#스타포스 요구치#k#n와 #e#b몬스터의 평균 레벨#k#n 확인하고\r\n이동하시기 바랍니다.\r\n#fs11#";
					selStr += "   \r\n#fs11##e#r[리프레]#n\r\n#d";
					selStr += "#L240010600##fc0xFFFF9436#Lv.107#d | " + 별1 + " 5   | 하늘 둥지2#l\r\n";
					selStr += "#L240010520##fc0xFFFF9436#Lv.107#d | " + 별1 + " 5   | 하늘 둥지3#l\r\n";
					selStr += "#L240010510##fc0xFFFF9436#Lv.107#d | " + 별1 + " 5   | 산양의 골짜기2#l\r\n";
					selStr += "#L240020300##fc0xFFFF9436#Lv.109#d | " + 별1 + " 15  | 물과 어둠의 전장#l\r\n";
					selStr += "#L240020210##fc0xFFFF9436#Lv.110#d | " + 별1 + " 15  | 어둠과 불의 전장#l\r\n";
					selStr += "#L240020200##fc0xFFFF9436#Lv.110#d | " + 별1 + " 15  | 검은 켄타우로스의 영역#l\r\n\r\n";
					selStr += "#fs12##e#r[루디브리엄]#d#n\r\n";
					selStr += "#L220060000##fc0xFFFF9436#Lv.116#d | " + 별1 + " 25  | 뒤틀린 시간의 길<1>#l\r\n";
					selStr += "#L220070000##fc0xFFFF9436#Lv.116#d | " + 별1 + " 25  | 잊혀진 시간의 길<1>#l\r\n";
					selStr += "#L220060100##fc0xFFFF9436#Lv.117#d | " + 별1 + " 25  | 뒤틀린 시간의 길<2>#l\r\n";
					selStr += "#L220070100##fc0xFFFF9436#Lv.117#d | " + 별1 + " 25  | 잊혀진 시간의 길<2>#l\r\n";
					selStr += "#L220060200##fc0xFFFF9436#Lv.118#d | " + 별1 + " 26  | 뒤틀린 시간의 길<3>#l\r\n";
					selStr += "#L220070200##fc0xFFFF9436#Lv.118#d | " + 별1 + " 26  | 잊혀진 시간의 길<3>#l\r\n";
					selStr += "#L220060300##fc0xFFFF9436#Lv.119#d | " + 별1 + " 27  | 뒤틀린 시간의 길<4>#l\r\n";
					selStr += "#L220070300##fc0xFFFF9436#Lv.119#d | " + 별1 + " 27  | 잊혀진 시간의 길<4>#l\r\n";
					selStr += "#L220060400##fc0xFFFF9436#Lv.120#d | " + 별1 + " 28  | 뒤틀린 회랑#l\r\n";
					selStr += "#L220070400##fc0xFFFF9436#Lv.120#d | " + 별1 + " 28  | 잊혀진 회랑#l\r\n\r\n";
					selStr += "#fs12##e#r[사자왕의 성]#d#n\r\n";
					selStr += "#L211080400##fc0xFFFF9436#Lv.130#d | " + 별1 + " 50  | 숨겨진 정원1#l\r\n";
					selStr += "#L211080500##fc0xFFFF9436#Lv.132#d | " + 별1 + " 50  | 숨겨진 정원2#l\r\n";
					selStr += "#L211080600##fc0xFFFF9436#Lv.134#d | " + 별1 + " 50  | 숨겨진 정원3#l\r\n\r\n";
					selStr += "#fs12##e#r[엘나스 폐광]#d#n\r\n";
					selStr += "#L211041100##fc0xFFFF9436#Lv.132#d | " + 별1 + " 50  | 폐광1#l\r\n";
					selStr += "#L211041200##fc0xFFFF9436#Lv.132#d | " + 별1 + " 50  | 폐광2#l\r\n";
					selStr += "#L211041300##fc0xFFFF9436#Lv.132#d | " + 별1 + " 50  | 폐광3#l\r\n";
					selStr += "#L211041400##fc0xFFFF9436#Lv.132#d | " + 별1 + " 50  | 폐광4#l\r\n";
					selStr += "#L211042000##fc0xFFFF9436#Lv.132#d | " + 별1 + " 55  | 시련의 동굴1#l\r\n";
					selStr += "#L211042100##fc0xFFFF9436#Lv.135#d | " + 별1 + " 55  | 시련의 동굴2#l\r\n";
					selStr += "#L211042200##fc0xFFFF9436#Lv.136#d | " + 별1 + " 55  | 시련의 동굴3#l\r\n\r\n";
					selStr += "#fs12##e#r[리프레 협곡]#d#n\r\n";
					selStr += "#L240040300##fc0xFFFF9436#Lv.141#d | " + 별1 + " 65  | 협곡의 서쪽길#l\r\n";
					selStr += "#L240040320##fc0xFFFF9436#Lv.141#d | " + 별1 + " 65  | 검은 와이번의 둥지#l\r\n";
					selStr += "#L240040510##fc0xFFFF9436#Lv.150#d | " + 별1 + " 65  | 죽은 용의 둥지#l\r\n";
					selStr += "#L240040511##fc0xFFFF9436#Lv.150#d | " + 별1 + " 70  | 남겨진 용의 둥지1#l\r\n";
					selStr += "#L240040512##fc0xFFFF9436#Lv.150#d | " + 별1 + " 70  | 남겨진 용의 둥지2#l\r\n\r\n";
					selStr += "#fs12##e#r[커닝 타워]#d#n\r\n";
					selStr += "#L103041119##fc0xFFFF9436#Lv.155#d | " + 별1 + " 80  | 2층 카페<4>#l\r\n";
					selStr += "#L103041129##fc0xFFFF9436#Lv.157#d | " + 별1 + " 80  | 3층 팬시샵<4>#l\r\n";
					selStr += "#L103041139##fc0xFFFF9436#Lv.159#d | " + 별1 + " 80  | 4층 음반 매장<4>#l\r\n";
					selStr += "#L103041149##fc0xFFFF9436#Lv.161#d | " + 별1 + " 80  | 5층 화장품 매장<4>#l\r\n";
					selStr += "#L103041159##fc0xFFFF9436#Lv.162#d | " + 별1 + " 80  | 5층 헤어샵<4>#l\r\n\r\n";
					selStr += "#fs12##e#r[시간의 신전]#d#n\r\n";
					selStr += "#L270030600##fc0xFFFF9436#Lv.160#d | " + 별1 + " 90  | 또 다른 망각의 길1#l\r\n";
					selStr += "#L270030610##fc0xFFFF9436#Lv.162#d | " + 별1 + " 90  | 또 다른 망각의 길2#l\r\n";
					selStr += "#L270030620##fc0xFFFF9436#Lv.164#d | " + 별1 + " 90  | 또 다른 망각의 길3#l\r\n";
					selStr += "#L270030630##fc0xFFFF9436#Lv.165#d | " + 별1 + " 90  | 또 다른 망각의 길4#l\r\n\r\n";
					selStr += "#fs12##e#r[기사단의 요새]#d#n\r\n";
					selStr += "#L271030101##fc0xFFFF9436#Lv.169#d | " + 별1 + " 120 | 제 1연무장#l\r\n";
					selStr += "#L271030102##fc0xFFFF9436#Lv.169#d | " + 별1 + " 120 | 제 2연무장#l\r\n";
					selStr += "#L271030310##fc0xFFFF9436#Lv.173#d | " + 별1 + " 120 | 무기고1#l\r\n";
					selStr += "#L271030320##fc0xFFFF9436#Lv.175#d | " + 별1 + " 120 | 무기고2#l\r\n\r\n";
					selStr += "#fs12##e#r[지구방위본부]#d#n\r\n";
					selStr += "#L221030640##fc0xFFFF9436#Lv.178#d | " + 별1 + " 140 | 복도 H01#l\r\n";
					selStr += "#L221030650##fc0xFFFF9436#Lv.179#d | " + 별1 + " 140 | 복도 H02#l\r\n";
					selStr += "#L221030660##fc0xFFFF9436#Lv.180#d | " + 별1 + " 140 | 복도 H03#l\r\n ";
					break;

				case 3:
					selStr += "#fs11#\r\n사냥터의 #e#fc0xFF6799FF#아케인포스 요구치#k#n와 #e#b몬스터의 평균 레벨#k#n 확인하고\r\n이동하시기 바랍니다.\r\n#fs11#";
					selStr += "\r\n#e#r[소멸의 여로]#d#n\r\n";
					selStr += "#L450001010##fc0xFF6799FF#Lv.200#d | " + 별2 + " 30  | 풍화된 기쁨의 땅#l\r\n";
					selStr += "#L450001100##fc0xFF6799FF#Lv.204#d | " + 별2 + " 40  | 소멸의 화염지대#l\r\n";
					selStr += "#L450001200##fc0xFF6799FF#Lv.207#d | " + 별2 + " 60  | 안식의 동굴#l\r\n";
					selStr += "#L450001260##fc0xFF6799FF#Lv.209#d | " + 별2 + " 80  | 숨겨진 호숫가#l\r\n";
					selStr += "#L450001261##fc0xFF6799FF#Lv.209#d | " + 별2 + " 80  | 숨겨진 화염지대#l\r\n";
					selStr += "#L450001262##fc0xFF6799FF#Lv.209#d | " + 별2 + " 80  | 숨겨진 동굴#l\r\n";
					selStr += "\r\n\r\n#e#r[츄츄 아일랜드]#d#n\r\n"
					selStr += "#L450002001##fc0xFF6799FF#Lv.210#d | " + 별2 + " 100 | 오색동산#l\r\n";
					selStr += "#L450002006##fc0xFF6799FF#Lv.212#d | " + 별2 + " 100 | 츄릅 포레스트#l\r\n";
					selStr += "#L450002012##fc0xFF6799FF#Lv.214#d | " + 별2 + " 130 | 격류지대#l\r\n";
					selStr += "#L450002016##fc0xFF6799FF#Lv.217#d | " + 별2 + " 160 | 하늘 고래산#l\r\n";
					selStr += "\r\n\r\n#e#r[리버스 시티]#d#n\r\n";
					selStr += "#L450014020##fc0xFF6799FF#Lv.210#d | " + 별2 + " 100 | 지하 선로#l\r\n";
					selStr += "#L450014100##fc0xFF6799FF#Lv.212#d | " + 별2 + " 100 | T-boy의 연구열차#l\r\n";
					selStr += "#L450014140##fc0xFF6799FF#Lv.214#d | " + 별2 + " 100 | 지하 열차#l\r\n";
					selStr += "#L450014200##fc0xFF6799FF#Lv.214#d | " + 별2 + " 160 | M - 타워#l\r\n";
					selStr += "#L450014300##fc0xFF6799FF#Lv.217#d | " + 별2 + " 100 | 숨겨진 연구열차#l\r\n";
					selStr += "#L450014310##fc0xFF6799FF#Lv.217#d | " + 별2 + " 100 | 숨겨진 지하열차#l\r\n";
					selStr += "\r\n\r\n#e#r[꿈의 도시 레헬른]#d#n\r\n";
					selStr += "#L450003200##fc0xFF6799FF#Lv.220#d | " + 별2 + " 190 | 레헬른 뒷골목 무법자의거리#l\r\n";
					selStr += "#L450003300##fc0xFF6799FF#Lv.221#d | " + 별2 + " 210 | 레헬른 야시장#l\r\n";
					selStr += "#L450003400##fc0xFF6799FF#Lv.223#d | " + 별2 + " 210 | 레헬른 무도회장#l\r\n";
					selStr += "#L450003440##fc0xFF6799FF#Lv.225#d | " + 별2 + " 210 | 레헬른 춤추는 구두점령지#l\r\n";
					selStr += "#L450003500##fc0xFF6799FF#Lv.226#d | " + 별2 + " 240 | 레헬른 시계탑1#l\r\n";
					selStr += "#L450003510##fc0xFF6799FF#Lv.226#d | " + 별2 + " 240 | 레헬른 시계탑2#l\r\n";
					selStr += "#L450003520##fc0xFF6799FF#Lv.226#d | " + 별2 + " 240 | 레헬른 시계탑3#l\r\n";
					selStr += "#L450003530##fc0xFF6799FF#Lv.226#d | " + 별2 + " 240 | 레헬른 시계탑4#l\r\n";
					selStr += "#L450003540##fc0xFF6799FF#Lv.226#d | " + 별2 + " 240 | 레헬른 시계탑5#l\r\n";
					selStr += "\r\n\r\n#e#r[신비의 숲 아르카나]#d#n\r\n";
					selStr += "#L450005100##fc0xFF6799FF#Lv.230#d | " + 별2 + " 280 | 풀잎 피리의 숲#l\r\n";
					selStr += "#L450005200##fc0xFF6799FF#Lv.233#d | " + 별2 + " 320 | 깊은 숲#l\r\n";
					selStr += "#L450005230##fc0xFF6799FF#Lv.235#d | " + 별2 + " 320 | 맹독의 숲#l\r\n";
					selStr += "#L450005500##fc0xFF6799FF#Lv.237#d | " + 별2 + " 360 | 다섯 갈래 동굴#l\r\n ";
					selStr += "\r\n\r\n#e#r[모라스]#d#n\r\n";
					selStr += "#L450006010##fc0xFF6799FF#Lv.236#d | " + 별2 + " 400 | 산호숲으로 가는길#l\r\n";
					selStr += "#L450006140##fc0xFF6799FF#Lv.238#d | " + 별2 + " 440 | 형님들 구역#l\r\n";
					selStr += "#L450006210##fc0xFF6799FF#Lv.239#d | " + 별2 + " 480 | 그림자가 춤추는 곳#l\r\n";
					selStr += "#L450006300##fc0xFF6799FF#Lv.241#d | " + 별2 + " 480 | 폐쇄구역#l\r\n ";
					selStr += "#L450006410##fc0xFF6799FF#Lv.245#d | " + 별2 + " 480 | 그날의 트뤼에페#l\r\n ";
					selStr += "\r\n\r\n#e#r[에스페라]#d#n\r\n";
					selStr += "#L450007010##fc0xFF6799FF#Lv.240#d | " + 별2 + " 560 | 생명이 시작되는 곳 2#l\r\n";
					selStr += "#L450007050##fc0xFF6799FF#Lv.242#d | " + 별2 + " 560 | 생명이 시작되는 곳 5#l\r\n";
					selStr += "#L450007100##fc0xFF6799FF#Lv.244#d | " + 별2 + " 600 | 거울빛에 물든 바다#l\r\n";
					selStr += "#L450007210##fc0xFF6799FF#Lv.248#d | " + 별2 + " 640 | 거울에 비친 빛의 신전#l\r\n";
					selStr += "\r\n\r\n#e#r[문브릿지]#d#n\r\n"
					selStr += "#L450009110##fc0xFF6799FF#Lv.250#d | " + 별2 + " 670 | 사상의 경계#l\r\n";
					selStr += "#L450009210##fc0xFF6799FF#Lv.252#d | " + 별2 + " 700 | 미지의 안개#l\r\n";
					selStr += "#L450009310##fc0xFF6799FF#Lv.254#d | " + 별2 + " 730 | 공허의 파도#l\r\n";
					selStr += "\r\n\r\n#e#r[테네브리스]#d#n\r\n"
					selStr += "#L450011420##fc0xFF6799FF#Lv.255#d | " + 별2 + " 760 | 고통의 미궁 내부1#l\r\n";
					selStr += "#L450011510##fc0xFF6799FF#Lv.257#d | " + 별2 + " 790 | 고통의 미궁 중심부#l\r\n";
					selStr += "#L450011600##fc0xFF6799FF#Lv.259#d | " + 별2 + " 820 | 고통의 미궁 최심부#l\r\n";
					selStr += "\r\n\r\n#e#r[리멘]#d#n\r\n";
					selStr += "#L450012030##fc0xFF6799FF#Lv.260#d | " + 별2 + " 850 | 세계의 눈물 하단#l\r\n";
					selStr += "#L450012100##fc0xFF6799FF#Lv.261#d | " + 별2 + " 850 | 세계의 눈물 중단#l\r\n";
					//selStr += "#L450012310##fc0xFF6799FF#Lv.262#d | " + 별2 + " 880 | 세계가 끝나는 곳 1-2#l\r\n";
					selStr += "#L450012430##fc0xFF6799FF#Lv.262#d | " + 별2 + " 880 | 세계가 끝나는 곳 2-4#l\r\n";
					selStr += "#L450012470##fc0xFF6799FF#Lv.264#d | " + 별2 + " 880 | 세계가 끝나는 곳 2-7#l\r\n";
					//selStr += "#L993072000##fc0xFF6799FF#Lv.263#d | " + 별2 + " 880 | 레지스탕스 함선 갑판#l\r\n";
					//selStr += "#L993072500##fc0xFF6799FF#Lv.264#d | " + 별2 + " 880 | 레지스탕스 함선 갑판6#l\r\n";
					break;

					case 4:
					selStr += "#fs11#\r\n사냥터의 #e#fc0xFF6799FF#어센틱포스 요구치#k#n와 #e#b몬스터의 평균 레벨#k#n 확인하고\r\n이동하시기 바랍니다.\r\n#fs11#";
					selStr += "\r\n#e#r[세르니움]#d#n\r\n";
					selStr += "#L410000530##fc0xFF6799FF#Lv.260#d | " + 별3 + " 30  | 해변 암석 지대2#l\r\n";
					selStr += "#L410000650##fc0xFF6799FF#Lv.260#d | " + 별3 + " 30  | 세르니움 동쪽 성벽2#l\r\n";
					selStr += "#L410000710##fc0xFF6799FF#Lv.260#d | " + 별3 + " 30  | 왕립 도서관2#l\r\n";
					selStr += "\r\n\r\n#e#r[불타는 세르니움]#d#n\r\n";
					selStr += "#L410000950##fc0xFF6799FF#Lv.265#d | " + 별3 + " 50 | 격전의 서쪽 성벽4#l\r\n";
					selStr += "#L410001000##fc0xFF6799FF#Lv.265#d | " + 별3 + " 50 | 격전의 동쪽 성벽3#l\r\n";
					selStr += "#L410000890##fc0xFF6799FF#Lv.265#d | " + 별3 + " 50 | 불타는 왕립 도서관6#l\r\n";
					selStr += "\r\n\r\n#e#r[아르크스]#d#n\r\n";
					selStr += "#L410003070##fc0xFF6799FF#Lv.270#d | " + 별3 + " 70 | 무법자들이 지배하는 황야 4#l\r\n";
					selStr += "#L410003140##fc0xFF6799FF#Lv.270#d | " + 별3 + " 70 | 낭만이 저무는 자동차 극장 6#l\r\n";
					selStr += "#L410003160##fc0xFF6799FF#Lv.270#d | " + 별3 + " 100 | 종착지 없는 횡단열차 2#l\r\n";
					selStr += "\r\n\r\n#e#r[오디움]#d#n\r\n"
					selStr += "#L410007005##fc0xFF6799FF#Lv.275#d | " + 별3 + " 130 | 성문으로 가는 길 4#l\r\n";
					selStr += "#L410007009##fc0xFF6799FF#Lv.275#d | " + 별3 + " 160 | 점령당한 골목 4#l\r\n";
					selStr += "#L410007014##fc0xFF6799FF#Lv.275#d | " + 별3 + " 180 | 볕 드는 실험실 3l\r\n";
					selStr += "#L410007017##fc0xFF6799FF#Lv.275#d | " + 별3 + " 200 | 잠긴 문 뒤 실험실 3#l\r\n";
					selStr += "\r\n\r\n#e#r[도원경]#d#n\r\n"
					selStr += "#L410007027##fc0xFF6799FF#Lv.275#d | " + 별3 + " 230 | 생기가 돌아오는 봄2#l\r\n";
					selStr += "#L410007030##fc0xFF6799FF#Lv.275#d | " + 별3 + " 260 | 빛이 약한 여름2 4#l\r\n";
					selStr += "#L410007033##fc0xFF6799FF#Lv.275#d | " + 별3 + " 280 | 색깔이 옅은 가을 2#1\r\n";
					selStr += "#L410007036##fc0xFF6799FF#Lv.275#d | " + 별3 + " 300 | 참혹한 흔적의 겨울 2#l\r\n";
					selStr += "\r\n\r\n#e#r[아르테리아]#d#n\r\n"
					selStr += "#L410007522##fc0xFF6799FF#Lv.280#d | " + 별3 + " 330 | 북쪽 외곽지역#l\r\n";
					selStr += "#L410007529##fc0xFF6799FF#Lv.280#d | " + 별3 + " 360 | 최하층 통로 3#l\r\n";
					selStr += "#L410007538##fc0xFF6799FF#Lv.280#d | " + 별3 + " 400 | 최상층 통로 2#l\r\n";
					selStr += "#L410007552##fc0xFF6799FF#Lv.280#d | " + 별3 + " 400 | 최상층 통로 6#l\r\n";
					selStr += "\r\n\r\n#e#r[카르시온]#d#n\r\n"
					selStr += "#L410007624##fc0xFF6799FF#Lv.285#d | " + 별3 + " 430 | 잔잔한 해안가 2#l\r\n";
					selStr += "#L410007644##fc0xFF6799FF#Lv.285#d | " + 별3 + " 460 | 어둠이 내리는 나무줄기 2#l\r\n";
					selStr += "#L410007662##fc0xFF6799FF#Lv.285#d | " + 별3 + " 500 | 숨이 멎어드는 동굴 3#l\r\n";
					selStr += "#L410007666##fc0xFF6799FF#Lv.285#d | " + 별3 + " 500 | 가라앉은 유적지 3#l\r\n";
					selStr += " ";
					break;
			}
			cm.sendSimpleS(selStr, 4);
		}
	} else if (status == 3) {
		ans_03 = selection;
		switch (ans_02) {
			case 1:
			case 2:
			case 3:
				cm.warp(ans_03, "sp");
				cm.dispose();
				break;
			case 4:
				cm.warp(ans_03, "sp");
				cm.dispose();
				break;
		}
	}
}

