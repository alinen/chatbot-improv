var characterText = "";
var talkingTime = 0;

function fmod(a, b) {
  var tmp = a - Math.floor(a/b)*b;
  return tmp;
}

function setup() {
  var canvas = createCanvas(700,500);
  canvas.parent('sketch-holder');
  textAlign(LEFT);
  textSize(20);
  textWrap(WORD);
}

function characterTalk(message, duration) {
  characterText = message;
  talkingTime = duration;
}

function draw() {
  background("#000000");

  if (talkingTime > 0) {
    var animationLength = 0.5; // seconds
    var elapsedTime = fmod(millis()/1000.0, animationLength); 

    drawText();
    talkingTime -= deltaTime/1000.0;
  } 

  drawCharacter();
}

function drawText() {
  strokeWeight(1);
  fill(0);
  text(characterText, 20, 20);
}

function drawCharacter() {  
  var posX = 0.35 * width;
  var posY = 0.75 * height;

  var Y = posY + 10 * sin(millis()/1000.0);
  var size = 150;

  noStroke();
  fill("#DCE6F5"); // fluffy cloud
  ellipse(posX, Y, size, size);

  if (talkingTime > 0) { // drawing text
  }
  else {
  }
}
