/*
 The MIT License (MIT)

 Copyright (c) 2015-2016, Lexteam <http://www.lexteam.xyz/>

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

(function(search, $, undefined){

	search.request =  function(query, searchData){
			var searchRgx = new RegExp(query, "gi");
			return searchRgx.test(searchData);
	};

	search.array = function(query, searchData){
		var match = false;
		for(var i = 0; i < searchData.length; i++){
			if(searchData[i].constructor !== Array){
				match = search.request(query, searchData);
			}
			else{
				match = search.array(query, searchData[i]);
			}
			if(match){return match;}
		}
		return false;
	};

	search.arrayRequest = function(query, searchdata){
		for(var i = 0; i < searchData.length; i++){
			if(searchData[i].constructor !== Array){
				match = search.request(query, searchData);
			}
			else{
				match = search.array(query, searchData[i]);
			}
			if(match){return match;}
		}
	}

	search.objectValues = function(query, searchData){
		var array = util.objectValuesToArrayRecurse(searchData);
		return search.array(query, array);
	}

	search.objectKeys = function(query, searchData){
		var array = util.objectKeysToArrayRecurse(searchData);
		return search.array(query, array);
	}

	search.jquery = function(selector, searchData, query){
		return search.Request($(selector).val(), searchData, query);
	};

	search.regex = function(query, searchData){
		var searchRgx = new RegExp(query, "gi");
		return searchRgx.search(searchData);
	}

	search.regexArray = function(query, searhData){
		var captures = [];
		for(var i=0; i < searchData.length; i++){
			captures.concat(search.regex(query, searchData[i]));
		}
		return captures;
	}

}(window.search = window.search || {}, jQuery));
