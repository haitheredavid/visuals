var canvasWidth = 800;
var canvasHeight = 600;
var direction = false;
var progress = 0;

var rectSize = 30;
var offsetSize = 30;
var rectTotal;
var boundSize;

var increment = 0.01;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  background(0);
  stroke(255, 255);

  rectTotal = (height - rectSize) / rectSize;
  boundSize = rectSize * rectTotal;
}

function draw() {
  drawGrid();
}

function drawGrid() {
  background(0);

  stroke(255, 255);
  strokeWeight(2);
  noFill();

  let xStartPos = (width - boundSize) / 2;
  let yStartPos = (height - boundSize) / 2;

  let startCo = color(255, 205, 0);
  let endCo = color(72, 61, 139);

  //   // bounds
  //   stroke(255);
  //   rect(xStartPos, yStartPos, boundSize, boundSize);

  if (progress >= 1) {
    direction = true;
  } else if (progress <= 0) {
    direction = false;
  }

  if (!direction) {
    progress += increment;
  } else {
    progress -= increment;
  }

  for (let x = 0; x < rectTotal; x++) {
    let xPos = xStartPos + x * rectSize;
    for (let y = 0; y < rectTotal; y++) {
      let rowCo = lerpColor(startCo, endCo, y / rectTotal);
      let yPos = yStartPos + y * rectSize;

      stroke(rowCo);
      rect(xPos, yPos, rectSize, rectSize);

      let progressAmount = lerp(0, offsetSize, progress);
      if (overGrid(xPos, yPos, rectSize)) {
        progressAmount = 0;
      }
      rect(
        xPos + progressAmount / 2,
        yPos + progressAmount / 2,
        rectSize - progressAmount,
        rectSize - progressAmount
      );
    }
  }
}

function overGrid(x, y, size) {
  if (mouseX >= x && mouseX <= x + size && mouseY >= y && mouseY <= y + size) {
    return true;
  } else {
    return false;
  }
}

function drawText() {
  // debug text
  //   let ts = 15;
  //   fill(255);
  //   textSize(ts);
  //   text(boundSize, canvasWidth - ts * boundSize.toString().length, ts);
  //   noFill();
}

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
