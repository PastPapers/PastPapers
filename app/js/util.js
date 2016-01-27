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
console.log("here");

(function(util, $, undefined){
	  util.lastFocus = document.hasFocus();

		util.documentFocus = function(Event){
			if(util.lastFocus == document.hasFocus()){return;}

			util.lastFocus = !util.lastFocus;
			Event();
		}

		util.xor = function(a,b){
		  return (a ? 1 : 0)^(b ? 1 : 0);
		}

		util.xorRemoveClass = function(SelectorA, RemovableClassA, SelectorB, ClassB)
		{
		  if(util.xor($(SelectorA).hasClass(RemovableClassA),
		          $(SelectorB).hasClass(ClassB)))
		  {
		    $(SelectorA).removeClass(RemovableClassA);
		  }
		}

		util.aabbcollision = function(rects){
      for(var i=0; i < rects.length/2; i++){
  			if(!(rects[i].offset.left < rects[i+1].offset.left + rects[i+1].width &&
  			   rects[i+1].offset.left < rects[i].offset.left + rects[i].width &&
  			   rects[i].offset.top < rects[i+1].offset.top + rects[i+1].height &&
  			   rects[i+1].offset.top < rects[i].offset.top + rects[i].height))
				{
					return false;
				}
      }
			return true;
		}

		util.elementToRect = function(element){
			return {offset: $(element).offset(), width:$(element).width(), height:$(element).height()};
		}

		util.intersectPointArea = function(element1, pos2, size2){
			var rects = [util.elementToRect(element1)];
			rects[0].width+=size2.width;
			rects[0].height+=size2.height;
			rects.push({offset:{top:pos2.top, left:pos2.left}, width:1, height:1});
			return util.aabbcollision(rects);
		}

		util.intersects = function(elements){
			var rects = [];
			for(var i=0; i < elements.length ; i++){
				rects.push(util.elementToRect(elements[i]));
			}
			return util.aabbcollision(rects);
		}

		util.blacklistArray = function(string, blacklist){
			for(var i=0; i < blacklist.length; i++){
				if(string === blacklist[i]){
					return false;
				}
			}
			return true;
		}

		util.whitelistArray = function(string, whitelist){
			return !util.blacklistArray(string, whitelist);
		}

}(window.util = window.util || {}, jQuery));
