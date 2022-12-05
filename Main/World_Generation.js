let sideLength = 50;

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
        chunkArray[i][j][k].display(i,j,k);
        // let count =0;
        // for (let a = -1; a<=1;a++) {
        //   if (a!==0) {
        //     if ((i+a) >=0 && (i+a) <= chunkArray.length-1 && chunkArray[i+a][j][k]===1) {count+=1;}
        //     if ((j+a) >=0 && (j+a) <= chunkArray[i].length-1 && chunkArray[i][j+a][k]===1) {count+=1;}
        //     if ((k+a) >=0 && (k+a) <= chunkArray[i][j].length-1 && chunkArray[i][j+a][k]===1) {count+=1;}
        //   }
        // }
      }
    }
  }
}