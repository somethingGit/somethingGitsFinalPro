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
      for(let y = 0; y < worldHeight[x][z]; y++) {
        let block = new Block(x,z,-y);
        newChunk[x][z].push(block);
      }
    }
  }
  return newChunk; 
} 

// draw world with restriction for efficiency
function drawWorld() {
  for(let i = 0; i < chunkArray.length; i++) {
    for(let j = 0; j < chunkArray[i].length; j++) {
      for(let k = 0; k < chunkArray[i][j].length; k++) {
        let count =0;
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
    tempArray.push(floor(noise(time)*10)); //the maximum height of terrain
    time +=0.065; //increase value overtime
  }
  return tempArray;
}

// get Jason the top block or the block we currently stand
function blockToCamera() {
  let xBlock = 0;
  let yBlock = 0;
  let zBlock = 0;
  xBlock = Math.floor(cameraPosition.x/sideLength);
  yBlock = Math.floor(cameraPosition.z/sideLength); 
  zBlock = Math.floor(cameraPosition.y/sideLength);   
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

function blockDistance() {
  let v1,p1;
  v1 = firstPersonCamera.forward;
  p1 = firstPersonCamera.position;
  line(p1.x,50,p1.z,50,p1.y,50);
}

// function drawCharacter() {
//   let p1 = firstPersonCamera.position;
//   translate(p1.x*sideLength,p1.y*sideLength,p1.z*sideLength);
//   box(sideLength,sideLength,sideLength);
//   translate(-p1.x*sideLength,-p1.y*sideLength,-p1.z*sideLength);
// }