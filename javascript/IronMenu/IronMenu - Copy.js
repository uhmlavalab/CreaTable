
var ctx; var mainC; var widthX; var heightY;
var activeTouch = new Array(); var existingStars = new Array();

var stage = new Konva.Stage({container:'container', width: window.innerWidth, height:	window.innerHeight});

//assign canvas to a variable, assign context to the canvas
//add various event listeners for touch start, move, end, cancel, and leave
function setUp(){
	/*
	mainC = document.getElementsByTagName("canvas")[0];
	ctx = mainC.getContext("2d");
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	mainC.addEventListener("touchstart", handleStart, false);
	mainC.addEventListener("touchend", handleEnd, false);
	mainC.addEventListener("touchcancel", handleCancel, false);
	mainC.addEventListener("touchleave", handleEnd, false);
	mainC.addEventListener("touchmove", handleMove, false);
	*/
	stage = new Konva.Stage({container:'container', width: window.innerWidth, height:	window.innerHeight});
	var layer = new Konva.Layer();
	stage.add(layer);
	console.log("Set Up Complete");
}


//going to begin to use Konva events to grab touch events
//this is to grab a touch start anywhere on the layer

stage.on('contentTouchstart', function() {
	console.log("hit");
	var layer = new Konva.Layer();
	
	var star = new Konva.Star({
		x:window.innerWidth/2, y:window.innerHeight/2, numPoints: 5, innerRadius: 40, outerRadius: 70, fill: 'green', stroke: 'black', opacity: .8, strokeWidth: 3, shadowColor:'black', shadowBlur: 10, shadowOffset:{x:5,y:5}, shadowOpacity: 0.6, startScale: 0.5});

	layer.add(star);

	stage.add(layer);
});

//function for grabbing touch events
function handleStart(evt){
	//preventDefault() keeps browser from processing event constantly
	evt.preventDefault();
	console.log("Touch start");
	var touches = evt.changedTouches;

	for(var i=0; i<touches.length; i++){
		console.log("touchstart:" + i + "...");
		activeTouch.push(copyTouch(touches[i]));
		var color = colorForTouch(touches[i]);
		//create a circle where the touch begins
		//ctx.beginPath();
		//ctx.arc(touches[i].pageX, touches[i].pageY, 8, 0, 2*Math.PI, false);
		//ctx.fillStyle=color;
		//ctx.fill();
		console.log("Touch start: " + i + ".");
		//starPop(touches[i].pageX, touches[i].pageY);
	}

//this should create a interval of 100 milliseconds of a timer, should close out after reaching one full second with timer. use clearInterval(intervalVariable) interval variable must be a global
//var timer = setInterval(function() {starMenu(touches[i].pageX, touches[i].pageY, color}, 100);

}

/*function starPop(){
	console.log("hit");
	var layer = new Konva.Layer();
	
	var star = new Konva.Star({
		x:window.innerWidth/2, y:window.innerHeight/2, numPoints: 5, innerRadius: 40, outerRadius: 70, fill: 'green', stroke: 'black', opacity: .8, strokeWidth: 3, shadowColor:'black', shadowBlur: 10, shadowOffset:{x:5,y:5}, shadowOpacity: 0.6, startScale: 0.5});

	layer.add(star);

	stage.add(layer);

}
*/
//ending a touch event
function handleEnd(evt){


}

function handleCancel(evt){
}

function handleMove(evt){
/*
	evt.preventDefault();
	var touches = evt.changedTouches;

	for(var i=0; i<touches.length; i++){
	var color = colorForTouch(touches[i]);
	var idx = ongoingTouchIndexById(touches[i].identifier);

	if(idx >= 0){
		console.log("continuing touch"+idx);
		ctx.beginPath();
		log("ctx.moveTo("+ongoingTouches[idx].pageX + ", " +ongoingTouches[idx].pageY + ");");


		ongoingTouches.splice(idx, 1, copyTouch(touches[1]));
		console.log("spliced");
}
	else{
		console.log("busted");
}
}
*/
}

