function mvtimg()
{
	// <canvas> 's  id = mylegend_canvas
	var src = document.getElementById("mylegend_canvas").toDataURL("image/png");
	document.getElementById("image").src = src;
	document.getElementById("note").innerHTML = "右击图片可保存到本地";
}

function main()
{
			// draw rect
			var layer = new LSprite();
			layer.graphics.drawRect(0,'#dddddd',[0,0,600,400],true,'#000000');
			addChild(layer);

			// press down mark
			var onoff = false;
			var oldx = 0;
			var oldy = 0;
			//setting color   if add var  then is jubu var
			linecolor = "white";
			//setting linewid if add var then is jubu var or we can add var but must define outside function
			linw = 4;
			layer.addEventListener(LMouseEvent.MOUSE_MOVE,draw	);
			layer.addEventListener(LMouseEvent.MOUSE_DOWN,down	);
			layer.addEventListener(LMouseEvent.MOUSE_UP	 ,up	);
			
			function down(event)
			{
				onoff = true;
				oldx = event.selfX;
				oldy = event.selfY;
			}
			function up()
			{
				onoff = false;
			}
			function draw(event)
			{
				if(onoff == true)
				{
					var newx = event.selfX;
					var newy = event.selfY;
					layer.graphics.beginPath();
					layer.graphics.strokeStyle(linecolor);
					layer.graphics.lineWidth(linw);
					layer.graphics.add(function(){LGlobal.canvas.lineCap = "round"});
					layer.graphics.moveTo(oldx,oldy);
					layer.graphics.lineTo(newx,newy);
					layer.graphics.stroke();
					oldx = newx;
					oldy = newy;
				}
			}	
}
