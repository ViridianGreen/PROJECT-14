var bow , arrow,  background, redB, pinkB, greenB ,blueB ,arrowGroup;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;
var redb,greenb,pinkb,blueb;
var score =0;
var dArrow = true;
gamestate = "start";
function preload(){  
  
  backgroundImage = loadImage("bg.jpg"); 
  arrowImage = loadImage("arrow.png");
  bowImage = loadImage("bow.png");
  red_balloonImage = loadImage("redBalloon.png");
  green_balloonImage = loadImage("greenBalloon.png");
  pink_balloonImage = loadImage("pinkBalloon.png");
  blue_balloonImage = loadImage("blueBalloon0.png");
}

function setup() {
  createCanvas(400, 400);
  
  //creating background
  scene = createSprite(0,0,400,400);
  scene.addImage(backgroundImage);
  scene.scale = 2
  
  // creating bow to shoot arrow
  bow = createSprite(380,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 0.2;
  
  score = 0  
  redB= new Group();
  greenB= new Group();
  blueB= new Group();
  pinkB= new Group();
  arrowGroup= new Group();  
}

function draw() {
 background(0);
  // moving ground
  scene.velocityX = -3 

  if (scene.x < 0){
    scene.x = scene.width/2;
  }
 
  if(gamestate == "start"){
    textSize(20);
    text("Mouse click to start",110,180);


  }
  

  if(gamestate === "play"){
 //moving bow
 bow.y = World.mouseY
  
 // release arrow when space key is pressed
 if (keyDown("space")&& dArrow == true) {
  createArrow();
  dArrow = false;  }


  }
 
  
  //creating continous enemies
  var select_balloon = Math.round(random(1,4));
  
  if (World.frameCount % 100 == 0) {

    if (select_balloon == 1) {
      redBalloon();
    } else if (select_balloon == 2) {
      greenBalloon();
    } else if (select_balloon == 3) {
      blueBalloon();
    } else {
      pinkBalloon();
    }
  }

  if(World.frameCount % 40 == 0){
   dArrow = true;
  }
 
  
  if (arrowGroup.isTouching(redB)) {
    
    redB.destroyEach();
    //redB.destroy();
    //redB.Each();
    //ballon.destroyEach();
    
    arrowGroup.destroyEach();
    score=score+1;
  }

  if (arrowGroup.isTouching(greenB)) {
    greenB.destroyEach();
    arrowGroup.destroyEach();
    score=score+3;
    dArrow = true;
  }

  if (arrowGroup.isTouching(blueB)) {
    blueB.destroyEach();
    arrowGroup.destroyEach();
    score=score+2;
    dArrow = true;
  }

  if (arrowGroup.isTouching(pinkB)) {
    pinkB.destroyEach();
    arrowGroup.destroyEach();
    score=score+1;
    dArrow = true;
  }

  drawSprites();
  text("Score: "+ score, 300,50);

  if(gamestate == "start"){
    textSize(20);
    text("Mouse click to start\nSpace key to shoot arrows",90,180)

  }

  if((score>=50) && score<55){
    gamestate = "end"
    textSize(20)
    text("Game Over\nYou Win\nMouse click to play again",90,180)
  
  }

}




function redBalloon() {
  var red = createSprite(0,Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 3;
  red.lifetime = 150;
  red.scale = 0.1;
  redB.add(red);
}

function blueBalloon() {
  var blue = createSprite(0,Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 3;
  blue.lifetime = 150;
  blue.scale = 0.15;
  blueB.add(blue);
}

function greenBalloon() {
  var green = createSprite(0,Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 3;
  green.lifetime = 150;
  green.scale = 0.07;
  greenB.add(green);
}

function pinkBalloon() {
  var pink = createSprite(0,Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 3;
  pink.lifetime = 150;
  pink.scale = 0.3
  pinkB.add(pink);
}


// Creating  arrows for bow
function createArrow() {
  var arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y=bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 100;
  arrow.scale = 0.1;
  
  //arrowGroup.addGroup(arrow);
  //arrow.add(arrowGroup);
  //arrowGroup.add();
  arrowGroup.add(arrow);
  if(arrow.x < 270){
    dArrow = true;
  }
   
}


function mouseClicked(){
  gamestate = "play"
  score = 0;
}



