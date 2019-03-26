class MenuScene{
    
    constructor(){
        this.components = [];
        this.background  = new Image();; 
        let root        = this;
        let play = new ImageButton(210,canvas.height/4,60,"./images/play.svg","play_button");
       
        this.components.push(play);
       

        canvas.addEventListener("click",function click(event){
            var mousePos = root.getMousePosition(event);
             
            root.components.forEach(element => {
                
                if(root.isInsideArc(mousePos,element))
                    if(element.getUserData()=="play_button"){
                        element.setClicked();
                        setTimeout(()=>{
                            scene = new Game();
                            canvas.removeEventListener("click",click);
                        },150);
                      
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
   isInsideArc(pos, arc){
         return Math.sqrt((Math.abs(pos.x-arc.x)**2+(Math.abs(pos.y-arc.y)**2)))<=arc.r;
    }

   
    loop(){
 
        this.components.forEach(it=>{
            it.draw();
        });
 
    }
  }