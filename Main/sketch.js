// Some 3d Game
// Jason and Khanh Vinh
// November 18 2022
//
// Extra for Experts:
// - I am using 3d object using the renderer Webgl. 

function preload() {
  grassImg = loadImage("Assets/Grass_01.png");
  noiseSeed(10);
  generateWorld();
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  setCam();
  console.log(chunkArray);
}

function draw() {
  background(200);
  drawWorld();
  gravity();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
