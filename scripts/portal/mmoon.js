
function enter(pi) {
     if (pi.getQuestStatus(3519) == 2) {
          pi.warp(271000000, 0);
          pi.playerMessage(5, "�ð��� �� ������ ���Դ�. ����� �����?");
if (pi.getQuestStatus(31102) == 1) {
pi.openNpc(2143002);
}
          return; 
     }
        pi.playerMessage(5, "�� �� �ʸӿ��� ������ ������?");
 	pi.playPortalSE();    
}
