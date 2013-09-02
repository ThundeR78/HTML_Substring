//Parse evert character and look for tags
        
function html_substring (html, length) {     
    // only execute if text is longer than desired length 
    if(html.length > 0 && length > 0 ) { 
        var isText = true; 
        var ret = ""; 
        var i = 0; 
        var lastSpacePosition = -1; 

        var tagsArray = []; 
        var currentTag = ""; 

        //Remove every HTML tags
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

        // Parser loop 
        for(var j=0; j < html.length; j++) { 
            var currentChar = html.substr(j, 1); 
            ret += currentChar; 

            // Lesser than event 
            if(currentChar == "<") 
                isText = false; 

            // Character handler 
            if(isText) { 
                // Memorize last space position 
                if(currentChar == " ") 
                    lastSpacePosition = j; 
                else 
                    lastChar = currentChar; 
                i++; 
            } else { 
                console.log("Tag="+currentTag+" - Char add="+currentChar);
                currentTag += currentChar; 
            } 
            // console.log("Char="+currentChar+" - isText="+isText+" - Tag="+currentTag);

            // Greater than event 
            if(currentChar == ">") { 
                isText = true; 

                // Opening tag handler 
                console.log("< : "+currentTag.indexOf("<")+" - /> : "+currentTag.indexOf("/>")+" - </ : "+currentTag.indexOf("</"));
                if( (currentTag.indexOf("<") > -1) && 
                    (currentTag.indexOf("/>") == -1) && 
                    (currentTag.indexOf("</") == -1) ) { 

                    // Tag has attribute(s) 
                    if(currentTag.indexOf(" ") > -1) { 
                        console.log("Tag1 : "+currentTag);
                        console.log("Tag1 substring= "+currentTag.substr(1, currentTag.indexOf(" ") - 1));

                        currentTag = currentTag.substr(1, currentTag.indexOf(" ") - 1); 
                    } else { 
                        console.log("Tag2 : "+currentTag);
                        console.log("Tag2 substring= "+currentTag.substr(1, currentTag.length-2));

                        // Tag doesn't have attribute(s) 
                        currentTag = currentTag.substr(1, currentTag.length-2);  //Tout sauf < et >
                    } 

                    console.log("Push tag : "+currentTag);
                    tagsArray.push(currentTag); 

                } else if(currentTag.indexOf("</") > -1) { 
                    console.log("Pop tag : "+ tagsArray.pop());
                } 

                currentTag = ""; 
            } 

            if(i >= length) { 
                break; 
            } 
        } 

        // Cut HTML string at last space position 
        if(length < noTagLength) { 
            if(lastSpacePosition != -1) { 
                ret = html.substr(0, lastSpacePosition); 
            } else { 
                ret = html.substr(j); 
            } 
        } 

        console.log("Nb tags unclosed="+tagsArray.length);
        // Close broken XHTML elements 
        while(tagsArray.length > 0) {  
            ret += "</"+ tagsArray.pop() +">\n"; 
        } 
    } else { 
        ret = ""; 
    } 

console.log("-------------------------------");
    return ret;  
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


/*Link help :
http://help.dottoro.com/ljkuedch.php
http://www.javascriptkit.com/domref/elementproperties.shtml
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope
https://developer.mozilla.org/en-US/docs/Web/API/document.getElementsByTagName?redirectlocale=en-US&redirectslug=DOM%2Fdocument.getElementsByTagName
http://www.javascriptkit.com/domref/nodetype.shtml
*/
