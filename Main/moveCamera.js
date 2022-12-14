/* eslint-disable brace-style */
// /* eslint-disable curly */
let firstPersonCamera;
let mouseSensitivity = 0.002;
let playerOnGround = false;
let delta = 0; 
let gameMode = 1;
let fs;
let shouldFullScreen = true;

function setCam() {
  let playerHeight = sideLength * 1.5;
  firstPersonCamera = createRoverCam();
  firstPersonCamera.usePointerLock(); 
  firstPersonCamera.setState({   
    position: [0, topHeight - playerHeight * 2, 0],
    rotation: [0,0,0],
    sensitivity: 0.1,
    speed: 1
  });
}

function keyPressed() {
  requestPointerLock();
  if(shouldFullScreen && !fullscreen()) {
    fullscreen(!fs);
  }
  if(keyIsDown(16)) {
    firstPersonCamera.setState({speed: 2});
  }
  else {
    firstPersonCamera.setState({speed: 1});
  }
  if(keyIsDown(32) && playerOnGround) {
    playerOnGround = !playerOnGround;
    delta = -5; 
  }
}

function gravity() {
  if(gameMode === 1) {
    // eslint-disable-next-line curly
    if(delta < 10 && !playerOnGround) firstPersonCamera.position.y += delta;
    if(delta < 10) playerOnGround = true;
    delta += 0.1;
    if(playerOnGround && delta !== 0) delta = 0; 
  }
}

function mousePressed() {
  if(shouldFullScreen && !fullscreen()) {
    fullscreen(!fs);
  } 
  requestPointerLock(); 
}
