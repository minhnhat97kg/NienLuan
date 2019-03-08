function MenuScene(){
    this.components = [];
    var root = this;
    this.getMousePosition = function(event){
        var rect = canvas.getBoundingClientRect();
        return {
            x:event.clientX - rect.left,
            y:event.clientY - rect.top
        }
    }
   this.isInside = function (pos, rect){

        return pos.x > rect.x && pos.x < rect.x+rect.w && pos.y < rect.y+rect.h && pos.y > rect.y
    }
    this.init = function(){
        var play = new Button(50,50,80,50,"PLAY","play_button");
        var exit = new Button(50,120,80,50,"EXIT","exit_button");
        this.components.push(play);
        this.components.push(exit);
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
    this.update = function(){
        //Todo
    }
    this.draw = function(){
        this.components.forEach(it=>{
            it.draw();
        });
    }
    this.init();
}