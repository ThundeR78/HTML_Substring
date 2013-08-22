function playTests() {
	//Define variables
	var length = 40;
	var results = "";

	//Define tests
	var test1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer laoreet at nisl at tincidunt.';	//Texte
	var test2 = 'Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Integer laoreet at nisl at tincidunt.';	//Text + Balise b
	var test3 = 'Lorem ipsum dolor sit amet, <a href="http://www.google.fr">consectetur adipiscing elit</a>. Integer laoreet at nisl at tincidunt.';	//Text + Balise a href
	var test4 = 'Lorem ipsum &lt;dolor&gt; sit amet, &amp; consectetur adipiscing elit. &euro; Integer laoreet at nisl at tincidunt.';	//Texte + Caractère spéciaux

	//Regroup tests
	var testArray = [test1, test2, test3, test4];

	//Get the DOM element ul
	var listTest = document.getElementById('listTest');	


	//Launch tests
	for (var i=0; i < testArray.length; i++) { 
    	results += '<li id="test_'+ (i+1) +'">Test n°'+(i+1)+' : '+ html_substring(testArray[i],length) +'</li>';
	}

	listTest.innerHTML = results;

}
