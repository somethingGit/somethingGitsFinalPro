// Some 3d Game
// Jason and Khanh Vinh
// November 18 2022
//
// Extra for Experts:
// - I am using 3d object using the renderer Webgl. 

let fontOne; // Global font variable
p5.disableFriendlyErrors = true; // disables errors and increases framerate

// Preloads images, fonts, and world. Also loads inventory. 
function preload() {
  grassImg = loadImage("Assets/Grass_01.png");
  fontOne = loadFont("Assets/hussar-bold-web-edition-font/HussarBoldWebEdition-xq5O.otf");
  noiseSeed(10);
  generateWorld();
}

// Setup function creates canvas, setsup camera, gets camera position, and then sets the top coordinates of the 
// 2d canvas.
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  setCam();
  if (cameraPosition === undefined) {
    let playerHeight = sideLength * 2;
    cameraPosition = {
      x:0,
      y:topHeight-playerHeight * 2,
      z:0
    };
  }
  frameRate(60);
  squareLength = width / 100;
  for(let i = 0; i < 50; i++) {
    inventoryArray.push(new Inventory());
  }
  topLeftWidth = -width / 4;
  topLeftHeight = -height / 4.3;
  curAverage = frameRate();
}

// Draws world, makes gravity, gets highest point, and then renders 2d GUI.
function draw() {
  background(200);
  // console.time("drawTime");
  drawWorld();
  // console.timeEnd("drawTime");
  // console.time("gravity");
  gravity();
  // console.timeEnd("gravity");
  topHeight = topCoordinate() - sideLength * 2;
  // console.time("GUI");
  // Heads Up Display extension by jWilliam at https://editor.p5js.org/jwdunn1/sketches/iI-2XX0Hw
  push(); // This affects framerate
  twoDShapes();
  pop();
  // console.timeEnd("GUI");
}

// Resizes canvas and then the top left coordinate. 
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  topLeftWidth = -width / 4;
  topLeftHeight = -height / 4.3;
  squareLength = width / 100;
}
