function playTests() {
	//Define variables
	var length = 40;
	var results = '';

	//Define tests
	var test1 = 'Lorem ipsum dolor sit< amet, consectetur adipiscing elit. Integer laoreet at nisl at tincidunt.';	//Texte
	var test2 = 'Lorem ipsum &lt;dolor&gt; sit amet, &amp; consectetur &euro; adipiscing elit. Integer laoreet at nisl at tincidunt.';	//Texte + Caractère spéciaux
	var test3 = 'Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Integer laoreet at nisl at tincidunt.';	//Text + Balise b
	var test4 = 'Lorem ipsum <u> </u>dolor sit amet, <a href="http://www.google.fr">consectetur adipiscing elit</a>. Integer laoreet at nisl at tincidunt.';	//Text + Balise a href
	var test5 = 'Lorem ipsum <span><i>&lt;dolor&gt;</i> sit amet, <b>consectetur adipiscing elit</b></span>. Integer <a href="www.google.com">laoreet</a> at nisl at tincidunt.';
	var test6 = '<p><cite>Wikipedia</cide> à propos du HTML 4.0 : </p>'+
		'<blockquote cite="http://fr.wikipedia.org/wiki/Html#1997_:_HTML_3.2._et_4.0"><p>Le 18 décembre 1997, le W3C publie la spécification HTML 4.0 qui <mark>standardise de nombreuses extensions supportant les styles et les scripts, les cadres (frames) et les objets</mark> (inclusion généralisée de contenu).</p></blockquote>'+
		'<p>En effet, HTML 4 officialise le support des éléments <code>&lt;script&gt;</code> et <code>&lt;style&gt;</code> et ajoute la gestion des frames et l\'élément <code>&lt;objet&gt;</code>.</p>';

	//Regroup tests
	var testArray = [test1, test2, test3, test4, test5, test6];

	//Display size 
	document.getElementById('size').innerHTML = 'HTML Substring with '+ length +' characters :';

	//Get the DOM element <ul>
	var listTest = document.getElementById('listTest');	

	//Launch tests
	for (var i=0; i < testArray.length; i++) { 

		//Time before execute test
		var startTime = new Date().getTime();  
		var elapsedTime = 0;

		//Execute test function
		var result = html_substring(testArray[i], length);
		  
		//Measure time to execute the test
		elapsedTime = new Date().getTime() - startTime;  //End time - Start time
		 
		//Add a div to count the number of characters displayed really
		var div = document.createElement('div');
	    div.innerHTML = result;
	    var icon = (div.textContent.length == length) ? 'right.gif' : 'wrong.png';

		//Append new <li> in <ul>
    	results += '<li id="test_'+ (i+1) +'">'+
	    		'<h3 class="label-test">Test n°'+(i+1)+' : </h3>&nbsp;'+
	    		'<img src="'+icon+'" />&nbsp;'+
	    		'<label class="time-test">('+elapsedTime+'ms)</label><br />'+ 
	    		result +
    		'</li>';
	}

	//Replace the content of the <ul> by the new list of result
	listTest.innerHTML = results;
}
