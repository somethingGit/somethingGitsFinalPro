// Some 3d Game
// Jason
// November 18 2022
//
// Extra for Experts:
// - I am using 3d object using the renderer Webgl. 

let firstPersonCamera;
let cameraPan = 0.01;
let chunk = 16;
let chunkArray = [];

function setup() {
  createCanvas(windowHeight, windowWidth, WEBGL);
  firstPersonCamera = createCamera();
}

function draw() {
  background(200);
  box(100,100,100);
  keyDown();
}

function mouseMoved() {
  firstPersonCamera.pan(-movedX * 0.002);
  firstPersonCamera.tilt(movedY * 0.002);
}

function keyDown() {
  if(keyIsDown(87)) {
    firstPersonCamera.move(0,0,-1);
  }
  if(keyIsDown(65)) {
    firstPersonCamera.move(-1,0,0);
  }
  if(keyIsDown(83)) {
    firstPersonCamera.move(0,0,1);
  }
  if(keyIsDown(68)) {
    firstPersonCamera.move(1,0,0);
  }
  if(keyIsDown(32)) {
    firstPersonCamera.move(0,-1,0);
  }
  if(keyIsDown(69)) {
    firstPersonCamera.move(0,-1,0);
  }
  if(keyIsDown(81)) {
    firstPersonCamera.move(0,1,0);
  }
}

function keyPressed() {
  requestPointerLock();
}

function mousePressed() {
  requestPointerLock();  
}
