// Some 3d Game
// Jason and Khanh Vinh
// November 18 2022
//
// Extra for Experts:
// - I am using 3d object using the renderer Webgl. 

let fontOne;
p5.disableFriendlyErrors = true; // disables FES


function preload() {
  grassImg = loadImage("Assets/Grass_01.png");
  inventory = createInventory();
  fontOne = loadFont("Assets/hussar-bold-web-edition-font/HussarBoldWebEdition-xq5O.otf");
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
  frameRate(40);
  topLeftWidth = -width / 4;
  topLeftHeight = -height / 4.3;
  curAverage = frameRate();
}

function draw() {
  background(200);
  console.time("drawTime");
  drawWorld();
  console.timeEnd("drawTime");
  console.time("gravity");
  gravity();
  console.timeEnd("gravity");
  topHeight = topCoordinate() - sideLength * 2;
  console.time("GUI");
  push(); // This affects framerate
  twoDShapes();
  pop();
  console.timeEnd("GUI");
  colliding(firstPersonCamera);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  topLeftWidth = -width / 4;
  topLeftHeight = -height / 4.3;
}
