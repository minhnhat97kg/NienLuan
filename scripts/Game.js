function Game(){
    const  colors = ["red","orange","yellow","green","blue","purple","violet"];

    const GAME = {
        INIT:0,
        RUNNING:1,
        WIN:2,
        OVER:3,
        EXIT:4
    };

    this.gameState      = GAME.INIT; //0 is running,1 is winner, 2 is over
    this.components     = [];
    this.matrix         = [];
    this.balls          = 6;
    this.srcCell        = undefined;
    this.mousePosition  = undefined;
    this.score          = 0;
    this.stackBalls     = [];
    this.highScoreUser  = {name:'unknown',score:0};
    const root          =this;
   //Lay vi tri chuot khi click
   canvas.addEventListener("click",(event)=>{
    let rect = canvas.getBoundingClientRect();
    this.mousePosition =  {
        x:event.clientX - rect.left,
        y:event.clientY - rect.top
    }
});

    //Ham ngay nhien
    this.random = function (n){
        return Math.floor((Math.random()*100)%n);
    }

    this.init = function () {
        try{
                database.ref('scoretable/').once('value').then(function(data){
                                let name = data.val().name||'unknown';
                                if(name.length>8)
                                    name = name.substr(0,8)+"...";
                                root.highScoreUser.name = name;
                                root.highScoreUser.score = data.val().score;
                });
        }catch(ex){
            console.log("Error connect to firebase");
        }

        this.components.push(new ImageButton(225,50,20,"./images/new.svg","NEW"));
        
        this.score = 0;
        let ballInit = 0;
        //Init empty matrix;
        for(let i=0;i<9;i++){
            this.matrix[i] = [];
            for(let j=0;j<9;j++){
                this.matrix[i][j] = new Cell(i,j);
            }

        }

        //Tao stack khoi dau
        for(let i=0;i<3;i++)
            this.stackBalls.push(this.random(6));


        this.createRandomBall();
        this.createRandomBall();
        
        //Cho 6 bi vua them lon len
        this.setBallGrow();
        this.createRandomBall();

     
    }

    //Su ly su kien khi lay duoc vi tri cuot
    this.clickProcessing = function(){
        //Ham kiem tra vi tri chuot co nam trong hinh
        if(this.gameState==GAME.WIN||this.gameState==GAME.OVER)
            this.gameState = GAME.EXIT;

        let checkInSide = (pos, rect) =>{
            return pos.x > rect.x && pos.x < rect.x+rect.w && pos.y < rect.y+rect.h && pos.y > rect.y
        }
        
        let  isInsideArc= (pos, arc)=>{
            return Math.sqrt((Math.abs(pos.x-arc.x)**2+(Math.abs(pos.y-arc.y)**2)))<=arc.r;
       }
        //Huy danh dau tat ca o trong matrix
        for(let i=0;i<9;i++)
            for(let j=0;j<9;j++)
                this.matrix[i][j].setMarkedCell(false);

        this.components.forEach(component=>{
              if(isInsideArc(this.mousePosition,component)==true){
                  if(component.getUserData()=="NEW"){
                    component.setClicked();
                    setTimeout(()=>{
                    scene = new Game();
                        return ;
                    },200);
                    }
              }
        });


        for(let i=0;i<9;i++)
            for(let j=0;j<9;j++)
                   //Kiem tra vi tri chuot co trung voi vi tri o [i.j]
                    if(checkInSide(this.mousePosition,this.matrix[i][j])==true){
                        //Neu chua o nao duoc chon
                       if(typeof this.srcCell=='undefined'){
                                //Chon o co Bi lon
                               if(this.matrix[i][j].isEmpty()==false && this.matrix[i][j].isChild()==false){
                                    this.matrix[i][j].setSelectedBall(true);
                                    this.srcCell = this.matrix[i][j].getPosition();

                                //Huy chon khi bam bao bi khac
                                }else{
                                    this.matrix[i][j].setSelectedBall(false);
                                    this.srcCell = undefined;
                                }
                         //Neu co o duoc chon thi di chuyen den o [i,j]
                        }else{
                                //Neu o [i,j] trong
                                if(this.matrix[i][j].canMove()){

                                    //Neu co duong di den o [i,j]
                                    if(this.findPath(this.srcCell.x,this.srcCell.y,i,j)==true){
                                        //Di chuyen Bi va sinh ra bi moi

                                        let childBallColor ;
                                        if(this.matrix[i][j].isEmpty() ==false && this.matrix[i][j].isChild()==true){
                                            childBallColor = this.matrix[i][j].getColor();
                                        }
                                        this.matrix[i][j].addBall(new Ball(i,j,this.matrix[this.srcCell.x][this.srcCell.y].getColor()));
                                        this.matrix[this.srcCell.x][this.srcCell.y].moveBall();
                                        this.matrix[i][j].setGrowed();
                                        this.matrix[i][j].setSelectedBall(false);
                                        
                                        
                                        if(this.checkLine({x:i,y:j})==false){
                                            //Di chuyển bi nhỏ bị đè sang vị trí ngẫu nhiên 
                                            if(typeof childBallColor!= 'undefined')
                                                this.moveBallRadom(childBallColor);
                                            this.setBallGrow();
                                            this.createRandomBall();
                                        }else{
                                            if(typeof childBallColor!= 'undefined')
                                                setTimeout(()=>{
                                                this.matrix[i][j].addBall(new Ball(i,j,childBallColor));
                                                },310);
                                        }


                                        this.srcCell = undefined;
                                         setTimeout(()=>{
                                            for(let i=0;i<9;i++)
                                                for(let j=0;j<9;j++)
                                                    this.matrix[i][j].setMarkedCell(false);

                                        },100);
                                    //Huy chon neu khong co duong di khi co o duoc chon
                                    }else{
                                        this.matrix[this.srcCell.x][this.srcCell.y].setSelectedBall(false);
                                        this.srcCell = undefined;
                                    }
                              
                                //Huy khi o khong trong
                                }else{
                                    this.matrix[this.srcCell.x][this.srcCell.y].setSelectedBall(false);
                                    this.srcCell = undefined;
                                }
                        }
                    }
        }
   //Ham gan Bi nho thanh Bi lon
    this.setBallGrow = function(){
        for(let i=0;i<9;i++)
                for(let j=0;j<9;j++)
                        if(!this.matrix[i][j].isEmpty() && this.matrix[i][j].isChild()){
                            this.matrix[i][j].setGrowed();
                            this.checkLine({x:i,y:j});
                        }
    }
    //Them 1 bi vao vi tri ngau nhien
    this.createRandomBall = function(){
        let _emptycell =[];
        let _stack = []
        for(let i=0;i<9;i++)
                    for(let j=0;j<9;j++)
                        if(this.matrix[i][j].isEmpty()==true)
                            _emptycell.push({x:i,y:j});

                            console.log("===========");
        for(let count=0;count<3;count++){
            
            let rand = this.random(_emptycell.length);
            let position = _emptycell.splice(rand,1)[0];
            if(typeof position=='undefined'){
                this.gameState=GAME.OVER;
                return;
            }
            console.log(position);
            this.matrix[position.x][position.y].addBall(new Ball(position.x,position.y,this.stackBalls.pop()));
            _stack.push(this.random(7));
            

        }
        this.stackBalls = _stack;
    }

    this.moveBallRadom = function(color){
        let _emptycell =[];
        for(let i=0;i<9;i++)
                    for(let j=0;j<9;j++)
                        if(this.matrix[i][j].isEmpty()==true)
                            _emptycell.push({x:i,y:j});

        if(_emptycell.length==0){
            this.gameState = GAME.OVER;
            return;
        }
        let rand = this.random(_emptycell.length);
        let position = _emptycell.splice(rand,1)[0];
        this.matrix[position.x][position.y].addBall(new Ball(position.x,position.y,color));
            
    }
    //Tra ve tap 4 o kề nếu chúng rỗng
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
            if(checkValid(positionx+1,positiony)&& this.matrix[positionx+1][positiony].canMove()==true){
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
    //Lay ve vi tri o co gia tri distance nho nhat
    this.minDistance = function(distance,marked){
        let min = Number.MAX_VALUE, min_index ={x:0,y:0};
        for(let i=0;i<9;i++)
            for(let j=0;j<9;j++)
                if(marked[i][j]==false && distance[i][j]<min){
                    min = distance[i][j];
                    min_index.x=i;
                    min_index.y=j;
                }
        return min_index;
    }
    //Thuat toan tim duong dijikstra
    this.findPath = function(startx,starty,finishx,finishy){
        let distance = [];
        let marked = [];
        let prev = [];

        for(let i=0;i<9;i++){
            distance[i] = [];
            marked[i] = [];
            prev[i] = [];
            for(let j=0;j<9;j++){
                distance[i][j] = Number.MAX_VALUE;
                marked[i][j] = false;

            }
        }


        prev[startx][starty]={x:startx,y:starty} ;
        distance[startx][starty] =0;


        //Duyet voi so lan = so o;
        for(let loopcount = 0; loopcount<9*9;loopcount++){

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
        }
        //Hieu ung dan duong
         try{
                if(marked[finishx][finishy]==true){
                    let pos = {x:finishx,y:finishy};
                    while(true){
                        this.matrix[pos.x][pos.y].setMarkedCell(true);
                        pos = prev[pos.x][pos.y];
                        if(pos.x==startx&&pos.y==starty)
                            break;
                        }
                         return true;
                     }
        }catch(error){
            console.log("Error when find path:",error,marked);

        }
        return false;
    }
    //Kiem tra duong ngang,doc,cheo co >=5 bi cung mau
    this.checkLine = function(position){


        let checkValid = (x,y)=>{
            if((x>=0&&x<9)&&(y>=0&&y<9))
                return true;
            return false;
        }

        let directions = [{x:0,y:1},{x:1,y:0},{x:1,y:1},{x:1,y:-1}]
        let color = root.matrix[position.x][position.y].getColor();
        let f = false //When it's true children ball when doesn't appear
        let totalball = 0;
        for( let dir of directions){
                let ballToRemove=[];

                ballToRemove.push({x:position.x,y:position.y});

                let ix = position.x + dir.x;
                let iy = position.y + dir.y;
                let jx = position.x - dir.x;
                let jy = position.y - dir.y;

                try{

                    while(checkValid(ix,iy)==true){
                        if(root.matrix[ix][iy].getColor()==color&&root.matrix[ix][iy].isChild()==false){
                            ballToRemove.push({x:ix,y:iy});
                            ix += dir.x;
                            iy += dir.y;
                        }else{
                          break;
                        }
                    }

                    while(checkValid(jx,jy)==true){
                        if(root.matrix[jx][jy].getColor()==color&&root.matrix[jx][jy].isChild()==false){
                            ballToRemove.push({x:jx,y:jy});
                            jx -= dir.x;
                            jy -= dir.y;
                       }else{
                            break;
                        }
                    }

                    if(ballToRemove.length>=5){
                        f = true;
                        totalball+=ballToRemove.length-1;
                        while(ballToRemove.length!=0){
                            let pos = ballToRemove.pop();
                            root.matrix[pos.x][pos.y].removeBall();
                        }


                    }
                }catch(err){
                    console.log(err);
                    return f;

                }
        }
        let score = (5+(totalball-4)*2);
        this.score += score>=0?score:0;

        return f;
       }

    this.draw = function(){

            //Draw score
            context.save();
            context.beginPath();
            
            context.shadowOffsetX = 3;
            context.shadowOffsetY = 3;
            context.shadowBlur    = 8;
            context.shadowColor   = '#a1a1a1';
            context.font = "bolder 20px Arial"
            context.fillStyle = "#888888"
            context.textAlign = 'center';
            context.fillText(root.highScoreUser.name+':'+root.highScoreUser.score ,canvas.width*3/4,40,canvas.width/2,20);
            context.fillText("You : "+this.score,canvas.width*3/4,70,canvas.width/2,225);
            context.restore();
            context.save();
            //Draw the stack ball
            for(i in this.stackBalls){
              
                context.beginPath();
                context.shadowOffsetX = 3;
                context.shadowOffsetY = 3;
                context.shadowBlur    = 1;
                context.shadowColor   = '#a1a1a1';
                context.fillStyle = colors[this.stackBalls[i]];
                context.arc(i*50+50,50,20,0,2*Math.PI);
                context.fill();
                

            }
            context.restore();
            //Draw balls
            this.balls = 0;
            for(let i=0;i<9;i++)
                for(let j=0;j<9;j++){
                    this.matrix[i][j].draw();
                    if(this.matrix[i][j].isEmpty()==false&&this.matrix[i][j].isChild()==false)
                        this.balls++;
                    }
            //Draw button
            this.components.forEach(component=>{
                component.draw();
            });

    }

    this.nextStepEvent = function(){
        this.setBallGrowe();
        this.createRandomBall();
    }


    this.loop = function(){

        if(this.gameState==GAME.INIT){

            this.init();
            this.gameState = GAME.RUNNING;
            return;

        }
        if(this.gameState == GAME.RUNNING){

                if(this.balls==0)
                    this.gameState=GAME.WIN;

                if(this.balls==81)
                    this.gameState=GAME.OVER;
            this.draw();
        }
        if(this.gameState == GAME.WIN){
           
            context.fillStyle = '#515151';
            context.fillRect(0, 250, 600, 100);
            context.globalCompositeOperation = "source-over";  
            context.beginPath();
            context.font = '50px Roboto-Mono';
            context.fillStyle = '#ffffff';
            context.textAlign = 'center';
            context.fillText("YOU'RE WINNER",225,320,440,100 );
            context.fill();
            

        }
        if(this.gameState == GAME.OVER){
           
            context.fillStyle = '#515151';
            context.fillRect(0, 250, 600, 100);
            context.globalCompositeOperation = "source-over";  
            context.beginPath();
            context.font = '50px Roboto-Mono';
            context.fillStyle = '#ffffff';
            context.textAlign = 'center';
            context.fillText("GAME OVER",225,320,440,100 );
            context.fill();


        }
        if(this.gameState == GAME.EXIT){
            if(this.score>=this.highScoreUser.score){
                let name = prompt("Ten cua ban?");
                database.ref('scoretable/').set({name:name,score:this.score});
                    //Back to menu scene
                }
            scene = new MenuScene();
        }

        if(typeof this.mousePosition != 'undefined'){

                    this.clickProcessing();
                    this.mousePosition = undefined;
                }
    

    }
}
