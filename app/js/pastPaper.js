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
require("node-ensure");
var pdf = require('pdfjs-dist');
window.$ = window.jQuery = require("jquery");

(function(pastPaper, $, pdf,  undefined){

    pastPaper.download = function(paper){
      $.each(paper.downloads, function(key, val){
          $.get(val, function(pdf){
              fs.stat("pdf", function(err, stat){
                if(err !== null || stat === "undefined"){
                  try{
                    fs.mkdir("pdf");
                  }catch(e){
                    if(e !== "EEXIST"){
                      console.log(e);
                    }
                  }
                }
              });
              fs.writeFile("pdf/"+val+".pdf", pdf, function(err){
                  throw err;
              });
          });
      });
    }

		pastPaper.getContent = function(paper){
			var promises = [];
      for(var i=0; i < Object.keys(paper.downloads); i++){
						promises.append(pdfHandler.getPdfContent(paper.downloads[i]).then(
							function(content){
								var obj = {};
								obj[key] = content;
								return obj;
							}
						));
			}

			return Promise.all(promises);
		}

	pastPaper.getRegex = function(paper){
		var regex = {};
		$.get("http://ppapi.lexteam.xyz/v1/regex", function(data){
			for(var i=0; i < data.data.length; i++){
				if(data.data[i].board === paper.board &&
					paper.data.fallback === data.data[i].fallback ){
						regex.string = data.data[i].regex;
				}
				else if(data.data[i].board === paper.board &&
					data.data[i].fallback){
						regex.fallback = data.data[i].regex;
				}
			}
		});

		return regex;
	}

  // @param paper object.
  // throws err on failure.
	// returns object with the papers questions and its corrsponding markscheme.
    pastPaper.getQuestionsAndMarkscheme = function(paper){
			var regex = pastPaper.getRegex(paper);

			return pastPaper.getContent(paper).then(
				function(content){
			    if(typeof(regex.string) !== "undefined"){
						return {
							  paper : search.regexArray(regex.string.paper, content.paper),
							  markscheme : search.regexArray(regex.string.mark_scheme, content.mark_scheme)
					  }
			    }
			    else if(typeof(regex.fallback) !== "undefined"){
					  	return {
							  paper : search.regexArray(regex.fallback.paper, content.paper),
							  markscheme : search.regexArray(regex.fallback.mark_scheme, content.mark_scheme)
					    }
			    }
			    else{
			          throw "no acceptable regex to use for "+paper.board;
			    }
	    	}
			);
		}

    pastPaper.test = function(){
      return cssSearch.submitCheckTableData().then(function(paper){
        return pastPaper.getRegex(paper[0]);
      });
    }

})(window.pastPaper = window.pastPaper || {}, jQuery, pdf);
