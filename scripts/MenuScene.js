class MenuScene{
    
    constructor(){
        console.log("constructor");
        this.components = [];
        this.background  = new Image();; 
        var root        = this;
        
        
        this.background.src = './images/background.png';
        console.log(this.background);
        var play = new Button(canvas.width/4,canvas.height/4,200,50,"PLAY GAME","play_button");
       
        this.components.push(play);
       

        canvas.addEventListener("click",function click(event){
            var mousePos = root.getMousePosition(event);
             
            root.components.forEach(element => {
                
                if(root.isInside(mousePos,element))
                    if(element.getUserData()=="play_button"){
                        scene = new Game();
                        canvas.removeEventListener("click",click);
                    }
                    else if(element.getUserData()=="exit_button")
                        console.log("Exit!");
            });        
        });
    }

    getMousePosition (event){
        var rect = canvas.getBoundingClientRect();
        return {
            x:event.clientX - rect.left,
            y:event.clientY - rect.top
        }
    }
   isInside (pos, rect){

        return pos.x > rect.x && pos.x < rect.x+rect.w && pos.y < rect.y+rect.h && pos.y > rect.y
    }

   
    loop(){
 
        this.components.forEach(it=>{
            it.draw();
        });
        context.drawImage(this.background,0,0,canvas.width,canvas.height);
    
 
    }
  }