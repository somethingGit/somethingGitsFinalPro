class Block {
  constructor(x,y,z) {
    this.blockType = "white";
    this.x = x;
    this.y = y;
    this.z = z;
    this.boxLength = sideLength;
  }
  display() {
    fill(this.blockType);
    translate(this.x, this.y, this.z);
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
  addChunk(30);
}
  
function addChunk(worldHeight) {
  let newChunk = [];
  for(let x = 0; x < chunkSize; x++) {
    newChunk.push([]);
    for(let z = 0; z < chunkSize; z++) {
      newChunk[x].push([]);
      for(let y = 0; y < worldHeight; y++) {
        let block = new Block(x,z,y);
        chunkArray[x][z].push(block);
      }
    }
  } 
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