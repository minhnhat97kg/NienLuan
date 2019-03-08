function Game(){
    this.components =[];
    this.INIT_BALL = 5;
    this.COL = 9;
    this.ROW = 9;
    this.matrix=[];
    this.MAX= 99999;
    this.balls= 0;
    this.srcCell ={};
    var root = this;
    this.random = function (n){
        return Math.floor((Math.random()*100)%n);
    }

    this.init = function () {
        var ballInit = 0;
        //Init empty marix;
        for(var i=0;i<this.ROW;i++){
            this.matrix[i] = [];
            for(var j=0;j<this.COL;j++){    
                this.matrix[i][j] = new Cell(i,j) ;
               
            }
        }
      

        do{

            this.addBall();
            ballInit++;

        }while(ballInit<=this.INIT_BALL) 
        this.setGrowed();
        canvas.addEventListener("click",root.clickEvent);
    }

    this.clickEvent = function(event){
        var mousePos = root.getMousePosition(event);
        
        //What thing is clicked!
        /*
        root.components.forEach(component =>{
            if(root.isInside(mousePos,component))
                //Todo something
        });
        */
        
        root.matrix.forEach(row=>{
            row.forEach(col =>{
                if(root.isInside(mousePos,col)){
                   if(!col.isEmpty() ){
                        root.srcCell = col.getPosition();
                        console.log("selected");
                    }else if(col.isEmpty() && Object.keys(root.srcCell).length!==0 
                        && root.srcCell.constructor === Object){
                        col = root.matrix[root.srcCell.x][root.srcCell.y]
                        col.removeBall();
                        root.srcCell = {};
                    }
                }
            });
        });

    }
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

    this.setGrowed = function(){
        for(var i=0;i<this.ROW;i++)
                for(var j=0;j<this.COL;j++)
                        if(!this.matrix[i][j].isEmpty() && this.matrix[i][j].isChild())                           
                            this.matrix[i][j].setNotChild();
                        
    }
    //Number is largest-limit
    this.addRandomBall = function(number){
        
        for(var i=0;i<this.random(number+1);i++)
            this.addBall();
    }
    this.addBall = function(){
    
        while(this.balls<(this.ROW*this.COL)){
    
            var i = Math.floor(this.random(9));
            var j = Math.floor(this.random(9));
    
            if(this.matrix[i][j].isEmpty()){
    
                this.matrix[i][j].addBall(new Ball(i,j,this.random(6)+1));
                this.balls++;
                console.log("Added a ball.");
                break;
            }
        }  
    }
   
    this.findPath = function(startx,starty,finishx,finishy){
        var distance = [];
        var marked = [];
        var prev = [];
        for(var i=0;i<this.ROW;i++){
            distance[i] = [];
            marked[i] = [];
            prev[i] = [];
            for(var j=0;j<this.COL;j++){
                distance[i][j] = this.MAX;
                marked[i][j] = false;
                prev[i][j] = {x:startx,y:starty};
            }
        }

        distance[startx][starty] =0;
        //Duyet voi so lan = so o;
        for(var loopcount = 0; loopcount<this.ROW*this.COL;loopcount++){
            
            //Lay vi tri cua dinstance nho nhat
            var current = this.minDistance(distance,marked);
            //Danh dau da duyet qua nut nho nhat
            marked[current.x][current.y] = true;   
            
            var neighbors = this.neighborSet(current.x,current.y);
            
            neighbors.forEach((neighbor) => {
                if(marked[neighbor.x][neighbor.y]==false && ((distance[current.x][current.y]+1)< distance[neighbor.x][neighbor.y])){
                    prev[neighbor.x][neighbor.y] = current;      
                    distance[neighbor.x][neighbor.y] = distance[current.x][current.y]+1; 
                   
                }
            });
            //TODO tra ve Path neu da tim duoc, va tra ve null neu khong tim duoc
            if(marked[finishx][finishy]==true)
                return prev; 
        } 

        return null;
    }  
    
    this.minDistance = function(distance,marked){
        var min = this.MAX, min_index ={x:0,y:0};
        for(var x=0;x<this.ROW;x++)
            for(var y=0;y<this.COL;y++)
                if(marked[x][y]==false&&distance[x][y]<=min){
                    min = distance[x][y];
                    min_index.x=x;
                    min_index.y=y;
                }      
        return min_index;
    }
    this.neighborSet = function(positionx,positiony){
        var neighbors = [];
            if((positionx-1>=0)&&this.matrix[positionx-1][positiony]==0){
                neighbors.push({x:positionx-1,y:positiony});
            }
            if((positionx+1<this.ROW)&&this.matrix[positionx+1][positiony]==0 ){
                neighbors.push({x:positionx+1,y:positiony});
            }
            if((positiony-1>=0)&&this.matrix[positionx][positiony-1]==0){
                neighbors.push({x:positionx,y:positiony-1});
            }
            if((positiony+1<this.COL)&&this.matrix[positionx][positiony+1]==0){
                neighbors.push({x:positionx,y:positiony+1});
            }
            return neighbors;

    }
    
    this.drawBalls = function(){
            for(var i=0;i<this.ROW;i++)
                for(var j=0;j<this.COL;j++)
                        if(this.matrix[i][j])                           
                            this.matrix[i][j].draw();                        
    }

    this.update = function(){
        //Todo
    }
    this.draw = function(){
       // this.drawTable();
       if(this.balls==81){
           return;
       }
        this.drawBalls();

    }
    this.nextStepEvent = function(){
        root.setGrowed();
        root.addRandomBall(4);
    }
    this.init();

}
