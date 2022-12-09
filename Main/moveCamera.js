/* eslint-disable brace-style */
// /* eslint-disable curly */
let firstPersonCamera;
let mouseSensitivity = 0.002;
let playerOnGround = false;
let delta = 0; 
let gameMode = "survival";

function setCam() {
  let playerHeight = sideLength * 1.5;
  firstPersonCamera = createRoverCam();
  firstPersonCamera.usePointerLock(); 
  firstPersonCamera.setState({   
    position: [0,(100 + playerHeight) * -1,0],
    rotation: [0,0,0],
    sensitivity: 0.1,
    speed: 1
  });
}

function keyPressed() {
  requestPointerLock();
  fullscreen();
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

function gravity() {
  if(gameMode === "survival") {
    movePlayer();
  }
}

function movePlayer() {
  if(delta > 0 && !playerOnGround) {firstPersonCamera.setState.position[1] -= delta;}
}

function mousePressed() {
  requestPointerLock();  
  fullscreen();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
