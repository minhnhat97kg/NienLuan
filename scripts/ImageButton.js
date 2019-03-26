class ImageButton{
	constructor(x,y,w,h,img,userData){
		this.x = x;
		this.y = y;
		this.h = h;
		this.w = w;
		this.imgsource = new Image();
		this.imgsource.src = img;
		this.userData = userData;
	}
	
	draw(){
		
		context.fillStyle = 'hsl(0%, 67%, 0.3)'
		context.fillRect(this.x,this.y,this.w,this.h);
		context.globalCompositeOperation = "destination-over";
		context.drawImage(this.imgsource,this.x,this.y,this.w,this.h);
  		
			
	}

	getUserData(){
		return this.userData;
	}
	
}