// Global variables
let curAverage;
let lowestFPS = 100;
let topLeftWidth;
let topLeftHeight;
let toggledH = true;
let toggleInventory = true; 
let inventoryArray = [];
let squareLength;

class Inventory {
  constructor(type = " ") {
    if(type === undefined) {
      this.type = " ";
    }
    else {
      this.type = type;
    }
  }
  
  display(i) {
    stroke(220, 220, 220);
    strokeWeight(100);
    fill(255);
    if(this.type === " ") {
      rect((topLeftWidth + width / 3 + i % 10 * squareLength) / 10, (topLeftHeight + height + 50 + Math.floor(i / 5) * squareLength) / 10, squareLength, squareLength);
    }
  }
  
}

// Displays 2d shapes in 3d world. 
function twoDShapes() {
  // Sets text font then calls other functions. 
  textFont(fontOne);
  setUpTwoDCamera();
  frameRateCounter();
  arrows();
  helpMenu();
  displayInventory();
}

// Sets up a secondary camera. 
function setUpTwoDCamera() {
  camera(0, 0, height / 2.0 / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
  ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);
  scale(2);
}

// Displays framerates at the top left corner. 
function frameRateCounter() {
  fill(0);
  text(`${Math.round(frameRate())}  FPS`,topLeftWidth, topLeftHeight);
  curAverage = Math.round((curAverage + frameRate()) / 2);
  text(`${curAverage}  Average FPS`,topLeftWidth, topLeftHeight + 30);
  if(frameRate() < lowestFPS) {
    lowestFPS = frameRate();
  }
  text(`${lowestFPS} lowest FPS`);
}

// Makes arrows
function arrows() {
  let rectWidth = 15 / 2;
  let rectHeight = 15; 
  noStroke();
  fill(color(128, 128, 128, 200));
  rect(-rectWidth, -rectHeight, rectWidth, rectHeight * 1.5);
  rect(0 - rectHeight, 0 - rectWidth, rectHeight * 1.5, rectWidth);
}

// Help menu. 
function helpMenu() {
  if(toggledH) {
    text("a/d : left/right", topLeftWidth, topLeftHeight + 50);
    text("w/s : forward/backward", topLeftWidth, topLeftHeight + 70);
  }
}

function displayInventory() {
  if(toggleInventory) {
    for(let i = 0; i < inventoryArray.length; i++) {
      inventoryArray[i].display(i);
    }
  }
}
