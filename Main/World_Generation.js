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
    // translate and draw the block by quad for efficiency and texture
    //front
    // quad(0, 0, sideLength, 0, sideLength, sideLength, 0, sideLength);

    // push();
    // translate(0, 0, -sideLength);
    // rotateY(-90);
    // quad(0, 0, sideLength, 0, sideLength, sideLength, 0, sideLength);

    // pop();
    // push();
    // texture(grassImg);
    // translate(0, 0, -sideLength);
    // rotateX(90);
    // quad(0, 0, sideLength, 0, sideLength, sideLength, 0, sideLength);

    // pop();
    // push();
    // translate(sideLength, 0, 0);
    // rotateY(90);
    // quad(0, 0, sideLength, 0, sideLength, sideLength, 0, sideLength);

    // pop();
    // push();
    // translate(0, sideLength, 0);
    // rotateX(-90);
    // quad(0, 0, sideLength, 0, sideLength, sideLength, 0, sideLength);

    // pop();
    // push();
    // rotateY(180);
    // translate(-sideLength, 0, sideLength);
    // quad(0, 0, sideLength, 0, sideLength, sideLength, 0, sideLength);
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
  let time = random(9998,10000); // lower the number to make terrain
  for (let i = 0; i<howMany;i++) {
    tempArray.push(floor(noise(time)*10)); //the maximum height of terrain
    time +=0.03; //increase value overtime
  }
  return tempArray;
}

// get Jason the top block or the block we currently stand
function blockToCamera() {
  let xBlock = 0;
  let yBlock = 0;
  xBlock = Math.floor(cameraPosition.x/sideLength);
  yBlock = Math.floor(cameraPosition.z/sideLength);    
  return [xBlock,yBlock];
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