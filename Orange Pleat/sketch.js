var angle = 0;
var clicked,
  click,
  formerOffset,
  currentOffset;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  currentOffset = createVector(0, 0);
}

function draw() {
  background(255, 200, 0);
  rotation();

  fill(255);
  stroke(0);
  strokeWeight(1);
  angleMode(RADIANS);
  var folds = makeEven(int(map(mouseY, 0, width, 0, 140)));
  var innerR = 40;
  var outerR = 140;
  var a;
  var z = map(mouseX, 0, height, 4, 80);
  var slant = true

  for (var i = 0; i < folds; i++) {
    if (slant) {
      beginShape();
      a = i * (TWO_PI / folds);
      vertex(innerR * cos(a), innerR * sin(a), -z / 2);
      a = (i + 1) * (TWO_PI / folds);
      vertex(innerR * cos(a), innerR * sin(a), z / 2);
      vertex(outerR * cos(a), outerR * sin(a), z / 2);
      a = i * (TWO_PI / folds);
      vertex(outerR * cos(a), outerR * sin(a), -z / 2);
      endShape(CLOSE);
    } else {
      beginShape();
      a = i * (TWO_PI / folds);
      vertex(innerR * cos(a), innerR * sin(a), z / 2);
      a = (i + 1) * (TWO_PI / folds);
      vertex(innerR * cos(a), innerR * sin(a), -z / 2);
      vertex(outerR * cos(a), outerR * sin(a), -z / 2);
      a = i * (TWO_PI / folds);
      vertex(outerR * cos(a), outerR * sin(a), z / 2);
      endShape(CLOSE);
    }
    slant = !slant;
  }
}

function makeEven(n) {
  var n2 = n / 2;
  if (n2 == floor(n2)) {
    return n;
  } else {
   return n + 1;
  } 
}

function rotation() {
  angleMode(DEGREES);
  if (clicked) {
    currentOffset.x = formerOffset.x + -(mouseY - click.y);
    currentOffset.y = formerOffset.y + (mouseX - click.x);
  }
  var sensitivity = 4;
  rotateX(currentOffset.x / sensitivity);
  rotateY(currentOffset.y / sensitivity);
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
  formerOffset = createVector(currentOffset.x, currentOffset.y);
}