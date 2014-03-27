//声明变量
//进度条显示层，背景层，方块绘制层，方块预览层
var loadingLayer,backLayer,graphicsMap,nextLayer;
function main(){
	//背景层初始化	backLayer = new LSprite();
	//在背景层上绘制黑色背景	backLayer.graphics.drawRect(1,"#000000",[0,0,320,480],true,"#000000");	//背景显示
	addChild(backLayer);
	gameInit();
}
//读取完所有图片，进行游戏标题画面的初始化工作
function gameInit(){
	//显示游戏标题
	var title = new LTextField();
	title.x = 50;
	title.y = 100;
	title.size = 30;	title.color = "#ffffff";
	title.text = "俄罗斯方块";
	backLayer.addChild(title);	//显示说明文	backLayer.graphics.drawRect(1,"#ffffff",[50,240,220,40]);	var txtClick = new LTextField();	txtClick.size = 18;	txtClick.color = "#ffffff";	txtClick.text = "点击页面开始游戏";	txtClick.x = (LGlobal.width - txtClick.getWidth())/2;	txtClick.y = 245;	backLayer.addChild(txtClick);}