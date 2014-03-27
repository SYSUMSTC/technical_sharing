/**
 * 自机类
 * */
function Player(x,y,shootX,shootY,bitmapData,hp){
	base(this,Plain,[x,y,shootX,shootY,bitmapData,hp]);
	var self = this;
	self.belong = "self";
	self.downX = self.downY = 0;
}

/**
 * 循环
 * */
Player.prototype.onframe = function (){
	var self = this;
	self.callParent("onframe",arguments);
};