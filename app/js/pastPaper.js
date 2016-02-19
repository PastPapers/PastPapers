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
                fs.writeFile("pdf/"+paper.subject.id+'_'+key+".pdf", pdf, function(err){
                  throw err;
                });
              });
          })
      });
    }

    //@param paper object.
    // uses local copy if download if not uses external via get.
    pastPaper.getQuestions = function(paper){
      var file = "pdf/"+paper.subject.id+"_paper.pdf";
      fs.stat(file, function(err, stat){
        if(err !== null){
          file = paper.downloads.paper;
        }
      });
      var content = pdfHandler.getPdfContent(file);
	  var rgxstr = "";
	  $.get("http://ppapi.lexteam.xyz/regex", function(data){
		  util.iterateObject(data.data, function(key, value ){
			 if(value.AppliesTo.board == paper.board &&
					 paper.fallback == value.AppliesTo.fallback ){
				
					rgxstr=value.regex;
				}
			}
		}
		if(rgxstr !== ""){
			 return search.regexArray(rgxstr, content);
		}
		else{
			return false;
		}
	}

})(window.pastPaper = window.pastPaper || {}, jQuery, pdf);
