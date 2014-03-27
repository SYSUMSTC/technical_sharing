/**
 * 飞机类
 * */
function Plain(x,y,shootX,shootY,bitmapData,hp){
	base(this,LSprite,[]);
	var self = this;
	//飞机出现位置
	self.x = x;
	self.y = y;
	//炮口相对飞机的相对位置
	self.shootX = shootX;
	self.shootY = shootY;
	//是否射击炮弹
	self.canshoot=false;
	//自动移动控制
	self.move=[0,0];
	//飞机自动移动时的移动速度
	self.speed=1;
	//飞机生命值
	self.hp = hp;
	//飞机是否死亡
	self.isdie=false;
	//将飞机显示到画面上
	self.bitmap = new LBitmap(bitmapData);
	self.addChild(self.bitmap);
}

/**
 * 循环
 * */
Plain.prototype.onframe = function (){
	var self = this;
	//移动
	self.x += self.move[0]*self.speed;
	self.y += self.move[1]*self.speed;
	//射击
	if(self.canshoot)self.shoot();
};
/**
 * 射击
 * */
Plain.prototype.shoot = function (){};