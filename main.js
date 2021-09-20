const goUp = document.querySelector("#up");
const goDown = document.querySelector("#down");
const goLeft = document.querySelector("#left");
const goRight = document.querySelector("#right");
const game = document.querySelector("#game");
let ctx = game.getContext('2d');
let speed =7;
class SnakePart{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}
let tileCount=16;
let tileSize=game.width / tileCount - 3;
let headx=8;
let heady=8;
let xvelocity=0;
let yvelocity=0;
let applex=5;
let appley=5;
let tailLength=2;
let snakeParts=[];
let score=0;
function drawGame(){
    clearScreen();
    setTimeout(drawGame,1000/speed);
    drawSnake();
    changeSnakeposion();
    drawApple();
    checkAppleCollision();
    drawscore();
    let result = checkGameOver();
    if(result== true){
        showOver();
    }

}
drawGame();
function checkGameOver(){
    if(xvelocity === 0 && yvelocity === 0){
        return false;
    }
   if(heady < 0){
    return true;
  }
  else if(headx < 0){
      return true;
  }
  else if(heady === tileCount+4){
    return true;
  }
  else if(headx === tileCount+4){
      return true;
    }
    for(let i=0;i<snakeParts.length;i++){
        let part=snakeParts[i];
        while(part.x==headx && part.y==heady)
        {
        return false;
        break;
        }
      }

}
function showOver(){
    score=0;
    speed=0.00002;
    ctx.font="50px Verdana";  
    var gradient=ctx.createLinearGradient(0,0,game.width,0);
    gradient.addColorStop("0","magenta");
    gradient.addColorStop("0.5","red");
    gradient.addColorStop("1","blue");
    ctx.fillStyle=gradient;
    ctx.fillText("Game Over",game.width /12,game.height/2);
    setTimeout(() => {
        clearScreen();
        headx=8;
        heady=8;
        xvelocity=0;
        yvelocity=0;
        applex=5;
        appley=5;
        tailLength=2;
        snakeParts=[];
        score=0;
        drawGame();
    },2000);
}
function drawscore(){
    ctx.fillStyle="white";
    ctx.font="20px Veedana"
    ctx.fillText("score : "+score,game.width-80,20)
}
function clearScreen(){
    ctx.fillStyle='black';
    ctx.fillRect(0,0,game.width,game.height)
}
function drawSnake(){
    ctx.fillStyle="green";
    for(let i=0;i<snakeParts.length;i++){
        let part = snakeParts[i]
        ctx.fillRect(part.x*tileCount,part.y*tileCount,tileSize,tileSize);
    }
    snakeParts.push(new SnakePart(headx,heady));
    if(snakeParts.length > tailLength){
        snakeParts.shift();
    }
    ctx.fillStyle="orange";
    ctx.fillRect(headx*tileCount,heady*tileCount,tileSize,tileSize);
    
}
function checkAppleCollision(){
    if(headx === applex && heady === appley){
        appley=Math.floor(Math.random()*tileCount);
        applex=Math.floor(Math.random()*tileCount);
        tailLength++;
        score++;
    }
}
function changeSnakeposion(){
    headx = headx + xvelocity;
    heady = heady + yvelocity;
}
function drawApple(){
    ctx.fillStyle='red';
    ctx.fillRect(applex * tileCount,appley * tileCount,tileSize,tileSize)
}

goDown.addEventListener('click',()=>{
        if(yvelocity==-1){
            return;
        }
        xvelocity = 0;
        yvelocity = 1;
    })
goUp.addEventListener('click',()=>{
        if(yvelocity==1){
            return;
        }
        xvelocity = 0;
        yvelocity = -1;
    })
goLeft.addEventListener('click',()=>{
        if(xvelocity==1){
            return;
        }
        xvelocity = -1;
        yvelocity = 0;
    })
goRight.addEventListener('click',()=>{
        if(xvelocity==-1){
            return;
        }
        xvelocity = 1;
        yvelocity = 0;
    })
        

