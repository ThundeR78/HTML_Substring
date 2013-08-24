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
        } while(node = node.nextSibling);	//Until exist next sibling
    }

    //Get Text inside element
    function get_textnode(elmt) {
    	
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


// function html_substring(html, length) {
// 	var result = '';		//Final text
// 	var stackTag = [];		//Array with tags
// 	var lastIndex = 0;		//Last index used
// 	var cpt = 0;

// 	var tag; 
// 	// var regex = /<([^>\s]*)[^>]*>/g;
    
//     //Append html text in a div element
//     var div = document.createElement("div");
// 	div.innerHTML = html;
// 	//Search every tags on the div
//     var elementsTag = div.getElementsByTagName('*');

//     //Display elements tag found
//     displayTags(elementsTag);

//     //Loop until enough characters for each tag
//     // while ((tag = regex.exec(html)) && length) {
//     while ((tag = elementsTag[cpt]) && length) {
//     	console.log(cpt+' : '+tag.tagName);
// 	    //Get the text substring between the last tag and this one
// 	    var tmp = html.substring(lastIndex, tag.index).substr(0, length);
	    
// 	    //Append to the result
// 	    result += tmp;
// 	    //Count the number of characters added
// 	    // lastIndex = regex.lastIndex;
// 	    length -= tmp.length;

// 		console.log(length+' : '+tmp);


// 	    if (length) {
// 	        result += tag[0];
// 	        if (tag[1].indexOf('/') === 0) {
// 	            //if this is a closing tag, than pop the stack (does not account for bad html)
// 	            stackTag.pop();
// 	        } else if (tag[1].lastIndexOf('/') !== tag[1].length - 1) {
// 	            //if this is not a self closing tag than push it in the stack
// 	            stackTag.push(tag[1]);
// 	        }
// 	    }

// 	    cpt++;
// 	}

//     //Add the remainder of the string, if needed (there are no more tags in here)
//     result += html.substr(lastIndex, length);

//     //Fix the unclosed tags
//     while (stackTag.length) {
//         result += '</'+ stackTag.pop() +'>';
//     }

// 	return result;
// }