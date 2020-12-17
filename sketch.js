 // BY SHIVANSHU PATTNAIK
// MONKEY GO HAPPY - 1

// VARIABLES
// MONKEY VARIABLES
var monkey , monkey_running;

// BANANA VARIABLE
var bananaImage;

// OBSTACLE VARIABLES
var obstacleImage, obstacleGroup;

// FOOD VARIABLES
var food, foodGroup;

// SCORE VARIABLE
var score;

// SURVIVAL TIME VARIABLE
var stime;

// GROUND VARIABLE
var ground;

// BACKGROUND VARIABLES
var back, backImage;

// GAME STATE 
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//SOUNDS
var jumpSound;
var gameOverSound;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  backImage = loadImage("back.jpg");
  
  bananaImage = loadImage("banana.png");
  
  jumpSound = loadSound("maro-jump-sound-effect_1.mp3");
  
  gameOverSound = loadSound("mixkit-arcade-retro-game-over-213.wav");

}

function setup() {
  
  createCanvas(600, 450);
  
  back = createSprite(300, 225, 1000, 1000);
  back.addImage(backImage);
  back.scale = 1.4;
  back.velocityX = -10
  
  monkey = createSprite(70, 400, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.12;
  monkey.setCollider("circle", 0, 0, 300)
  
  ground = createSprite(300, 445, 1500, 20);
  ground.velocityX = -10;
  ground.shapeColor = "chartreuse"
  ground.visible = false;
  
  foodGroup = createGroup();
  
  obstacleGroup = createGroup();
  
  stime = 0;
  
  score = 0;
  
  monkey.debug = true;
  
}


function draw() {

  background("black");
    
  if(ground.x < 0){
      
    ground.x = ground.width / 2;
      
  }
  
  if(keyDown("space") && monkey.y > 300){
     
    monkey.velocityY = -30;
    
    jumpSound.play();
    
  }
  
  if(back.x < 0){
    
    back.x = back.width / 2
    
  }
  
  monkey.velocityY += 2.7
  
  monkey.collide(ground);
  
  food();
  
  obstacle();
  
  drawSprites();
  
  textFont("Typograph Pro");
  textSize(20);
  fill("black");
  stroke("black");
  strokeWeight(2);
  stime = Math.ceil(World.frameCount / frameRate());
  text("SURVIVAL TIME : " + stime, 210, 50);
  
  textFont("Typograph Pro");
  textSize(15);
  fill("black");
  stroke("black");
  strokeWeight(2);
  text("SCORE : " + score, 260, 100);
  
  if(monkey.isTouching(foodGroup)){
    
    score += 1;
    
    foodGroup.destroyEach();
    
  }
  
  if(obstacleGroup.isTouching(monkey)){
    
    gameOverSound.play();
    
    textFont("Typograph Pro");
    textSize(30)
    stroke("white");
    strokeWeight(2);
    fill("black");
    text("GAME OVER!!", 200, 225);
    
    foodGroup.setVelocityXEach = 0;
    obstaclesGroup.setVelocityXEach = 0;
    monkey.stopAnimation();
    
  }
  
}

function food(){
  
  if(World.frameCount % 60 === 0){
    
    var food = createSprite(600, 225, 20, 20);
    food.addImage(bananaImage);
    food.scale = 0.15;
    food.velocityX = -9;
    food.lifetime = 75;
    foodGroup.add(food);
    
  }
  
}

function obstacle(){
  
  if(World.frameCount % 100 === 0){
    
    var obstacle = createSprite(600, 390, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -10;
    obstacle.lifetime = 75;
    obstacleGroup.add(obstacle);
    
  }
  
}
