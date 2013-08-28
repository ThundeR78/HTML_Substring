    //TODO : test with arrayTags
    //TODO : fix delete others tags after end

function html_substring(html, count) {
	//Append html text in a div element to navigate inside a tree elements
    var div = document.createElement('div');
    div.innerHTML = html;

    //Display elements tag found
    displayTags(div.getElementsByTagName('*'));

    //Launch recursive loop (if tags exist) with the div like root element
    read_element(div);

    //Navigate in element 
	function read_element(elmt) {
        var node = elmt.firstChild;		//Search first child

        do {
            if(node.nodeType == 3) {	//Node is Text node
            	console.log('Text = '+node.data);

                get_textnode(node);
            } else if(node.nodeType == 1 && node.childNodes && node.childNodes[0]) {	//Node is Element node & Child nodes exist & First node child exist
        		console.log('Node = '+ node.tagName+' : '+ node.innerHTML);
        		
                read_element(node);
            } else
            	console.log('Nothing inside '+ node.tagName);
        } while((node = node.nextSibling));// && count>0);	//Until exist next sibling
    }

    //Get Text inside element
    function get_textnode(elmt) {
		//If can take others characters
        if(count > 0) {		
        	//Substring without break specials characters
			elmt.data = elmt.substringData(0, count);

			//Subtract length of the text data to the count total
            count -= elmt.data.length;
        } else {
        	elmt.data = '';
        }
    }

    //Return the content of the div
    return div.innerHTML;	
}


//Display infos tags in console 
function displayTags (elementsTag) {
    if (elementsTag.length > 1) {
    	var infosTags = '';
    	for (var i = 0; i<elementsTag.length; i++)
    		infosTags += elementsTag[i].tagName+' ';
    	console.log(elementsTag.length+'tags : '+ infosTags);
    } else if (elementsTag.length == 1) {
    	console.log(elementsTag.length+'tag : '+ elementsTag[0].tagName);
    } else 
    	console.log(elementsTag.length+'tag');
}


/*
Link help :
http://help.dottoro.com/ljkuedch.php
http://www.javascriptkit.com/domref/elementproperties.shtml
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope
https://developer.mozilla.org/en-US/docs/Web/API/document.getElementsByTagName?redirectlocale=en-US&redirectslug=DOM%2Fdocument.getElementsByTagName
http://www.javascriptkit.com/domref/nodetype.shtml
*/
