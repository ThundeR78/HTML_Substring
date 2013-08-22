function playTests() {
	//Define length search 
	var length = 4;

	//Define tests
	var test1 = "Blabla";
	var test2 = "test";
	var test3 = "je sais pas";

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
