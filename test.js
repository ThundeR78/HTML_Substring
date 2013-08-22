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
	for (test in testArray) { 
		var result = html_substring(test, length);
		var text = document.createTextNode(result);

		div.appendChild(text);
		div.appendChild(document.createElement('br'));
	}
}
