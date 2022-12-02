/* eslint-disable brace-style */
// /* eslint-disable curly */
let cameraTilt = 0;
let firstPersonCamera;
let cameraPositionX = 0;
let cameraPositionY = 0; 
let cameraPositionZ = 80;
let mouseSensitivity = 0.002;

function setCam() {
  firstPersonCamera = createRoverCam();
  firstPersonCamera.usePointerLock(); 
  firstPersonCamera.setState({   
    position: [0,-100,0],
    rotation: [0,0,0],
    sensitivity: 0.1,
    speed: 0.5
  });
}

function keyPressed() {
  requestPointerLock();
  if(keyIsDown(16)) {
    firstPersonCamera.setState({speed: 1});
  }
  else {
    firstPersonCamera.setState({speed: 0.5});
  }
}
  
function mousePressed() {
  requestPointerLock();  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
