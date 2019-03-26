class ImageButton{
	constructor(x,y,r,img,userData){
		this.x = x;
		this.y = y;
		this.r = r;
		this.imgsource = new Image();
		this.imgsource.src = img;
		this.userData = userData;
		this.clicked = false;
	}
	
	draw(){
		if(this.clicked==false){
			context.save();
			context.beginPath();
			context.shadowOffsetX = 3;
			context.shadowOffsetY = 3;
			context.shadowBlur    = 1;
			context.shadowColor   = '#c1c1c1';
			context.fillStyle = '#d4d4d4'
			context.arc(this.x,this.y,this.r,0,2*Math.PI);
			context.fill();
			context.restore();
			context.globalCompositeOperation = "source-over";	
			context.drawImage(this.imgsource,this.x-this.r/2,this.y-this.r/2,this.r,this.r);
			context.fillStyle = 'rgba(255,255,255,0.5)'
			context.arc(this.x,this.y,this.r,0,2*Math.PI);
			context.fill();
		}else{
			let root = this;
			context.save();
			context.beginPath();
			context.shadowOffsetX = 3;
			context.shadowOffsetY = 3;
			context.shadowBlur    = 1;
			context.shadowColor   = '#c1c1c1';
			context.fillStyle = '#d4d4d4'
			context.arc(this.x+2,this.y+2,this.r,0,2*Math.PI);
			context.fill();
			context.restore();
			context.globalCompositeOperation = "source-over";	
			context.drawImage(this.imgsource,this.x+2-this.r/2,this.y+2-this.r/2,this.r,this.r);
			context.fillStyle = 'rgba(255,255,255,0.5)'
			context.arc(this.x+2,this.y+2,this.r,0,2*Math.PI);
			context.fill();
			setTimeout(()=>{
				root.clicked = false;
			},50);
		}
	
		
			
	}

	setClicked(){
		this.clicked =true;
	}
	getUserData(){
		return this.userData;
	}
	

}