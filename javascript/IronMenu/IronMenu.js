
var ctx; var mainC; var widthX; var heightY;

var timer;
var tLoop = 0;
var activeTouch = new Array(); var ongoingTouches = new Array();
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
		ongoingTouches.push(touches[i]);
		makeStar(touches[i].pageX, touches[i].pageY, touches[i]);
	}
}

//going to begin to use Konva to use the touch x and y
function makeStar(x,y, holder){
	console.log("hit");
//create a star at the point x and y which were passed in
	var star = new Konva.Star({
		x: x,
		y: y,
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
	dLayer.add(star);
	dLayer.draw();
	
	holder.star = star;
	holder.tLoop = 0;
//this should create a interval of 100 milliseconds of a timer, should close out after reaching one full second with timer. use clearInterval(intervalVariable) interval variable must be a global
	holder.timer = setInterval(function() {
		starPop(holder)
	}, 100);
}

//scale the star over 1 second
function starPop(holder){
	if(holder.tLoop >= 10){
		halt(holder.timer);
		return;
	}
	else{
		//console.log("ding");
		holder.tLoop++;
		holder.star.scale({
			x:holder.tLoop/10, 
			y:holder.tLoop/10
		});
		dLayer.draw();
	}
}

function halt(thisTimer){
	//console.log("halt!");
	clearInterval(thisTimer);
}

//at end of touch freeze star at whatever size it was when touch ended
function handleEnd(evt){
	console.log("end");
	//first find our reference
	var touches = evt.changedTouches;
	for(var i = 0; i < touches.length; i++){
		var idx = ongoingTouchIndexById(touches[i].identifier);
		//if found modify it and splice it
		if(idx >= 0){
			console.log(ongoingTouches[idx]);
			halt(ongoingTouches[idx].timer);
			ongoingTouches.splice(idx, 1);
			//console.log("found!");
		}
	}
}

function handleMove(){
	
}

function handleCancel(){
	
}

function ongoingTouchIndexById(idToFind){
	for(var i = 0; i < ongoingTouches.length; i++){
		var id = ongoingTouches[i].identifier;
		if(id == idToFind){
			return i;
		}
	}
	return -1;
}

function copyTouch(touch){
	return{identifier: touch.identifier, pagX: touch.pageX, pageY: touch.pageY, tLoop: 0, timer: 0, star: 0};
}