/* eslint-disable curly */
let cameraTilt = 0;
let firstPersonCamera;
let cameraPositionX = 0;
let cameraPositionY = 0; 
let cameraPositionZ = 80;
let speed = 2;
let mouseSensitivity = 0.002;

function mouseMoved() {
  firstPersonCamera.pan(-movedX * mouseSensitivity);
  firstPersonCamera.tilt(movedY * mouseSensitivity);
  //firstPersonCamera.lookAt(cameraX, cameraY, cameraZ);
}
  
function keyDown() {
  if(keyIsDown(87)) firstPersonCamera.move(0,0,-1);
  if(keyIsDown(65)) firstPersonCamera.move(-1,0,0);
  if(keyIsDown(83)) firstPersonCamera.move(0,0,1);
  if(keyIsDown(68)) firstPersonCamera.move(1,0,0);
  if(keyIsDown(32)) firstPersonCamera.move(0,-1,0);
  if(keyIsDown(69)) firstPersonCamera.move(0,-1,0);
  if(keyIsDown(81)) firstPersonCamera.move(0,1,0);

  // if(keyIsDown(87)) cameraPositionZ--;
  // if(keyIsDown(65)) cameraPositionX--;
  // if(keyIsDown(83)) cameraPositionZ++;
  // if(keyIsDown(68)) cameraPositionX++;
  // if(keyIsDown(32)) cameraPositionY--;
  // if(keyIsDown(69)) cameraPositionY--;
  // if(keyIsDown(81)) cameraPositionY++;
  
  // firstPersonCamera.setPosition(cameraPositionX, cameraPositionY, cameraPositionZ);
}
  
function keyPressed() {
  requestPointerLock();
}
  
function mousePressed() {
  requestPointerLock();  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, WEBGL);
}
