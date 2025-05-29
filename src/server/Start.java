package server;

import client.DreamBreakerRank;
import client.MapleCharacter;
import client.SkillFactory;
import client.inventory.MapleInventoryIdentifier;
import constants.Connector.KoreaServer;

import constants.GameConstants;
import constants.ServerConstants;
import constants.programs.AdminTool;
import constants.programs.ControlUnit;
import database.DatabaseConnection;
import handling.MapleSaveHandler;
import handling.auction.AuctionServer;
import handling.cashshop.CashShopServer;
import handling.channel.ChannelServer;
import handling.channel.MapleGuildRanking;
import handling.channel.handler.ChatHandler;
import handling.channel.handler.MatrixHandler;
import handling.channel.handler.UnionHandler;
import handling.login.LoginInformationProvider;
import handling.login.LoginServer;
import handling.world.World;
import server.control.MapleEtcControl;
import server.control.MapleIndexTimer;
import server.events.MapleOxQuizFactory;
import server.field.boss.FieldSkillFactory;
import server.field.boss.lucid.Butterfly;
import server.field.boss.will.SpiderWeb;
import server.life.*;
import server.maps.MapleMap;
import server.marriage.MarriageManager;
import server.quest.MapleQuest;
import server.quest.QuestCompleteStatus;
import tools.CMDCommand;
import tools.packet.BossRewardMeso;
import tools.packet.CField;
import tools.packet.SLFCGPacket;

import java.awt.*;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.atomic.AtomicInteger;
import security.connector.ConnectorServer;
import security.connector.ConnectorServerHandler;
import security.crc.CRCServer;

public class Start {

    public static transient ScheduledFuture<?> boss;
    public static long startTime = System.currentTimeMillis();

    public static final Start instance = new Start();

    public static AtomicInteger CompletedLoadingThreads = new AtomicInteger(0);

