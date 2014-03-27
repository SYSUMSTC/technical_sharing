
import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import org.eclipse.jetty.websocket.WebSocket;




public class SampleSocket implements WebSocket,WebSocket.OnTextMessage{


    Connection connection = null;
    static Set<SampleSocket> connections_set =
                    new CopyOnWriteArraySet<SampleSocket>();
    static Map<String,SampleSocket> socketList = new HashMap<String,SampleSocket>();
    
    private User user;
    public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}


	//public Map<String,SampleSocket> socketList = new HashMap<String,SampleSocket>();
    //public Map<String,String> ctrl;
   // static Map<String,String> ctrl = new HashMap<String,String>();
    

    public void onOpen(Connection c){
            connection = c;
            synchronized (connections_set) {
                    connections_set.add(this);
            }
    }
    
    public void onClose(int n, String s){
		//this.sendToSelf("result=removeuser&name="+this.getUser().getName());
    	//this.sendToSelf("result=talk&msg=【"+this.getUser().getName()+"】下线");
        synchronized (socketList) {
        	socketList.remove(this.getUser().getName());
        }
        synchronized (connections_set) {
            connections_set.remove(this);
        }
		this.sendToAll("result=removeuser&name="+this.getUser().getName());
    	this.sendToAll("result=talk&msg=【"+this.getUser().getName()+"】下线");
    }
    public String getUserList(){
    	String result = "";
    	String add = "";
		for (SampleSocket socket : connections_set) {
			result += add + socket.getUser().getName();
			add = ",";
		}
    	return result;
    }
    public void sendToSelf(String value){
    	try {
			this.connection.sendMessage(value);
		} catch (IOException e) {
			e.printStackTrace();
		}
    }
    public void sendToName(String name,String value){
    	try {
    		for (SampleSocket socket : connections_set) {
    			if(socket.getUser().getName().equals(name)){
    				socket.connection.sendMessage(value);
    				break;
    			}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
    }
    public void sendToAll(String value){
    	System.out.println("sendToAll value = "+value);
    	try {
    		for (SampleSocket socket : connections_set) {
    			socket.connection.sendMessage(value);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
    }
    public void onMessage(String msg) {
    	System.out.println("msg="+msg);
    	HashMap<String,String> result = strToHash(msg);
    	if ("login".equals(result.get("type")) == false && this.user == null) {
    		this.sendToSelf("result=error&error=请先登录");
    		return;
    	}
    	switch(result.get("type")){
    		case "login":
    			if(this.user != null){
    				this.sendToSelf("result=error&error=不可以重复登录");
    				break;
    			}
    			Script.login(result,this);
    			break;
    		case "talk":
    			Script.talk(result,this);
    			break;
    		case "addTank":
    			Script.addTank(result,this);
    			break;
    		case "move":
    			Script.move(result,this);
    			break;
    		case "shoot":
    			Script.shoot(result,this);
    			break;
    	}
        /*for (SampleSocket socket : connections_set) {
    		
    	}    long n = Calendar.getInstance().getTimeInMillis();
            System.out.println("n="+n+" ,msg="+msg);
            map.put(n, msg);
            for (SampleSocket socket : connections_set) {
                    try {
                        System.out.println("connections_set="+connections_set);
                            try {
                                    long id = Long.parseLong(msg);
                                    System.out.println("id="+id);
                                    String res = map.get(id);
                                    System.out.println("res="+res);
                                    if (res != null){
                                            socket.connection.sendMessage("1{\"cmd\":\"get\", \"id\":" + msg + ", \"msg\":\"" + res + "\"}");
                                    } else {
                                            socket.connection.sendMessage("2{\"cmd\":\"get\", \"id\":-1 ,\"msg\":\"no message.\"}");
                                    }
                            } catch(Exception e2){
                                System.out.println("e2="+e2);
                                    socket.connection.sendMessage("3{\"cmd\":\"put\", \"id\":" + n
                                            + " ,\"msg\":\"" + msg + "\"}");
                            }
                    } catch (IOException e) {
                            e.printStackTrace();
                    }
            }
        */
    }


	private HashMap<String,String> strToHash(String value){
		HashMap<String,String> result = new HashMap<String,String>();
		String[] arrValue = value.split("&"); 
		for(int i=0;i<arrValue.length;i++){
			String[] keyvalue = arrValue[i].split("=");
			if(keyvalue.length == 1){
				result.put(keyvalue[0], "");
			}else{
				result.put(keyvalue[0], keyvalue[1]);
			}
		}
		return result;
	}
}
