//Parse every character and look for tags
        
function html_substring (html, length) {     
    var isText = true; 
    var result = ""; 
    var i = 0; 
    var lastSpacePosition = -1; 

    var tagsArray = []; 
    var currentTag = ""; 

    //Return text after remove every HTML tags
    function strip_tags (input, allowed) {
        allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
        var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
        return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
            return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
        });
    }

    //Length html without tags
    var noTagLength = strip_tags(html).length; 
    console.log("length="+length+" , noTagLength="+noTagLength);

    //Parser loop for each character
    for(var j=0; j < html.length; j++) { 
        //Get next character
        var currentChar = html.substr(j, 1); 
        //Add the character at the result
        result += currentChar; 

        // Lesser than event 
        if(currentChar == "<") 
            isText = false; 

        // Character handler 
        if(isText) { 
            // Memorize last space position 
            if(currentChar == " ") 
                lastSpacePosition = j; 
            
            //This character is counted like text
            i++; 
        } else { 
            console.log("Tag="+currentTag+" - Char add="+currentChar);

            //Add character to the current tag
            currentTag += currentChar; 
        } 
        // console.log("Char="+currentChar+" - isText="+isText+" - Tag="+currentTag);

        //End of the current tag 
        if(currentChar == ">") { 
            //Tag is finished, now is text
            isText = true; 

            console.log("< : "+currentTag.indexOf("<")+" - /> : "+currentTag.indexOf("/>")+" - </ : "+currentTag.indexOf("</"));

            //Opening tag handler if "<" match but not "/>" or "</"
            if( (currentTag.indexOf("<") > -1) && 
                (currentTag.indexOf("/>") == -1) && 
                (currentTag.indexOf("</") == -1) ) { 

                //Tag has attribute(s) 
                if(currentTag.indexOf(" ") > -1) { 
                    console.log("Tag1 : "+currentTag);
                    console.log("Tag1 substring= "+currentTag.substr(1, currentTag.indexOf(" ") - 1));

                    //Get tag name
                    currentTag = currentTag.substr(1, currentTag.indexOf(" ") - 1); 
                } else { 
                    console.log("Tag2 : "+currentTag);
                    console.log("Tag2 substring= "+currentTag.substr(1, currentTag.length-2));

                    // Tag doesn't have attribute(s) 
                    currentTag = currentTag.substr(1, currentTag.length-2);  //Get tag name
                } 

                console.log("Push tag : "+currentTag);
                //Add the tag to the list
                tagsArray.push(currentTag); 

            } else if(currentTag.indexOf("</") > -1) {          //Match "</"
                console.log("Pop tag : "+ tagsArray.pop());     //Tag is passed, we can release this tag
            } 

            //Reset current tag
            currentTag = ""; 
        } 

        //Get enough character
        if(i >= length) { 
            break; 
        } 
    } 

    //Cut HTML string at last space position 
    if(length < noTagLength) { 
        if(lastSpacePosition != -1) { 
            result = html.substr(0, lastSpacePosition); 
        } else { 
            result = html.substr(j); 
        } 
    } 

    console.log("Nb tags unclosed="+tagsArray.length);
    //Close broken HTML elements 
    while(tagsArray.length > 0) {  
        //Add end tag to close it
        result += "</"+ tagsArray.pop() +">\n"; 
    } 

    return result;  
} 



/*Link help :
http://help.dottoro.com/ljkuedch.php
http://www.javascriptkit.com/domref/elementproperties.shtml
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope
https://developer.mozilla.org/en-US/docs/Web/API/document.getElementsByTagName?redirectlocale=en-US&redirectslug=DOM%2Fdocument.getElementsByTagName
http://www.javascriptkit.com/domref/nodetype.shtml
*/
