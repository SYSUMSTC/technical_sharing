function Floor(){
	base(this,LSprite,[]);
	var self = this;
	self.hy = 0;
	self.setView();
}
Floor.prototype.setView = function(){}
Floor.prototype.onframe = function (){
	var self = this;
	self.y -= STAGE_STEP;
};
Floor.prototype.hitRun = function (){};
function Floor01(){
	base(this,Floor,[]);
}
Floor01.prototype.setView = function(){
	var self = this;
	self.bitmap = new LBitmap(new LBitmapData(imglist["floor0"]));
	self.addChild(self.bitmap);
}