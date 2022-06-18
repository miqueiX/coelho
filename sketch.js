const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var engine;
var world;

var ground;
var rope;
var rope2;
var fruta

var link 
var link2

var fundo
var frutaimg
var coelho
var coelhoimg

var button
var balao

var idle
var sad
var eat

var mute

function preload(){

fundo = loadImage("images/background.png")
frutaimg = loadImage("images/melon.png")
coelhoimg = loadImage("images/rabbit1.png")

idle = loadAnimation("images/rabbit1.png","images/rabbit2.png","images/rabbit3.png")
sad = loadAnimation("images/sad_1.png","images/sad_2.png","images/sad_3.png")
eat = loadAnimation("images/eat.png", "images/eat2.png","images/eat4.png")

somar = loadSound("sounds/air.wav")
somcorte = loadSound("sounds/rope_cut.mp3")
somcomer = loadSound("sounds/eating_sound.mp3")
somtriste = loadSound("sounds/sad.wav")
somdefundo = loadSound("sounds/sound1.mp3")




sad.looping = false
eat.looping = false

}

function setup(){
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);

  textSize(50)

  somdefundo.play()
  somdefundo.setVolume(0.1)



  idle.frameDelay = 8
  sad.frameDelay = 15
  eat.frameDelay = 15

  coelho = createSprite(460,590)
  coelho.addAnimation("idle", idle)
  coelho.addAnimation("sad",sad)
  coelho.addAnimation("eat",eat)
  coelho.scale = 0.3
 
  

  
  mute = createImg("images/mute.png")
  mute.size(50,50)
  mute.position(450,35)
  mute.mouseClicked(mutar)

  balao = createImg("images/balloon.png")
  balao.size(150,100)
  balao.position(10,300)
  balao.mouseClicked(sopro)




  ground = Bodies.rectangle(250,690,500,20,{isStatic: true});
  World.add(world,ground);

  rope = new Rope(8,{x:300, y:30})
  rope2 = new Rope(7,{x:10, y:50})
  rope3 = new Rope(7,{x:10, y:450})


  button = createImg("images/cut_btn.png")
  button.size(60,60)
  button.position(250,30)
  button.mouseClicked(drop)

  button2 = createImg("images/cut_btn.png")
  button2.size(60,60)
  button2.position(1,30)
  button2.mouseClicked(drop2)

  button3 = createImg("images/cut_btn.png")
  button3.size(60,60)
  button3.position(2,400)
  button3.mouseClicked(drop3)


  fruta = Bodies.circle(250,300,20,{density: 0.001})
  Composite.add(rope.body, fruta);
  //fruta.()

  link = new Link(rope,fruta);
  link2 = new Link(rope2,fruta);
  link3 = new Link(rope3, fruta);
}

function draw(){
  background(50);

  rect(ground.position.x,ground.position.y,500,20);
  
  image(fundo,250,350,500,700)
  
  
 
  rope.show();
  rope2.show();
  rope3.show();

  if(fruta != null && fruta.position.y >=650){
    coelho.changeAnimation("sad")
    fruta = null
    somtriste.play()
  }

 if(fruta != null){
  image(frutaimg,fruta.position.x, fruta.position.y,70,70)
 } 



 if(collide(fruta, coelho)== true){
   coelho.changeAnimation("eat")
   somcomer.play();
 }
  Engine.update(engine);

  drawSprites()

}

function drop(){
somcorte.play()
rope.break()
link.break()
link = null;
}

function drop2(){
  somcorte.play()
  rope2.break()
  link2.break()
  link2 = null;
  }

  function drop3(){
    somcorte.play()
    rope3.break()
    link3.break()
    link3= null;
    }

function mouseDragged(){
//Matter.Body.setPosition(fruta,{x:mouseX,y:mouseY})

}

function collide(Body, sprite){
if(Body!=null){
  var d = dist(Body.position.x, Body.position.y, sprite.position.x, sprite.position.y)
  if(d<=80){
    World.remove(world, fruta)
    fruta = null
    return true
  }
  else{
    return false
  }

}


}

function sopro(){
Matter.Body.applyForce(fruta,{x:0,y:0},{x:0.05,y:0})
somar.play();
}

function mutar(){
if(somdefundo.isPlaying()){
  somdefundo.pause()
}
else{
  somdefundo.play()
}

}