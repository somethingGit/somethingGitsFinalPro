// Some 3d Game
// Jason
// November 18 2022
//
// Extra for Experts:
// - I am using 3d object using the renderer Webgl. 

function preload() {
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
  line(windowWidth / 2, windowHeight - windowHeight / 20, windowWidth / 2, windowHeight + windowHeight / 20);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
