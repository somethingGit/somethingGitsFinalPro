// /* eslint-disable curly */
let cameraTilt = 0;
let firstPersonCamera;
let cameraPositionX = 0;
let cameraPositionY = 0; 
let cameraPositionZ = 80;
let mouseSensitivity = 0.002;

// function mouseMoved() {
//   if(focused) {
//     firstPersonCamera.pan(-movedX * mouseSensitivity);
//     if(cameraTilt < 360 + movedY && cameraTilt > -360 + movedY) {
//       firstPersonCamera.tilt(movedY * mouseSensitivity);
//       cameraTilt += movedY;
//       console.log(movedY);
//     }
//   }
//   //firstPersonCamera.lookAt(cameraX, cameraY, cameraZ);
// }
  
// function keyDown() {
//   // if(focused) {
//   //   if(keyIsDown(87)) firstPersonCamera.move(0,0,-1); // key W
//   //   if(keyIsDown(65)) firstPersonCamera.move(-1,0,0); // key A
//   //   if(keyIsDown(83)) firstPersonCamera.move(0,0,1); // key S
//   //   if(keyIsDown(68)) firstPersonCamera.move(1,0,0); // key D
//   //   if(keyIsDown(32)) firstPersonCamera.move(0,-1,0); // space
//   //   if(keyIsDown(69)) firstPersonCamera.move(0,-1,0); //key E
//   //   if(keyIsDown(81)) firstPersonCamera.move(0,1,0); // Q

//   //   // if(keyIsDown(87)) cameraPositionZ--;
//   //   // if(keyIsDown(65)) cameraPositionX--;
//   //   // if(keyIsDown(83)) cameraPositionZ++;
//   //   // if(keyIsDown(68)) cameraPositionX++;
//   //   // if(keyIsDown(32)) cameraPositionY--;
//   //   // if(keyIsDown(69)) cameraPositionY--;
//   //   // if(keyIsDown(81)) cameraPositionY++;
  
//   // // firstPersonCamera.setPosition(cameraPositionX, cameraPositionY, cameraPositionZ);
//   // }
// }

function setCam() {
  firstPersonCamera = createRoverCam();
  firstPersonCamera.usePointerLock();
  firstPersonCamera.setState({
    position : [0, 10, 0], 
    rotation: [0,0,0],
    sensitivity: 0.05,
    speed: 0.1
  });
  firstPersonCamera.enableControl = true;
  firstPersonCamera.setActive(true);
}
  
// function keyPressed() {
//   requestPointerLock();
// }
  
// function mousePressed() {
//   requestPointerLock();  
// }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, WEBGL);
}
