


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


	visuals.cTotalKanji = visuals.lanes.length;
	visuals.cKanjiSize = window.innerHeight / ( visuals.lanes.length + 5 ) ;
	visuals.cKanjiSpeed = window.innerWidth * 0.0015;

	visuals.allKanji = [];
	for(var i = 0; i < visuals.cTotalKanji; i++) {
		visuals.allKanji.push( createKanji() );
		visuals.lanes[i].add( visuals.allKanji[ visuals.allKanji.length - 1 ].vGroup );
	}


	//cant use this because the input is based on the language interpreter.

	// visuals.userInput = new Konva.Text({
	// 	text: 'tempUserInput',
	// 	fontSize: visuals.cKanjiSize ,
	// 	fontFamily: 'Arial',
	// 	fill: 'black'
	// });
	// visuals.userInput.x( window.innerWidth * 0.05 );
	// visuals.userInput.y( window.innerHeight /2 - visuals.userInput.getTextHeight()/2 );
	// visuals.lanes[0].add(visuals.userInput);


	visuals.stage.draw();


} //end setupTheCanvas


function createKanji() {

	var obj = {};
	obj.vGroup = new Konva.Group();

	obj.vKanji = new Konva.Text({
		text: 'tempKanji',
		fontSize: visuals.cKanjiSize,
		fontFamily: 'Arial',
		fill: 'black'
	});
	obj.vKanji.x( obj.vKanji.getTextWidth()/-2 );
	obj.vKanji.y( obj.vKanji.getTextHeight()/-2 );
	obj.vGroup.add(obj.vKanji);

	obj.vMeaning = new Konva.Text({
		text: 'tempMeaning',
		fontSize: visuals.cKanjiSize/4,
		fontFamily: 'Arial',
		fill: 'black'
	});
	obj.vMeaning.x( obj.vKanji.getTextWidth()/3 * 2 );
	obj.vMeaning.y( obj.vMeaning.getTextHeight()/-2 );
	obj.vGroup.add(obj.vMeaning);

	obj.vRoman = new Konva.Text({
		text: 'tempRoman',
		fontSize: visuals.cKanjiSize/4,
		fontFamily: 'Arial',
		fill: 'black'
	});
	obj.vRoman.x( obj.vRoman.getTextWidth()/-2 );
	obj.vRoman.y( obj.vKanji.getTextHeight()/2 + obj.vRoman.getTextHeight() );
	obj.vGroup.add(obj.vRoman);

	obj.vYomimono = new Konva.Text({
		text: 'tempYomimono',
		fontSize: visuals.cKanjiSize/4,
		fontFamily: 'Arial',
		fill: 'black'
	});
	obj.vYomimono.x( obj.vYomimono.getTextWidth()/-2 );
	obj.vYomimono.y( (obj.vKanji.getTextHeight()/2 + obj.vRoman.getTextHeight() * 2) * -1 );
	obj.vGroup.add(obj.vYomimono);

	return obj;
} //end createKanji

function repositionKanjiVisuals( kanjiToReposition) {

	kanjiToReposition.vKanji.x( 	kanjiToReposition.vKanji.getTextWidth()/-2 );
	kanjiToReposition.vKanji.y( 	kanjiToReposition.vKanji.getTextHeight()/-2 );
	kanjiToReposition.vMeaning.x( 	kanjiToReposition.vKanji.getTextWidth()/3 * 2 );
	kanjiToReposition.vMeaning.y( 	kanjiToReposition.vMeaning.getTextHeight()/-2 );
	kanjiToReposition.vRoman.x( 	kanjiToReposition.vRoman.getTextWidth()/-2 );
	kanjiToReposition.vRoman.y( 	kanjiToReposition.vKanji.getTextHeight()/2 + kanjiToReposition.vRoman.getTextHeight() );
	kanjiToReposition.vYomimono.x( 	kanjiToReposition.vYomimono.getTextWidth()/-2 );
	kanjiToReposition.vYomimono.y( 	(kanjiToReposition.vKanji.getTextHeight()/2 + kanjiToReposition.vRoman.getTextHeight() * 2) * -1 )

}




