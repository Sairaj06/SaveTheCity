var hero;
var life = 5;
var missileSound;
var score;


function preload(){
  heroAni = loadAnimation("Superhero-01.png","Superhero-02.png");
  bgImg = loadImage("GamingBackground.png");
  fireImg = loadImage("fire.png");
  missileImg = loadImage("missile.png");
  missileSound = loadSound("bombSound.wav");
  swooshSound = loadSound("knifeSwooshSound.mp3");
}

function setup(){
  createCanvas(1360,621);

  bg = createSprite(1000,250,200,200);
  bg.addImage(bgImg);
  bg.velocityX = -3.5;
  bg.scale = 1;

  hero = createSprite(100,250,20,20);
  hero.addAnimation("heroAnimation",heroAni);
  hero.scale = 0.118;
  score = 0;
  obstacleGroup = createGroup();
  missileGroup = createGroup();
}

function draw() {
  background("white");
  score = score + Math.round(getFrameRate()/60);
  if(bg.x<100){
	  bg.x = bg.width/2;
  }

  if(keyDown("up")){
   hero.y = hero.y - 7;
  }

  if(keyDown("down")){
   hero.y = hero.y + 7;
  }

  if(hero.isTouching(obstacleGroup)){
    swooshSound.play();
    obstacleGroup.destroyEach();
    life = life - 1;
  }

  if(hero.isTouching(missileGroup)){
    missileSound.play();
    missileGroup.destroyEach();
    life = life - 1;
  }

  spawnFire();
  spawnMissile();
  drawSprites();

  End();

  stroke("white")
  fill("white")
  textSize(20);
  text("Press up and down arrow to move the superhero",200,50);
  textSize(30);
  text("life:" + life ,1200,70); 

  stroke("white");
  fill("white");
  textSize(30);
  text("Score:"+score,1200,40);
}

 function spawnFire(){
   if(frameCount % 55 === 0){
     var fire = createSprite(1400,200,20,20);
     fire.velocityX = -(10 + score/100);     
     fire.y = Math.round(random(40,580));
     fire.addImage(fireImg);
     fire.scale = 0.09;
     fire.lifetime = 1000;
     obstacleGroup.add(fire);
    }
}

function End(){
  if(life <= 0){
    background("white");
    bg.velocityX = 0;
    obstacleGroup.destroyEach();
    life = 0;
    hero.destroy();
    stroke("white");
    fill("red");
    textSize(100);
    text("Game Over",450,350);    
  }
}

function spawnMissile(){
  if(frameCount % 90 === 0){
    var missile = createSprite(1440,200,20,20);
    missile.velocityX = -(20 + score/100);
    missile.y = Math.round(random(40,580));
    missile.addImage(missileImg);
    missile.scale = 0.05;
    missile.lifetime = 1000;
    missileGroup.add(missile);
  }
}