var angle = 0;
var clicked,
  click,
  formerOffset,
  currentOffset;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  currentOffset = createVector(0, 0, 0);
}

function draw() {
  background(90, 190, 160);
  rotation(); 
  
  fill(255);
  angleMode(RADIANS);
  var sides = int(map(mouseY, 0, width, 3, 10));
  var r = 70;
  var z1;
  var z2 = 0;
  var thickness = map(mouseX, 0, height, 0, 40);
  var rows = 8;
  var slant = true;
  for (var i = 0; i < rows; i++) {
    if (slant) {
      z1 = -thickness * i;
      z2 = -thickness * (i + 1);
    } else {
      z1 = -thickness * (i + 1);
    }
    var sector = TWO_PI / sides;
    for (var a = 0; a < TWO_PI; a += sector) {
      beginShape();
      vertex(r * cos(a), r * sin(a), z1);
      vertex(r * cos(a + sector), r * sin(a + sector), z1);
      vertex(r * cos(a + sector / 2), r * sin(a + sector / 2), z2);
      endShape();
      beginShape();
      vertex(r * cos(a + sector / 2), r * sin(a + sector / 2), z2);
      vertex(r * cos(a + sector * 3 / 2), r * sin(a + sector * 3 / 2), z2);
      vertex(r * cos(a + sector), r * sin(a + sector), z1);
      endShape()
    }
    slant = !slant;
  }  
}


function rotation() { 
  angleMode(DEGREES);
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