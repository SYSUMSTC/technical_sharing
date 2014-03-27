//声明变量
//游戏主层，进度条显示层，背景层，障碍层
var backLayer,loadingLayer,background,stageLayer;
var stageSpeed = 0;
var STAGE_STEP = 1;
var imglist = {};
var imgData = new Array(
		{name:"back",path:"./images/back.png"},
		{name:"floor0",path:"./images/floor0.png"}
		);

function main(){	
	//游戏主层初始化
	backLayer = new LSprite();	
	//在主层上绘制黑色背景
	backLayer.graphics.drawRect(1,"#000000",[0,0,320,480],true,"#000000");
	addChild(backLayer);	
	//进度条读取层初始化
	loadingLayer = new LoadingSample2(50);
	backLayer.addChild(loadingLayer);	
	LLoadManage.load(
		imgData,
		function(progress){
			loadingLayer.setProgress(progress);
		},gameInit
	);
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
	title.y = 100;
	title.size = 30;
	title.color = "#ffffff";
	title.text = "是男人就下100层";
	title.x = (LGlobal.width - title.getWidth())/2;
	backLayer.addChild(title);
	//显示说明文
	backLayer.graphics.drawRect(1,"#ffffff",[50,240,220,40]);
	var txtClick = new LTextField();
	txtClick.size = 18;
	txtClick.color = "#ffffff";
	txtClick.text = "点击页面开始游戏";
	txtClick.x = (LGlobal.width - txtClick.getWidth())/2;
	txtClick.y = 245;
	backLayer.addChild(txtClick);
	//添加点击事件，点击画面则游戏开始
	backLayer.addEventListener(LMouseEvent.MOUSE_UP,function(event){
		gameStart(false);
	});
}
//游戏画面初始化
function gameStart(){
	//背景层清空
	backLayer.die();
	backLayer.removeAllChild();
	
	background = new Background();
	backLayer.addChild(background);
	
	stageInit();
	
	backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
}
function onframe(){
	background.run();
	if(stageSpeed-- < 0){
		stageSpeed = 100;
		addStage();
	}
	var key = null;
	for(key in stageLayer.childList){
		var _child = stageLayer.childList[key];
		_child.onframe();
	}
}
function stageInit(){
	stageLayer = new LSprite();
	backLayer.addChild(stageLayer);
}
function addStage(){
	var mstage;
	mstage = new Floor01();
	mstage.y = 480;
	mstage.x = Math.random()*280;
	stageLayer.addChild(mstage);
}