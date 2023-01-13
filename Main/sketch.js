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
  frameRate(144);
}

function draw() {
  background(200);
  drawWorld();
  gravity();
  topHeight = topCoordinate();
  textFont(fontOne);
  blockDistance();   
  // Heads Up Display extension by jWilliam
  push(); // this affects the frame rate
  fill(0);
  camera(0, 0, height / 2.0 / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
  ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);
  scale(2);
  text(frameRate(), 0, 0);
  pop();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
