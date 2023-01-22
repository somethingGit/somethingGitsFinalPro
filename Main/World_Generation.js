// Global variables
let sideLength = 50;
let topHeight = 0;
let grassImg;
const chunkSize = 16;
let chunkArray = [];

// Block class
class Block {
  // Block variables
  constructor(x,y,z) {
    this.blockType = "red";
    this.x = x;
    this.y = y;
    this.z = z;
    this.boxLength = sideLength;
  }
  // Displays block
  display(i,j,k) {
    fill(this.blockType);
    // translate the block back and forth to creates the chunk
    translate(chunkArray[i][j][k].x*sideLength,chunkArray[i][j][k].z*sideLength,chunkArray[i][j][k].y*sideLength);
    box(sideLength,sideLength,sideLength);
    translate(chunkArray[i][j][k].x*sideLength*-1,chunkArray[i][j][k].z*sideLength*-1,chunkArray[i][j][k].y*sideLength*-1);
  }
}

// Adds block type. 
class Grassblock extends Block {
  constructor (blockType) {
    super(blockType, "green");
  }
}

// This generates the world. 
function generateWorld() {
  let chunkHeight = [];
  for (let i =0;i<16;i++) {
    chunkHeight.push(generateHeights(16));
  }
  chunkArray = addChunk(chunkHeight);
}

//make a 3D array of block
function addChunk(worldHeight) {
  let newChunk = [];
  for(let x = 0; x < chunkSize; x++) {
    newChunk.push([]);
    for(let z = 0; z < chunkSize; z++) {
      newChunk[x].push([]);
      for(let y = 0; y < worldHeight[x][z]; y++) {
        let block = new Block(x,z,-y);
        newChunk[x][z].push(block);
      }
    }
  }
  return newChunk; 
} 

// This is a flat chunk builder. 
function addFlatChunk() {
  let newChunk = [];
  for(let x = 0; x < chunkSize; x++) {
    newChunk.push([]);
    for(let z = 0; z < chunkSize; z++) {
      newChunk[x].push([]);
      for(let y = 0; y < 10; y++) {
        let block = new Block(x,z,-y);
        newChunk[x][z].push(block);
      }
    }
  }
  return newChunk;
}

// draw world with restriction for efficiency
function drawWorld() {
  let count;
  for(let i = 0; i < chunkArray.length; i++) {
    for(let j = 0; j < chunkArray[i].length; j++) {
      for(let k = 0; k < chunkArray[i][j].length; k++) {
        count = 0;
        for (let a = -1; a <= 1; a++) {
          if (a!==0) {
            if (i + a >= 0 && i + a <= chunkArray.length - 1 && chunkArray[i + a][j][k]) {
              count += 1;
            }
            if (j + a >= 0 && j + a <= chunkArray[i].length - 1 && chunkArray[i][j + a][k] ) {
              count += 1;
            }
            if (k+a >=0 && k+a <= chunkArray[i][j].length-1 && chunkArray[i][j][k+a] ) {
              count+=1;
            }
          }
        }
        if (count<6) {
          chunkArray[i][j][k].display(i,j,k);
          //collide(firstPersonCamera,chunkArray[i][j][k]);
        }
        
      }
    }
  }
}

// Gets height of point in world. 
function generateHeights(howMany) {
  let tempArray = [];
  let start = random(5,10000);
  let time = random(start,start+2); // lower the number to make terrain
  for (let i = 0; i<howMany;i++) {
    tempArray.push(floor(noise(time)*15)); //the maximum height of terrain
    time +=0.065; //increase value overtime
  }
  return tempArray;
}

// get Jason the top block or the block we currently stand
function blockToCamera() { //take the block we currently on
  let xBlock = 0;
  let yBlock = 0;
  let zBlock = 0;
  xBlock = Math.floor(firstPersonCamera.position.x/sideLength);
  yBlock = Math.floor(firstPersonCamera.position.z/sideLength); 
  zBlock = Math.floor(firstPersonCamera.position.y/sideLength);   
  return [xBlock,yBlock,zBlock];
}

// Gets the highest point based off camera position. 
function topCoordinate() {
  let currentBlock = blockToCamera();
  let x = currentBlock[0];
  let y = currentBlock[1];
  let result;
  try {
    result = chunkArray[x][y][chunkArray[x][y].length-1].z *sideLength;   
  } 
  catch (error) {
    return 0;  
  }
  return result;
}

// Checks collision on x axis. 
function collisionCheck3dRectangleX(player,b) {
  let bXmax,bXmin;
  let aXmax = player.position.x + sideLength*0.375;
  let aXmin = player.position.x - sideLength*0.375;
  bXmax = b.x*sideLength;
  bXmin = (b.x-1)*sideLength;
  if (aXmin < bXmax && aXmax > bXmin) { //check the collide on X
    return true;
  }
}

// Checks collision on y axis. 
function collisionCheck3dRectangleY(player,b) {
  let aYmax,aYmin;
  let bYmax,bYmin;
  aYmax = player.position.z + sideLength*0.375;
  aYmin = player.position.z - sideLength*0.375;
  bYmax = b.y*sideLength;
  bYmin = (b.y-1)*sideLength;
  if (aYmin < bYmax && aYmax > bYmin) { //check the collide on Y
    return true;
  }
}

// Checks collision on z axis. 
function collisionCheck3dRectangleZ(player,b) {
  let aZmax,aZmin;
  let bZmax,bZmin;
  aZmax = player.position.y - sideLength*1.5;
  aZmin = player.position.y + sideLength*0.5;
  bZmax = b.z*sideLength;
  bZmin = (b.z-1)*sideLength;
  if (aZmin < bZmax && aZmax > bZmin) { // check the collide on Z
    return true;
  }
}

// Handles player collisions. 
function collide(player,block) {
  if (collisionCheck3dRectangleX(player,block)) {
    player.position.x = block.x*sideLength + sideLength*0.375;
    player.setState({speed:0});
  }
  else {
    player.setState({speed:1.2});
  }

  if (collisionCheck3dRectangleY(player,block)) {
    player.position.z = block.y*sideLength + sideLength*0.375;
    player.setState({speed:0});
  }
  else {
    player.setState({speed:1.2});
  }

  if (collisionCheck3dRectangleZ(player,block)) {
    player.position.y = block.z*sideLength - sideLength*1;
    player.setState({speed:0});
  }
  else {
    player.setState({speed:1.2});
  }
}

// function colliding(player) {
//   let currentBlock = blockToCamera();
//   for (let a =-1; a++; a<=1) {
//     if (a!== 0) {
//       collide(player,chunkArray[currentBlock[0]+a][currentBlock[1]][currentBlock[2]]);
//       collide(player,chunkArray[currentBlock[0]+a][currentBlock[1]+a][currentBlock[2]]);
//       collide(player,chunkArray[currentBlock[0]+a][currentBlock[1]+a][currentBlock[2]+a]);
//       collide(player,chunkArray[currentBlock[0]][currentBlock[1]+a][currentBlock[2]]);
//       collide(player,chunkArray[currentBlock[0]][currentBlock[1]+a][currentBlock[2]+a]);
//       collide(player,chunkArray[currentBlock[0]][currentBlock[1]][currentBlock[2]+a]);
//     }
//   }
// }

// Checks for certain key presses. 
function keyPressed() {
  if (key === "r") {
    chunkArray = addFlatChunk();
  }
  if (key === "t") {
    generateWorld();
  }
}