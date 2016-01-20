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
		if(Request.search($(SearchInputId).val()) !== -1){
				return true;
		}
		else{
			return false;
		}
}

// @param JsonVar can be null, can be string, can be array of vars(string).
// @param JsonVar use if want to accsess variables in JSON(toplevel) array.
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
				console.log("array");
				if(searchRequest(SearchInputId, Request[i][JsonVar[v]])){
					matches.push(Request[i]);
				}
			}
		}
		else{
			if(searchRequest(SearchInputId, Request[i])){
					if(!matches.indexOf(Request[i])){
						matches.push(Request[i]);
					}
				}
		}
  }
	return matches;
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

setInterval(function(){documentFocus(checkSlideButtonAnim)}, 200);

const remote = require("electron").remote;
var CurrentWin = remote.getCurrentWindow()
CurrentWin.on("resize", fixTileSquareHeight);
CurrentWin.on("maximize", fixTileSquareHeight);
CurrentWin.on("unmaximize", fixTileSquareHeight);
