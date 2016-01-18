"use strict"
window.$ = window.jQuery = require("jquery");

var replayTransitionOnFocus = Array();

function xor(a,b){
  return (a ? 1 : 0)^(b ? 1 : 0);
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
  console.log(slide);

  $(".slide:nth-of-type("+(slide+1).toString()+")").addClass("onscreen");
  $(".slide.onscreen").removeClass("leftoffscreen");

}

$(document).ready(
  function(){
    fixTileSquareHeight();
    checkShowSlideButton();
    checkSlideButtonAnim();
    $(".slide-button.right").click(function(){
      nextSlide();
      checkShowSlideButton();
      checkSlideButtonAnim();
    });
    $(".slide-button.left").click(function(){
      prevSlide();
      checkShowSlideButton();
      checkSlideButtonAnim();
    });
  }
)

const remote = require("electron").remote;
var CurrentWin = remote.getCurrentWindow()
CurrentWin.on("resize", fixTileSquareHeight);
CurrentWin.on("maximize", fixTileSquareHeight);
CurrentWin.on("unmaximize", fixTileSquareHeight);
