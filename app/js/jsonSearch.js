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

(function(jsonSearch, $, undefined){

	jsonSearch.searchRequest =  function(searchString, request){
			var searchRgx = new RegExp(searchString, "gi");
			return searchRgx.test(request);
	};

	// @param jsonVar can be null, can be string, can be array of vars(string).
	// @param jsonVar use if want to accsess variables in JSON(toplevel) array.
	// @return false if no match
	jsonSearch.arraySearchRequest = function(searchString, request, jsonVar){
		var matches = Array();
		for(var i =0; i < request.length; i++){
			if(typeof(jsonVar) !== 'undefined'){
				if(jsonVar.constructor !== Array){
					if(jsonSearch.searchRequest(searchString, request[i][jsonVar])){
							matches.push(request[i]);
					}
				}
			else{
					for(var v=0; v < jsonVar.length; v++){
						if(jsonSearch.searchRequest(searchString, request[i][jsonVar[v]])){
							if(matches.indexOf(request[i]) === -1){
								matches.push(request[i]);
							}
						}
					}
				}
			}
			else{
				if(jsonSearch.searchRequest(searchString, request[i])){
							matches.push(request[i]);
				}
			}
		}
		if(matches.length > 0){
			return matches;
		}
		else{
			return false;
		}
	};

	// @param jsonVar can be null, can be string, can be array of vars(string).
	// @param jsonVar use if want to accsess variables in JSON(toplevel) array.
	// @return false if no match
	jsonSearch.arraySearchJqueryRequest = function(searchInputId, request, jsonVar){
		return jsonSearch.searchRequest($(searchInputId).val(), request, jsonVar);
	};
	

}(window.jsonSearch = window.jsonSearch || {}, jQuery));
