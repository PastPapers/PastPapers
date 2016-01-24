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

  // needs to be in table.
  // reponseId needs to be empty tag to not delete data.
  jsonSearch.searchOutputAsTable = function(responseId, inputId, json, searchVar, blacklist){
  	$(responseId).empty();
  	var searchval = jsonSearch.arraySearchRequest(inputId, json, searchVar);
  	if(searchval){
  		for(var i = 0; i < searchval.length; i++){
  			$(responseId).append("<tr>");
  			$.each(searchval[i], function(key, val){
  				    if(util.blacklistArray(key, blacklist)){
  							$(responseId).append("<th>"+val+"</th>");
  						}
  					}
  				)
  			$(responseId).append("</tr>");
  			}
  		}
  }

}(window.jsonSearch = window.jsonSearch || {}, jQuery));
