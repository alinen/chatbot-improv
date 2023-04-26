let LISTEN = 0;
let THINK = 1;
let TALK = 2;
let state = LISTEN;
let currentText = "";
let currentChar = -1;
let width = 1200;
let height = 600;
let fadeStartTime = 0;
let fadeTime = 0;
let textAlpha = 255;

function fmod(a, b) {
  var tmp = a - Math.floor(a/b)*b;
  return tmp;
}

function setup() {
  var canvas = createCanvas(width,height);
  canvas.parent('sketch-holder');
  textAlign(LEFT);
  textSize(60);
  textWrap(WORD);
  textStyle(BOLD);
}

function animateThink() {
  state = THINK;
}

function animateWord(text, charIndex) {
  currentText = text;
  currentChar = charIndex;
  state = TALK;
  textAlpha = 255;
}

function endAnimateWord(text) {
  currentText = text;
  currentChar = text.length;
  state = LISTEN;
  fadeStartTime = millis();
  fadeTime = 5000;
}

function draw() {
  background("#000000");
  drawText();
  drawCharacter();
}

function drawText() {
  if (currentChar === -1 || currentText === "") return;

  if (fadeTime > 0)
  {
    fadeTime = 1000 - (millis() - fadeStartTime);
    if (fadeTime < 0) fadeTime = 0;
    var u = fadeTime/1000.0;
    textAlpha = 255 * u;
  }

  let message = currentText.slice(0,currentChar);
  strokeWeight(1);
  fill(255,255,255,textAlpha);
  text(message, 20, 20, width-20);
  //console.log("animateWord: "+message+" "+currentChar);
}

function drawCharacter() {  
  var posX = 0.5 * width;
  var posY = height - 150/2 - 20;

  var t = millis()/1000.0;
  var Y = posY + 10 * sin(t);
  var size = 150;

  c1 = color("#1c587b"); // lighter blue 
  c2 = color("#051c2e"); // darker blue
  c3 = color("#1d0000"); // dark red
  c4 = color("#be0200"); // bright red
  c5 = color("#f7b066"); // orange
  c6 = color("#1a8866"); // green

  var grow = 0;
  if (state == TALK) 
  {
    grow = 2 * sin(t*10);
    startColor = c5;
    endColor = c4;
  }
  else if (state == THINK)
  {
    startColor = c4;
    endColor = c5;
  }
  else if (state == LISTEN)
  {
    startColor = c5;
    endColor = c6;
  }

  fill(c1);
  stroke(c1);
  circleNoise(posX, Y, size, 0.0);
  fill(c2);
  stroke(c2);
  circleNoise(posX, Y, size*0.9, 0.5);

  noStroke();
  for (var i = 0.8; i > 0.1; i -= 0.1)
  {
    var u = (i)/0.8;
    fill(lerpColor(startColor, endColor, u));
    circleNoise2(posX, Y, size*i + grow, i+1.25);
  }
  fill(c5);
  ellipse(posX, Y, size*0.1 + grow, size*0.1 + grow);
}

function circleNoise(cx, cy, size, offset)
{
  strokeWeight(2);
  
  var radius = size/2;
  var du = 1.0 / 100;
  var t = millis()/1000.0 + offset;
   
  var u = du;
  var noise1 = 10*noise(20*u+t) - 5;
  var offset  = noise1 * cos(2 * PI * u * 12);
  var px = (radius+offset) * cos(2 * PI * u);
  var py = (radius+offset) * sin(2 * PI * u); 

  for (u = du+du; u <= 1.0+du+du; u += du) {
    var noise1 = 10*noise(20*u+t) - 5;
    var offset  = noise1 * cos(2 * PI * u * 12);
    var x = (radius+offset) * cos(2 * PI * u);
    var y = (radius+offset) * sin(2 * PI * u); 
    line(cx + px, cy + py, cx + x, cy + y);
    px = x;
    py = y;
  }
}

function circleNoise2(cx, cy, size, offset)
{
  var du = 1.0/100;
  var radius = size/2;
  var t = millis()/1000.0 + offset;

  beginShape();
  for (var u = du; u <= 1.0; u += du) 
  {
    var noise1 = 10*noise(20*u+t) - 5;
    var offset  = noise1 * cos(2 * PI * u * 12);
    var x = (radius+offset) * cos(2 * PI * u);
    var y = (radius+offset) * sin(2 * PI * u); 
    vertex(cx + x, cy + y);
  }
  endShape(CLOSE);
}