class Block {
  constructor(x,y,z) {
    this.blockType = "red";
    this.x = x;
    this.y = y;
    this.z = z;
    this.boxLength = sideLength;
  }
}



const chunkSize = 16;
let chunkArray = [];

function generateWorld() {
  class Block {
    constructor(x, y, z) {
      this.blockType = "green";
      this.x = x;
      this.y = y;
      this.z = z;
    }
      
    display() {
      fill(this.blockType);
      translate(this.x, this.y, this.z);
      box(sideLength,sideLength,sideLength);
    }
  }
  addChunk();
}
  
function addChunk(worldHeight) {
  for(let x = 0; x < chunkSize; x++) {
    for(let z = 0; z < chunkSize; z++) {
      for(let y = 0; y < worldHeight; y++) {
        let block = new Block;
        chunkArray[x][z][y].push(block);
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