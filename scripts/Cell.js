class Cell{
	constructor(x,y){
	this.ball;
	this.i = x;
	this.j = y;
	this.x = (y*50+1);
	this.y = (x*50)+1+100;
	this.h = 50;
	this.w = 50;
	this.isMarked = false;
	}
	draw (){	
		//Draw ball if it's exist
		
		context.beginPath();
		
		if(this.isMarked==true){
	
			context.beginPath();
			context.fillStyle ='#f6f6f6';
			context.fillRect(this.x, this.y, 49, 49); 
			context.fill();
	
		}else{
	
			context.fillStyle = '#d4d4d4'
			context.fillRect(this.x, this.y, 48, 48); 
			context.fill();
		}
		context.globalCompositeOperation='source-over';
	
		if(!this.isEmpty())
			this.ball.draw();

		
	}
	setMarkedCell(bool){
		this.isMarked = bool;
		
	}
	setSelectedBall(bool){
		if(!this.isEmpty())
			this.ball.setSelected(bool);

	}
	addBall (ball){
		this.ball = ball;
	}
	isChild (){
		return this.ball.isChild();
	}
	isEmpty (){
		if(typeof this.ball === "undefined")
			return true;
		return false;
	}
	setGrowed (){
		this.ball.setGrowed();
	}
	removeBall (){
		this.ball.setDestroyState();
		var root = this;
		setTimeout(function (){
			root.ball = undefined;
		}, 300);
		
		
	}
	moveBall (){
		this.ball = undefined;
	}
	getPosition (){
		return {
			x:this.i,
			y:this.j
		}
	}
	getColor (){
		if(this.isEmpty()==false){
			return this.ball.colorNumber;
		}
		return undefined;
	}
	canMove  (){
		//Neu khong rong va bi lon thi khong the di chuyen
		if(this.isEmpty()==false)
			if(this.isChild()==false)
				return false
		return true;
	}
}