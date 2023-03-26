var angle = 0;
var clicked,
  click,
  formerOffset,
  currentOffset;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  currentOffset = createVector(0, 0, 0);
  angleMode(DEGREES);
}

function draw() {
  background(160, 110, 210);
  rotation();
    
  columns = 16;
  rows = 16;
  var w = 14;
  var h = map(mouseX, 0, width, 0, 30);
  var d = 20;
  var x1, x2, x3, x4;
  var y1, y2;
  var z1 = d,
  z2 = 0;
  var zigzag = true;

  for (var j = -columns / 2; j < columns / 2; j++) {
    y1 = j * h;
    y2 = (j + 1) * h;
    if (zigzag) {
      [y1, y2] = [y2, y1];
    }
    for (var i = -rows / 2; i < rows / 2; i++) {
      [z1, z2] = [z2, z1];
      var r1 = -rows / 2;
      var r2 = (rows / 2) + 2;
      beginShape();
      vertex((i + 2) * w, y1, z1);
      vertex((i + 3) * w, y1, z2);
      vertex((i + 1) * w, y2, z2);
      vertex(i * w, y2, z1);
      endShape(CLOSE);
    }
    zigzag = !zigzag;
  }
}

function rotation() {
  if (clicked) {
    currentOffset.x = formerOffset.x + -(mouseY - click.y);
    currentOffset.z = formerOffset.z + (mouseX - click.x);
  }
  var sensitivity = 4;
  rotateX(currentOffset.x / sensitivity);
  rotateZ(currentOffset.z / sensitivity);
}

function mousePressed() {
  clicked = true;
  reset();
}

function mouseReleased() {
  clicked = false;
  reset();
}

function reset() {
  click = createVector(mouseX, mouseY);
  formerOffset = createVector(currentOffset.x, currentOffset.y, currentOffset.z);
}