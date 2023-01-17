let sideLength = 50;
let topHeight = 0;
let grassImg;

class Block {
  constructor(x,y,z) {
    this.blockType = "green";
    this.x = x;
    this.y = y;
    this.z = z;
    this.boxLength = sideLength;
  }
  display(i,j,k) {
    fill(this.blockType);
    // translate the block back and forth to creates the chunk
    translate(chunkArray[i][j][k].x*sideLength,chunkArray[i][j][k].z*sideLength,chunkArray[i][j][k].y*sideLength);
    box(sideLength,sideLength,sideLength);
    translate(chunkArray[i][j][k].x*sideLength*-1,chunkArray[i][j][k].z*sideLength*-1,chunkArray[i][j][k].y*sideLength*-1);
  }
}

class Grassblock extends Block {
  constructor (blockType) {
    super(blockType, "green");
  }
}

const chunkSize = 16;
let chunkArray = [];
let inventory;

function createInventory() {
  let emptyArray = [];
  for (let y = 0;y<4;y++) {
    emptyArray.push([]);
    for (let x = 0;x<9;x++) {
      emptyArray[y].push([]);
    }
  }
  return emptyArray;
}

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
      for(let y = 0; y < 3; y++) {
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
        for (let a = -1; a<=1;a++) {
          if (a!==0) {
            if (i+a >=0 && i+a <= chunkArray.length-1 && chunkArray[i+a][j][k]) {
              count+=1;
            }
            if (j+a >=0 && j+a <= chunkArray[i].length-1 && chunkArray[i][j+a][k] ) {
              count+=1;
            }
            if (k+a >=0 && k+a <= chunkArray[i][j].length-1 && chunkArray[i][j][k+a] ) {
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
}

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
function blockToCamera() {
  let xBlock = 0;
  let yBlock = 0;
  let zBlock = 0;
  xBlock = Math.ceil(cameraPosition.x/sideLength);
  yBlock = Math.ceil(cameraPosition.z/sideLength); 
  zBlock = Math.ceil(cameraPosition.y/sideLength);   
  return [xBlock,yBlock,zBlock];
}

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

function collisionCheck3dRectangleX(a,b) {
  let aXmax,aXmin;
  let bXmax,bXmin;  
  let collideX;
  aXmax = a.x+ a.length;
  bXmax = b.x+sideLength;
  aXmin = a.x-sideLength;
  bXmin = a.x-sideLength;
  if (aXmin < bXmax && aXmax > bXmin) { //check the collide on X
    collideX = true;
  }
}

function collisionCheck3dRectangleY(a,b) {
  let aYmax,aYmin;
  let bYmax,bYmin;
  let collideY
  if (aYmin < bYmax && aYmax > bYmin) { //check the collide on Y
    collideY = true;
  }
}

function collisionCheck3dRectangleZ(a,b) {
  let aZmax,aZmin;
  let bZmax,bZmin;
  let collideZ;
  if (aZmin < bZmax && aZmax > bZmin) { // check the collide on Z
    collideZ = true;
  }
}


