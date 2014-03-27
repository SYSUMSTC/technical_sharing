init(50,"mylegend",800,400,main);
var backLayer,
resultLayer,
clickLayer;
function main(){
	gameInit();
}
function gameInit(){
	backLayer = new LSprite();	
	addChild(backLayer);
	//添加游戏界面背景
	backLayer.graphics.drawRect(10,'#008800',[0,0,LGlobal.width,LGlobal.height],true,'#000000');
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