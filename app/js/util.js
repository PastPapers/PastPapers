"use strict"
window.$ = window.jQuery = require("jquery");

var replayTransitionOnFocus = Array();

function fixTileSquareHeight(){
  if($(".square-tile")[0]){
    var width = $(".square-tile").width().toString();
    $(".square-tile").css("height", width+"px");
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
    $(".slide-button.right").click(function(){
      nextSlide();
      checkShowSlideButton();
    });
    $(".slide-button.left").click(function(){
      prevSlide();
      checkShowSlideButton();
    });
  }
)

function CSSTransitionRedo(id, rule, varbefore, varafter){
  $(id).css(rule, varbefore);
  $(id).css(rule, varafter);
}

$(docuement).focus(
  function(){
    for(var i = 0; i < replayTransitionOnFocus.length; i++){
      CSSTransitionRedo(replayTransitionOnFocus[i].elemid, replayTransitionOnFocus[i].rule,
                            replayTransitionOnFocus[i].varbefore, replayTransitionOnFocus.varafter);
    }
  }
)

const remote = require("electron").remote;
var CurrentWin = remote.getCurrentWindow()
CurrentWin.on("resize", fixTileSquareHeight);
CurrentWin.on("maximize", fixTileSquareHeight);
CurrentWin.on("unmaximize", fixTileSquareHeight);
