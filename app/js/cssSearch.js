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
var fs = require("fs");
window.$ = window.jQuery = require("jquery");
(function(cssSearch, $, undefined){

  cssSearch.searchOutputAsCheckTable = function(responseId, inputId, json, searchVar, blacklist){
  		$(responseId).empty();
  			for(var i = 0; i < json.length; i++){
          if(search.objectValues($(inputId).val(), json[i], searchVar)){
    				var html = "<tr class='checkitem'>";
    				if($("#checkitem"+json[i].id).length === 0){
                util.iterateObject(json[i], function(key, val){
                  if(util.blacklistArray(key, blacklist)){
                      html += "<th>"+val+"</th>";
                  }
                });
                html += "<th><i class='material-icons unchecked' __LINK='"+json[i].__LINK+"' id='checkitem" + json[i].id +
    								      "'>check_box_outline_blank</i></th>";
    						$(responseId).append(html);
    				}
    		}
    }
  }

  //@return Array of papers.
  cssSearch.submitCheckTableData = function(){
    var promises = [];
    for(var i=0; i < $(".checked").length; i++){
      promises.push(Promise.resolve($.get($($(".checked")[i]).attr("__LINK"))));
    }
    return Promise.all(promises).then(function(data){
      var papers = [];
      for(var i=0; i<data.length; i++){
        if(!data.error){
          papers[i] = data[i].data;
        }
      }
      return papers;
    });
  }

}(window.cssSearch = window.cssSearch || {}, jQuery));
