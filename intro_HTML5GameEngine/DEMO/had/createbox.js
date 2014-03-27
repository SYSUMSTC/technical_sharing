function createbox(event)										// judage whether launch the ball
{
				var a = (event.offsetX - rocket.x);
				var b = (event.offsetY - rocket.y);
				var c2 = a*a + b*b;
				if(c2 > lauR*lauR)return;
				//alert(event.offsetX+" "+event.offsetY+"<br>"+event.selfX+" "+event.selfY);
				
				if(sum == 0)												//left ball decrease one
				{
					alert("You are lost!");
					location.reload();
				}
				sum--;
				fieldball.text = sum;

				var box = new LSprite();
				box.name = "mybox";
				box.x = event.offsetX;															
				box.y = event.offsetY;
				backlayer.addChild(box);
				box.graphics.beginBitmapFill(bitmapdata);											//addimage of ball
				box.graphics.drawArc(1,"#000000",[20,20,20,0,360*Math.PI/180],true);//20,20,20?		
				box.addBodyCircle(20,0,0,1,10,0.5,0.6);									
				var angle = Math.atan2(b,a);														//arctan find the angle
				var force = parseInt(field.text);													//get the input force
			//	var force = 100;
				var vector = new LGlobal.box2d.b2Vec2(force*Math.cos(angle),force*Math.sin(angle));	//get the vector
				box.box2dBody.ApplyForce(vector, box.box2dBody.GetWorldCenter());
}

