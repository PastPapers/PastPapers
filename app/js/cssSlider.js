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

(function (cssSlider, $, undefined){
  cssSlider.checkShowSlideButton = function(){
    if($(".onscreen").hasClass("showslide-button")){
      $(".slide-button").addClass("showslidebutton");
    }
    else if($(".slide-button").hasClass("showslidebutton")){
      $(".slide-button").removeClass("showslidebutton");
    }
  }

  cssSlider.checkSlideButtonAnim = function(){
    if($(".onscreen").hasClass("slidebutton-fadeout")){
      $(".slide-button").addClass("slidebuttonFadeout");
    }
    else if($(".onscreen").hasClass("slidebutton-fadein")){
        $(".slide-button").addClass("slidebuttonFadeout");
    }
    util.xorRemoveClass(".slide-button", "slidebuttonFadein", ".onscreen", "slidebutton-fadein");
    util.xorRemoveClass(".slide-button", "slidebuttonFadeout", ".onscreen", "slidebutton-fadeout");
  }

  cssSlider.slide =0;

  cssSlider.nextSlide = function(){
    var slides = $(".slide").size();

    $(".slide.onscreen").addClass("leftoffscreen");
    $(".slide.onscreen.leftoffscreen").removeClass("onscreen");

    ++cssSlider.slide;
    cssSlider.slide = cssSlider.slide%slides;

    $(".slide:nth-of-type("+(cssSlider.slide+1).toString()+")").addClass("onscreen");

  }

  cssSlider.prevSlide = function(){
    var slides = $(".slide").size();

    $(".slide.onscreen").removeClass("onscreen");

    --cssSlider.slide;
    cssSlider.slide=((cssSlider.slide%slides)+slides)%slides;

    $(".slide:nth-of-type("+(cssSlider.slide+1).toString()+")").addClass("onscreen");
    $(".slide.onscreen").removeClass("leftoffscreen");
  }

  cssSlider.handleEvent = function(){
      cssSlider.checkShowSlideButton();
      cssSlider.checkSlideButtonAnim();
      $(".slide-button.right").click(function(){
        if(!$(".slide.onscreen").hasClass("slide-end")){
          cssSlider.nextSlide();
          cssSlider.checkShowSlideButton();
          cssSlider.checkSlideButtonAnim();
        }
      });
      $(".slide-button.left").click(function(){
        if(!$(".slide.onscreen").hasClass("start-slide")){
          cssSlider.prevSlide();
          cssSlider.checkShowSlideButton();
          cssSlider.checkSlideButtonAnim();
        }
      });
  }

}(window.cssSlider = window.cssSlider || {}, jQuery ));

setInterval(function(){util.documentFocus(cssSlider.checkSlideButtonAnim)}, 200);
