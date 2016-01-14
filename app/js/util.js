"use strict"
window.$ = window.jQuery = require("jquery")

function fixTileSquareHeight(){
  if($(".square-tile")[0]){
    var width = $(".square-tile").width().toString();
    $(".square-tile").css("height", width+"px");
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
    $(".slide-button.right").click(nextSlide);
    $(".slide-button.left").click(prevSlide);
  }
)

const remote = require("electron").remote;
var CurrentWin = remote.getCurrentWindow()
CurrentWin.on("resize", fixTileSquareHeight);
CurrentWin.on("maximize", fixTileSquareHeight);
CurrentWin.on("unmaximize", fixTileSquareHeight);
