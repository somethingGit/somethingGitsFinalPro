/* eslint-disable brace-style */
// /* eslint-disable curly */
let firstPersonCamera;
let mouseSensitivity = 0.002;
let playerOnGround = false;
let delta = 0; 
let gameMode = 0;
let fs = false;
let shouldFullScreen = true;

function setCam() {
  let playerHeight = sideLength * 1.5;
  firstPersonCamera = new Player();
  firstPersonCamera.usePointerLock(); 
  firstPersonCamera.setState({   
    position: [0, topHeight - playerHeight * 2, 0],
    sensitivity: 0.15,
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
  firstPersonCamera.update();
  if(gameMode === 1) {
    if(cameraPosition.y < topHeight) {
      firstPersonCamera.setState({position: [cameraPosition.x, cameraPosition += delta, cameraPosition.z]});
    }
    else {
      firstPersonCamera.setState({position: [cameraPosition.x, topHeight - sideLength * 1.5 * 2, cameraPosition.y]});
    }
  }
}

function mousePressed() {
  if(shouldFullScreen && !fullscreen()) {
    fullscreen(!fs);
  } 
  requestPointerLock(); 
}

class Player extends RoverCam {
  constructor(){
    super();
    this.speed = 0.04;
    this.dimensions = createVector(1, 3, 1);
    this.velocity = createVector(0, 0, 0);
    this.gravity = createVector(0, 0.03, 0);
    this.grounded = false;
  }
  
  update(){
    this.velocity.add(this.gravity);
    this.position.add(this.velocity);
    
    // extend the keyboard controls by adding a hop behavior
    if (this.grounded && keyIsDown(32)){ // space
      this.grounded = false;
      this.velocity.y = -1.5;
      this.position.y -= 0.2;
    }
  }
}