    public void run() throws InterruptedException {

        System.setProperty("nashorn.args", "--no-deprecation-warning");

        DatabaseConnection.init();
        Connection con = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {

            try {
                con = DatabaseConnection.getConnection();
                ps = con.prepareStatement("SELECT * FROM auth_server_channel_ip");
                rs = ps.executeQuery();
                while (rs.next()) {
                    ServerProperties.setProperty(rs.getString("name") + rs.getInt("channelid"), rs.getString("value"));
                }
                rs.close();
                ps.close();
                con.close();
            } catch (SQLException ex) {
                ex.printStackTrace();
                System.exit(0);
            } finally {
                try {
                    if (con != null) {
                        con.close();
                    }
                    if (ps != null) {
                        ps.close();
                    }
                    if (rs != null) {
                        rs.close();
                    }
                } catch (SQLException se) {
                    se.printStackTrace();
                }
            }
            if (Boolean.parseBoolean(ServerProperties.getProperty("world.admin"))) {
                ServerConstants.Use_Fixed_IV = false;
                System.out.println("[!!! Admin Only Mode Active !!!]");
            }
            System.setProperty("wz", "wz");
            try {
                con = DatabaseConnection.getConnection();
                ps = con.prepareStatement("UPDATE accounts SET loggedin = 0, allowed = 0");
                ps.executeUpdate();
                ps.close();
                con.close();
            } catch (SQLException ex) {
                throw new RuntimeException("[EXCEPTION] Please check if the SQL server is active.");
            } finally {
                try {
                    if (con != null) {
                        con.close();
                    }
                    if (ps != null) {
                        ps.close();
                    }
                    if (rs != null) {
                        rs.close();
                    }
                } catch (SQLException se) {
                    se.printStackTrace();
                }
            }
            World.init();
            Timer.WorldTimer.getInstance().start();
            Timer.EtcTimer.getInstance().start();
            Timer.MapTimer.getInstance().start();
            Timer.MobTimer.getInstance().start();
            Timer.CloneTimer.getInstance().start();
            Timer.EventTimer.getInstance().start();
            Timer.BuffTimer.getInstance().start();
            Timer.PingTimer.getInstance().start();
            Timer.ShowTimer.getInstance().start();

            ServerConstants.mirrors.add(new DimentionMirrorEntry("후원 / 홍보", "", 260, 1, 1, "1530054", new ArrayList<>()));
            ServerConstants.mirrors.add(new DimentionMirrorEntry("랭킹", "", 260, 2, 2, "9076004", new ArrayList<>()));
            ServerConstants.mirrors.add(new DimentionMirrorEntry("강화", "", 260, 3, 3, "9062882", new ArrayList<>()));
            ServerConstants.mirrors.add(new DimentionMirrorEntry("성장 시스템", "", 260, 4, 4, "9063040", new ArrayList<>()));
            ServerConstants.mirrors.add(new DimentionMirrorEntry("유니온", "", 260, 6, 6, "9010106", new ArrayList<>()));
            ServerConstants.mirrors.add(new DimentionMirrorEntry("닉변", "", 260, 7, 7, "9062010", new ArrayList<>()));
            ServerConstants.mirrors.add(new DimentionMirrorEntry("직변", "", 260, 8, 8, "9062583", new ArrayList<>()));
            ServerConstants.mirrors.add(new DimentionMirrorEntry("전투", "", 260, 9, 9, "9000197", new ArrayList<>()));
            
            ServerConstants.WORLD_UI = ServerProperties.getProperty("login.serverUI");
            ServerConstants.ChangeMapUI = Boolean.parseBoolean(ServerProperties.getProperty("login.ChangeMapUI"));
            DreamBreakerRank.LoadRank();
            JamsuPoint();
            Butterfly.load();
            SpiderWeb.load();
            Setting.CashShopSetting();
            AllLoding allLoding = new AllLoding();
            allLoding.start();
            System.out.println("[Loading LOGIN]");
            LoginServer.run_startup_configurations();
            System.out.println("[Loading CHANNEL]");
            ChannelServer.startChannel_Main();
            System.out.println("[Loading CASH SHOP]");
            CashShopServer.run_startup_configurations();
            Runtime.getRuntime().addShutdownHook(new Thread(new Shutdown()));
            PlayerNPC.loadAll();
            LoginServer.setOn();
            Timer.WorldTimer.getInstance().register(new MapleEtcControl(), 1000);
            EliteMonsterGradeInfo.loadFromWZData();
            AffectedOtherSkillInfo.loadFromWZData();
            InnerAbillity.getInstance().load();
            //Setting.setting();
            //Setting.setting2();
            Setting.settingGoldApple();
            Setting.settingNeoPos();
            BossRewardMeso.Setting();
            Timer.WorldTimer.getInstance().register(new MapleIndexTimer(), 1000);
            Timer.WorldTimer.getInstance().register(new MapleSaveHandler(), 10000L);
            Timer.WorldTimer.getInstance().register(new ResetTask(), 1000L);
            
            // CONNECTOR 소스 [S]
            KoreaServer.run_startup_configurations();
            try {
                ConnectorServer.run_startup_configurations();
            } catch (Exception ex) {
                ex.printStackTrace();
            }
            // CONNECTOR 소스 [E]
            
            // CRC 소스 [S]
            try {
                CRCServer.run_startup_configurations();
            } catch (Exception ex) {
                ex.printStackTrace();
            }
            // CRC 소스 [E] 

            new ControlUnit().setVisible(true);
            
            ServerConstants.isOpen = true;
        } catch (Exception ex2) {
        }
    }

