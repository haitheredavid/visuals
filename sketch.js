function setup() 
{
	createCanvas(1200,700);
	background(0);
	noFill();
	stroke(255, 255);

	
}

var tog = true;
var strokeSize = 255;
var index = 0;

function draw()
{

	// background(0);
	let count = 30;
	let tileWidth = 250;
	let tileHeight = 250;
	let maxCount=150;


	

	// if go up and hit max index
	if(tog && index > maxCount)
	{
		tog = false;
	// background(0);
		index = 0;
	} else{
		index++;
	}

	let endSize = map(index, 0, maxCount, tileWidth/2, 0 );
	let endOffset = map(index, 0 , maxCount, (tileHeight - endSize) /2, 0);
	var noiseScale = 0.02;

	translate(width/2, height/2);
	for(let i=0; i<count;i++ ){
		let unitNoiseValue = noise( index * noiseScale, endOffset * noiseScale);
		stroke(strokeSize * unitNoiseValue);
		let dia = map(i, 0, count, tileWidth, endSize );
		let offset = map(i, 0, count, 0, endOffset * unitNoiseValue );
		ellipse(offset, 0, dia, dia);
	}
	// pop();

}
