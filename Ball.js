function Ball(x,y,color){
    var colors = ["red","orange","yellow","green","blue","purple","violet"];
    this.x = x;
    this.y = y;
    this.child= true;
    this.color = colors[color];
    this.colorNumber = color;
   
    this.draw = function(){
        context.beginPath();
        context.fillStyle = this.color;  

        if( this.child){
            context.arc(this.y*50+25,this.x*50+25+100,10,0,2*Math.PI);
        }
        else{
            context.arc(this.y*50+25,this.x*50+25+100,20,0,2*Math.PI);
        }
        context.fill();
    }

    this.setNotChild = function(){
        this.child = false;
    }
    this.getChild = function(){
        return this.child;
    }
    this.getColorNumber = function(){
        return this.colorNumber;
    }
    

  
}