function Button(x,y,w,h,text,userData,img){
	this.x = x;
	this.y = y;
	this.h = h;
	this.w = w;
	this.text = text;
	this.userData = userData;
	this.update = function(){
		
	}
	this.draw = function (){
		
		context.font = h/2+'px FreeMono';
		context.fillStyle = '#ffffff';
		context.textAlign = 'center';
		context.fillText(this.text,x+(w/2),y+h*2/3,w,h);
		context.globalCompositeOperation='destination-over';
		context.fillStyle = '#9d9d9d'; 
		context.fillRect(x, y, w, h); 

		
	}
	this.getUserData = function(){
		return userData;
	}
	
}