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
	this.update = function(){
		//TOdo
	}
	this.draw  = function(){
		//TODO
		
		//context.fillStyle = 'black'; 
			
		if(!this.isEmpty())
			this.ball.draw();
		context.globalCompositeOperation='destination-over';
		if(this.isMarked==true){
			context.beginPath();
			context.fillStyle = "#92aa96";
			context.fillRect(this.x, this.y, 49, 49); 
			context.fill();
		}else{
			context.strokeStyle = '#dedfe0'
			context.rect(this.x, this.y, 48, 48); 
			context.stroke();
		}
		
	}
	this.setMark = function(bol){
		this.isMarked = bol;
	}
	this.addBall = function(ball){
		this.ball = ball;
	}
	this.isChild = function(){
		return this.ball.getChild();
	}
	this.isEmpty = function(){
		if(typeof this.ball === "undefined")
			return true;
		return false;
	}
	this.setNotChild= function(){
		this.ball.setNotChild();
	}
	this.removeBall = function(){
		this.ball.setDestroyState();
		setTimeout(function() {root.ball = undefined;}, 500);
		
		
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
		if(this.isEmpty()==false)
			if(this.isChild()==false)
				return false
		return true;
	}
}