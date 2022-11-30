let sideLength = 50;

class Block {
  constructor(x,y,z) {
    this.blockType = "green";
    this.x = x;
    this.y = y;
    this.z = z;
    this.boxLength = sideLength;
  }
  display() {
    fill(this.blockType);
    for(let i = 0; i < chunkArray.length; i++) {
      for(let j = 0; j < chunkArray[i].length; j++) {
        for(let k = 0; k < chunkArray[i][j].length; k++) {
          translate(chunkArray[i][j].x,chunkArray[i][j].y,chunkArray[i][j].z);
        }
      }
    }
    box(sideLength,sideLength,sideLength);
  }
}

class Grassblock extends Block {
  constructor (blockType) {
    super(blockType, "green");
  }
}

const chunkSize = 16;
let chunkArray = [];

function generateWorld() {
  chunkArray = addChunk(3);
}
  
function addChunk(worldHeight) {
  let newChunk = [];
  for(let x = 0; x < chunkSize; x++) {
    newChunk.push([]);
    for(let z = 0; z < chunkSize; z++) {
      newChunk[x].push([]);
      for(let y = 0; y < worldHeight; y++) {
        let block = new Block(x,z,y);
        newChunk[x][z].push(block);
      }
    }
  }
  return newChunk; 
} 

function drawWorld() {
  for(let i = 0; i < chunkArray.length; i++) {
    for(let j = 0; j < chunkArray[i].length; j++) {
      for(let k = 0; k < chunkArray[i][j].length; k++) {
        chunkArray[i][j][k].display();
      }
    }
  }
}