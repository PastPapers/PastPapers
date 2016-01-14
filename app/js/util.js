"use strict"
window.$ = window.jQuery = require("jquery")
function fixTileSquareHeight(){
  if($(".square-tile")[0]){
    var width = $(".square-tile").width().toString();
    $(".square-tile").css("height", width+"px");
  }
}

function nextSlide(){
  $(".onscreen").css("left", "200vw");
  $( ".slide").css("left", "0");
}

function prevSlide(){

}

$(document).ready(
  function(){
    fixTileSquareHeight();
  }
)

const remote = require("electron").remote;
var CurrentWin = remote.getCurrentWindow()
CurrentWin.on("resize", fixTileSquareHeight);
CurrentWin.on("maximize", fixTileSquareHeight);
CurrentWin.on("unmaximize", fixTileSquareHeight);
