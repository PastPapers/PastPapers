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

(function(jsonSearch, $, undefined){

	jsonSearch.searchRequest =  function(SearchInputId, Request){
			var searchRgx = new RegExp($(SearchInputId).val(), "gi");
			return searchRgx.test(Request);
	};

	// @param JsonVar can be null, can be string, can be array of vars(string).
	// @param JsonVar use if want to accsess variables in JSON(toplevel) array.
	// @return false if no match
	jsonSearch.arraySearchRequest = function(SearchInputId, Request, JsonVar){
		var matches = Array();
		for(var i =0; i < Request.length; i++){
			if(typeof(JsonVar) !== 'undefined'){
				if(JsonVar.constructor !== Array){
					if(jsonSearch.searchRequest(SearchInputId, Request[i][JsonVar])){
							matches.push(Request[i]);
					}
				}
			else{
					for(var v=0; v < JsonVar.length; v++){
						if(jsonSearch.searchRequest(SearchInputId, Request[i][JsonVar[v]])){
							if(matches.indexOf(Request[i]) === -1){
								matches.push(Request[i]);
							}
						}
					}
				}
			}
			else{
				if(jsonSearch.searchRequest(SearchInputId, Request[i])){
							matches.push(Request[i]);
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

}(window.jsonSearch = window.jsonSearch || {}, jQuery));
