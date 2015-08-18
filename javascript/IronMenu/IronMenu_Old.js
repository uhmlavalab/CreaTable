
var ctx; var mainC; var widthX; var heightY;

var timer;
var tLoop = 0;
var activeTouch = new Array(); var existingStars = new Array();
var dLayer;

var stage = new Konva.Stage({container:'container', width: window.innerWidth, height:	window.innerHeight});

//create stage for Konva as well as a layer(not sure why we need a layer before creating anything but seems to be necessary for now)
function setUp(){
	document.addEventListener("touchstart", handleStart, false);
	document.addEventListener("touchend", handleEnd, false);
	document.addEventListener("touchmove", handleMove, false);
	document.addEventListener("touchcancel", handleCancel, false);
	dLayer = new Konva.Layer();
	stage.add(dLayer);
	console.log("Set Up Complete");
}


function handleStart(evt){
	evt.preventDefault();
	var touches = evt.changedTouches;
	
	for(var i = 0; i< touches.length; i++){
		ongoingTouches.push(copyTouch(touches[i]));
		makeStar(touches[i].pageX, touches[i].pageY);
	}
	
}


//going to begin to use Konva events to grab touch events
//this is to grab a touch start anywhere on the layer
function makeStar(x,y){
stage.on('contentTouchstart', function(evt) {
	console.log(evt);
	evt.evt.preventDefault();

	console.log("hit");
	console.log(stage.getPointerPosition());
	console.dir(evt);
	console.log(evt.pageX);
	console.log(evt.pageY);

//create a star at this point
	var temp = {};
	temp.X = stage.getPointerPosition().x;
	temp.Y = stage.getPointerPosition().y;

	var star = new Konva.Star({
		x: temp.X,
		y: temp.Y,
		numPoints: 5, 
		innerRadius: 40, 
		outerRadius: 75, 
		fill: 'green', 
		stroke: 'black', 
		opacity: .8, 
		strokeWidth: 3, 
		shadowColor:'black', 
		shadowBlur: 10, 
		shadowOffset:{
			x:5,
			y:5
		}, 
		shadowOpacity: 0.6, 
		scale:{
			x:0.1, 
			y:0.1
		}
	});
	console.log(star);
	dLayer.add(star);
	dLayer.draw();
	
	temp.star = star;
//this should create a interval of 100 milliseconds of a timer, should close out after reaching one full second with timer. use clearInterval(intervalVariable) interval variable must be a global
	temp.timer = setInterval(function() {
		starPop(temp)
	}, 100);
	temp.tLoop = 0;
	existingStars.push(temp);
});

//scale the star over 1 second
function starPop(temp){
	if(temp.tLoop >= 10){
		clearInterval(temp.timer);
		//tLoop = 0;
		return;
	}
	else{
		console.log("ding");
		temp.tLoop++;
		temp.star.scale({
			x:temp.tLoop/10, 
			y:temp.tLoop/10
		});
		dLayer.draw();
	}
}

stage.on('contentTouchend', function(evt) {
	console.log("end");
	evt.evt.preventDefault();
	clearInterval(timer);
	tLoop = 0;
});