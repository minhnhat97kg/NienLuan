function Cell(x,y){
	this.ball;
	this.i = x;
	this.j = y;
	this.x = (y*50+1);
	this.y = (x*50)+1+100;
	this.h = 50;
	this.w = 50;
	

	this.update = function(){
		//TOdo
	}
	this.draw  = function(){
		//TODO
		
		//context.fillStyle = 'black'; 
		context.rect(this.x, this.y, 48, 48); 
		context.stroke();
		if(!this.isEmpty())
			this.ball.draw();
		
	}
	this.addBall = function(ball){
		this.ball = ball;
	}
	this.isChild = function(){
		return this.ball.checkIsChild();
	}
	this.isEmpty = function(){
		if(typeof this.ball == "undefined")
			return true;
		return false;
	}
	this.setNotChild= function(){
		this.ball.setNotChild();
	}
	this.removeBall = function(){
		this.ball = undefined;
	}
	this.getPosition = function(){
		return {
			x:this.j,
			y:this.i
		}
	}
}