function Ball(x,y,color){
    this.x = x;
    this.y = y;
    this.isChild= true;
    var colors = ["red","orange","yellow","green","blue","purple","violet"];
    this.color = colors[color-1];
    this.draw = function(){
        context.beginPath();
        context.fillStyle = this.color;  

        if( this.isChild){
            context.arc(this.x*50+25,this.y*50+25+100,10,0,2*Math.PI);
        }
        else{
            context.arc(this.x*50+25,this.y*50+25+100,20,0,2*Math.PI);
        }
        context.fill();
    }

    this.setNotChild = function(){
        this.isChild = false;
    }

    this.checkIsChild = function(){
        return this.isChild;
    }
}