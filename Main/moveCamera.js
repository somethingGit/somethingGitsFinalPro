/* eslint-disable brace-style */
// /* eslint-disable curly */
let cameraTilt = 0;
let firstPersonCamera;
let cameraPositionX = 0;
let cameraPositionY = 0; 
let cameraPositionZ = 80;
let mouseSensitivity = 0.002;
let playerPosition;
let playerOnGround = false;
let delta = 0; 

function setCam() {
  firstPersonCamera = createRoverCam();
  firstPersonCamera.usePointerLock(); 
  firstPersonCamera.setState({   
    position: [0,-100,0],
    rotation: [0,0,0],
    sensitivity: 0.1,
    speed: 1
  });
  playerPosition = firstPersonCamera.setState.position;
}

function keyPressed() {
  requestPointerLock();
  if(keyIsDown(16)) {
    firstPersonCamera.setState({speed: 2});
  }
  else {
    firstPersonCamera.setState({speed: 1});
  }
  if(keyIsDown(32) && playerOnGround) {
    playerOnGround = !playerOnGround;
    delta = 5; 
  }
}

function movePlayer() {
  if(delta > 0 && !playerOnGround) {firstPersonCamera.setState.position[1] -= delta;}
}

function mousePressed() {
  requestPointerLock();  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
