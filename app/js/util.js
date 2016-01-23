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

window.lastFocus = document.hasFocus();
function documentFocus(Event){
	if(lastFocus == document.hasFocus()){return;}

	lastFocus = !lastFocus;
	Event();
}

function xor(a,b){
  return (a ? 1 : 0)^(b ? 1 : 0);
}

function searchRequest(SearchInputId, Request){
		var searchRgx = new RegExp($(SearchInputId).val(), "gi");
		return searchRgx.test(Request);
}

// @param JsonVar can be null, can be string, can be array of vars(string).
// @param JsonVar use if want to accsess variables in JSON(toplevel) array.
// @return false if no match
function arraySearchRequest(SearchInputId, Request, JsonVar){
	var matches = Array();
  for(var i =0; i < Request.length; i++){
		if(typeof(JsonVar) !== 'undefined'){
			if(JsonVar.constructor !== Array){
				if(searchRequest(SearchInputId, Request[i][JsonVar])){
						matches.push(Request[i]);
				}
			}
		else{
				for(var v=0; v < JsonVar.length; v++){
					if(searchRequest(SearchInputId, Request[i][JsonVar[v]])){
						if(matches.indexOf(Request[i]) === -1){
							matches.push(Request[i]);
						}
					}
				}
			}
		}
		else{
			if(searchRequest(SearchInputId, Request[i])){
						matches.push(Request[i]);
			}
		}
  }
	if(matches.length > 0){
		return matches;
	}
	else{
		return false;
	}
}


function fixTileSquareHeight(){
  if($(".square-tile")[0]){
    var width = $(".square-tile").width().toString();
    $(".square-tile").css("height", width+"px");
  }
}

function xorRemoveClass(SelectorA, RemovableClassA, SelectorB, ClassB){
  if(xor($(SelectorA).hasClass(RemovableClassA),
          $(SelectorB).hasClass(ClassB)))
  {
    $(SelectorA).removeClass(RemovableClassA);
  }
}

function checkShowSlideButton(){
  if($(".onscreen").hasClass("showslide-button")){
    $(".slide-button").addClass("showslidebutton");
  }
  else if($(".slide-button").hasClass("showslidebutton")){
    $(".slide-button").removeClass("showslidebutton");
  }
}

function checkSlideButtonAnim(){
  if($(".onscreen").hasClass("slidebutton-fadeout")){
    $(".slide-button").addClass("slidebuttonFadeout");
  }
  else if($(".onscreen").hasClass("slidebutton-fadein")){
      $(".slide-button").addClass("slidebuttonFadeout");
  }
  xorRemoveClass(".slide-button", "slidebuttonFadein", ".onscreen", "slidebutton-fadein");
  xorRemoveClass(".slide-button", "slidebuttonFadeout", ".onscreen", "slidebutton-fadeout");
}

var slide =0;

function nextSlide(){
  var slides = $(".slide").size();

  $(".slide.onscreen").addClass("leftoffscreen");
  $(".slide.onscreen.leftoffscreen").removeClass("onscreen");

  ++slide;
  slide = slide%slides;

  $(".slide:nth-of-type("+(slide+1).toString()+")").addClass("onscreen");

}

function prevSlide(){
  var slides = $(".slide").size();

  $(".slide.onscreen").removeClass("onscreen");

  --slide;
  slide=((slide%slides)+slides)%slides;

  $(".slide:nth-of-type("+(slide+1).toString()+")").addClass("onscreen");
  $(".slide.onscreen").removeClass("leftoffscreen");
}


$(document).ready(
  function(){
		$.get("http://ppapi.lexteam.xyz/v1/papers", function(data){
			window.masterjson = data;
		});
    fixTileSquareHeight();
    checkShowSlideButton();
    checkSlideButtonAnim();
    $(".slide-button.right").click(function(){
      if(!$(".slide.onscreen").hasClass("slide-end")){
        nextSlide();
        checkShowSlideButton();
        checkSlideButtonAnim();
      }
    });
    $(".slide-button.left").click(function(){
      if(!$(".slide.onscreen").hasClass("start-slide")){
        prevSlide();
        checkShowSlideButton();
        checkSlideButtonAnim();
	  }
    });
  }
)

setInterval(function(){
	$(".searchResponse").empty();
	var searchval = arraySearchRequest(".search", window.masterjson["data"], "subjectName");
	if(searchval){
		for(var i = 0; i < searchval.length; i++){
			$.each(searchval[i], function(key, val){
						if(key !== "__LINK" && key !== "id" && key !== "subjectSafeName"){
							$(".searchResponse").append("<th>"+val+"</th>");
						}
					}
				)
			}
		}
}, 300);

setInterval(function(){documentFocus(checkSlideButtonAnim)}, 200);

const remote = require("electron").remote;
var CurrentWin = remote.getCurrentWindow()
CurrentWin.on("resize", fixTileSquareHeight);
CurrentWin.on("maximize", fixTileSquareHeight);
CurrentWin.on("unmaximize", fixTileSquareHeight);
