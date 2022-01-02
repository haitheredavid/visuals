var direction = false;
var progress = 0;
var increment = 0.01;

var rectSize = 30;
var offsetSize = 30;
var rectTotal;
var boundSize;


function setupGrid(){
    
  rectTotal = (height - rectSize) / rectSize;
  boundSize = rectSize * rectTotal;

}

function drawGrid() {
  
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
    let progressAmount = lerp(0, offsetSize, progress);
  
    for (let x = 0; x < rectTotal; x++) {
      let xPos = xStartPos + x * rectSize;
      for (let y = 0; y < rectTotal; y++) {
        let rowCo = lerpColor(startCo, endCo, y / rectTotal);
        let yPos = yStartPos + y * rectSize;
  
        stroke(rowCo);
        rect(xPos, yPos, rectSize, rectSize);
  
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
  