import javax.servlet.http.HttpServletRequest;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.server.nio.SelectChannelConnector;
import org.eclipse.jetty.websocket.*;

public class SampleServer extends Server {
        SelectChannelConnector connector;
        WebSocketHandler web_handler;
        ResourceHandler res_handler;


        public SampleServer(int port, String dir){
                connector = new SelectChannelConnector();
                connector.setPort(port);
                addConnector(connector);


                web_handler = new WebSocketHandler(){
                        public WebSocket doWebSocketConnect(
                                        HttpServletRequest request, String param) {
                                return new SampleSocket();
                        }
                };
                res_handler = new ResourceHandler();
                res_handler.setDirectoriesListed(true);
                res_handler.setResourceBase(dir);
                web_handler.setHandler(res_handler);
                setHandler(web_handler);
        }


        public static void main(String... args) throws Exception{
                SampleServer server = new SampleServer(8800, "html");
                server.start();
                server.join();


        }
}
