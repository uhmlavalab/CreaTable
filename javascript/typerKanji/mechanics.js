



/*
This will just move all kanji to the left.
But the main point is that on certain intervals more information will be revealed.

*/
function moveActiveKanji() {

	var k;

	for(var i = 0; i < visuals.allKanji.length; i++) {
		k = visuals.allKanji[i];

		k.vGroup.x( k.vGroup.x() - visuals.cKanjiSpeed );

		//there are 3 additional parts: definition, english, reading. Realistically given the last two are almost equivalent.

		if(k.vGroup.x() < window.innerWidth / 2) {
			k.vMeaning.visible(true);
			//bump dc
		}

		if(k.vGroup.x() < window.innerWidth / 4) {
			k.vRoman.visible(true);
			//bump dc
		}

		if(k.vGroup.x() < window.innerWidth / 4) {
			k.vYomimono.visible(true);
			//bump dc
		}

		if(k.vGroup.x() < window.innerWidth/20) {
			k.originalData.difficulty++;
			resetKanji( k );
		}
	}

} //end moveActiveKanji


function resetKanji( kanjiToReset ) {

	kanjiToReset.vGroup.x( window.innerWidth + 10 );

	kanjiToReset.vMeaning.visible(false);
	kanjiToReset.vRoman.visible(false);
	kanjiToReset.vYomimono.visible(false);

	if(kanjiRotation.length === 0) { fillKanjiRotationWithNextSet(); }

	kanjiToReset.vKanji.text(		kanjiRotation[0].kanji );
	kanjiToReset.vMeaning.text(		kanjiRotation[0].meaning);
	kanjiToReset.vRoman.text(		kanjiRotation[0].roman);
	kanjiToReset.vYomimono.text(	kanjiRotation[0].yomimono);
	kanjiToReset.originalData		= kanjiRotation[0];
	repositionKanjiVisuals( kanjiToReset );

	kanjiRotation.shift();

} //end resetKanji

function resetAllKanji() {
	for(var i = 0; i < visuals.allKanji.length; i++ ) {
		resetKanji( visuals.allKanji[i] );
	}
} //end resetAllKanji



function fillKanjiRotationWithNextSet() {

	var setSize = 100;
	var difficultyArray = [];
	var diffAdded;

	difficultyArray.push(allKanji[0].difficulty);

	//for each kanji check its difficulty value
	for(var i = 0; i < allKanji.length; i++) {
		//if the value has not yet been indexed, then needs to be added
		if( difficultyArray.indexOf( allKanji[i].difficulty ) == -1 ) {
			diffAdded = false;
			//the highest level of difficulty should be first.
			for(var d = 0; d < difficultyArray.length; d++) {
				if( allKanji[i].difficulty > difficultyArray[d] )  {
					difficultyArray.splice( d, 0, allKanji[i].difficulty );
					diffAdded = true;
					break;
				}
			}
			if(!diffAdded) { difficultyArray.push( allKanji[i].difficulty ); }
		}
	} //at this point all difficulty values should be collected in order.


	while(  kanjiRotation.length < setSize && kanjiRotation.length != allKanji.length && difficultyArray.length > 0  ) {
		for(var i = 0; i < allKanji.length; i++) {
			if( allKanji[i].difficulty === difficultyArray[0] ) { kanjiRotation.push( allKanji[i] ); }
		}
		difficultyArray.shift();
	}

} //end fillKanjiRotationWithNextSet











