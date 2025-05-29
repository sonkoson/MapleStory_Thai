/*
This file is part of the OdinMS Maple Story Server
Copyright (C) 2008 ~ 2010 Patrick Huy <patrick.huy@frz.cc> 
Matthias Butz <matze@odinms.de>
Jan Christian Meyer <vimes@odinms.de>
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License version 3
as published by the Free Software Foundation. You may not use, modify
or distribute this program under any other version of the
GNU Affero General Public License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/*
 * Quest ID : 1053
 * Quest Name : ���� ���� �ϱ�
 * Quest Progress Info : �������� ������ �� �ֵ��� ��ƿ����ȣ�� �̵� ���� �ֽŴٰ� �ϼ̴�.
 * Quest End Info : ���� �������� �����غ���?
 * Start NPC : 9010000
 * 
 * @author T-Sun
 *
 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1 && type != 1 && type != 11) {
        status++;
    } else {
        if ((type == 1 || type == 11) && mode == 1) {
            status++;
            selection = 1;
        } else if ((type == 1 || type == 11) && mode == 0) {
            status++;
            selection = 0;
        } else {
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendYesNo("�������� ������ ������ �Ǽ̱���. ������ ��ƿ���������� �����Ͻ� �� ������, Ư���� ������ ���� �������� �����Ͻ� �� �ֵ��� ��ƿ���������� �̵����ѵ帱 �� �ֽ��ϴ�. ���� �̵����� �帱���?");
    }  else if (status == 1) {
        if (selection == -1) {
            qm.warp(120000000);
        }
        qm.forceStartQuest();
        qm.forceCompleteQuest();
        qm.dispose();
    }
}
