var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["e073a9e9-e187-46c0-884c-4d7ae916457a","b85e8cf9-dfbd-4785-8954-156459bbef0f","33a7953b-f63b-489c-bf2f-7445fd58ea3d"],"propsByKey":{"e073a9e9-e187-46c0-884c-4d7ae916457a":{"name":"animation_1","sourceUrl":null,"frameSize":{"x":300,"y":300},"frameCount":1,"looping":true,"frameDelay":12,"version":"bB_3MOn2tG0fBsubdJSvw6Hx4zCS6Kk1","loadedFromSource":true,"saved":true,"sourceSize":{"x":300,"y":300},"rootRelativePath":"assets/e073a9e9-e187-46c0-884c-4d7ae916457a.png"},"b85e8cf9-dfbd-4785-8954-156459bbef0f":{"name":"pinguino_1","sourceUrl":null,"frameSize":{"x":400,"y":400},"frameCount":1,"looping":true,"frameDelay":12,"version":"xdnhIgtfCUouR91ktuSMlnGLHxpD3QAb","categories":["animals"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":400,"y":400},"rootRelativePath":"assets/b85e8cf9-dfbd-4785-8954-156459bbef0f.png"},"33a7953b-f63b-489c-bf2f-7445fd58ea3d":{"name":"pinguino_2","sourceUrl":null,"frameSize":{"x":400,"y":400},"frameCount":1,"looping":true,"frameDelay":12,"version":"3snRwNIGzf76yau9Zj9_WLLgMxiv_AL0","categories":["animals"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":400,"y":400},"rootRelativePath":"assets/33a7953b-f63b-489c-bf2f-7445fd58ea3d.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var playerMallet;

var goal1=createSprite(200,18,100,20);
goal1.shapeColor=("steelblue");

var goal2=createSprite(200,382,100,20);
goal2.shapeColor=("steelblue");

//variable para almacenar diferentes estados del juego
var gameState = "serve";

//hacer la cancha
var boundary1 = createSprite(200,0,400,10);
boundary1.shapeColor = "white";
var boundary2 = createSprite(200,400,400,10);
boundary2.shapeColor = "white";
var boundary3 = createSprite(0,200,10,400);
boundary3.shapeColor = "white";
var boundary4 = createSprite(400,200,10,400);
boundary4.shapeColor = "white";



//crear objetos y asignarles colores
var striker = createSprite(200,200,10,10);
striker.setAnimation("animation_1");
striker.scale=0.2

var playerMallet = createSprite(200,50,50,10);
playerMallet.setAnimation("pinguino_1");
playerMallet.scale = 0.1;

var computerMallet = createSprite(200,350,50,10);
computerMallet.setAnimation("pinguino_2")
computerMallet.scale=0.1

//variables de puntuación
var playerScore=0;
var compScore=0;

function draw() {
  //despejar la pantalla
  background("lightblue");
  
  
  if(gameState=="serve")
  {
                
        
         //mostrar texto
      textSize(18);
      fill ("black");
      //Agregar el texto “Presiona espacio para golpear” 
      text("Press Space To Start",110,100 );
      
      //servir el delantero cuando se presiona la barra espaciadora
      if (keyDown("space")) {
        serve();
         gameState="play";
        //cambiar el estado del juego
      }
     
  }
  
  
 if (gameState=="play") {
   
   computerMallet.x = striker.x;  
   
   if(striker.isTouching(goal1))
      { 
        playSound("assets/category_collect/vibrant_game_tone_bling_3.mp3", false);
        compScore = compScore + 1;
        striker.x=200;
        striker.y=200;
    
      }
      if(striker.isTouching(goal2))
      {
        playSound("assets/category_collect/vibrant_game_tone_bling_3.mp3", false);playerScore = playerScore + 1;
        striker.x=200;
        striker.y=200;
         
      }
   if (playerScore==5 ||compScore==5) {
  gameState="end" 
 }


 
 
 
  }
   
 if (gameState=="end") {
    
  striker.velocityX=0
  striker.velocityY=0
  
        fill("steelblue");
        
    textSize(18);
        text("¡Game Over!",170,160);
       
  
 }
 
 
 
 
 
 
 
 
  
  //mostrar puntuaciones
  textSize(18);
  fill("steelblue");
  text(compScore, 25,225);
  text(playerScore,25,185);
  
  //Puntuación
   
   
 
  
  //hacer que la paleta del jugador se mueva con las teclas de flecha
  paddleMovement();
  
  
  //IA para la paleta de la computadora
  //hacer que se mueva con la posición y del delantero
 

  
  //dibujar la línea al centro
   for (var i = 0; i < 400; i=i+20) {
    line(i,200,i+10,200);
  }
  
 
 
 
 
 
 
 
 //crear límites en los bordes 
  //hacer que el delantero rebote con el borde superior e inferior
 
 
  createEdgeSprites();
  
  striker.bounceOff(edges);
  striker.bounceOff(playerMallet);
  striker.bounceOff(computerMallet);
  playerMallet.bounceOff(edges);
  computerMallet.bounceOff(edges);

  
  
 
  drawSprites();
}
function reset() {
  striker.x = 200;
  striker.y = 200;
  striker.velocityX = 0;
  striker.velocityY = 0;
}



























function serve() {
  striker.velocityX = 8;
  striker.velocityY = 4;
 
}

function paddleMovement()
{
  if(keyDown("left")){
    playerMallet.x = playerMallet.x-12;
    
  }
  
  if(keyDown("right")){
    playerMallet.x = playerMallet.x+12;
    
  }
  
  if(keyDown("up")){
   if(playerMallet.y>25)
   {
    playerMallet.y = playerMallet.y- 12;
   }
  }
  
  if(keyDown("down")){
    if(playerMallet.y<120)
   {
    playerMallet.y = playerMallet.y+12;
   }
  }
}


// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
