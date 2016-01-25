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
