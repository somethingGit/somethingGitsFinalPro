// Some 3d Game
// Jason and Khanh Vinh
// November 18 2022
//
// Extra for Experts:
// - I am using 3d object using the renderer Webgl. 


function preload() {
  grassImg = loadImage("Assets/Grass_01.png");
  inventory = createInventory();
  twoDShapes();
  noiseSeed(10);
  generateWorld();
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  setCam();
  console.log(chunkArray);
  if (cameraPosition === undefined) {
    let playerHeight = sideLength * 2;
    cameraPosition = {
      x:0,
      y:topHeight-playerHeight * 2,
      z:0
    };
  }
}

function draw() {
  background(200);
  drawWorld();
  gravity();
  topHeight = topCoordinate();       
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
