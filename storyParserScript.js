//Story Parsing


var adventureTitle="NONE";
var adventureAuthor="NONE";
var adventurePath="/Adventures/AdventureTEST.xml";

function loadStory( path ) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			var xmlDoc = xhttp.responseXML;
	
			//Title and Author
			adventureTitle = xmlDoc.getElementsByTagName("TITLE")[0].childNodes[0].nodeValue;
			adventureAuthor = xmlDoc.getElementsByTagName("AUTHOR")[0].childNodes[0].nodeValue;
			
			document.getElementById("title").innerHTML = adventureTitle;
			document.getElementById("author").innerHTML = adventureAuthor;
			document.getElementById("dialogue").innerHTML = '';
			document.getElementById("choices").innerHTML = '<a href="javascript:loadStoryBlock(1);"> Begin </a>';
		}
	};
	adventurePath = path;
	xhttp.open("GET", adventurePath, true);
	xhttp.send();
}

function loadStoryBlock( blockid ) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      parseStoryBlock(xhttp, blockid );
    }
  };
  xhttp.open("GET", adventurePath, true);
  xhttp.send();
}

function parseStoryBlock( xml, id ) {
	var i;
	var xmlDoc = xml.responseXML;
	
	//Story Block Data
	var storyBlockDialogue = "";
	var storyBlockChoices = "";
	var storyBlocks = xmlDoc.getElementsByTagName("STORYBLOCK");
	var thisStoryBlock; //Store the requested story block here.
	
	//Get the story block with the requested block id
	for (i = 0; i < storyBlocks.length; i++) {
		if(storyBlocks[i].getAttribute('id') == id ) {
			thisStoryBlock = storyBlocks[i];
		}
	}
  
	var choices = thisStoryBlock.getElementsByTagName("CHOICE");
	storyBlockDialogue += '<p>';
	storyBlockDialogue += thisStoryBlock.getElementsByTagName("DIALOGUE")[0].childNodes[0].nodeValue;
	storyBlockDialogue += '</p><br>';
  
	for (i = 0; i < choices.length; i++) {
		storyBlockChoices+= '<a href="javascript:loadStoryBlock(' + choices[i].getAttribute('lblockid') +');">';
		
		storyBlockChoices += 
		choices[i].childNodes[0].nodeValue;
		
		storyBlockChoices+= '</a><br>';
	}
	
	document.getElementById("dialogue").innerHTML += storyBlockDialogue;
	document.getElementById("choices").innerHTML = storyBlockChoices;

}

function hideTestObjects() {
	$(".test").hide();
}
