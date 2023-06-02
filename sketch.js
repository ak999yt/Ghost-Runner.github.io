var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;
  doorsGroup = new Group();
  climbersGroup = new Group();
  spookySound.loop();
}

function draw() {
  background(200);
  drawSprites();
  if (gameState == "play") {
    if (tower.y > 400) {
      tower.y = 300
    }

    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 3;
    }

    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 3;
    }

    ghost.velocityY = ghost.velocityY + 0.8;

    if (keyDown("space")) {
      ghost.velocityY = -5;
    }

    spawnDoors();

    if (climbersGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end";
    }
  }
  else if(gameState=="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",230,250);
  }
}

function spawnDoors() {
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    door.addImage(doorImg);
    var climber = createSprite(200, 10);
    climber.addImage(climberImg);

    door.velocityY = 1;
    climber.velocityY = 1;
    door.x = Math.round(random(120, 400));
    climber.x = door.x;
    door.lifetime = 1000;
    climber.lifetime = 1000;
    doorsGroup.add(door);
    climbersGroup.add(climber);

  }
}