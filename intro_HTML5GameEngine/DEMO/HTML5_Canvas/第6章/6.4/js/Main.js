//声明变量
//进度条显示层，背景层，方块绘制层，方块预览层
var loadingLayer,backLayer,graphicsMap,nextLayer;
var imglist = {};
var imgData = new Array(
	{name:"backImage",path:"./images/backImage.png"},
	{name:"r1",path:"./images/r1.png"},
	{name:"r2",path:"./images/r2.png"},	{name:"r3",path:"./images/r3.png"},	{name:"r4",path:"./images/r4.png"}
	);
//方块类变量，用于生成新的方块var BOX;//方块坐标数组var map;
//方块数据数组var nodeList;
//方块图片数组
var bitmapdataList;
//方块下落速度相关var speed=15,speedMax=15,speedIndex = 0;
//当前方块的位置
var pointBox={x:0,y:0};
//当前方块，预览方块
var nowBox,nextBox;
//方块区域起始位置var START_X1=15,START_Y1=20,START_X2=228,START_Y2=65;
function main(){
	//方块类变量初始化	BOX = new Box();
	//方块坐标数组初始化	map=[	[0,0,0,0,0,0,0,0,0,0],	[0,0,0,0,0,0,0,0,0,0],	[0,0,0,0,0,0,0,0,0,0],	[0,0,0,0,0,0,0,0,0,0],	[0,0,0,0,0,0,0,0,0,0],	[0,0,0,0,0,0,0,0,0,0],	[0,0,0,0,0,0,0,0,0,0],	[0,0,0,0,0,0,0,0,0,0],	[0,0,0,0,0,0,0,0,0,0],	[0,0,0,0,0,0,0,0,0,0],	[0,0,0,0,0,0,0,0,0,0],	[0,0,0,0,0,0,0,0,0,0],	[0,0,0,0,0,0,0,0,0,0],	[0,0,0,0,0,0,0,0,0,0],	[0,0,0,0,0,0,0,0,0,0],	[0,0,0,0,0,0,0,0,0,0],	[0,0,0,0,0,0,0,0,0,0],	[0,0,0,0,0,0,0,0,0,0],	[0,0,0,0,0,0,0,0,0,0],	[0,0,0,0,0,0,0,0,0,0]	];
	//背景层初始化	backLayer = new LSprite();
	//在背景层上绘制黑色背景	backLayer.graphics.drawRect(1,"#000000",[0,0,320,480],true,"#000000");	//背景显示
	addChild(backLayer);
	//进度条读取层初始化	loadingLayer = new LoadingSample1();
	//进度条读取层显示	backLayer.addChild(loadingLayer);
	//利用LLoadManage类，读取所有图片，并显示进度条进程		LLoadManage.load(		imgData,		function(progress){			loadingLayer.setProgress(progress);		},		gameInit	);
}
//读取完所有图片，进行游戏标题画面的初始化工作
function gameInit(result){
	//取得图片读取结果
	imglist = result;
	//移除进度条层
	backLayer.removeChild(loadingLayer);
	loadingLayer = null;
	//显示游戏标题
	var title = new LTextField();
	title.x = 50;
	title.y = 100;
	title.size = 30;	title.color = "#ffffff";
	title.text = "俄罗斯方块";
	backLayer.addChild(title);	//显示说明文	backLayer.graphics.drawRect(1,"#ffffff",[50,240,220,40]);	var txtClick = new LTextField();	txtClick.size = 18;	txtClick.color = "#ffffff";	txtClick.text = "点击页面开始游戏";	txtClick.x = (LGlobal.width - txtClick.getWidth())/2;	txtClick.y = 245;	backLayer.addChild(txtClick);	//添加点击事件，点击画面则游戏开始	backLayer.addEventListener(LMouseEvent.MOUSE_UP,gameToStart);}
//游戏画面初始化
function gameToStart(){
	//背景层清空	backLayer.die();
	backLayer.removeAllChild();	//背景图片显示	var bitmap = new LBitmap(new LBitmapData(imglist["backImage"]));	backLayer.addChild(bitmap);	//方块绘制层初始化	graphicsMap = new LSprite();	backLayer.addChild(graphicsMap);	//方块预览层初始化
	nextLayer = new LSprite();
	backLayer.addChild(nextLayer);
	//将方块的图片数据保存到数组内	bitmapdataList = [		new LBitmapData(imglist["r1"]),		new LBitmapData(imglist["r2"]),		new LBitmapData(imglist["r3"]),		new LBitmapData(imglist["r4"])	];	//方块数据数组初始化	nodeList = [];	var i,j,nArr,bitmap;	for(i=0;i<map.length;i++){		nArr = [];		for(j=0;j<map[0].length;j++){			bitmap = new LBitmap(bitmapdataList[0]);			bitmap.x = bitmap.getWidth()*j+START_X1;			bitmap.y = bitmap.getHeight()*i+START_Y1;			graphicsMap.addChild(bitmap);			nArr[j] = {"index":-1,"value":0,"bitmap":bitmap};		}		nodeList[i] = nArr;	}
	//预览层显示	getNewBox();
	//将当前下落方块显示到画面上
	plusBox();
	//添加循环播放事件侦听
	backLayer.addEventListener(LEvent.ENTER_FRAME, onframe);
}
//循环播放function onframe(){
	//首先，将当前下落方块移除画面	minusBox();	if(speedIndex++ > speed){		speedIndex = 0;
		if (checkPlus(0,1)){
			//可以下移，则将方块坐标下移一位			pointBox.y++;
		}else{
			//无法下移
			plusBox();
			if(pointBox.y < 0){
				//如果当前方块的坐标小于零，则游戏结束
				gameOver();
				return;
			}
			//取得新方块
			getNewBox();
		}	}	plusBox();	drawMap();}
