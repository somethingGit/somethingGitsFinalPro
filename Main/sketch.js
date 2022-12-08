// Some 3d Game
// Jason Tse and Doan Khanh Vinh
// November 18 2022
//
// Extra for Experts:
// - I am using 3d object using the renderer Webgl. 

let s1 = p => {

  /* eslint-disable brace-style */
  // /* eslint-disable curly */
  let cameraTilt = 0;
  let firstPersonCamera;
  let cameraPositionX = 0;
  let cameraPositionY = 0; 
  let cameraPositionZ = 80;
  let mouseSensitivity = 0.002;
  let playerPosition;
  let playerOnGround = false;
  let delta = 0; 
  let sideLength = 50;
  
  p.preload = function() {
    p.noiseSeed(10);
    p.generateWorld();
  };

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.setCam();
    console.log(chunkArray);
  };

  p.draw = function() {
    p.background(200);
    p.drawWorld();
    if(p.keyIsDown(16)) {
      firstPersonCamera.setState({speed: 2});
    }
    else {
      firstPersonCamera.setState({speed: 1});
    }
    if(p.keyIsDown(32) && playerOnGround) {
      playerOnGround = !playerOnGround;
      delta = 5; 
    }
  };

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
  p.setCam = function() {
    firstPersonCamera = p.createRoverCam();
    firstPersonCamera.usePointerLock(p); 
    firstPersonCamera.setState({   
      position: [0,-100,0],
      rotation: [0,0,0],
      sensitivity: 0.1,
      speed: 1
    });
    playerPosition = firstPersonCamera.setState.position;
  };
  
  p.keyPressed = function() {
    p.requestPointerLock();
    
  };
  
  p.movePlayer = function() {
    if(delta > 0 && !playerOnGround) {firstPersonCamera.setState.position[1] -= delta;}
  };
  
  p.mousePressed = function() {
    p.requestPointerLock();  
  };
  
  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
  
  class Block {
    constructor(x,y,z) {
      this.blockType = "green";
      this.x = x;
      this.y = y;
      this.z = z;
      this.boxLength = sideLength;
    }
    display(i,j,k) {
      p.fill(this.blockType);
      p.translate(chunkArray[i][j][k].x*sideLength,chunkArray[i][j][k].z*sideLength,chunkArray[i][j][k].y*sideLength);
      p.box(sideLength,sideLength,sideLength);
      p.translate(chunkArray[i][j][k].x*sideLength*-1,chunkArray[i][j][k].z*sideLength*-1,chunkArray[i][j][k].y*sideLength*-1);
    }
  }
  
  class Grassblock extends Block {
    constructor (blockType) {
      super(blockType, "green");
    }
  }
  
  const chunkSize = 16;
  let chunkArray = [];
  
  p.generateWorld = function() {
    chunkArray = addChunk(generateHeights(16));
  };
    
  function addChunk(worldHeight) {
    let newChunk = [];
    for(let x = 0; x < chunkSize; x++) {
      newChunk.push([]);
      for(let z = 0; z < chunkSize; z++) {
        newChunk[x].push([]);
        for(let y = 0; y < worldHeight[z]; y++) {
          let block = new Block(x,z,-y);
          newChunk[x][z].push(block);
        }
      }
    }
    return newChunk; 
  } 
  
  p.drawWorld = function() {
    for(let i = 0; i < chunkArray.length; i++) {
      for(let j = 0; j < chunkArray[i].length; j++) {
        for(let k = 0; k < chunkArray[i][j].length; k++) {
          let count =0;
          for (let a = -1; a<=1;a++) {
            if (a!==0) {
              if (i+a >=0 && i+a <= chunkArray.length-1) {
                count+=1;
              }
              if (j+a >=0 && j+a <= chunkArray[i].length-1) {
                count+=1;
              }
              if (k+a >=0 && k+a <= chunkArray[i][j].length-1) {
                count+=1;
              }
            }
          }
          if (count<6) {
            chunkArray[i][j][k].display(i,j,k);
          }
        }
      }
    }
  };
  
  function generateHeights(howMany) {
    let tempArray = [];
    let time = p.random(10000);
    for (let i = 0; i<howMany;i++) {
      tempArray.push(p.floor(p.noise(time)*10));
      time +=0.1;
    }
    return tempArray;
  }  
  
};
let s2 = p => {
  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };
  
  p.draw = function() {
    p.background(220);
    p.fill(0);
    p.rect(255, 255, 50, 50);
  };
  
  p.windowResized = function() {
    p.resizeCanvas(windowWidth, windowHeight);
  }
  
};

let sketch1 = new p5(s1);
let sketch2 = new p5(s2);
