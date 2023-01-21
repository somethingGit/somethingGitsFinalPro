// Global variables
let curAverage;
let lowestFPS = 100;
let topLeftWidth;
let topLeftHeight;
let toggledH = true;

// Displays 2d shapes in 3d world. 
function twoDShapes() {
  // Sets text font and color. 
  textFont(fontOne);
  fill(0);
  // Sets up a secondary camera. 
  camera(0, 0, height / 2.0 / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
  ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);
  scale(2);
  // Displays framerates at the top left corner. 
  text(`${Math.round(frameRate())}  FPS`,topLeftWidth, topLeftHeight);
  curAverage = Math.round((curAverage + frameRate()) / 2);
  text(`${curAverage}  Average FPS`,topLeftWidth, topLeftHeight + 30);
  if(frameRate() < lowestFPS) {
    lowestFPS = frameRate();
  }
  text(`${lowestFPS} lowest FPS`);
  let rectWidth = 15 / 2;
  let rectHeight = 15; 
  noStroke();
  fill(color(128, 128, 128, 200));
  rect(-rectWidth, -rectHeight, rectWidth, rectHeight * 1.5);
  rect(0 - rectHeight, 0 - rectWidth, rectHeight * 1.5, rectWidth);
  // Help menu. 
  if(toggledH) {
    text("a/d : left/right", topLeftWidth, topLeftHeight + 50);
    text("w/s : forward/backward", topLeftWidth, topLeftHeight + 70);
  }
}
