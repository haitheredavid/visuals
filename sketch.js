

var goForward = true;
var strokeSize = 255;
var index = 0;

var countX = 10;
var countY = 10;
var tileWidth = 0;
var tileHeight = 0;

var angle = 0;
var freq= 2;

var mic;
var actRandomSeed = 0;


function setup() 
{
	createCanvas(1000,1000);
	background(0);

	  
	// mic = new p5.AudioIn(); 
	// mic.start(); // Load the library 
	

	tileWidth = width / countX;
	tileHeight = height / countY;

	noFill();
	stroke(255, 255);
	createItems();
	goForward = true;
}

var maxOffset = 10;
var maxCount = 20;
var speed = 0.5;
var items;
function setAngle(){


	if(goForward && angle > maxOffset){
		stroke(255, 255);
		goForward = false;
	} else if(!goForward && angle < maxOffset*-1){
		stroke('red');
		goForward = true;
	}
	if(goForward){
		angle += speed;	
	} else{
		angle -= speed;
	}
}

function createItems(){
	
	var itemCount =countX * countY; 
	items = [itemCount];
	for(var x=0; x<itemCount; x++ ){
		items[x] = random(2,maxCount);
	}
}

function draw()
{
	background(0);
	randomSeed(actRandomSeed);
	translate(tileWidth / 2, tileHeight / 2);
	
	setAngle();

	var sinValue = map(sin(angle), -1, 1, 0,1);

	

	// angle += 0.02;

	let endSize = map(sinValue, 0, maxCount, tileWidth/2, 0 );
	let endOffset = map(angle, 0 , maxOffset, 0,(tileWidth - endSize) /2);
	var noiseScale = 20;


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
		  // draw module

		  for (var i = 0; i < item; i++) {
			let unitNoiseValue = noise( sinValue * noiseScale, endOffset * noiseScale);
			// stroke(strokeSize * unitNoiseValue);
			let dia = map(i, 0, item, tileWidth, endSize );
			let offset = map(i, 0, item, 0, endOffset   );
			ellipse(offset, 0, dia, dia);
		  }
		  pop();
		}
	  }
}
