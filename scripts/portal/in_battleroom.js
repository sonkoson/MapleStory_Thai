function enter(pi) {
    if (pi.getQuestRecord(100188).getCustomData() != "complete") {
        pi.getPlayer().dropMessage(5, "��庥ó ���� ���ǽø� ���� ���� ����Ʈ�� �Ϸ��� �ּ���.");
    } else {
        pi.openNpc(9062147, "adventure_drill");
    }
}