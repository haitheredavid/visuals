// shit for funky box
var goForward = true;
var countX = 10;
var countY = 10;
var tileWidth = 0;
var tileHeight = 0;

var angle = 0;
var actRandomSeed = 0;

var maxOffset = 10;
var maxCount = 10;
var speed = 0.2;
var items;

function setupFunkyGrid() {
  createCanvas(500, 500);
  background(0);
  tileWidth = width / countX;
  tileHeight = height / countY;

  noFill();
  stroke(255, 255);
  createItems();
  goForward = true;
}

function drawFunkyGrid() {
  background(0);
  randomSeed(actRandomSeed);
  translate(tileWidth / 2, tileHeight / 2);

  setAngle();
  setGrid();
}

function setGrid() {
  let sinValue = map(sin(angle), -1, 1, 0, 1);

  let endSize = map(sinValue, 0, maxCount, tileWidth / 2, 0);
  let endOffset = map(angle, 0, maxOffset, 0, (tileWidth - endSize) / 2);

  for (var gridY = 0; gridY <= countY; gridY++) {
    for (var gridX = 0; gridX <= countX; gridX++) {
      push();
      translate(tileWidth * gridX, tileHeight * gridY);
      scale(1, tileHeight / tileWidth);

      var toggle = int(random(0, 4));
      if (toggle == 0) rotate(-HALF_PI);
      if (toggle == 1) rotate(0);
      if (toggle == 2) rotate(HALF_PI);
      if (toggle == 3) rotate(PI);

      var item = items[gridY + gridX];

      for (var i = 0; i < item; i++) {
        let dia = map(i, 0, item, tileWidth, endSize);
        let offset = map(i, 0, item, 0, endOffset);
        ellipse(offset, 0, dia, dia);
      }
      pop();
    }
  }
}

function setAngle() {
  if (goForward && angle > maxOffset) {
    stroke("red");
    goForward = false;
  } else if (!goForward && angle < maxOffset * -1) {
    stroke("red");
    goForward = true;
  }
  if (goForward) {
    angle += speed;
  } else {
    angle -= speed;
  }
}

function createItems() {
  var itemCount = countX * countY;
  items = [itemCount];
  for (var x = 0; x < itemCount; x++) {
    items[x] = random(2, maxCount);
  }
}
