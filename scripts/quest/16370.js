importPackage(Packages.tools.packet);
importPackage(java.lang);
importPackage(java.util);
importPackage(java.awt);
importPackage(Packages.server);

var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
        return;
    }
    if (mode == 0) {
        if (status == 11) {
            qm.sendOkS("���� ���� ���� �� �������� ���ڴµ�... \r\n������ ������ �ٲ�� ������!\r\n\r\n\r\n#b#e�� �̺�Ʈ �Ⱓ\r\n - 2021�� 6�� 16�� 23�� 59�б���#n", 4, 9062508);
            qm.dispose();
            return;
        }
        status--;
    }
    if (mode == 1) {
        d = status;
        status++;
    }


    if (status == 0) {
        qm.sendNextS("#b#h0##k��! �ȳ��ϼ���!\r\n���� �����ְڴٰ� ���ּż� ���� �����ؿ�!", 4, 9062508);
    } else if (status == 1) {
        qm.sendNextPrevS("���� ���� #r#e���� �ִ� �� ģ��#n#k���� ����� ..�� �ູ�� ������� ������ �ſ���!", 4, 9062508);
    } else if (status == 2) {
        qm.sendNextPrevS("�̸��Ͽ�!\r\n\r\n#fs16##r#e<���� �ö��> ������Ʈ!", 4, 9062508);
    } else if (status == 3) {
        qm.sendNextPrevS("���� �ִ� ģ������ ����� ����� ���� �����ؿ�!\r\n�ٷ� #r#e������ �޻�#n#k�� �ִ� �ſ���!\r\n\r\n���� �Ǿ�� ���� #b#eƯ���� ����#n#k�� �帱�Կ�!\r\n\r\n\r\n#r �� ���� �ö���� �����Ͽ� ���� �Ǿ�� ������ ���� \r\n   �� �ֽ��ϴ�.", 4, 9062508);
    } else if (status == 4) {
        qm.sendNextPrevS("�޻��� ��� �ֳİ�?\r\n#b�Ϸ翡 �� ��#k, ���� ���� ���� ���ѷ��� ��� ������ ���� ���� ã�ƿ� #b#e<�޻� �ֱ�> ��ư#n#k�� �����ּ���!\r\n\r\n\r\n#r �� ���� �ö���� ���� ���� ���� ���ѷ��� �޼��� \r\n   ĳ���͸� ������ �� �ֽ��ϴ�.", 4, 9062508);
    } else if (status == 5) {
        qm.sendNextPrevS("�׷����� ��� ���� ���� �ٰ� ���� �� ������ ����� ģ������ �Ⱦ��� ���� �ְ���?\r\n\r\n��� �ɵ��� ���� Ȱ¦ �ǿ�� �� #e#r�Ϸ翡 �� ��#k#n�̸� ����� �� ���ƿ�~!\r\n\r\n\r\n#r �� ���� �ö���� ����� �Ϸ翡 �� ���� ������ �� \r\n   �ֽ��ϴ�.", 4, 9062508);
    } else if (status == 6) {
        qm.sendNextPrevS("��! ���� �޻��� ���� �غ� ���� ���� �ɵ鵵 �־!\r\n#b#e���� 3���� �ɺ�����#n#k�� �޺��� �ް� �; ������ ���̷� ���� ���� �ſ���!\r\n\r\n\r\n#r �� ���� �ö���� ���� ����� ���� 10�ÿ� 3���� \r\n    �رݵ˴ϴ�.", 4, 9062508);
    } else if (status == 7) {
        qm.sendNextPrevS("�׸��� #r#e�� ��° ��#k#n�� �� ������ #e#b�� ���� ����#n#k��\r\n#e#b�� ���� ��ų ����Ʈ#n#k�� �帱�Կ�!\r\n\r\n\r\n#r �� ���� �ö�� ���� �� 1/1/3���� ���� ��ų ����Ʈ�� \r\n   ���� �� �ֽ��ϴ�.", 4, 9062508);
    } else if (status == 8) {
        qm.sendNextPrevS("#b#e<���� ��ų>#n#k�� ���� �ູ�� ���� �е鸸\r\n����Ͻ� �� �ִ� #bƯ���� �ɷ�ġ#k ��ų�̿���!\r\n���� ��ų ����Ʈ�� �ɷ�ġ�� �÷�������!\r\n\r\n\r\n#r �� ȹ���� ���� ��ų ����Ʈ�� �ɷ�ġ�� �ø� �� �ֽ��ϴ�.", 4, 9062508);
    } else if (status == 9) {
        qm.sendNextPrevS("���ݺ��� ȭ�� ���� #b�� �˶��� ������#k �Ǵ� #b��#k�� ���� ������\r\n#b#e<���� �ö��>#k#n ���� ���¸� Ȯ���Ͻ� �� �־!", 4, 9062508);
    } else if (status == 10) {
        qm.sendNextPrevS("�� ��ĥ�� �̰��� ���ߴ� �޻��� �ּ��ּ� ��� �ѷ��ξ���\r\nģ���� #r#e�� ��� �� ����#k#n�� �ų��׿�!!\r\n\r\n\r\n#r�� ���� ������Ʈ �߾ӿ� �ִ� �ɹ������� '���� ��'����\r\n���� �ɾ� �����ּ���. ", 4, 9062508);
    } else if (status == 11) {
        qm.sendNextPrevS("����~ ������ �޻�~ �ٸ� �� ���� ģ���鵵 � ���\r\n�Բ� �ε巯�� ���ٶ��� �����ϸ� ���ھ~!!! ", 4, 9062508);
    } else if (status == 12) {
        qm.getPlayer().setKeyValue(501387, "flower", "1");
        qm.getClient().setKeyValue("BloomingTuto", "2");
        qm.forceCompleteQuest();
        qm.getClient().send(CField.UIPacket.openUI(1296));
		qm.getClient().send(CField.setMapOBJ("all", 0, 0, 0));
		qm.getClient().send(CField.setMapOBJ("0", 1, 0, 0));//�� Ȱ��ȭ
        qm.dispose();
    }
}

function statusplus(millsecond) {
    qm.getClient().send(SLFCGPacket.InGameDirectionEvent("", 0x01, millsecond));
}