function copyTouch(touch){
	return{identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY};
}

function colorForTouch(touch){
	var r = touch.identifier%16;
	var g = Math.floor(touch.identifier/3)%16;
	var b = Math.floor(touch.identifier/7)%16;
	r = r.toString(16);
	g = g.toString(16);
	b = b.toString(16);
	var color = "#" + r + g + b;
	console.log("color for touch with id" + touch.identifier + " = " + color);
	return color;
}

/*
var allTiles = [];
var allInfoPanes = [];
var widthInTiles = 53;
var heightInTiles = 29;

var tWidthStart = 29;
var tHeightStart = 29;

var tWidthCurrent = tWidthStart;
var tHeightCurrent = tHeightStart;
var tXstarter = 0;
var tYStarter = 0;

createAllTiles();

document.addEventListener( 'keydown', handleKeyDown, false );
window.addEventListener( 'contextmenu', function(e) { e.preventDefault(); }  );
window.addEventListener( 'mousewheel', function(e) { e.preventDefault(); });




function createAllTiles() {
    var t;
    var topDiv = document.getElementById('topDiv');
    var intext;
    topDiv.style.position = 'absolute';
    topDiv.style.top = '0px';
    topDiv.style.left = '0px';

    for(var h = 0; h < heightInTiles; h++) {
        for(var w = 0; w < widthInTiles; w++) {
            t = document.createElement('div');

            t.style.position = 'absolute';
            t.style.width = tWidthStart + 'px';
            t.style.height = tHeightStart + 'px';
            t.style.top = (tHeightStart * h) + 'px';
            t.style.left = (tWidthStart * w) + 'px';
            t.style.border = '1px solid black';
            t.addEventListener('mousedown', moveInfoPane, false);
            //will also need touchstart

            topDiv.appendChild(t);
            allTiles.push(t);
        }
    }

    var infoDiv = document.getElementById('infoDiv');
    infoDiv.style.position = 'absolute';
    infoDiv.style.top = '0px';
    infoDiv.style.left = '0px';

    var tw = parseInt(window.innerWidth * 0.05);
    var th = parseInt(window.innerHeight * 0.05);
    var sq;

    for(var i = 0; i < 10; i++) {
        t = document.createElement('div');
        t.style.position = 'absolute';
        t.style.border = '5px solid black';

        intext = "<div style='position:absolute;width:"+tw+"px;height:"+th+"px;top:"+0+"px;left:"+0+"px;background:#FFFFFF' onmousedown='infoPanePress("+i+", 1)'></div>"
            + "<div style='position:absolute;width:"+tw+"px;height:"+th+"px;top:"+0+"px;left:"+tw+"px;background:#000000' onmousedown='infoPanePress("+i+", 2)'></div>"
            + "<div style='position:absolute;width:"+tw+"px;height:"+th+"px;top:"+(th)+"px;left:"+0+"px;background:#FF530D' onmousedown='infoPanePress("+i+", 3)'></div>"
            + "<div style='position:absolute;width:"+tw+"px;height:"+th+"px;top:"+(th)+"px;left:"+tw+"px;background:#1CE802' onmousedown='infoPanePress("+i+", 4)'></div>"
            + "<div style='position:absolute;width:"+tw+"px;height:"+th+"px;top:"+(th*2)+"px;left:"+0+"px;background:#FFEC15' onmousedown='infoPanePress("+i+", 5)'></div>"
            + "<div style='position:absolute;width:"+tw+"px;height:"+th+"px;top:"+(th*2)+"px;left:"+tw+"px;background:#3339FF' onmousedown='infoPanePress("+i+", 6)'></div>"
            ;

        t.innerHTML = intext;
        t.style.left = '-1000px';

        allInfoPanes.push(t);
        infoDiv.appendChild(t);
    }


} //end createAllTiles

function handleKeyDown(e) {
    switch(e.keyCode) {
        case 87: //w
            shiftTiles('up');
            break;
        case 65: //a
            shiftTiles('left');
            break;
        case 83: //s
            shiftTiles('down');
            break;
        case 68: //d
            shiftTiles('right');
            break;
        case 82: //r
            zoomTiles('increase');
            break;
        case 70: //f
            zoomTiles('decrease');
            break;
        default:
            break;
    } //end switch
} //end handleKeyDown


function shiftTiles(dir) {
    var xmod = 0;
    var ymod = 0;

    switch(dir) {
        case 'up':
            ymod = tHeightCurrent * -1;
            break;
        case 'down':
            ymod = tHeightCurrent;
            break;
        case 'left':
            xmod = tWidthCurrent * -1;
            break;
        case 'right':
            xmod = tWidthCurrent;
            break;
    }
    for(var i = 0; i < allTiles.length; i++) {
        allTiles[i].style.top = parseInt(allTiles[i].style.top) + ymod + 'px';
        allTiles[i].style.left = parseInt(allTiles[i].style.left) + xmod + 'px';
        tXstarter += xmod;
        tYStarter += ymod;
    }
} //end shiftTiles

function zoomTiles(dir) {
    var smod = 0;
    switch(dir) {
        case 'increase':
            smod = 20;
            break;
        case 'decrease':
            smod = -20;
            break;
    }

    tWidthCurrent += smod;
    tHeightCurrent += smod;

    for(var h = 0; h < heightInTiles; h++) {
        for(var w = 0; w < widthInTiles; w++) {

            allTiles[w + (h * widthInTiles)].style.width = tWidthCurrent + 'px';
            allTiles[w + (h * widthInTiles)].style.height = tHeightCurrent + 'px';
            allTiles[w + (h * widthInTiles)].style.top = tYStarter + (tHeightCurrent * h) + 'px';
            allTiles[w + (h * widthInTiles)].style.left = tXstarter + (tWidthCurrent * w) + 'px';

        }
    }

} //end zoomTiles

function infoPanePress( pane, color) {

    var tileToAffect = parseInt(allInfoPanes[pane].value);
    allInfoPanes[pane].style.left = '-1000px';
    switch(color) {
        case 1:
            allTiles[tileToAffect].style.background = '#FFFFFF';
            break;
        case 2:
            allTiles[tileToAffect].style.background = '#000000';
            break;
        case 3:
            allTiles[tileToAffect].style.background = '#FF530D';
            break;
        case 4:
            allTiles[tileToAffect].style.background = '#1CE802';
            break;
        case 5:
            allTiles[tileToAffect].style.background = '#FFEC15';
            break;
        case 6:
            allTiles[tileToAffect].style.background = '#3339FF';
            break;
    }

} //end infoPanePress

function moveInfoPane( e ) {
    var rect = {};

    for(var i = 0; i < allTiles.length; i++) {

        rect.left = parseInt( allTiles[i].style.left );
        rect.top = parseInt( allTiles[i].style.top );
        rect.width = parseInt( allTiles[i].style.width );
        rect.height = parseInt( allTiles[i].style.height );

        if( isPointInRect( e, rect ) ) {
            findAndMoveInfoPane(e, i);
        }

    }

} //end moveInfoPane

function isPointInRect( p, rect) {
    var px = parseInt( p.pageX );
    var py = parseInt( p.pageY );

    if(
        px >= rect.left &&
        px <= (rect.left + rect.width) &&
        py >= rect.top &&
        py <= (rect.top + rect.height)
    ) {
        return true;
    }
    return false;
} //end isPointInRect

function findAndMoveInfoPane(e, tile) {
    for(var i = 0; i < allInfoPanes.length; i++) {
        if( parseInt(allInfoPanes[i].style.left) == -1000 ) {
            allInfoPanes[i].style.left = e.pageX + 'px';
            allInfoPanes[i].style.top = e.pageY + 'px';
            allInfoPanes[i].value = tile;
            break;
        }
    }

}

</script>
</html>
*/
