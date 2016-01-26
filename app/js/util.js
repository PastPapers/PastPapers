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

(function(util, $, undefined){
	  util.lastFocus = document.hasFocus();

		util.documentFocus = function(Event){
			if(util.lastFocus == document.hasFocus()){return;}

			util.lastFocus = !util.lastFocus;
			Event();
		};

		util.xor = function(a,b){
		  return (a ? 1 : 0)^(b ? 1 : 0);
		};

		util.xorRemoveClass = function(SelectorA, RemovableClassA, SelectorB, ClassB)
		{
		  if(util.xor($(SelectorA).hasClass(RemovableClassA),
		          $(SelectorB).hasClass(ClassB)))
		  {
		    $(SelectorA).removeClass(RemovableClassA);
		  }
		};

		util.pointIntersect = function(element1, x, y){
			if($("element1").length){
				var rect1 = $(element1).offset();
				if(x < rect1.left + $(element1).width() &&
					 y < rect1.top + $(element1).height()){
						 return true;
				}
			}
			return false;
		}

		util.intersects = function(element1, element2){
			var rect1 = $(element1).offset();
			var rect2 =  $(element2).offset();
			if( rect1.left < rect2.left + $(element2).width() &&
					rect2.left < rect1.left + $(element1).width() &&
					rect1.top < rect2.top + $(element2).height() &&
					rect2.top < rect1.top + $(element1).height()
				){
					return true;
				}
				return false;
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
