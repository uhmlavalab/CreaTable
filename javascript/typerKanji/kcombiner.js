



function combineConverted(useOptions) {

	var ak = [];
	// for(var i = 0; i < k101.length; i++) { ak.push(k101[i]); }	
	// for(var i = 0; i < k102.length; i++) { ak.push(k102[i]); }	
	// for(var i = 0; i < ak.length; i++) { ak[i].difficulty = 10; }	
	// return ak;

	for(var i = 0; i < tkOptions.sets.length; i++) {
		if(tkOptions.sets[i].use) {
			for(var a = 0; a < tkOptions.sets[i].ref.length; a++) {
				ak.push( tkOptions.sets[i].ref[a] );

				
				ak[ ak.length - 1 ].difficulty = checkIfKanjiHasCookie( ak[ ak.length - 1 ].kanji.trim() );

				if( ak[ ak.length - 1 ].difficulty === null) {
					ak[ ak.length - 1 ].difficulty = 10;
				}
			}
		}
	}

	return ak;
}



function checkIfKanjiHasCookie( kanjiToCheck ) {
	var allCookies = document.cookie;
	var cookieArray = allCookies.split(';');

	var tempKanji;
	var tempDifficulty;
	var tempSplit;

	for(var i = 0; i < cookieArray.length; i++) {
		if( cookieArray[i].indexOf( kanjiToCheck+ "=" ) !== -1 ) {
			tempSplit = cookieArray[i].split('=');
			tempKanji = tempSplit[0].trim();
			tempDifficulty = tempSplit[1].trim();
			console.log('Found match for ' + kanjiToCheck + ', difficulty ' + tempDifficulty);
			return parseInt(tempDifficulty);
		}
	}

	return null;

} //check if checkIfKanjiHasCookie


//The code below this doesn't work because of encoding issues with kanji
































/*
All kanji will be part of an array.
Objects will have format:

{
    k: '',
    yomimono: '',
    romanization: '',
    meaning: '',
}

*/



function getAllKanji( arrayOfIncludes ) {

	var filesToRead = [
		'k101.txt', //0
		'k102.txt',
	];


	var raw;
	var lineSplit;
	var allKanjiFormatted = [];

	//if arrayOfIncludes is specified, 
	if(arrayOfIncludes !== undefined) {
		var tempList = [];
		for(var i = 0; i < arrayOfIncludes.length; i++) {
			if(filesToRead[ arrayOfIncludes[i] ] !== null ) {
				tempList.push( filesToRead[ arrayOfIncludes[i] ] );
			}
			else {
				alert('Error in reading source file index:' + arrayOfIncludes[i] );
			}
		}
		filesToRead = tempList;
	}

	//for each file get raw and place into kanji array.
	// for(var i = 0; i < filesToRead.length; i++) {
	// 	raw = retrieveTxtFileContents(filesToRead[i]);
	// 	lineSplit = raw.split('\n');

	// 	for (var a = 0; a < lineSplit.length; a++) {
	// 		allKanjiFormatted.push( pullKanjiFromLine( lineSplit[a] ) );
	// 	}
	// }

	tempPreload(allKanjiFormatted);


	return allKanjiFormatted;

} //end getAllKanji

function retrieveTxtFileContents(filename) {
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", filename, false);
	rawFile.onreadystatechange = function ()
	{
		if(rawFile.readyState === 4)
		{
			if(rawFile.status === 200 || rawFile.status == 0)
			{
				return rawFile.responseText;

			}
		}
	}
	rawFile.send(null);
}


/*
Assumes the format:
kanji | yomimono | roman | meaning.
perform a  trim() before adding


*/
function pullKanjiFromLine(line) {
	var obj = {};
	var parts = line.split('\t');

	obj.kanji 		= line[0].trim();
	obj.yomimono 	= line[1].trim();
	obj.roman 		= line[2].trim();
	obj.meaning 	= line[3].trim();

	return obj;
}




function tempPreload(akf) {

	for(var i = 0; i < k101.length; i++) {
		akf.push( pullKanjiFromLine( k101[i] ) );
	}
}










