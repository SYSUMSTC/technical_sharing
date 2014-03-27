/**
 * 子弹类 
 * */
function Bullet(params){
	base(this,LSprite,[]);
	var self = this;
	//出现位置
	self.x = params.x;
	self.y = params.y;
	//xy轴速度
	self.xspeed = params.xspeed;
	self.yspeed = params.yspeed;
	self.belong = params.belong;
	self.isdie = false;
	//子弹图片
	self.bitmap = new LBitmap(params.bitmapData);
	//显示
	self.addChild(self.bitmap);
}

/**
 * 循环
 * @param 子弹序号
 * */
Bullet.prototype.onframe = function (index){
	var self = this;
	//子弹移动
	self.x += self.xspeed;
	self.y += self.yspeed;
	//子弹位置检测
	if(self.x < 0 || self.x > LGlobal.width || self.y < 0 || self.y > LGlobal.height){
		//从屏幕移除
		bulletLayer.removeChild(self);
	}
};