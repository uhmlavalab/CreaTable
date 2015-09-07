







function combineConverted() {
	var ak = [];

	for(var i = 0; i < k101.length; i++) { ak.push(k101[i]); }	
	for(var i = 0; i < k102.length; i++) { ak.push(k102[i]); }	


	for(var i = 0; i < ak.length; i++) { ak[i].difficulty = 10; }	

	return ak;
}



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










