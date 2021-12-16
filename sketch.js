var PLAY=1;
var END=0;
var gameState=PLAY;
var mario_running,mario_collided;
var ground,invisibleGround,groundImage;
var coinGroup,coinImage;
var score=0;
var obstacle1,obstcale2,obstacle3,obstacleGroup;
var gameOver,restart;



function preload(){
  mario_running=loadAnimation("Capture1.png","Capture3.png","Capture4.png");
  mario_collided=loadAnimation("mariodead.png");
  groundImage=loadImage("backg.jpg")
  coinImage=loadImage("coin.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  gameOverImg=loadImage("gameOver.png")
  restartImg=loadImage("restart.png")
}


function setup() {
  createCanvas(600, 200);
  mario=createSprite(50,180,20,50)
  mario.addAnimation("running",mario_running)
  mario.scale=0.5
  
  ground=createSprite(0,200,1200,20)
  ground.x=ground.width/2
  ground.velocityX=-(6+3*score/100)
  ground.visible=false
  
  gameOver=createSprite(300,100);
  gameOver.addImage(gameOverImg)
  gameOver.scale=0.5
  gameOver.visible=false
  
  restart=createSprite(300,140)
  restart.addImage(restartImg)
  restart.scale=0.5
  restart.visible=false
  
  coinGroup=new Group()
  obstacleGroup=new Group()
  score=0;
  
}

function draw() {
  background(groundImage);
  if(gameState===PLAY){
    score=score+Math.round(getFrameRate()/60);
    
    if(score>=0){
      ground.velocityX=-6;
      
    }
    else{
      ground.velocityX=-(6+3*score/100)
    }
    
    if(keyDown("space") && mario.y>=130){
      mario.velocityY=-12
    }
    mario.velocityY=mario.velocityY+0.8
    
    if(ground.x<0){
      ground.x=ground.width/2
    }
    
    mario.collide(ground)
    
    spawnCoins();
    spawnObstacles();
    
    if(obstacleGroup.isTouching(mario)){
      gameState=END
    }
  }
  else if(gameState===END){
    gameOver.visible=true;
    restart.visible=true;
  mario.addAnimation("collided",mario_collided);
    
    ground.velocityX=0;
    mario.velocityY=0;
    obstacleGroup.setVelocityXEach(0)
    coinGroup.setVelocityXEach(0)
    
    if(mousePressedOver(restart)){
      reset();
    }
  }

  drawSprites();
}

function spawnCoins(){
  if(frameCount%60===0){
    var coin=createSprite(600,120,40,10);
    coin.y=Math.round(random(80,120));
    coin.addImage(coinImage);
    coin.velocityX=-3;
    coin.scale=0.1;
    coin.lifetime=200;
    coin.depth=mario.depth;
    mario.depth=mario.depth+1;
    coinGroup.add(coin)
  }
}

function spawnObstacles(){
  if(frameCount%60===0){
    var ob=createSprite(600,165,10,40);
    var rd=Math.round(random(1,3));
    switch(rd){
      case 1: ob.addImage(obstacle1);
          break;
       case 2: ob.addImage(obstacle2);
          break;
          case 3: ob.addImage(obstacle3);
          break;
          default:break;
          
    }
    ob.velocityX=-(6+3*score/100);
    ob.scale=0.2;
    ob.lifetime=300;
    obstacleGroup.add(ob)
  }
}

function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  obstacleGroup.destroyEach();
  coinGroup.destroyEach();
  mario.changeAnimation("running",mario_running);
  mario.scale=0.5
  score=0
}