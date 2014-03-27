init(50,"mylegend",800,400,main);
var loadingLayer,
backLayer,
resultLayer,
clickLayer,
selfBitmap,
enemyBitmap,
selfTextAll,
selfTextWin,
selfTextLoss,
selfTextDraw,
win = 0,
loss = 0,
draw = 0;
var imglist = {};
var imgData = new Array(
		{name:"title",path:"../images/title.png"},
		{name:"shitou",path:"../images/shitou.png"},
		{name:"jiandao",path:"../images/jiandao.png"},
		{name:"bu",path:"../images/bu.png"}
		);
var checkList = [
[0,1,-1],
[-1,0,1],
[1,-1,0]
];
var showList = new Array();
function main(){
	LGlobal.setDebug(true);	
	backLayer = new LSprite();	
	addChild(backLayer);
	loadingLayer = new LoadingSample3();
	backLayer.addChild(loadingLayer);	
	LLoadManage.load(
		imgData,
		function(progress){
			loadingLayer.setProgress(progress);
		},
		function(result){
			imglist = result;
			backLayer.removeChild(loadingLayer);
			loadingLayer = null;
			gameInit();
		}
	);
}
function gameInit(){
	showList.push(new LBitmapData(imglist["shitou"]));
	showList.push(new LBitmapData(imglist["jiandao"]));
	showList.push(new LBitmapData(imglist["bu"]));
	//添加游戏界面背景
	backLayer.graphics.drawRect(10,'#008800',[0,0,LGlobal.width,LGlobal.height],true,'#000000');
	
	//显示游戏标题
	var titleBitmap = new LBitmap(new LBitmapData(imglist["title"]));
	titleBitmap.x = (LGlobal.width - titleBitmap.width)/2;
	titleBitmap.y = 10;
	backLayer.addChild(titleBitmap);
	//玩家方出拳图片
	selfBitmap = new LBitmap(showList[0]);
	selfBitmap.x = 400 - selfBitmap.width - 50;
	selfBitmap.y = 130;
	backLayer.addChild(selfBitmap);
	//电脑方出拳图片
	enemyBitmap = new LBitmap(showList[0]);
	enemyBitmap.x = 400 + 50;
	enemyBitmap.y = 130;
	backLayer.addChild(enemyBitmap);
	//玩家电脑名称设定
	var nameText;
	nameText = new LTextField();
	nameText.text = "玩家";
	nameText.weight = "bolder";
	nameText.color = "#ffffff";
	nameText.size = 24;
	nameText.x = selfBitmap.x + (selfBitmap.width - nameText.getWidth())/2;
	nameText.y = 95;
	backLayer.addChild(nameText);
	nameText = new LTextField();
	nameText.text = "电脑";
	nameText.weight = "bolder";
	nameText.color = "#ffffff";
	nameText.size = 24;
	nameText.x = enemyBitmap.x + (enemyBitmap.width - nameText.getWidth())/2;
	nameText.y = 95;
	backLayer.addChild(nameText);
	
	//结果显示层初始化
	initResultLayer();
	//操作层初始化
	initClickLayer();
}
function initResultLayer(){
	resultLayer = new LSprite();
	resultLayer.graphics.drawRect(4,'#ff8800',[0,0,150,110],true,'#ffffff');
	resultLayer.x = 10;
	resultLayer.y = 100;
	backLayer.addChild(resultLayer);
	selfTextAll = new LTextField();
	selfTextAll.text = "猜拳次数 ： 0";
	selfTextAll.weight = "bolder";
	selfTextAll.x = 10;
	selfTextAll.y = 20;
	resultLayer.addChild(selfTextAll);
	selfTextWin = new LTextField();
	selfTextWin.text = "胜利次数 ： 0";
	selfTextWin.weight = "bolder";
	selfTextWin.x = 10;
	selfTextWin.y = 40;
	resultLayer.addChild(selfTextWin);
	selfTextLoss = new LTextField();
	selfTextLoss.text = "失败次数 ： 0";
	selfTextLoss.weight = "bolder";
	selfTextLoss.x = 10;
	selfTextLoss.y = 60;
	resultLayer.addChild(selfTextLoss);
	selfTextDraw = new LTextField();
	selfTextDraw.text = "平局次数 ： 0";
	selfTextDraw.weight = "bolder";
	selfTextDraw.x = 10;
	selfTextDraw.y = 80;
	resultLayer.addChild(selfTextDraw);
}
function initClickLayer(){
	clickLayer = new LSprite();
	clickLayer.graphics.drawRect(4,'#ff8800',[0,0,300,110],true,'#ffffff');
	var msgText = new LTextField();
	msgText.text = "请出拳：";
	msgText.weight = "bolder";
	msgText.x = 10;
	msgText.y = 10;
	clickLayer.addChild(msgText);
	var btnShitou = getButton("shitou");
	btnShitou.x = 30;
	btnShitou.y = 35;
	clickLayer.addChild(btnShitou);
	btnShitou.addEventListener(LMouseEvent.MOUSE_UP,onclick);
	var btnJiandao = getButton("jiandao");
	btnJiandao.x = 115;
	btnJiandao.y = 35;
	clickLayer.addChild(btnJiandao);
	btnJiandao.addEventListener(LMouseEvent.MOUSE_UP,onclick);
	var btnBu = getButton("bu");
	btnBu.x = 200;
	btnBu.y = 35;
	clickLayer.addChild(btnBu);
	btnBu.addEventListener(LMouseEvent.MOUSE_UP,onclick);
	clickLayer.x = 250;
	clickLayer.y = 275;
	backLayer.addChild(clickLayer);
}
function onclick(event,display){
	var selfValue,enemyValue;
	if(display.name == "shitou"){
		selfValue = 0;
	}else if(display.name == "jiandao"){
		selfValue = 1;
	}else if(display.name == "bu"){
		selfValue = 2;
	}
	enemyValue = Math.floor(Math.random()*3);
	selfBitmap.bitmapData = showList[selfValue];
	enemyBitmap.bitmapData = showList[enemyValue];
	var result = checkList[selfValue][enemyValue];
	if(result == -1){
		loss += 1;
	}else if(result == 1){
		win += 1;
	}else{
		draw += 1;
	}
	selfTextWin.text = "胜利次数 ： " + win;
	selfTextLoss.text = "失败次数 ： " + loss;
	selfTextDraw.text = "平局次数 ： " +  draw;
	selfTextAll.text = "猜拳次数 ： " + (win + loss + draw);
}
function getButton(value){
	var btnUp = new LBitmap(new LBitmapData(imglist[value]));
	btnUp.scaleX = 0.5;
	btnUp.scaleY = 0.5;
	var btnOver = new LBitmap(new LBitmapData(imglist[value]));
	btnOver.scaleX = 0.5;
	btnOver.scaleY = 0.5;
	btnOver.x = 2;
	btnOver.y = 2;
	var btn = new LButton(btnUp,btnOver);
	btn.name = value;
	return btn;
}
