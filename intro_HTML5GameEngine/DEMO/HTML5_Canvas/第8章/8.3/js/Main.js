/**
 * Main
 * */
//设定游戏速度，屏幕大小，回调函数
init(20,"mylegend",800,400,main);

/**层变量*/
//显示进度条所用层
var loadingLayer;
//游戏层
var gameLayer,plainLayer,bulletLayer;
//图片path数组
var imgData = new Array(
	{name:"bullet01",path:"./images/bullet01.png"},
	{name:"bullet02",path:"./images/bullet02.png"},
	{name:"player",path:"./images/player.png"}
);
//读取完的图片数组
var imglist;

var player;
var mouseStartX,mouseStartY,mouseNowX,mouseNowY;
var MOVE_STEP = 5;
/**
 * 子弹类型数组
 * 【开始角度，增加角度，子弹速度，角度加速度，子弹总数，发动频率，枪口旋转】
 * */
var bulletList = new Array(
		{startAngle:0,angle:20,step:10,speed:5,count:1},//1发
		{startAngle:-20,angle:20,step:10,speed:5,count:3},//3发
		{startAngle:-40,angle:20,step:10,speed:5,count:5},//5发
		{startAngle:0,angle:20,step:10,speed:5,count:18},//环发
		{startAngle:180,angle:20,step:50,speed:5,count:1},//1发
		{startAngle:160,angle:20,step:50,speed:5,count:3},//3发
		{startAngle:140,angle:20,step:50,speed:5,count:5}//5发
);
function main(){
	loadingLayer = new LoadingSample3();
	addChild(loadingLayer);	
	LLoadManage.load(
		imgData,
		function(progress){
			loadingLayer.setProgress(progress);
		},
		gameInit
	);
}
function gameInit(result){
	LGlobal.setDebug(true);
	imglist = result;
	removeChild(loadingLayer);
	loadingLayer = null;
	
	//游戏底层实例化
	gameLayer = new LSprite();
	addChild(gameLayer);
	gameLayer.graphics.drawRect(1,"#000000",[0,0,800,400],true,"#000000");
	
	plainLayer = new LSprite();
	gameLayer.addChild(plainLayer);
	bulletLayer = new LSprite();
	gameLayer.addChild(bulletLayer);
	
	var bitmapData = new LBitmapData(imglist["player"]);
	player = new Player(100,150,bitmapData.width,bitmapData.height*0.5,bitmapData,30);
	plainLayer.addChild(player);
	player.setBullet(0);
	
	
	gameLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
	gameLayer.addEventListener(LMouseEvent.MOUSE_DOWN,ondown);
	gameLayer.addEventListener(LMouseEvent.MOUSE_MOVE,onmove);
	gameLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);
}
/**
 * 循环
 * */
function onframe(){
	var key;
	for(key in plainLayer.childList){
		plainLayer.childList[key].onframe();
	}
	for(key in bulletLayer.childList){
		bulletLayer.childList[key].onframe();
	}
	
	if(!player.canshoot)return;
	if(player.x - player.downX > mouseNowX - mouseStartX){
		player.x -= MOVE_STEP;
		if(player.x - player.downX < mouseNowX - mouseStartX){
			player.x = mouseNowX - mouseStartX + player.downX;
		}
	}else if(player.x - player.downX < mouseNowX - mouseStartX){
		player.x += MOVE_STEP;
		if(player.x - player.downX > mouseNowX - mouseStartX){
			player.x = mouseNowX - mouseStartX + player.downX;
		}
	}
	if(player.y - player.downY > mouseNowY - mouseStartY){
		player.y -= MOVE_STEP;
		if(player.y - player.downY < mouseNowY - mouseStartY){
			player.y = mouseNowY - mouseStartY + player.downY;
		}
	}else if(player.y - player.downY < mouseNowY - mouseStartY){
		player.y += MOVE_STEP;
		if(player.y - player.downY > mouseNowY - mouseStartY){
			player.y = mouseNowY - mouseStartY + player.downY;
		}
	}
	if(player.x < 0){
		player.x = 0;
		setCoordinate(mouseNowX,mouseNowY);
	}else if(player.x + player.getWidth() > LGlobal.width){
		player.x = LGlobal.width - player.getWidth();
		setCoordinate(mouseNowX,mouseNowY);
	}
	if(player.y < 0){
		player.y = 0;
		setCoordinate(mouseNowX,mouseNowY);
	}else if(player.y + player.getHeight() > LGlobal.height){
		player.y = LGlobal.height - player.getHeight();
		setCoordinate(mouseNowX,mouseNowY);
	}
}

function ondown(event){
	player.canshoot=true;
	setCoordinate(event.offsetX,event.offsetY);
}
function setCoordinate(x,y){
	mouseStartX = mouseNowX = x;
	mouseStartY = mouseNowY = y;
	player.downX = player.x;
	player.downY = player.y;
}
function onmove(event){
	if(!player.canshoot)return;
	mouseNowX=event.offsetX;
	mouseNowY = event.offsetY;
}
function onup(event){
	player.canshoot=false;
}
