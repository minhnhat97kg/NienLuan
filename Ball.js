function Ball(x,y,color){
    var colors = ["red","orange","yellow","green","blue","purple","violet"];
    this.x = x;
    this.y = y;
    this.state= 0;//0 is child, 1 is growed,2 destroy
    this.color = colors[color];
    this.colorNumber = color;
    var size = 20;
    this.draw = function(){
       
        context.beginPath();
        context.fillStyle = this.color;  

        if(this.state==0){
            context.arc(this.y*50+25,this.x*50+25+100,10,0,2*Math.PI);
        }
        else if(this.state==1){
            context.arc(this.y*50+25,this.x*50+25+100,20,0,2*Math.PI);
        }else{
            context.arc(this.y*50+25,this.x*50+25+100,size+=1,0,2*Math.PI);
        }
        context.fill()
       
        
        
    }

    this.setNotChild = function(){
        this.state = 1;
    }
    this.getChild = function(){
        return this.state==0?true:false;
    }
    this.getColorNumber = function(){
        return this.colorNumber;
    }
    this.setDestroyState = function(){
        this.state =2;
    }

    

  
}