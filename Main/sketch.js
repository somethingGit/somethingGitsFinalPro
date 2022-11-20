// Some 3d Game
// Jason
// November 18 2022
//
// Extra for Experts:
// - I am using 3d object using the renderer Webgl. 

let sideLength = 100;

function preload() {
  
}

function setup() {
  createCanvas(windowHeight, windowWidth, WEBGL);
  firstPersonCamera = createCamera();
  noiseGeneration();
}



function draw() {
  background(200);
  box(sideLength,sideLength,sideLength);
  if(keyIsPressed) {
    keyDown();
  }
}
