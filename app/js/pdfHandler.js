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

(function(pdfHandler, $, PDFJS, undefined){

// still trying to work out how to extract images.
  pdfHandler.testPdf = function(file){
    pdf.getDocument(file).then(function(doc){
      console.log(doc)
		    doc.getPage(1).then(function(page){
			       console.log(page);
		    });
    });
  }

  // warning: does not get images.
  //@throwable: if fails getting document will throw error.
  pdfHandler.getPdfContent = function(file){
    return pdf.getDocument(file).then(function(doc){
        var promises = [];
        for(var i =1; i < doc.numPages; i++){ promises.push(doc.getPage(i)
    			.then(function(page){
    				return page.getTextContent().then(function(text){
    					var content = "";
    					for(var v=0; v < text.items.length; v++){
    						if(typeof(text.items[v].str) !== "undefined"){
    							if(typeof(content) !== "undefined"){
    							  content += " " + text.items[v].str;
    							}
    							else{
    							  content = text.items[v].str;
    							}
    						}
    					}
    					return content;
    				});
    			}
    		));
      }
  	  return Promise.all(promises);
    },
    function(err){
      throw err;
	  });
  }

}(window.pdfHandler = window.pdfHandler || {}, jQuery, pdf));
