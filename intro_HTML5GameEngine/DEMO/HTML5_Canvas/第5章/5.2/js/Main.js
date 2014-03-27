init(50,"mylegend",800,400,main);
var loadingLayer,
backLayer,
resultLayer,
clickLayer,
selfBitmap,
enemyBitmap;
var imglist = {};
var imgData = new Array(
		{name:"title",path:"../images/title.png"},
		{name:"shitou",path:"../images/shitou.png"},
		{name:"jiandao",path:"../images/jiandao.png"},
		{name:"bu",path:"../images/bu.png"}
		);
var showList = new Array();
function main(){
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
}
function initClickLayer(){
	clickLayer = new LSprite();
	clickLayer.graphics.drawRect(4,'#ff8800',[0,0,300,110],true,'#ffffff');
	clickLayer.x = 250;
	clickLayer.y = 275;
	backLayer.addChild(clickLayer);
}