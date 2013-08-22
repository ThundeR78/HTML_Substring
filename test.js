function playTests() {
	//Define length search 
	var length = 30;

	//Define tests
	var test1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer laoreet at nisl at tincidunt.';	//Texte
	var test2 = 'Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Integer laoreet at nisl at tincidunt.';	//Text + Balise b
	var test3 = 'Lorem ipsum dolor sit amet, <a href="http://www.google.fr">consectetur adipiscing elit</a>. Integer laoreet at nisl at tincidunt.';	//Text + Balise a href

	//Regroup tests
	var testArray = [test1, test2, test3];

	var div = document.getElementById('content');	

	//Launch tests
	for (var i=0; i < testArray.length; i++) { 
		var result = html_substring(testArray[i], length);
		var text = document.createTextNode(result);

		div.appendChild(text);
		div.appendChild(document.createElement('br'));
	}
}
