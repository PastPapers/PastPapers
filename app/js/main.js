/*
The MIT License (MIT)

Copyright (c) 2016 Ethan Riley

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

"use strict"
window.$ = window.jQuery = require("jquery");

// Search Request.
$.get("http://ppapi.lexteam.xyz/v1/papers", function(data){
			window.masterjson = data;
});

function searchOutputAsTable(responseId, inputId, json, searchVar, blacklist){
	$(responseId).empty();
	var searchval = jsonSearch.arraySearchRequest(inputId, json, searchVar);
	if(searchval){
		for(var i = 0; i < searchval.length; i++){
			$(responseId).append("<tr>");
			$.each(searchval[i], function(key, val){
						if(util.blacklistArray(key, blacklist)){
							$(responseId).append("<th>"+val+"</th>");
						}
					}
				)
			$(responseId).append("<i class='material-icons add' id='"+searchval[i].id.toString()+"'>add_circle</i>");
			$(responseId).append("</tr>");
			}
		}
}

setInterval(function(){
   searchOutputAsTable(".searchResponse", ".search",
                                    window.masterjson["data"], "subjectName",
                                    ["id", "subjectSafeName", "__LINK"]);
}, 7000);

$(".add").click(function(){
	console.log($(".add").attr("id"));
})
// tiles.
function fixTileSquareHeight(){
  if($(".square-tile")[0]){
    var width = $(".square-tile").width().toString();
    $(".square-tile").css("height", width+"px");
  }
}

$(document).ready(function(){
	fixTileSquareHeight();
})

const remote = require("electron").remote;
var CurrentWin = remote.getCurrentWindow()
CurrentWin.on("resize", fixTileSquareHeight);
CurrentWin.on("maximize", fixTileSquareHeight);
CurrentWin.on("unmaximize", fixTileSquareHeight);
