let roff;
let goff;
let boff;

function setup() 
{
	createCanvas(1000, 1000, WEBGL);
	roff = 1;
	goff = 2;
	boff = 3;
}

function cube(){
	rotateX(frameCount * 0.01);
	rotateY(frameCount * 0.01);
	noFill()
	box(50);
}

function center(){
	rotateX(frameCount * 0.01);
	rotateY(frameCount * 0.01);
	cylinder(10, 100, false, false);
}

function buildObj(x=0, y=0, z=0, c){
	translate(x, y, z);
	stroke(c)
	cube()
	center()
}

let xoff = 0.0;

function draw()
{
	
	c = [noise(roff)*255,noise(goff)*255,noise(boff)*255]
	roff += 0.01;
	goff += 0.01;
	boff += 0.01;
	background(255);
	Array(20).fill(noise(xoff)).map((x, y) => buildObj(0+x, 0+y, 0+(y*10), c))
	
}
