/* eslint-disable brace-style */
// /* eslint-disable curly */
let firstPersonCamera;
let mouseSensitivity = 0.002;
let playerOnGround = false;
let delta = 0; 
let gameMode = 1;
let fs = false;
let shouldFullScreen = true;
let playerLength;
let playerHeight;

function setCam() {
  playerHeight = sideLength * 1.9;
  firstPersonCamera = new Player();
  firstPersonCamera.usePointerLock(); 
  firstPersonCamera.setState({   
    position: [0, topHeight, 0],
    sensitivity: 0.15,
    speed: 1.2
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
    firstPersonCamera.setState({speed: 1.2});
  }
  if(keyIsDown(32) && playerOnGround) {
    playerOnGround = !playerOnGround;
    delta = -5; 
  }
  if(keyCode === 49) {
    gameMode = 1;
  }
  else if(keyCode === 48) {
    gameMode = 0;
  }
  if(keyCode === 72) {
    toggledH = !toggledH;
  }
}

function gravity() {
  if(toggledH === false) {
    firstPersonCamera.update();
  }
}

function mousePressed() {
  if(shouldFullScreen && !fullscreen()) {
    fullscreen(!fs);
  } 
  requestPointerLock(); 
}

//Code provided by jwdunn1 or James Dunn who also made RoverCam. Can be found at
//https://github.com/freshfork/p5.RoverCam
class Player extends RoverCam {
  constructor(){
    super();
    this.speed = 0.04;
    this.dimensions = createVector(1, 3, 1);
    this.velocity = createVector(0, 0, 0);
    this.gravity = createVector(0, 1.3, 0);
    this.grounded = false;
  }
  
  update(){
    if(gameMode === 1) {
      // extend the keyboard controls by adding a hop behavior
      if (this.grounded && keyIsDown(32)){ // space
        this.grounded = false;
        this.velocity.y = -sideLength / 2;
        this.position.y -= 0.2;
      }
      else if(!this.grounded) {
        this.velocity.add(this.gravity);
        this.position.add(this.velocity);
        
      }
      if(cameraPosition.y + playerHeight >= topCoordinate()) {
        this.grounded = true;
        firstPersonCamera.position.y = topCoordinate() - playerHeight;
      }
      else if(cameraPosition.y + playerHeight <= topCoordinate()) {
        this.grouded = false;
      }
    }
    else if(gameMode === 0) {
      if(keyIsDown(32)) {
        this.moveZ(this.speed); //e 
      }
    }
  }
  // collide(this,block) {
      
  // }
}
