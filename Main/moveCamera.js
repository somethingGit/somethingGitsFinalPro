/* eslint-disable brace-style */
// /* eslint-disable curly */
let firstPersonCamera;
let mouseSensitivity = 0.002;
let playerOnGround = false;
let delta = 0; 
let gameMode = 1;
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
    this.gravity = createVector(0, 0.5, 0);
    this.grounded = false;
  }
  
  update(){
    if(gameMode === 1) {
      // extend the keyboard controls by adding a hop behavior
      if (this.grounded && keyIsDown(32)){ // space
        this.grounded = false;
        this.velocity.y = -1.5;
        this.position.y -= 0.2;
      }
      else if(!this.grounded) {
        this.velocity.add(this.gravity);
        this.position.add(this.velocity);
        
      }
      if(cameraPosition.y + sideLength * 2 >= topCoordinate()) {
        this.grounded = true;
      }
    }
  }
}