    public static void JamsuPoint() {
        Timer.WorldTimer tMan = Timer.WorldTimer.getInstance();
        Runnable r = new Runnable() {
            public void run() {
                for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                    for (MapleCharacter mch : cserv.getPlayerStorage().getAllCharacters().values()) {
                        if (mch.getMapId() == 993236200 || mch.getMapId() == 993215603) {
                            if (mch.isFirst == false) {
                                mch.getClient().send((CField.UIPacket.detailShowInfo("잠수 포인트 적립을 시작합니다.", 3, 20, 20)));
                                mch.getClient().getSession().writeAndFlush(SLFCGPacket.playSE("Sound/MiniGame.img/14thTerra/reward"));
                                mch.isFirst = true;
                            }
                            if (mch.getClient().getKeyValue("jamsupoint") == null) {
                                mch.getClient().setKeyValue("jamsupoint", "0");
                            }
                            mch.JamsuTime++;
                            if (mch.JamsuTime >= 60) {//900 = sec
                                mch.JamsuTime = 0;
                                mch.Jamsu5m++;
                                long point = mch.getPlayer().getKeyValue(501368, "point");
                                point += 2;
                                mch.getPlayer().setKeyValue(501368, "point", point + "");
                                if (mch.Jamsu5m >= 5) {
                                    mch.getClient().send((CField.UIPacket.detailShowInfo("잠수 포인트가 적립되었습니다. 잠수 포인트 : " + mch.getPlayer().getKeyValue(501368, "point"), 3, 20, 20)));
                                    mch.Jamsu5m = 0;
                                }
                            }
                        } else {
                            mch.JamsuTime = 0;
                            mch.isFirst = false;

                        }
                    }
                }
            }
        };
        tMan.register(r, 1000);
    }

    private class AllLoding extends Thread {

        private AllLoding() {
        }

        public void run() {
            LoadingThread SkillLoader = new LoadingThread(() -> SkillFactory.load(), "SkillLoader", this);
            LoadingThread QuestLoader = new LoadingThread(() -> {
                MapleQuest.initQuests();
                MapleLifeFactory.loadQuestCounts();
            }, "QuestLoader", this);
            LoadingThread QuestCustomLoader = new LoadingThread(() -> {
                MapleLifeFactory.loadNpcScripts();
                QuestCompleteStatus.run();
            }, "QuestCustomLoader", this);
            LoadingThread ItemLoader = new LoadingThread(() -> {
                MapleInventoryIdentifier.getInstance();
                CashItemFactory.getInstance().initialize();
                MapleItemInformationProvider.getInstance().runEtc();
                MapleItemInformationProvider.getInstance().runItems();
                AuctionServer.run_startup_configurations();
            }, "ItemLoader", this);
            LoadingThread GuildRankingLoader = new LoadingThread(() -> MapleGuildRanking.getInstance().load(), "GuildRankingLoader", this);
            LoadingThread EtcLoader = new LoadingThread(() -> {
                LoginInformationProvider.getInstance();
                RandomRewards.load();
                MapleOxQuizFactory.getInstance();
                UnionHandler.loadUnion();
            }, "EtcLoader", this);
            LoadingThread MonsterLoader = new LoadingThread(() -> {
                MobSkillFactory.getInstance();
                FieldSkillFactory.getInstance();
                MobAttackInfoFactory.getInstance();
            }, "MonsterLoader", this);
            LoadingThread EmoticonLoader = new LoadingThread(() -> ChatEmoticon.LoadEmoticon(), "EmoticonLoader", this);
            LoadingThread MatrixLoader = new LoadingThread(() -> MatrixHandler.loadCore(), "MatrixLoader", this);
            LoadingThread MarriageLoader = new LoadingThread(() -> MarriageManager.getInstance(), "MarriageLoader", this);
            LoadingThread[] LoadingThreads = {SkillLoader, QuestLoader, QuestCustomLoader, ItemLoader, GuildRankingLoader, EtcLoader, MonsterLoader, MatrixLoader, MarriageLoader, EmoticonLoader};
            for (Thread t : LoadingThreads) {
                t.start();
            }
            synchronized (this) {
                try {
                    wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            while (Start.CompletedLoadingThreads.get() != LoadingThreads.length) {
                synchronized (this) {
                    try {
                        wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
            World.Guild.load();
            timeBossHottime();

            GameConstants.isOpen = true;
            System.out.println("[Fully Initialized in " + ((System.currentTimeMillis() - Start.startTime) / 1000L) + " seconds]");
            if (!ServerConstants.ConnectorSetting) {
                CMDCommand.main();
            }
        }
    }

    private static class LoadingThread extends Thread {

        protected String LoadingThreadName;

        private LoadingThread(Runnable r, String t, Object o) {
            super(new NotifyingRunnable(r, o, t));
            this.LoadingThreadName = t;
        }

        public synchronized void start() {
            System.out.println("[Loading...] Started " + this.LoadingThreadName + " Thread");
            super.start();
        }
    }

    private static class NotifyingRunnable implements Runnable {

        private String LoadingThreadName;

        private long StartTime;

        private Runnable WrappedRunnable;

        private final Object ToNotify;

        private NotifyingRunnable(Runnable r, Object o, String name) {
            this.WrappedRunnable = r;
            this.ToNotify = o;
            this.LoadingThreadName = name;
        }

        public void run() {
            this.StartTime = System.currentTimeMillis();
            this.WrappedRunnable.run();
            System.out.println("[Loading Completed] " + this.LoadingThreadName + " | Completed in " + (System.currentTimeMillis() - this.StartTime) + " Milliseconds. (" + (Start.CompletedLoadingThreads.get() + 1) + "/10)");
            synchronized (this.ToNotify) {
                Start.CompletedLoadingThreads.incrementAndGet();
                this.ToNotify.notify();
            }
        }
    }

    public static class Shutdown implements Runnable {

        public void run() {
            ShutdownServer.getInstance().run();
        }
    }

    public static void main(String[] args) throws IOException, InterruptedException {
        instance.run();
        //AddCashShop.main(args);
    }

    public static void timeBossHottime() {
        final int[] hour = ServerConstants.hour;
        final int pice = ServerConstants.pice;

        if (boss == null) {
            Calendar cal = Calendar.getInstance();
            long time = cal.getTimeInMillis();
            long schedulewait = 0;
            if (time > System.currentTimeMillis()) {
                schedulewait = time - System.currentTimeMillis();
            } else {
                while (true) {
                    cal.add(Calendar.SECOND, 1);
                    for (int ho : hour) {
                        if (cal.getTimeInMillis() > System.currentTimeMillis() && cal.getTime().getHours() == (ho - 1) && cal.getTime().getMinutes() >= 50 && cal.getTime().getSeconds() == 0) {
                            schedulewait = cal.getTimeInMillis() - System.currentTimeMillis();
                            break;
                        }
                    }
                    if (schedulewait > 0) {
                        break;
                    }
                }
            }

            boss = Timer.WorldTimer.getInstance().register(new Runnable() {
                public void run() {
                    Date nowtime = new Date();
                    for (int ho : hour) {
                        if (ho <= 0) {
                            ho = 24;
                        }
                        if (nowtime.getMinutes() >= 50 && nowtime.getMinutes() <= 59 && nowtime.getHours() == (ho - 1)) {
                            for (ChannelServer ch : ChannelServer.getAllInstances()) {
                                for (MapleCharacter chr : ch.getPlayerStorage().getAllCharacters().values()) {
                                    chr.sethottimeboss(true);
                                }
                            }
                            //World.Broadcast.broadcastMessage(CWvsContext.serverNotice(6,"", (60 - nowtime.getMinutes()) + "분후 월드 보스가 시작됩니다. 월드 보스 NPC 를 통해 어서 입장하세요."));
                        } else if (nowtime.getMinutes() == 0 && nowtime.getHours() == (ho == 24 ? 0 : ho)) {
                            for (ChannelServer ch : ChannelServer.getAllInstances()) {
                                if (ch.getChannel() == 1) {
                                    MapleMonster mob = MapleLifeFactory.getMonster(ServerConstants.worldboss);
                                    ch.getMapFactory().getMap(ServerConstants.worldbossmap).spawnMonsterOnGroundBelow(mob, new Point(-161, -181));
                                }
                                if (ch.getChannel() == 2) {
                                    MapleMonster mob = MapleLifeFactory.getMonster(ServerConstants.worldboss);
                                    ch.getMapFactory().getMap(ServerConstants.worldbossmap).spawnMonsterOnGroundBelow(mob, new Point(-161, -181));
                                }
                                if (ch.getChannel() == 3) {
                                    MapleMonster mob = MapleLifeFactory.getMonster(ServerConstants.worldboss);
                                    ch.getMapFactory().getMap(ServerConstants.worldbossmap).spawnMonsterOnGroundBelow(mob, new Point(-161, -181));
                                }
                                if (ch.getChannel() == 4) {
                                    MapleMonster mob = MapleLifeFactory.getMonster(ServerConstants.worldboss);
                                    ch.getMapFactory().getMap(ServerConstants.worldbossmap).spawnMonsterOnGroundBelow(mob, new Point(-161, -181));
                                }
                                for (MapleCharacter chr : ch.getPlayerStorage().getAllCharacters().values()) {
                                    chr.sethottimeboss(false);
                                    chr.sethottimebossattackcheck(false);
                                    chr.sethottimebosslastattack(false);
                                }
                            }
                            // World.Broadcast.broadcastMessage(CWvsContext.serverNotice(6, "", "[Fancy]월드 보스가 시작되었습니다. 마지막일격을 가해 추가아이템을 획득해보세요!"));
                        } else if (nowtime.getMinutes() == 30 && nowtime.getHours() == (ho == 24 ? 0 : ho)) {
                            MapleMap map = ChannelServer.getInstance(1).getMapFactory().getMap(ServerConstants.worldbossmap);
                            if (map != null) {
                                for (MapleCharacter chr : map.getCharactersThreadsafe()) {
                                    map.resetFully();
                                    // chr.dropMessage(6, "월드 보스가 종료 됐습니다.");
                                    if (ServerConstants.worldbossmap == chr.getMapId()) {
                                        chr.sethottimeboss(false);
                                        chr.getClient().getSession().writeAndFlush(CField.sendDuey((byte) 28, null, null));
                                        //DueyHandler.addNewItemToDb(failitem, pice, chr.getId(), "[실패]", "월드보스 보상이 지급 됐습니다.", true);
                                    }
                                }
                            }
                            ChannelServer.getInstance(1).getMapFactory().getMap(ServerConstants.worldbossmap).resetNPCs();
                        }
                    }
                }
            }, 1000 * 60, schedulewait);
        }
    }
}
