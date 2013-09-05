//Try to store selection in new div "result", when length = 0, we break loop and return value of "result"
//Avoid to remove others nodes

//Difficulty : progress in div and do the same with result on the same time

function html_substring(html, length) {
	//Append html text in a div element to navigate inside a tree elements
    var div = document.createElement('div');
    div.innerHTML = html;

    //Others div to store final html
    var result = document.createElement('div');
    var currentNodeResult = result.cloneNode(false);       //Clone node without keep child elements

    //Launch recursive loop (if tags exist) with the div like root element
    read_element(div);

    //Navigate in element 
	function read_element(elmt) {
        var node = elmt.firstChild;		//Get first child

	// if (length>0) {
        do {
    	    if (length>0) {
                if(node.nodeType == 3) {	//Node is Text node
                	console.log('Text = '+node.data);

                    get_textnode(node);
                } else if(node.nodeType == 1 && node.childNodes && node.childNodes[0]) { //&& length>0	//Node is Element node & Child nodes exist & First node child exist
            		console.log('Node = '+ node.tagName+' : '+ node.innerHTML);
            		
                    currentNodeResult.appendChild(node);
                    currentNodeResult = node.cloneNode(false);
                    // result.appendChild(elmt);
                    read_element(node);
                } else
                	console.log('Nothing inside '+ node.tagName);

                //console.log(length);
            } else
                return;
        } while((node = node.nextSibling));// && length>0);	//Until not exist next sibling
    // }
    }

    //Get Text inside element
    function get_textnode(elmt) {
		//If can take others characters
        if(length > 0) {		
        	//Substring without break specials characters
			elmt.data = elmt.substringData(0, length);

			//Subtract length of the text data to the length total
            length -= elmt.data.length;

            currentNodeResult.appendChild(elmt);
            // result.appendChild(elmt);
        } else {
        	elmt.data = '';
        	// elmt.parentNode.parentNode.removeChild(elmt.parentNode);
        }
    }

    //Return the content of the new div
    return result.innerHTML;
}



/*Link help :
http://help.dottoro.com/ljkuedch.php
http://www.javascriptkit.com/domref/elementproperties.shtml
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope
https://developer.mozilla.org/en-US/docs/Web/API/document.getElementsByTagName?redirectlocale=en-US&redirectslug=DOM%2Fdocument.getElementsByTagName
http://www.javascriptkit.com/domref/nodetype.shtml
*/
