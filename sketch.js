var PLAY=1;
var END=0;
var gameState=PLAY;

var player,playerImage;
var obstacle1,obstacle2,obstacle3;
var bg,bgImage;
var score;
var ground;
var obstaclesGroup;
var FoodGroup;
var gameover,gameoverImage;

var canvas;



function preload(){
  
  playerImage=loadAnimation("player1.png","player2.png");
  
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  
  bgImage=loadImage("bg.png");
  
  food=loadImage("food.png");
  
  gameoverImage=loadImage("game_over.png");
  
  
}

function setup() {
  canvas  = createCanvas(displayWidth-10, displayHeight-150);
  
  bg=createSprite(0,0,1000,400);
  bg.addImage("Background",bgImage);
  bg.velocityX=-3;
  
  
  ground=createSprite(displayWidth/2-800,displayHeight-260,900,10);
  ground.velocityX=-3;
  ground.visible=false;
  
  player=createSprite(displayWidth/2-700,displayHeight-350,20,20);
  player.addAnimation("Player",playerImage);
  player.scale=1.8;
  
  
  score=0;
  

  gameover = createSprite(displayWidth/2-20,displayHeight/2-150);
  gameover.addImage("Game Over!",gameoverImage);
  gameover.scale=1;
  
  obstaclesGroup=createGroup();
  FoodGroup=createGroup();
 
}

function draw() {
  background("white");

  camera.position.x = displayWidth/2;
  camera.position.y = displayHeight/2;
  
  
  if (gameState===PLAY){
    
    gameover.visible = false;
    
    if(bg.x<200){
       bg.x=bg.width/2; 
    }
    
    if (keyDown("space")&&player.y>=200){
      player.velocityY=-12;
    }
    
    player.velocityY=player.velocityY+0.8;
    
    
    if(ground.x<0){
       ground.x=ground.width/2; 
    }
    
    if(FoodGroup.isTouching(player)){
      score=score+2;
      FoodGroup.destroyEach();
    }
    
     if(obstaclesGroup.isTouching(player)){ 
     gameState=END;
   } 
    

    obstacles();
    Food();
    
  }
  
   else if(gameState===END){
     gameover.visible = true;
     
     score=0;
  
     
     obstaclesGroup.destroyEach();
     FoodGroup.destroyEach();
     player.destroy();
     
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
     ground.velocityX=0;
     bg.velocityX=0;
     
     
   }
  
  player.collide(ground);
  
 drawSprites();
  
  stroke("black");
  strokeWeight(4);
  fill("white");
  textSize(20);
  text("Score : "+score,displayWidth/2-50,displayHeight/2-300);
}


function obstacles(){
 if (frameCount % 200 === 0) {
    var obstacle = createSprite(displayWidth/2-400,displayHeight-320,5,5);
    obstacle.velocityX=-3;
    
   var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default:break;
    }
   
   obstacle.scale=0.4;
   obstacle.lifetime = 200;
   
   obstaclesGroup.add(obstacle);
   
  }
}


function Food(){
 if (frameCount % 80 === 0) {
    var cake = createSprite(displayWidth/2-300,displayHeight-650,5,5);
    cake.y = Math.round(random(displayHeight-550,displayHeight-700));
    cake.addImage(food);
    cake.scale = 0.2;
    cake.velocityX = -3;
    cake.lifetime = 200;
    FoodGroup.add(cake);
  }
}