// Some 3d Game
// Jason
// November 18 2022
//
// Extra for Experts:
// - I am using 3d object using the renderer Webgl. 

let firstPersonCamera;
let cameraPan = 0.01;

function setup() {
  createCanvas(windowHeight, windowWidth, WEBGL);
  firstPersonCamera = createCamera();
}

function draw() {
  background(200);
  requestPointerLock();
  box(100,100,100);
  square(0, 0, 100);
  keyDown();
}

function mouseMoved() {
  firstPersonCamera.pan(-movedX * 0.001);
  firstPersonCamera.tilt(movedY * 0.001);
}

function keyDown() {
  if(keyIsDown(87)) {
    firstPersonCamera.move(1,0,0);
  }
  else if(keyIsDown(65)) {
    
  }
  else if(keyIsDown(83)) {
    
  }
  else if(keyIsDown(68)) {
    
  }
}
