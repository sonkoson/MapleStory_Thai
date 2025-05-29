package constants.programs;

import client.MapleCharacter;
import client.MapleClient;
import client.SkillFactory;
import constants.GameConstants;
import constants.ServerConstants;
import database.DatabaseConnection;
import handling.RecvPacketOpcode;
import handling.SendPacketOpcode;
import handling.channel.ChannelServer;
import handling.world.World;
import java.awt.Dimension;
import java.awt.Toolkit;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Calendar;
import java.util.concurrent.ScheduledFuture;
import javax.swing.DefaultListModel;
import javax.swing.JOptionPane;

import server.MapleItemInformationProvider;
import server.Setting;
import server.ShutdownServer;
import tools.FileoutputUtil;
import tools.packet.CField;
import tools.packet.CField.NPCPacket;
import tools.packet.CField.UIPacket;
import tools.packet.CWvsContext;
import security.crc.CRCServerHandler;

public class ControlUnit extends javax.swing.JFrame {

    private static final long serialVersionUID = -3687743956730844060L;
    private static int connectUser = 0;
    private long allMeso;
    private int allHc, allH2c;
    private MapleClient client;

    public ControlUnit() {
        Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
        this.setLocation((screenSize.width - 1505) / 2, (screenSize.height - 576) / 2);
        initComponents();
        서버정보불러오기();
        환율정보();
        벤();
        this.setTitle("[KMS Project] ControlUnit :: Ver 1.2." + ServerConstants.MAPLE_VERSION);
    }

    public static void 동접추가(String a) {
        if (!현재접속자.contains(a)) {
            현재접속자.addElement(a);
            동시접속자.setModel(현재접속자);
            connectUser++;
            onlineCheck.setText(connectUser + "명");
        }
    }

    public static void 동접제거(String a) {
        if (현재접속자.contains(a)) {
            현재접속자.removeElement(a);
            동시접속자.setModel(현재접속자);
            connectUser--;
            onlineCheck.setText(connectUser + "명");
        }
    }

    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jButton1 = new javax.swing.JButton();
        jTextField1 = new javax.swing.JTextField();
        jTextField2 = new javax.swing.JTextField();
        jTextField3 = new javax.swing.JTextField();
        jButton2 = new javax.swing.JButton();
        jTextField4 = new javax.swing.JTextField();
        jButton3 = new javax.swing.JButton();
        jTextField5 = new javax.swing.JTextField();
        jTextField6 = new javax.swing.JTextField();
        jTextField7 = new javax.swing.JTextField();
        jButton4 = new javax.swing.JButton();
        jTextField8 = new javax.swing.JTextField();
        jTextField9 = new javax.swing.JTextField();
        exp = new javax.swing.JTextField();
        meso = new javax.swing.JTextField();
        drop = new javax.swing.JTextField();
        noticMessage = new javax.swing.JTextField();
        jButton9 = new javax.swing.JButton();
        jButton10 = new javax.swing.JButton();
        jButton12 = new javax.swing.JButton();
        jButton14 = new javax.swing.JButton();
        hottime = new javax.swing.JTextField();
        jButton13 = new javax.swing.JButton();
        jButton16 = new javax.swing.JButton();
        jButton17 = new javax.swing.JButton();
        jButton18 = new javax.swing.JButton();
        serverMessage = new javax.swing.JTextField();
        mesos = new javax.swing.JLabel();
        jScrollPane3 = new javax.swing.JScrollPane();
        ban = new javax.swing.JList();
        jButton19 = new javax.swing.JButton();
        jButton20 = new javax.swing.JButton();
        jScrollPane4 = new javax.swing.JScrollPane();
        동시접속자 = new javax.swing.JList();
        jLabel17 = new javax.swing.JLabel();
        online = new javax.swing.JLabel();
        onlineCheck = new javax.swing.JLabel();
        jLabel19 = new javax.swing.JLabel();
        mesos1 = new javax.swing.JLabel();
        jButton34 = new javax.swing.JButton();
        jButton35 = new javax.swing.JButton();
        mesos2 = new javax.swing.JLabel();
        jButton6 = new javax.swing.JButton();
        jButton36 = new javax.swing.JButton();
        jButton7 = new javax.swing.JButton();

        setResizable(false);
        addWindowListener(new java.awt.event.WindowAdapter() {
            public void windowClosed(java.awt.event.WindowEvent evt) {
                formWindowClosed(evt);
            }
        });

