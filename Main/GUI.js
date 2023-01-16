function twoDShapes() {
  // Heads Up Display extension by jWilliam at https://editor.p5js.org/jwdunn1/sketches/iI-2XX0Hw
  textFont(fontOne);
  fill(0);
  camera(0, 0, height / 2.0 / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
  ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);
  scale(2);
  text(frameRate(), -100, -100);
}
