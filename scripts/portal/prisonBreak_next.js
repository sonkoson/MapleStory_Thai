
function enter(pi) {
var boss = Packages.server.Luna.MapleLunaFactory.getMonster(9300454);
    if (pi.getMonsterCount(pi.getMapId()) == 0) {
			if(pi.getMapId() == 921160200){
				for(var i =0; i<6; i++){
					pi.resetMap(921160300 + (10*i));
				}
			}
			pi.resetMap(pi.getMapId() + 100);
	    	pi.warpParty(pi.getMapId() + 100);
			return;
    } else {
		if (pi.getMapId() == 921160350) {
			pi.resetMap(pi.getMapId() + 50);
	    	pi.warpParty(pi.getMapId() + 50);
			return;
		}
		if (pi.getMapId() == 921160600 && pi.getPlayer().getEventInstance().getProperty("stage5") != null) {
			pi.resetMap(pi.getMapId() + 100);
	    	pi.warpParty(pi.getMapId() + 100);
			//pi.getPlayer().getMap().spawnMonsterOnGroundBelow(boss, new java.awt.Point(-954, -181));
			return;
		} else if (pi.getMapId() == 921160600 && pi.getPlayer().getEventInstance().getProperty("stage5") == null){
			pi.getPlayer().dropMessage(5, "������ ���� ���谡���� ��� �����ּ���.");
			return;
		} else {
			pi.getPlayer().dropMessage(5, "�ʵ��� ���� ���� ó�����ּ���.");
			return;
		}
	}
}