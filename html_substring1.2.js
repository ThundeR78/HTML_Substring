//Try to remove others tags after end (length=0) 

function html_substring(html, length) {
	//Append html text in a div element to navigate inside a tree elements
    var div = document.createElement('div');
    div.innerHTML = html;

    //Node array to remove
    var arrayNodeUseless = [];

    //Launch recursive loop (if tags exist) with the div like root element
    read_element(div);

    //Navigate in element 
	function read_element(elmt) {
        var node = elmt.firstChild;		//Get first child

        do {
        	if (length > 0) {
                if(node.nodeType == 3) {	//Node is Text node
                	console.log('Text = '+node.data);

                    get_textnode(node);
                } else if(node.nodeType == 1 && node.childNodes && node.childNodes[0]) { //&& length>0	//Node is Element node & Child nodes exist & First node child exist
            		console.log('Node = '+ node.tagName+' : '+ node.innerHTML);
            		
                    // if (length <= 0) {
                    //     for (var i = 0; i<arrayNodeUseless.length; i++) {
                    //         var n = arrayNodeUseless.pop();
                    //         if (elmt.isSameNode(n.getParentNode()))  //http://stackoverflow.com/questions/3719384/why-can-i-not-remove-a-child-element-ive-just-found-not-found-err
                    //             elmt.removeChild(n);
                    //     }
                    // }

                    read_element(node);
                } else
                	console.log('Nothing inside '+ node.tagName);

                //console.log(length);
            } else {
                console.log("BREAK");

                arrayNodeUseless.push(node);
                // elmt.removeChild(node);

                // for(var i=0; i<node.childNodes.length; i++)
                //     node.removeChild(node.childNodes[i]);
                
                // break;
            } 
        } while((node = node.nextSibling));// && length>0);	    //Until not exist next sibling
  
        //Remove every useless tags 
        for (var i = 0; i<arrayNodeUseless.length; i++) {
            var n = arrayNodeUseless.pop();

            n.parentNode.removeChild(n);

            // if (n.nodeType == 1 && elmt.isSameNode(n.parentNode))  //http://stackoverflow.com/questions/3719384/why-can-i-not-remove-a-child-element-ive-just-found-not-found-err
            //     elmt.removeChild(n);
            // else
            //     n.data = "";
        }
    }

    //Get Text inside element
    function get_textnode(elmt) {
		//If can take others characters
        if(length > 0) {		
        	//Substring without break special characters
			elmt.data = elmt.substringData(0, length);

			//Subtract length of the text data to the length total
            length -= elmt.data.length;
        } else {
        	elmt.data = '';
        	// elmt.parentNode.parentNode.removeChild(elmt.parentNode);
        }
    }   

    //Return the content of the div
    return div.innerHTML;	
}



/*Link help :
http://help.dottoro.com/ljkuedch.php
http://www.javascriptkit.com/domref/elementproperties.shtml
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope
https://developer.mozilla.org/en-US/docs/Web/API/document.getElementsByTagName?redirectlocale=en-US&redirectslug=DOM%2Fdocument.getElementsByTagName
http://www.javascriptkit.com/domref/nodetype.shtml
*/