//游戏结束function gameOver(){
	backLayer.die();
	var txt = new LTextField();
	txt.color = "#ff0000";
	txt.size = 40;
	txt.text = "游戏结束";
	txt.x = (LGlobal.width - txt.getWidth())*0.5;
	txt.y = 200;
	backLayer.addChild(txt);
}
//绘制所有方块function drawMap(){	var i,j,boxl = 15;	for(i=0;i<map.length;i++){		for(j=0;j<map[0].length;j++){			if(nodeList[i][j]["index"] >= 0){				nodeList[i][j]["bitmap"].bitmapData = bitmapdataList[nodeList[i][j]["index"]];			}else{				nodeList[i][j]["bitmap"].bitmapData = null;			}		}	}}
//判断是否可移动
function checkPlus(nx,ny){
	var i,j;
	//循环nowBox数组的每个元素
	for(i=0;i<nowBox.length;i++){
		for(j=0;j<nowBox[i].length;j++){
			if(i+pointBox.y + ny < 0){
				//所判断网格还为落入网格范围内
				continue;
			}else if(i+pointBox.y + ny >= map.length || j+pointBox.x + nx < 0 || j+pointBox.x + nx >= map[0].length){
				//所判断网格超出网格范围
				if(nowBox[i][j] == 0){
					//所判断网格为空则继续判断
					continue;
				}else{
					//所判断网格不为空则代表无法移动
					return false;
				}
			}
			if(nowBox[i][j] > 0 && map[i+pointBox.y + ny][j+pointBox.x + nx] > 0){
				//所判断网格的位置有方块，而将要移动到此位置的当前方块也不为空，则代表无法移动
				return false;
			}
		}			
	}
	return true;
}//移除方块function minusBox(){	var i,j;	for(i=0;i<nowBox.length;i++){		for(j=0;j<nowBox[i].length;j++){			if(i+pointBox.y < 0 || i+pointBox.y >= map.length || j+pointBox.x < 0 || j+pointBox.x >= map[0].length){				continue;			}			map[i+pointBox.y][j+pointBox.x]=map[i+pointBox.y][j+pointBox.x]-nowBox[i][j];			nodeList[i+pointBox.y][j+pointBox.x]["index"] = map[i+pointBox.y][j+pointBox.x] - 1;		}	}}//添加方块function plusBox(){	var i,j;	for(i=0;i<nowBox.length;i++){		for(j=0;j<nowBox[i].length;j++){			if(i+pointBox.y < 0 || i+pointBox.y >= map.length || j+pointBox.x < 0 || j+pointBox.x >= map[0].length){				continue;			}
			map[i+pointBox.y][j+pointBox.x]=nowBox[i][j]+map[i+pointBox.y][j+pointBox.x];			nodeList[i+pointBox.y][j+pointBox.x]["index"] = map[i+pointBox.y][j+pointBox.x] - 1;		}				}}
//获取下一方块function getNewBox(){	if (nextBox==null){		nextBox=BOX.getBox();	}	nowBox=nextBox;	pointBox.x=3;	pointBox.y=-4;	nextBox=BOX.getBox();
	
	nextLayer.removeAllChild();
	var i,j,bitmap;
	for(i=0;i<nextBox.length;i++){
		for(j=0;j<nextBox[0].length;j++){
			if(nextBox[i][j] == 0){
				continue;
			}
			bitmap = new LBitmap(bitmapdataList[nextBox[i][j] - 1]);
			bitmap.x = bitmap.getWidth()*j+START_X2;
			bitmap.y = bitmap.getHeight()*i+START_Y2;
			nextLayer.addChild(bitmap);
		}
	}}