/**
 * 自机类
 * */
function Player(x,y,shootX,shootY,bitmapData,hp){
	base(this,Plain,[x,y,shootX,shootY,bitmapData,hp]);
	var self = this;
	self.belong = "self";
	self.downX = self.downY = 0;
	self.bulletBitmapData=new LBitmapData(imglist["bullet01"]);
}
