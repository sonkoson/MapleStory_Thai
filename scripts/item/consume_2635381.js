/*
		ERROR 님 으로 인해 제작된 후원포인트 지급 아이템입니다.
*/
importPackage(Packages.client.items);
importPackage(Packages.server);
importPackage(Packages.database);
importPackage(Packages.client);
importPackage(java.lang);
importPackage(Packages.constants);
importPackage(Packages.server.maps);
importPackage(Packages.tools.packet);
importPackage(Packages.server);
importPackage(java.util);

importPackage(Packages.client.inventory);
importPackage(Packages.packet.creators);

var enter = "\r\n";
var seld = -1;
var seldreward = -1;
var seld2 = -1;
var seld3 = -1;

var etc;
var donation;
var firstdon = false;

var year, month, date2, date, day

var reward = 0;
var modify = "";
var modifychr;
var seldgrade = 0;

function send(a, b , e) {
    var con = DatabaseConnection.getConnection();
    var ps = con.prepareStatement("INSERT INTO donation (name, sum, comment, date, cid, count) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE sum = sum + VALUES(sum), date = VALUES(date), count = count + 1");
    ps.setString(1, a);
    ps.setInt(2, b);
    ps.setString(3, e);
    ps.setString(4, date);
    ps.setInt(5, MapleCharacterUtil.getIdByName(a));
    ps.executeUpdate();
    ps.close();
}

function start() {
    status = -1;
    action(1, 1, 0);
}

function action(mode, type, selection) {
    if (mode < 0) {
        cm.dispose();
    return;
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
		var name = cm.getPlayer().getName();
	    var sum = "10000";
	    var comment = "1만 후포상자";
	    var count = 0;
		count++;
	    cm.sendOk("#r[포인트] 10000P 지급되었습니다.\r\n 현재 "+ count +"회 사용했습니다.");
        cm.gainItem(2635381, -1);
        cm.getPlayer().gainDonationPoint(10000);
		chr.setKeyValue(501215, "point", chr.getKeyValue(501215, "point") + 10);
		send(name, sum, comment, count);
	    cm.dispose();
        }
    }
}
//		if (cm.gainItem(2635381, -1); 
//		cm.getPlayer().setKeyValue(501661, "point", "0");
 //       cm.getPlayer().getKeyValue(501661, "point", "10");