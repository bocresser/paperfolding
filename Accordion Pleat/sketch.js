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
  background(120, 205, 100);
  rotation();

  var folds = 20;
  var h = 100;
  var w = map(mouseX, 0, width, 0, 25);
  var z1 = 20,
    z2 = 0;
  for (var i = -folds / 2; i < folds / 2; i++) {
    [z1, z2] = [z2, z1];
    beginShape();
    vertex(i * w, -h, z1);
    vertex((i + 1) * w, -h, z2);
    vertex((i + 1) * w, h, z2);
    vertex(i * w, h, z1);
    endShape(CLOSE);
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