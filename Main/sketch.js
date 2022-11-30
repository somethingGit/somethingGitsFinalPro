// Some 3d Game
// Jason
// November 18 2022
//
// Extra for Experts:
// - I am using 3d object using the renderer Webgl. 

function preload() {
  
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  setCam();
  generateWorld();
  console.log(chunkArray);
}

function draw() {
  background(200);
  drawWorld();
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
