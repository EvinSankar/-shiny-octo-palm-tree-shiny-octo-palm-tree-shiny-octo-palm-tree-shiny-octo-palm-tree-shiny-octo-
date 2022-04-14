var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var remixofground;
var cloud,cloudimg
var cactus,c1,c2,c3,c4,c5,c6
var play=69
var end=45
var gamestate=play
var cactigroup
var wetcloudgroup 
function preload() {
    trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    trex_collided = loadImage("trex_collided.png");
    groundImage = loadImage("ground2.png")
    cloudimg=loadImage("cloud.png")
    c1=loadImage("obstacle1.png")
    c2=loadImage('obstacle2.png')
    c3=loadImage("obstacle3.png")
    c4=loadImage("obstacle4.png")
    c5=loadImage("obstacle5.png")
    c6=loadImage("obstacle6.png")
}
function setup() {
    createCanvas(600, 200);
    //create a trex sprite
    trex = createSprite(50,160,20,50);
    trex.addAnimation("running", trex_running);
    trex.scale = 0.5;
    trex.debug=true
    trex.setCollider("rectangle",0,0,50,50)
    //create a ground sprite
    ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -4;
    //This is a special ground
    remixofground=createSprite(200,196,400,20)
    remixofground.visible=false;
    wetcloudgroup=new Group();
    cactigroup=new Group();

}
function draw() {
    background(50);
    if (gamestate==play){
    if (keyDown("space")&& trex.y>=100) {
     trex.velocityY = -10;
 }
    trex.velocityY = trex.velocityY + 0.8
    if (ground.x < 0) {
        ground.x = ground.width / 2;
        }
        spawnClouds();
        spawnCactus();
        if(cactigroup.isTouching(trex)){
            gamestate=end
        }
    }
    else if(gamestate==end) {

    ground.velocityX=-0
   cactigroup.setVelocityXEach(0);
   wetcloudgroup.setVelocityXEach(0);
   cactigroup.setLifetimeEach(-1)
    wetcloudgroup.setLifetimeEach(-1)
trex.velocityY=0


    }
    //jump when the space button is pressed
   
  
  
    trex.collide(remixofground);
    
    drawSprites();
}
function spawnClouds(){
    if(frameCount%60==0){
    cloud=createSprite(600,40,20,10)
    cloud.velocityX=-4
    cloud.y=Math.round(random(10,60));
    cloud.addImage(cloudimg)
    cloud.scale=0.10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001
    cloud.depth=trex.depth
    trex.depth=trex.depth+1
    cloud.lifetime=150
    wetcloudgroup.add(cloud);
    

} 
}
function spawnCactus(){
    if(frameCount%60==0){
     cactus=createSprite(600,180,10,25)
     cactus.velocityX=-4
     var num=Math.round(random(1,6))
     switch(num){
         case 1:cactus.addImage(c1)
         break;
         case 2:cactus.addImage(c2)
         break;
         case 3:cactus.addImage(c3)
         break;
         case 4:cactus.addImage(c4)
         break;
         case 5:cactus.addImage(c5)
         break;
         case 6:cactus.addImage(c6)
         break;
         default:break
     }
     cactus.scale=0.100000000000000000000000000000000000000000000000000000000000000000000000001
     cactus.lifetime=150
     cactigroup.add(cactus);
}

}
