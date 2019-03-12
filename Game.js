function Game(){
    this.components =[];
    this.INIT_BALL = 5;
    this.COL = 9;
    this.ROW = 9;
    this.matrix=[];
    this.MAX= Number.MAX_VALUE;
    this.balls= 0;
    this.srcCell = undefined;
    this.mousePosition = undefined;
    this.time = 0;
    this.points = 0;
    var root =this;
    //Ham ngay nhien
    this.random = function (n){
        return Math.floor((Math.random()*100)%n);
    }
    
    this.init = function () {
        let ballInit = 0;
        //Init empty matrix;
        for(let i=0;i<this.ROW;i++){
            this.matrix[i] = [];
            for(let j=0;j<this.COL;j++){    
                this.matrix[i][j] = new Cell(i,j) ;
               
            }
        }
      
        //Them 5 bi moi
        do{

            this.addBall();
            ballInit++;

        }while(ballInit<=this.INIT_BALL) 
   
        //Cho 5 bi vua them lon len
        this.setGrowed();

        //Lay vi tri chuot khi click
        canvas.addEventListener("click",(event)=>{
            let rect = canvas.getBoundingClientRect();
            this.mousePosition =  {
                x:event.clientX - rect.left,
                y:event.clientY - rect.top
            } 
        });
    }
    
    //Su ly su kien khi lay duoc vi tri cuot
    this.clickProcessing = function(){
        //Ham kiem tra vi tri chuot co nam trong hinh
        let checkInSide = (pos, rect) =>{
            return pos.x > rect.x && pos.x < rect.x+rect.w && pos.y < rect.y+rect.h && pos.y > rect.y
        }
        //What thing is clicked!
        /*
        this.components.forEach(component =>{
            if(this.isInside(mousePos,component))
                //Todo something
        });
        */
        //Huy danh dau tat ca o trong matrix
        for(let i=0;i<this.ROW;i++)
            for(let j=0;j<this.COL;j++)
                this.matrix[i][j].setMark(false);


        for(let i=0;i<this.ROW;i++)
            for(let j=0;j<this.COL;j++)
                   //Kiem tra vi tri chuot co trung voi vi tri o [i.j]
                    if(checkInSide(this.mousePosition,this.matrix[i][j])===true){
                        
                        //console.log("Click at",{i,j}," , Ball is empty= ",this.matrix[i][j].isEmpty(),this.matrix[i][j].isEmpty()==false?this.matrix[i][j].ball:0);
                          //Neu chua o nao duoc chon
                       if(typeof this.srcCell=='undefined'){  
                            //Chon o co Bi lon
                           if(this.matrix[i][j].isEmpty()===false && this.matrix[i][j].isChild()==false){
                                this.matrix[i][j].setMark(true);    
                                this.srcCell = this.matrix[i][j].getPosition();
                            //Huy chon khi bam bao bi khac
                            }else{
                                //Danh o duoc chon
                                this.matrix[i][j].setMark(false); 
                                this.srcCell = undefined;

                            }
                         //Neu co o duoc chon thi di chuyen den o [i,j]   
                        }else{
                            //Neu o [i,j] trong
                            if(this.matrix[i][j].isEmpty()){
                                //Neu co duong di den o [i,j]
                                if(this.findPath(this.srcCell.x,this.srcCell.y,i,j)==true){
                                    //Di chuyen Bi va sinh ra bi moi
                                    this.nextStepEvent();
                                   
                                    this.matrix[i][j].addBall(new Ball(i,j,this.matrix[this.srcCell.x][this.srcCell.y].getColor()));
                                    this.matrix[this.srcCell.x][this.srcCell.y].moveBall();
                                    this.matrix[i][j].setNotChild();
                                    this.matrix[i][j].setMark(false); 
                                     //Theo duong doc
                                    this.checkLine({x:i,y:j},this.matrix[i][j].getColor(),{x:0,y:1});
                                    //Theo duong ngang
                                    this.checkLine({x:i,y:j},this.matrix[i][j].getColor(),{x:1,y:0});
                                    //Theo duong cheo
                                    this.checkLine({x:i,y:j},this.matrix[i][j].getColor(),{x:1,y:1});
                                    this.checkLine({x:i,y:j},this.matrix[i][j].getColor(),{x:1,y:-1});
                                    
                                    this.srcCell = undefined;
                                     setTimeout(()=>{
                                        for(let i=0;i<this.ROW;i++)
                                            for(let j=0;j<this.COL;j++)
                                                this.matrix[i][j].setMark(false);
                            
                                    },100);
                                //Huy chon neu khong co duong di khi co o duoc chon
                                }else{
                                     this.matrix[i][j].setMark(false); 
                                     this.srcCell = undefined;
                                }
                            //Huy khi o khong trong
                            }else{
                                this.srcCell = undefined;
                            }
                        }
                    }
        }
    
   
   //Ham gan Bi nho thanh Bi lon
    this.setGrowed = function(){
        for(let i=0;i<this.ROW;i++)
                for(let j=0;j<this.COL;j++)
                        if(!this.matrix[i][j].isEmpty() && this.matrix[i][j].isChild()){                           
                            this.matrix[i][j].setNotChild();           
                            //Theo duong doc
                            this.checkLine({x:i,y:j},this.matrix[i][j].getColor(),{x:0,y:1});
                            //Theo duong ngang
                            this.checkLine({x:i,y:j},this.matrix[i][j].getColor(),{x:1,y:0});
                            //Theo duong cheo
                            this.checkLine({x:i,y:j},this.matrix[i][j].getColor(),{x:1,y:1});
                            this.checkLine({x:i,y:j},this.matrix[i][j].getColor(),{x:1,y:-1});
                                           
                        }
    }

    //Them 1 bi vao vi tri ngau nhien
    this.addBall = function(){
    
        while(this.balls<(this.ROW*this.COL)){
    
            let i = Math.floor(this.random(9));
            let j = Math.floor(this.random(9));
    
            if(this.matrix[i][j].isEmpty()){
                    this.matrix[i][j].addBall(new Ball(i,j,this.random(6)));
                break;
            }
        }  
    }

    this.neighborSet = function(positionx,positiony){
            let neighbors = [];
            let checkValid = (x,y)=>{
                if((x>=0&&x<9)&&(y>=0&&y<9))
                    return true;
                return false;
            }
            if(checkValid(positionx-1,positiony)&& this.matrix[positionx-1][positiony].canMove()==true){
                neighbors.push({x:positionx-1,y:positiony});
            }
            if(checkValid(positionx+1,positiony)&& this.matrix[positionx+1][positiony].canMove() ==true){
                neighbors.push({x:positionx+1,y:positiony});
            }
            if(checkValid(positionx,positiony-1)&& this.matrix[positionx][positiony-1].canMove()==true){
                neighbors.push({x:positionx,y:positiony-1});
            }
            if(checkValid(positionx,positiony+1)&& this.matrix[positionx][positiony+1].canMove()==true){
                neighbors.push({x:positionx,y:positiony+1});
            }
            return neighbors;
    }

    this.minDistance = function(distance,marked){
        let min = this.MAX, min_index ={x:0,y:0};
        for(let i=0;i<this.ROW;i++)
            for(let j=0;j<this.COL;j++)
                if(marked[i][j]==false && distance[i][j]<min){
                    min = distance[i][j];
                    min_index.x=i;
                    min_index.y=j;
                }      
        return min_index;
    }
    
    
    this.findPath = function(startx,starty,finishx,finishy){
        let distance = [];
        let marked = [];
        let prev = [];
        
        for(let i=0;i<this.ROW;i++){
            distance[i] = [];
            marked[i] = [];
            prev[i] = [];
            for(let j=0;j<this.COL;j++){
                distance[i][j] = this.MAX;
                marked[i][j] = false;
                
            }
        }


        prev[startx][starty]={x:startx,y:starty} ;
        distance[startx][starty] =0;
        

        //Duyet voi so lan = so o;
        for(let loopcount = 0; loopcount<this.ROW*this.COL;loopcount++){
            
            //Lay vi tri cua dinstance nho nhat
            let current = this.minDistance(distance,marked);
            //Danh dau da duyet qua nut nho nhat
            marked[current.x][current.y] = true;  
            
            let neighbors = this.neighborSet(current.x,current.y);
            
            neighbors.forEach((neighbor) => {
                if(marked[neighbor.x][neighbor.y]==false && ((distance[current.x][current.y]+1)< distance[neighbor.x][neighbor.y])){
                    prev[neighbor.x][neighbor.y] = current;      
                    distance[neighbor.x][neighbor.y] = distance[current.x][current.y]+1; 
                 }
            });
            if(marked[finishx][finishy]==true){
              break;
            }

            //TODO tra ve Path neu da tim duoc, va tra ve null neu khong tim duoc
           

        }
          
       
        if(marked[finishx][finishy]==true){
            let pos = {x:finishx,y:finishy};
            while(true){ 
                this.matrix[pos.x][pos.y].setMark(true); 
                pos = prev[pos.x][pos.y];   

                if(pos.x==startx&&pos.y==starty)
                    break;        
                }
            return true;
        }
         
        return false;     
    }  
    
    this.checkLine = function(position,color,direction,matrix){


        let checkValid = (x,y)=>{
            if((x>=0&&x<9)&&(y>=0&&y<9))
                return true;
            return false;
        }
        let ix = position.x + direction.x;
        let iy = position.y + direction.y;
        let jx = position.x - direction.x;
        let jy = position.y - direction.y;
        var ballToRemove=[];
        try{
            ballToRemove.push({x:position.x,y:position.y});
            while(checkValid(ix,iy)==true){
                if(root.matrix[ix][iy].getColor()==color&&root.matrix[ix][iy].isChild()==false){ 
                    ballToRemove.push({x:ix,y:iy});
                    ix += direction.x;
                    iy += direction.y;
                }else{
                  break;
                }
            }

            while(checkValid(jx,jy)==true){
                if(root.matrix[jx][jy].getColor()==color&&root.matrix[jx][jy].isChild()==false){
                    ballToRemove.push({x:jx,y:jy});
                    jx -= direction.x;
                    jy -= direction.y;
        
                }else{
                    break;
                }
            }
        }catch(err){
            console.log(err);
        }
           
       // console.log("Number true:",ballToRemove.length);
        if(ballToRemove.length>=5){
            this.points+=5+(ballToRemove.length-5)*2;
            while(ballToRemove.length!=0){
                let pos = ballToRemove.pop();
                root.matrix[pos.x][pos.y].removeBall();
            }

        }
    }
   
    this.update = function(){
        
        if(typeof this.mousePosition !== 'undefined'){
            this.clickProcessing();
            this.mousePosition = undefined;

       }
    }

    this.draw = function(){
        let count=0;
        for(let i=0;i<this.ROW;i++)
            for(let j=0;j<this.COL;j++)
                    if(this.matrix[i][j]){
                        this.matrix[i][j].draw();
                        if(this.matrix[i][j].isEmpty()==false)
                            count++;
                    }
        this.balls=count;
        context.beginPath();
        context.font = "bolder 30px Arial"
        context.fillStyle = "#888888"
        context.Align = 'center';
        context.fillText("Score :"+this.points,canvas.width/2,canvas.height/8,canvas.width,50);
        context.fill();
        
    }

    this.nextStepEvent = function(){

        this.setGrowed();
        //Tao ngau nhien tu 1->5 bi
        for(let i=0;i<3;i++)
            this.addBall();
        
    }
    this.init();

}