        jButton1.setText("후원");
        jButton1.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton1ActionPerformed(evt);
            }
        });

        jTextField1.setText("닉네임");

        jTextField2.setText("포인트");

        jTextField3.setText("닉네임");

        jButton2.setText("GM 설정");
        jButton2.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton2ActionPerformed(evt);
            }
        });

        jTextField4.setText("닉네임");

        jButton3.setText("아이템 지급");
        jButton3.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton3ActionPerformed(evt);
            }
        });

        jTextField5.setText("아이템코드,갯수");

        jTextField6.setText("닉네임");

        jTextField7.setText("메소");

        jButton4.setText("메소 지급");
        jButton4.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton4ActionPerformed(evt);
            }
        });

        jTextField8.setText("닉네임(해제는 계정)");

        jTextField9.setText("사유");

        exp.setText("경험치");

        meso.setText("메소");

        drop.setText("드롭");
        drop.setPreferredSize(new java.awt.Dimension(14, 26));
        drop.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                dropActionPerformed(evt);
            }
        });

        noticMessage.setText("공지사항");
        noticMessage.setMaximumSize(new java.awt.Dimension(6, 21));
        noticMessage.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                noticMessageActionPerformed(evt);
            }
        });

        jButton9.setText("팝업");
        jButton9.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton9ActionPerformed(evt);
            }
        });

        jButton10.setText("분홍");
        jButton10.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton10ActionPerformed(evt);
            }
        });

        jButton12.setText("NPC");
        jButton12.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton12ActionPerformed(evt);
            }
        });

        jButton14.setForeground(new java.awt.Color(153, 153, 153));
        jButton14.setText("서버정보 변경");
        jButton14.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton14ActionPerformed(evt);
            }
        });

        hottime.setText("아이템 코드,갯수");

        jButton13.setText("핫타임 지급");
        jButton13.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton13ActionPerformed(evt);
            }
        });

        jButton16.setText("모두 로그인 서버로 이동");
        jButton16.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton16ActionPerformed(evt);
            }
        });

        jButton17.setText("서버 종료");
        jButton17.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton17ActionPerformed(evt);
            }
        });

        jButton18.setText("모두 마을로 이동");
        jButton18.setToolTipText("");
        jButton18.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton18ActionPerformed(evt);
            }
        });

        serverMessage.setText("서버 상단 메세지");
        serverMessage.setToolTipText("");
        serverMessage.setMaximumSize(new java.awt.Dimension(6, 21));
        serverMessage.setPreferredSize(new java.awt.Dimension(111, 26));
        serverMessage.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                serverMessageActionPerformed(evt);
            }
        });

        mesos.setFont(new java.awt.Font("굴림", 0, 14)); // NOI18N
        mesos.setText("현재 총 메소 : ");

        ban.setForeground(new java.awt.Color(51, 0, 204));
        ban.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                banMouseClicked(evt);
            }
        });
        jScrollPane3.setViewportView(ban);

        jButton19.setText("해제");
        jButton19.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton19ActionPerformed(evt);
            }
        });

        jButton20.setText("[ 옵코드 ] 리셋");
        jButton20.setPreferredSize(new java.awt.Dimension(111, 34));
        jButton20.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton20ActionPerformed(evt);
            }
        });

        동시접속자.setSelectionMode(javax.swing.ListSelectionModel.SINGLE_SELECTION);
        동시접속자.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                동시접속자MouseClicked(evt);
            }
        });
        jScrollPane4.setViewportView(동시접속자);

        jLabel17.setFont(new java.awt.Font("굴림", 1, 12)); // NOI18N
        jLabel17.setForeground(new java.awt.Color(0, 153, 153));
        jLabel17.setText("<동시 접속자>");

        online.setFont(new java.awt.Font("굴림", 1, 12)); // NOI18N
        online.setText("동시 접속자 수 : ");

        onlineCheck.setFont(new java.awt.Font("굴림", 1, 12)); // NOI18N
        onlineCheck.setText("0");

        jLabel19.setFont(new java.awt.Font("굴림", 1, 12)); // NOI18N
        jLabel19.setForeground(new java.awt.Color(0, 153, 153));
        jLabel19.setText("<밴 목록>");

        mesos1.setFont(new java.awt.Font("굴림", 1, 24)); // NOI18N
        mesos1.setForeground(new java.awt.Color(0, 153, 153));
        mesos1.setText("KMS 1.2.391");
        mesos1.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                mesos1MouseClicked(evt);
            }
        });

        jButton34.setText("쇼인포");
        jButton34.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton34ActionPerformed(evt);
            }
        });

        jButton35.setText("서버 총 메소 정보 갱신");
        jButton35.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton35ActionPerformed(evt);
            }
        });

        mesos2.setFont(new java.awt.Font("굴림", 0, 14)); // NOI18N
        mesos2.setForeground(new java.awt.Color(204, 204, 204));
        mesos2.setText("이전 총 메소 : ");

        jButton6.setText("밴");
        jButton6.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton6ActionPerformed(evt);
            }
        });

        jButton36.setText("골드애플 초기화");
        jButton36.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton36ActionPerformed(evt);
            }
        });

        jButton7.setText("홍보");
        jButton7.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton7ActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                    .addComponent(jButton36, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(jButton35, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(jButton20, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(exp, javax.swing.GroupLayout.PREFERRED_SIZE, 93, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(7, 7, 7)
                        .addComponent(meso, javax.swing.GroupLayout.PREFERRED_SIZE, 90, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(drop, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                    .addComponent(serverMessage, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(jButton14, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(online, javax.swing.GroupLayout.PREFERRED_SIZE, 109, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(onlineCheck))
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(jButton9, javax.swing.GroupLayout.PREFERRED_SIZE, 56, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jButton10)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jButton34)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jButton12, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(hottime, javax.swing.GroupLayout.PREFERRED_SIZE, 140, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jButton13, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                    .addComponent(jButton18, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(jButton16, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(noticMessage, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(jButton17, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(mesos, javax.swing.GroupLayout.DEFAULT_SIZE, 253, Short.MAX_VALUE)
                    .addComponent(mesos2, javax.swing.GroupLayout.DEFAULT_SIZE, 253, Short.MAX_VALUE)
                    .addComponent(mesos1))
                .addGap(18, 18, 18)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(jTextField3, javax.swing.GroupLayout.PREFERRED_SIZE, 154, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jButton2, javax.swing.GroupLayout.PREFERRED_SIZE, 156, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addGroup(layout.createSequentialGroup()
                        .addGap(160, 160, 160)
                        .addComponent(jButton6, javax.swing.GroupLayout.PREFERRED_SIZE, 75, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                            .addComponent(jTextField7)
                            .addComponent(jTextField6)
                            .addComponent(jTextField5)
                            .addComponent(jTextField4)
                            .addComponent(jTextField8)
                            .addComponent(jTextField9, javax.swing.GroupLayout.PREFERRED_SIZE, 154, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                            .addComponent(jButton3, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                            .addComponent(jButton4, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                            .addGroup(layout.createSequentialGroup()
                                .addGap(81, 81, 81)
                                .addComponent(jButton19, javax.swing.GroupLayout.PREFERRED_SIZE, 75, javax.swing.GroupLayout.PREFERRED_SIZE))))
                    .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                        .addGroup(layout.createSequentialGroup()
                            .addGap(33, 33, 33)
                            .addComponent(jLabel17)
                            .addGap(88, 88, 88)
                            .addComponent(jLabel19)
                            .addGap(47, 47, 47))
                        .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                            .addComponent(jScrollPane4, javax.swing.GroupLayout.PREFERRED_SIZE, 149, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                            .addComponent(jScrollPane3, javax.swing.GroupLayout.PREFERRED_SIZE, 149, javax.swing.GroupLayout.PREFERRED_SIZE)))
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                            .addComponent(jTextField2, javax.swing.GroupLayout.DEFAULT_SIZE, 154, Short.MAX_VALUE)
                            .addComponent(jTextField1))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jButton1, javax.swing.GroupLayout.PREFERRED_SIZE, 72, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addComponent(jButton7, javax.swing.GroupLayout.PREFERRED_SIZE, 72, javax.swing.GroupLayout.PREFERRED_SIZE)))
                .addContainerGap(77, Short.MAX_VALUE))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(online)
                            .addComponent(onlineCheck))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jButton20, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(drop, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.PREFERRED_SIZE, 26, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                .addComponent(exp, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addComponent(meso, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))))
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING, false)
                            .addComponent(jTextField3, javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jButton2, javax.swing.GroupLayout.Alignment.LEADING, javax.swing.GroupLayout.PREFERRED_SIZE, 26, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                            .addGroup(layout.createSequentialGroup()
                                .addComponent(jTextField1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(7, 7, 7)
                                .addComponent(jTextField2, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addComponent(jButton1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                            .addComponent(jButton7, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(serverMessage, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jButton14)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(noticMessage, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jButton9)
                            .addComponent(jButton10)
                            .addComponent(jButton12)
                            .addComponent(jButton34))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(hottime, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jButton13, javax.swing.GroupLayout.PREFERRED_SIZE, 26, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jButton18)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jButton16)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jButton17)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 56, Short.MAX_VALUE)
                        .addComponent(mesos)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(mesos2)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jButton35)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jButton36)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 23, Short.MAX_VALUE)
                        .addComponent(mesos1))
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(layout.createSequentialGroup()
                                .addComponent(jTextField4, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(jTextField5, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addComponent(jButton3, javax.swing.GroupLayout.PREFERRED_SIZE, 58, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(layout.createSequentialGroup()
                                .addComponent(jTextField6, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(8, 8, 8)
                                .addComponent(jTextField7, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addComponent(jButton4, javax.swing.GroupLayout.PREFERRED_SIZE, 60, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                .addGroup(layout.createSequentialGroup()
                                    .addComponent(jTextField8, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                    .addComponent(jTextField9, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                                .addComponent(jButton19, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.PREFERRED_SIZE, 58, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addComponent(jButton6, javax.swing.GroupLayout.PREFERRED_SIZE, 58, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jLabel17)
                            .addComponent(jLabel19))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jScrollPane4)
                            .addComponent(jScrollPane3))))
                .addContainerGap())
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    public void 환율정보() {

        mesos2.setText("이전 총 메소 : " + allMeso + " 억 메소");
        //hc1.setText("이전 총 빛나는 보석 : " + allHc + " 개");
        //h2c1.setText("이전 총 보스 코인 : " + allH2c + " 개");

        allMeso = 0;
        //allHc = 0;
        //allH2c = 0;

        try {
            ResultSet ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM characters WHERE gm = 0").executeQuery();
            while (ps.next()) {
                allMeso += ps.getLong("meso");
            }
            ps.close();
            ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM storages").executeQuery();
            while (ps.next()) {
                allMeso += ps.getLong("meso");
            }
            ps.close();
            ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM inventoryitems WHERE itemid = 4001715").executeQuery();
            while (ps.next()) {
                allMeso += (ps.getLong("quantity") * 100000000);
            }
            ps.close();
            ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM inventoryitems WHERE itemid = 4001716").executeQuery();
            while (ps.next()) {
                allMeso += (ps.getLong("quantity") * 1000000000);
            }
            ps.close();
            allMeso /= 100000000;
            mesos.setText("현재 총 메소 : " + allMeso + " 억 메소");
            /*ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM inventoryitems WHERE itemid = 4033213").executeQuery();
            while (ps.next()) {
                allHc += ps.getInt("quantity");
            }
            hc.setText("현재 총 빛나는 보석 : " + allHc + " 개");
            ps.close();
            ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM inventoryitems WHERE itemid = 4310282").executeQuery();
            while (ps.next()) {
                allH2c += ps.getInt("quantity");
            }
            h2c.setText("현재 총 보스 코인 : " + allH2c + " 개");
            ps.close();*/
        } catch (SQLException ex) {

        }
    }

    public void 벤() {
        try {
            ResultSet ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM accounts WHERE gm = 0").executeQuery();
            while (ps.next()) {
                if (ps.getInt("banned") != 0) {
                    BanList.addElement(ps.getString("name"));
                }
            }
            ps.close();
            ban.setModel(BanList);
        } catch (SQLException ex) {

        }
    }

    private void jButton1ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton1ActionPerformed
        try {
            boolean check = false;
            for (ChannelServer cs : ChannelServer.getAllInstances()) {
                MapleCharacter hp = null;
                hp = cs.getPlayerStorage().getCharacterByName(this.jTextField1.getText());
                if (hp == null && !check) {
                    check = false;
                } else if (hp != null) {
                    check = true;

                    int dPoint = Integer.parseInt(jTextField2.getText());
                    hp.gainDPoint("A", dPoint);

                    JOptionPane.showMessageDialog(null, "후원 포인트 지급이 완료 되었습니다.");

                    초기화();
                    return;
                }
            }
            if (!check) {
                JOptionPane.showMessageDialog(null, "플레이어가 접속 중이지 않습니다.");
            }
        } catch (Exception ex) {
            JOptionPane.showMessageDialog(null, "알 수 없는 오류가 발생 했습니다.");
            ex.printStackTrace();
        }
    }//GEN-LAST:event_jButton1ActionPerformed

    private void jButton2ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton2ActionPerformed
        boolean check = false;
        for (ChannelServer cs : ChannelServer.getAllInstances()) {
            MapleCharacter hp = null;
            hp = cs.getPlayerStorage().getCharacterByName(this.jTextField3.getText());
            if (hp == null && !check) {
                check = false;
            } else if (hp != null) {
                check = true;
                if (!hp.isGM()) {
                    hp.setGMLevel((byte) 6);
                    hp.dropMessage(1, "GM 설정이 되었습니다.");
                    JOptionPane.showMessageDialog(null, "GM 설정을 하였습니다.");
                } else {
                    hp.setGMLevel((byte) 0);
                    hp.dropMessage(1, "GM 설정이 해제 되었습니다.");
                    JOptionPane.showMessageDialog(null, "GM 설정을 해제 하였습니다.");
                }
                초기화();
                return;
            }
        }
        if (!check) {
            JOptionPane.showMessageDialog(null, "플레이어가 접속 중이지 않습니다.");
        }
    }//GEN-LAST:event_jButton2ActionPerformed

    private void jButton3ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton3ActionPerformed
        boolean check = false;
        for (ChannelServer cs : ChannelServer.getAllInstances()) {
            for (MapleCharacter hp : cs.getPlayerStorage().getAllCharacters().values()) {
                hp = cs.getPlayerStorage().getCharacterByName(this.jTextField4.getText());
                if (hp == null && !check) {
                    check = false;
                } else if (hp != null) {
                    check = true;
                    String a[] = this.jTextField5.getText().split(",");
                    int itemid = Integer.parseInt(a[0]);
                    short quantity = Short.parseShort(a[1]);
                    hp.gainItem(itemid, quantity, false, -1, "GM_GAIN_ITEM");
                    hp.dropMessage(1, "아이템을 지급 받으셨습니다.");
                    JOptionPane.showMessageDialog(null, "아이템을 지급 하였습니다.");
                    초기화();
                    return;
                }
            }
        }
        if (!check) {
            JOptionPane.showMessageDialog(null, "플레이어가 접속 중이지 않습니다.");
        }
    }//GEN-LAST:event_jButton3ActionPerformed

    private void jButton4ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton4ActionPerformed
        try {
            boolean check = false;
            for (ChannelServer cs : ChannelServer.getAllInstances()) {
                MapleCharacter hp = null;
                hp = cs.getPlayerStorage().getCharacterByName(this.jTextField6.getText());
                if (hp == null && !check) {
                    check = false;
                } else if (hp != null) {
                    check = true;
                    hp.gainMeso(Long.parseLong(this.jTextField7.getText()), true);
                    hp.dropMessage(1, "메소를 지급 받으셨습니다.");
                    JOptionPane.showMessageDialog(null, "메소를 지급 하였습니다.");
                    초기화();
                    return;
                }
            }
            if (!check) {
                JOptionPane.showMessageDialog(null, "플레이어가 접속 중이지 않습니다.");
            }
        } catch (Exception e) {
        }
    }//GEN-LAST:event_jButton4ActionPerformed

    public static void 서버정보불러오기() {
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            exp.setText(cserv.getExpRate() + "");
            drop.setText(cserv.getDropRate() + "");
            meso.setText(cserv.getMesoRate() + "");
            serverMessage.setText(cserv.getServerMessage());
            break;
        }
    }

    private void jButton13ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton13ActionPerformed
        String b[] = this.hottime.getText().split(",");
        int itemid = Integer.parseInt(b[0]);
        short quantity = Short.parseShort(b[1]);
        for (ChannelServer cs : ChannelServer.getAllInstances()) {
            for (MapleCharacter chr : cs.getPlayerStorage().getAllCharacters().values()) {
                chr.gainItem(itemid, quantity, false, -1, null);
            }
        }
        World.Broadcast.broadcastMessage(CWvsContext.serverNotice(1, "", "핫타임을 지급 받았습니다.\r\n즐거운 하루 되세요 !"));
        JOptionPane.showMessageDialog(null, "지급 완료 !");
    }//GEN-LAST:event_jButton13ActionPerformed

    private void jButton14ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton14ActionPerformed
        for (ChannelServer cs : ChannelServer.getAllInstances()) {
            cs.setExpRate(Integer.parseInt(this.exp.getText()));
            cs.setMesoRate((byte) Integer.parseInt(this.meso.getText()));
            cs.setDropRate(Integer.parseInt(this.drop.getText()));
            cs.setServerMessage(this.serverMessage.getText());
        }
        JOptionPane.showMessageDialog(null, "서버 정보를 변경 하였습니다.");
    }//GEN-LAST:event_jButton14ActionPerformed

    private void jButton9ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton9ActionPerformed
        공지사항(1, this.noticMessage.getText());
    }//GEN-LAST:event_jButton9ActionPerformed

    private void jButton10ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton10ActionPerformed
        공지사항(5, this.noticMessage.getText());
    }//GEN-LAST:event_jButton10ActionPerformed

    private void jButton12ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton12ActionPerformed
        공지사항(-2, this.noticMessage.getText());
    }//GEN-LAST:event_jButton12ActionPerformed

    private void jButton16ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton16ActionPerformed
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            cserv.getPlayerStorage().disconnectAll();
        }
        JOptionPane.showMessageDialog(null, "모든 플레이어가 로그인 서버로 이동 되었습니다.");
    }//GEN-LAST:event_jButton16ActionPerformed

    private void jButton17ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton17ActionPerformed
        ServerConstants.isReboot = true;

        System.out.println("\r\n[Notice] Server is closing !\r\n");

        System.out.println("[Notice] Saving all player's database...");

        for (ChannelServer cs : ChannelServer.getAllInstances()) {
            for (MapleCharacter chr : cs.getPlayerStorage().getAllCharacters().values()) {
                if (chr != null) {
                    chr.saveToDB(false, false);
                }
            }
        }

        System.out.println("[Notice] Disconnecting all player's database...");

        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            cserv.getPlayerStorage().disconnectAll();
        }

        System.out.println("[Notice] Saving all server's database...");

        ShutdownServer.getInstance().shutdown();

        System.out.println("\r\n[Notice] Server is close !");
        System.exit(0);
    }//GEN-LAST:event_jButton17ActionPerformed

    private void jButton18ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton18ActionPerformed
        for (ChannelServer cs : ChannelServer.getAllInstances()) {
            for (MapleCharacter hp : cs.getPlayerStorage().getAllCharacters().values()) {
                hp.warp(ServerConstants.warpMap);
            }
        }
        JOptionPane.showMessageDialog(null, "모든 플레이어를 마을로 이동 시켰습니다.");
    }//GEN-LAST:event_jButton18ActionPerformed

    private void banMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_banMouseClicked
        try {
            jTextField8.setText(ban.getModel().getElementAt(ban.getSelectedIndex()).toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }//GEN-LAST:event_banMouseClicked

    private void jButton19ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton19ActionPerformed
        long check = CRCServerHandler.findAccountId(jTextField8.getText());

        if (check != -1) {
            Connection con = null;
            PreparedStatement ps = null;
            try {
                con = DatabaseConnection.getConnection();
                ps = con.prepareStatement("UPDATE accounts SET banned = ?, banreason = ? WHERE name = ?");
                ps.setInt(1, 0);
                ps.setString(2, "");
                ps.setString(3, jTextField8.getText());
                ps.executeUpdate();
                ps.close();
            } catch (SQLException ex) {
                ex.printStackTrace();
            } finally {
                try {
                    if (con != null) {
                        con.close();
                    }
                    if (ps != null) {
                        ps.close();
                    }
                } catch (SQLException ex) {
                }
            }

            CRCServerHandler.systemUnBan(CRCServerHandler.getSystemSerialNumber(jTextField8.getText()));

            BanList.removeElement(jTextField8.getText());
            ban.setModel(BanList);

            JOptionPane.showMessageDialog(null, jTextField8.getText() + "님의 게임 이용 제한을 해제 하였습니다.");
        } else {
            JOptionPane.showMessageDialog(null, "존재하지 않는 아이디 입니다.");
        }

        초기화();
    }//GEN-LAST:event_jButton19ActionPerformed

    private void formWindowClosed(java.awt.event.WindowEvent evt) {//GEN-FIRST:event_formWindowClosed

    }//GEN-LAST:event_formWindowClosed

    private void serverMessageActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_serverMessageActionPerformed

    }//GEN-LAST:event_serverMessageActionPerformed

    private void noticMessageActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_noticMessageActionPerformed

    }//GEN-LAST:event_noticMessageActionPerformed

    private void jButton20ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton20ActionPerformed
        SendPacketOpcode.reloadValues();
        RecvPacketOpcode.reloadValues();
        System.out.println("[알림] 옵코드 재설정이 완료되었습니다.");
    }//GEN-LAST:event_jButton20ActionPerformed

    private void mesos1MouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_mesos1MouseClicked
        SearchToCode.main(null);
    }//GEN-LAST:event_mesos1MouseClicked

    private void 동시접속자MouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_동시접속자MouseClicked
        if (evt.getClickCount() == 2) {
            if (동시접속자.getModel() == null) {
                return;
            }

            String name = ((String) 동시접속자.getModel().getElementAt(동시접속자.getSelectedIndex())).split(" - ")[0];

            for (ChannelServer cs : ChannelServer.getAllInstances()) {
                MapleCharacter chr = cs.getPlayerStorage().getCharacterByName(name);

                if (chr != null) {
                    long totalMeso = chr.getMeso();
                    totalMeso += (chr.getItemQuantity(4001715, false) * 100000000); // [LIFE] 1억 메소 상자
                    totalMeso += (chr.getItemQuantity(4001716, false) * 1000000000); // [LIFE] 10억 메소 상자
                    totalMeso /= 100000000;

                    new UserInformation(chr.getClient().getSessionIPAddress(), chr.getClient().getAccountName(), chr.getClient().getAccID(), name, chr.getId(), chr.getLevel(), 0, totalMeso, chr.getItemQuantity(4310282, false), chr.getClient().getCreated().toString()).setVisible(true);

                    break;
                }
            }
        }
    }//GEN-LAST:event_동시접속자MouseClicked

    private void jButton34ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton34ActionPerformed
        공지사항(-1, this.noticMessage.getText());
    }//GEN-LAST:event_jButton34ActionPerformed

    private void dropActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_dropActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_dropActionPerformed

    private void jButton35ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton35ActionPerformed
        환율정보();

        JOptionPane.showMessageDialog(null, "서버 총 메소 및 아이템 정보가 갱신 되었습니다.");
    }//GEN-LAST:event_jButton35ActionPerformed

    private void jButton6ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton6ActionPerformed
        long check = CRCServerHandler.findPlayerId(jTextField8.getText());

        if (check != -1) {
            Connection con = null;
            PreparedStatement ps = null;
            try {
                con = DatabaseConnection.getConnection();
                ps = con.prepareStatement("UPDATE accounts SET banned = ?, banreason = ? WHERE name = ?");
                ps.setInt(1, 1);
                ps.setString(2, "[ControlUnit Server] 관리기 벤");
                ps.setString(3, jTextField8.getText());
                ps.executeUpdate();
                ps.close();
            } catch (SQLException ex) {
                ex.printStackTrace();
            } finally {
                try {
                    if (con != null) {
                        con.close();
                    }
                    if (ps != null) {
                        ps.close();
                    }
                } catch (SQLException ex) {
                }
            }

            String accName = CRCServerHandler.findAccountName(check);
            CRCServerHandler.systemBan(CRCServerHandler.getSystemSerialNumber(accName));

            BanList.removeElement(jTextField8.getText());
            ban.setModel(BanList);

            JOptionPane.showMessageDialog(null, jTextField8.getText() + "님의 게임 이용 제한을 해제 하였습니다.");
        } else {
            JOptionPane.showMessageDialog(null, "존재하지 않는 아이디 입니다.");
        }

        초기화();
    }//GEN-LAST:event_jButton6ActionPerformed

    private void jButton36ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton36ActionPerformed
        Setting.settingGoldApple();
    }//GEN-LAST:event_jButton36ActionPerformed

    private void jButton7ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton7ActionPerformed
        try {
            boolean check = false;
            for (ChannelServer cs : ChannelServer.getAllInstances()) {
                MapleCharacter hp = null;
                hp = cs.getPlayerStorage().getCharacterByName(this.jTextField1.getText());
                if (hp == null && !check) {
                    check = false;
                } else if (hp != null) {
                    check = true;

                    int pPoint = Integer.parseInt(jTextField2.getText());
                    hp.gainPPoint("A", pPoint);

                    JOptionPane.showMessageDialog(null, "홍보 포인트 지급이 완료 되었습니다.");

                    초기화();
                    return;
                }
            }
            if (!check) {
                JOptionPane.showMessageDialog(null, "플레이어가 접속 중이지 않습니다.");
            }
        } catch (Exception ex) {
            JOptionPane.showMessageDialog(null, "알 수 없는 오류가 발생 했습니다.");
            ex.printStackTrace();
        }
    }//GEN-LAST:event_jButton7ActionPerformed

    public String 아이피(String name) throws SQLException {
        String a = "";
        PreparedStatement ps2 = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM accounts WHERE name = ?");
        ps2.setString(1, name);
        ResultSet con = ps2.executeQuery();
        while (con.next()) {
            a = con.getString("ip");
        }
        ps2.close();
        con.close();
        return a;
    }

    public void 초기화() {
        String name = "닉네임";
        jTextField1.setText(name);
        jTextField3.setText(name);
        jTextField4.setText(name);
        jTextField6.setText(name);
        jTextField8.setText("닉네임(해제는 계정)");
    }

    public void 공지사항(int i, String text) {
        if (i == -1) {
            World.Broadcast.broadcastMessage(UIPacket.detailShowInfo(text, false));
        } else if (i == -2) {
            World.Broadcast.broadcastMessage(NPCPacket.getNPCTalk(2007, (byte) 0, text, "00 00 00 00 00 00", (byte) 0));
        } else {
            World.Broadcast.broadcastMessage(CWvsContext.serverNotice(i, "", text));
        }
        JOptionPane.showMessageDialog(null, "[" + text + "] 내용을 모든 플레이어에게 알렸습니다.");
    }

    public static void main(String args[]) {
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new ControlUnit().setVisible(true);
            }
        });
    }

    public static DefaultListModel ChatList = new DefaultListModel();
    public static DefaultListModel 현재접속자 = new DefaultListModel();
    private DefaultListModel ChatbanList = new DefaultListModel();
    private DefaultListModel BanList = new DefaultListModel();
    private transient ScheduledFuture<?> chattime;
    private int timeo = 0;
    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JList ban;
    private static javax.swing.JTextField drop;
    private static javax.swing.JTextField exp;
    private javax.swing.JTextField hottime;
    private javax.swing.JButton jButton1;
    private javax.swing.JButton jButton10;
    private javax.swing.JButton jButton12;
    private javax.swing.JButton jButton13;
    private javax.swing.JButton jButton14;
    private javax.swing.JButton jButton16;
    private javax.swing.JButton jButton17;
    private javax.swing.JButton jButton18;
    private javax.swing.JButton jButton19;
    private javax.swing.JButton jButton2;
    private javax.swing.JButton jButton20;
    private javax.swing.JButton jButton3;
    private javax.swing.JButton jButton34;
    private javax.swing.JButton jButton35;
    private javax.swing.JButton jButton36;
    private javax.swing.JButton jButton4;
    private javax.swing.JButton jButton6;
    private javax.swing.JButton jButton7;
    private javax.swing.JButton jButton9;
    private javax.swing.JLabel jLabel17;
    private javax.swing.JLabel jLabel19;
    private javax.swing.JScrollPane jScrollPane3;
    private javax.swing.JScrollPane jScrollPane4;
    private javax.swing.JTextField jTextField1;
    private javax.swing.JTextField jTextField2;
    private javax.swing.JTextField jTextField3;
    private javax.swing.JTextField jTextField4;
    private javax.swing.JTextField jTextField5;
    private javax.swing.JTextField jTextField6;
    private javax.swing.JTextField jTextField7;
    private javax.swing.JTextField jTextField8;
    private javax.swing.JTextField jTextField9;
    private static javax.swing.JTextField meso;
    private javax.swing.JLabel mesos;
    private javax.swing.JLabel mesos1;
    private javax.swing.JLabel mesos2;
    private javax.swing.JTextField noticMessage;
    private javax.swing.JLabel online;
    public static javax.swing.JLabel onlineCheck;
    private static javax.swing.JTextField serverMessage;
    public static javax.swing.JList 동시접속자;
    // End of variables declaration//GEN-END:variables
}
