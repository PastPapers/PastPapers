"use strict"

var fs = require("fs");
require("node-ensure");
var pdf = require('pdfjs-dist');
window.$ = window.jQuery = require("jquery");

(function(pdfHandler, $, PDFJS, undefined){

// still trying to work out how to extract images.
  pdfHandler.testPdf=function(file){
    pdf.getDocument(file).then(function(doc){

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
