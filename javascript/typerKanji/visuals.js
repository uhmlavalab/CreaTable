var visuals = {};


function setupTheCanvas() {

	visuals.stage = new Konva.Stage({
        width: window.innerWidth,
        height: window.innerHeight,
        container: 'topDiv'
	});

	visuals.lanes = [];
	var numOfLanes = 4;
	for(var i = 0; i < numOfLanes; i++) {
		visuals.lanes.push( new Konva.Layer() );
		visuals.stage.add( visuals.lanes[ visuals.lanes.length - 1 ] );
		visuals.lanes[ visuals.lanes.length - 1 ].y( i * window.innerHeight/numOfLanes + window.innerHeight/numOfLanes/2 );
	}


	visuals.cTotalKan = visuals.lanes.length;
	visuals.cKanSize = window.innerHeight / ( visuals.lanes.length + 5 ) ;

	visuals.allKan = [];
	for(var i = 0; i < visuals.cTotalKan; i++) {
		visuals.allKan.push( createKan() );
		visuals.lanes[i].add( visuals.allKan[ visuals.allKan.length - 1 ].vGroup );
	}


	//cant use this because the input is based on the language interpreter.

	// visuals.userInput = new Konva.Text({
	// 	text: 'tempUserInput',
	// 	fontSize: visuals.cKanSize ,
	// 	fontFamily: 'Arial',
	// 	fill: 'black'
	// });
	// visuals.userInput.x( window.innerWidth * 0.05 );
	// visuals.userInput.y( window.innerHeight /2 - visuals.userInput.getTextHeight()/2 );
	// visuals.lanes[0].add(visuals.userInput);


	visuals.stage.draw();


} //end setupTheCanvas


function createKan() {

	var obj = {};
	obj.vGroup = new Konva.Group();

	obj.vKan = new Konva.Text({
		text: 'tempKan',
		fontSize: visuals.cKanSize,
		fontFamily: 'Arial',
		fill: 'black'
	});
	obj.vKan.x( obj.vKan.getTextWidth()/-2 );
	obj.vKan.y( obj.vKan.getTextHeight()/-2 );
	obj.vGroup.add(obj.vKan);

	obj.vMeaning = new Konva.Text({
		text: 'tempMeaning',
		fontSize: visuals.cKanSize/4,
		fontFamily: 'Arial',
		fill: 'black'
	});
	obj.vMeaning.x( obj.vKan.getTextWidth()/3 * 2 );
	obj.vMeaning.y( obj.vMeaning.getTextHeight()/-2 );
	obj.vGroup.add(obj.vMeaning);

	obj.vRoman = new Konva.Text({
		text: 'tempRoman',
		fontSize: visuals.cKanSize/4,
		fontFamily: 'Arial',
		fill: 'black'
	});
	obj.vRoman.x( obj.vRoman.getTextWidth()/-2 );
	obj.vRoman.y( obj.vKan.getTextHeight()/2 + obj.vRoman.getTextHeight() );
	obj.vGroup.add(obj.vRoman);

	obj.vYomimono = new Konva.Text({
		text: 'tempYomimono',
		fontSize: visuals.cKanSize/4,
		fontFamily: 'Arial',
		fill: 'black'
	});
	obj.vYomimono.x( obj.vYomimono.getTextWidth()/-2 );
	obj.vYomimono.y( (obj.vKan.getTextHeight()/2 + obj.vRoman.getTextHeight() * 2) * -1 );
	obj.vGroup.add(obj.vYomimono);

	return obj;
} //end createKan




