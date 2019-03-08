function Button(x,y,w,h,text,userData){
	this.x = x;
	this.y = y;
	this.h = h;
	this.w = w;
	this.text = text;
	this.userData = userData;
	this.update = function(){
		
	}
	this.draw = function (){
		context.fillStyle = 'black'; 
		context.fillRect(x, y, w, h); 
		context.font = '30px FreeMono';
		context.fillStyle = '#ffffff';
		context.textAlign = 'center';
		context.fillText(this.text,x+(w/2),y+(2*h/3),w,h);
	}
	this.getUserData = function(){
		return userData;
	}
	
}