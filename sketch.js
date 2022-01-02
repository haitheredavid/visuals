var canvasWidth = 800;
var canvasHeight = 600;

var doors = [];
var doorCount = 10000;
var progresser;

function setup() {
  progresser = new Progresser();
  createCanvas(canvasWidth, canvasHeight);
  for (let i = 1; i <= doorCount; i++) {
    var x = (i / doorCount) * canvasWidth;
    var y = (i / doorCount) * canvasHeight;
    doors.push(new Door(x, canvasHeight / 2, 40));
  }
}

function draw() {
  background(0);

  let progressAmount = progresser.checkGetProgress();
  // let size = progresser.lerpProgress(0, 40);

  for (let i = 0; i < doors.length; i++) {
    doors[i].moveDispaly(progressAmount);
  }
}

