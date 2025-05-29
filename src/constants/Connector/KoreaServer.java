package constants.Connector;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelHandler;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import java.net.InetSocketAddress;

/**
 *
 * @author KoreaDev <koreadev2@nate.com> & sakura24<x-s-s-@nate.com>
 *
 */
public class KoreaServer {

    public static final int PORT = 18081;
    private static ServerBootstrap bootstrap;

    public static void run_startup_configurations() {
        EventLoopGroup group = new NioEventLoopGroup();
        try {
            bootstrap = new ServerBootstrap();
            bootstrap.group(group)
                    .channel(NioServerSocketChannel.class)
                    .localAddress(new InetSocketAddress(PORT))
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel ch) throws Exception {
                            ch.pipeline().addLast(new KoreaNettyHandler());
                        }
                    });
            ChannelFuture f = bootstrap.bind().sync();
            System.out.println("[알림] 접속기서버가 " + PORT + " 포트를 성공적으로 개방하였습니다.");
        } catch (InterruptedException e) {
            System.err.println("[오류] 접속기서버가 " + PORT + " 포트를 개방하는데 실패했습니다.");
            e.printStackTrace();
        }
    }
}
