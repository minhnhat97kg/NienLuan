function Cell(x,y){
	this.ball;
	this.i = x;
	this.j = y;
	this.x = (y*50+1);
	this.y = (x*50)+1+100;
	this.h = 50;
	this.w = 50;
	this.isMarked = false;
	var root = this;
	
	this.draw  = function(){	
		//Draw ball if it's exist
		if(!this.isEmpty())
			this.ball.draw();
		context.beginPath();
		context.globalCompositeOperation='destination-over';
		if(this.isMarked==true){
			context.beginPath();
			context.fillStyle ='#9b9b9b';
			context.fillRect(this.x, this.y, 49, 49); 
			context.fill();
		}else{
			context.fillStyle = '#c6c6c6'
			context.fillRect(this.x, this.y, 48, 48); 
			context.fill();
		}
		
	}
	this.setMark = function(bol){
		this.isMarked = bol;
	}
	this.addBall = function(ball){
		this.ball = ball;
	}
	this.isChild = function(){
		return this.ball.isChild();
	}
	this.isEmpty = function(){
		if(typeof this.ball === "undefined")
			return true;
		return false;
	}
	this.setGrowed= function(){
		this.ball.setGrowed();
	}
	this.removeBall = function(){
		this.ball.setDestroyState();
		setTimeout(function() {root.ball = undefined;}, 200);
		
		
	}
	this.moveBall = function(){
		this.ball = undefined;
	}
	this.getPosition = function(){
		return {
			x:this.i,
			y:this.j
		}
	}
	this.getColor = function(){
		if(this.isEmpty()==false){
			return this.ball.colorNumber;
		}
	}
	this.canMove = function(){
		//Neu khong rong va bi lon thi khong the di chuyen
		if(this.isEmpty()==false)
			if(this.isChild()==false)
				return false
		return true;
	}
}