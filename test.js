function playTests() {
	//Define variables
	var length = 40;
	var results = "";

	//Define tests
	var test1 = 'Lorem ipsum dolor sit< amet, consectetur adipiscing elit. Integer laoreet at nisl at tincidunt.';	//Texte
	var test2 = 'Lorem ipsum &lt;dolor&gt; sit amet, &amp; consectetur &euro; adipiscing elit. Integer laoreet at nisl at tincidunt.';	//Texte + Caractère spéciaux
	var test3 = 'Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Integer laoreet at nisl at tincidunt.';	//Text + Balise b
	var test4 = 'Lorem ipsum <u> </u>dolor sit amet, <a href="http://www.google.fr">consectetur adipiscing elit</a>. Integer laoreet at nisl at tincidunt.';	//Text + Balise a href
	var test5 = 'Lorem ipsum <span><i>&lt;dolor&gt;</i> sit amet, <b>consectetur adipiscing elit</b></span>. Integer laoreet at nisl at tincidunt.';

	//Regroup tests
	var testArray = [test1, test2, test3, test4, test5];

	//Get the DOM element ul
	var listTest = document.getElementById('listTest');	

	//Launch tests
	for (var i=0; i < testArray.length; i++) { 
		var result = html_substring(testArray[i], length);
		//Append new <li> in <ul>
    	results += '<li id="test_'+ (i+1) +'"><h3 class="label-test">Test n°'+(i+1)+' : </h3>'+ result +'</li>';
	}

	//Replace the content of the <ul> by the new list of result
	listTest.innerHTML = results;
}
