


/*

    * 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

    * (Guardian Project Development Source Script)

    캐논슈터 에 의해 만들어 졌습니다.

    엔피시아이디 : 9062507

    엔피시 이름 : 돌의 정령

    엔피시가 있는 맵 : 블루밍 포레스트 : 돌의 정령을 도와달람 입장 (993192700)

    엔피시 설명 : 돌의 정령을 도와달람!


*/

var status = -1;
var sel = 0;
var higher = false;
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
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
        if (cm.getPlayer().getMapId() == 993192800) {
            cm.sendYesNoS("#b정말.. 나갈거냠...?", 4, 9062507);
        } else {
            cm.dispose();
        }
    } else if (status == 1) {
        cm.warp(993192701, 0);
        cm.dispose();
    }
}
