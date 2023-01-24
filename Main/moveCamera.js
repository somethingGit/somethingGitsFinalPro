// Global variables for camera. 
let firstPersonCamera;
let mouseSensitivity = 0.002;
let playerOnGround = false;
let delta = 0; 
let gameMode = 1;
let fs = false;
let shouldFullScreen = true;
let playerLength;
let playerHeight;
let lastTallest;

// Sets up camera and its states. 
function setCam() {
  playerHeight = sideLength * 1.9;
  firstPersonCamera = new Player();
  firstPersonCamera.usePointerLock(); 
  firstPersonCamera.setState({   
    position: [0, topHeight - playerHeight, 0],
    sensitivity: 0.15,
    speed: 1.2,
    fovy : 1
  });
}

// Handles keypressed. 
function keyPressed() {
  // Fullscreens window
  requestPointerLock();
  if(shouldFullScreen && !fullscreen()) {
    fullscreen(!fs);
  }
  // Sets up shift key
  if(keyIsDown(16)) {
    firstPersonCamera.setState({speed: 2, fovy: 2});
  }
  else {
    firstPersonCamera.setState({speed: 1.2, fovy : 1});
  }
  // Sets up jumping. 
  // if(keyIsDown(32) && playerOnGround && gameMode === 1) {
  //   playerOnGround = !playerOnGround;
  //   delta = -5; 
  // }
  // Gamemode selector
  if(keyIsDown(49)) {
    gameMode = 1;
  }
  if(keyIsDown(48)) {
    gameMode = 0;
  }
  // Toggles help menu
  if(keyIsDown(72)) {
    toggledH = !toggledH;
    console.log(toggledH);
  }
  if(keyIsDown(69)) {
    toggleInventory = !toggleInventory;
  }
  
  // Checks for certain key presses. 
  if (key === "r") {
    chunkArray = addFlatChunk();
  }
  if (key === "t") {
    generateWorld();
  }
}

// Calles the extended RoverCam function that updates to allow gravity
function gravity() {
  firstPersonCamera.update();
}

// Allows mouse press to full screen and pointer lock.
function mousePressed() {
  if(shouldFullScreen && !fullscreen()) {
    fullscreen(!fs);
  } 
  requestPointerLock(); 
}

//Code provided by jwdunn1 or James Dunn who also made RoverCam. Can be found at
//https://github.com/freshfork/p5.RoverCam
// This function extends RoverCam
class Player extends RoverCam {
  constructor(){
    // Adds more variables to RoverCam
    super();
    this.speed = 0.04;
    this.dimensions = createVector(1, 3, 1);
    this.velocity = createVector(0, 0, 0);
    this.gravity = createVector(0, 1.3, 0);
    this.grounded = false;
  }
  
  // Update function extends the movement possible in RoverCam
  update(){
    if(gameMode === 1) {
      // extend the keyboard controls by adding a hop behavior
      if (this.grounded && keyIsDown(32)){ // space
        playerOnGround = !playerOnGround;
        delta = -5; 
        this.grounded = false;
        upWithSpace = true;
        this.velocity.y = -sideLength / 2;
        this.position.y -= 0.2;
      }
      else if(!this.grounded) {
        if(keyIsDown(16)) {
          this.position.add(createVector(0, this.sensitivity, 0));
        }
        this.velocity.add(this.gravity);
        this.position.add(this.velocity);
      }
      // Checks if player is back on the ground. 
      if(cameraPosition.y + playerHeight >= topCoordinate()) {
        this.grounded = true;
        upWithSpace = false;
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
}
