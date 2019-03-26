class Ball{
    constructor(x,y,color){
        var colors = ["red","orange","yellow","green","blue","purple","violet"];
        this.x = x;
        this.y = y;
        this.state= 0;//0 is child, 1 is growed,2 is selected, 3 is destroy
        this.color = colors[color];
        this.colorNumber = color;
        this.size = 20;
        this.animation ;

    }

    draw(){
        context.save();
        context.beginPath();
        context.fillStyle = this.color;  
       
	
        if(this.state==0){
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowBlur    = 1;
            context.shadowColor   = '#a1a1a1';
            context.arc(this.y*50+25,this.x*50+25+100,10,0,2*Math.PI);
       
        }else if(this.state==1){
            context.shadowOffsetX = 3;
            context.shadowOffsetY = 3;
            context.shadowBlur    = 2;
            context.shadowColor   = '#a1a1a1';
            context.arc(this.y*50+25,this.x*50+25+100,this.size,0,2*Math.PI);
     
        }else{
           
            context.shadowOffsetX = 3;
            context.shadowOffsetY = 3;
            context.shadowBlur    = 2;
            context.shadowColor   = '#a1a1a1';
    
            context.arc(this.y*50+25,this.x*50+25+100,this.size-=1,0,2*Math.PI);
    
        }
       
        context.fill()
        context.restore();
       
       
       
        
        
    }

    setSelected(bool){
        var root = this;
        let i=1;
        if(bool==true){
            this.animation = setInterval(function(){
                if(root.size==22){
                    i=-1;
                }else if(root.size==15){
                     i=1;
                }
                root.size+=i;
            },50);
        }else{
            this.size = 20;
            clearInterval(this.animation);
        }
        
    }
    setGrowed(){
        this.state = 1;
    }
    
    isChild(){
        return this.state==0?true:false;
    }
    
    getColorNumber(){
        return this.colorNumber;
    }
    
    setDestroyState(){
        if(this.animation){
            this.size=20
            clearInterval(this.animation);
        }
        this.state =3;
    }   
}