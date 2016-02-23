"use strict"

var fs = require("fs");
require("node-ensure");
var pdf = require('pdfjs-dist');
window.$ = window.jQuery = require("jquery");

(function(pdfHandler, $, PDFJS, undefined){

// still trying to work out how to extract images.
  pdfHandler.testPdf=function(file){
    pdf.getDocument(file).then(function(doc){
      doc.getMetaData().then(function(meta){
        return meta.metadata.metaDocument.images;
      })
    });
  }

  // warning: does not get images.
  //@throwable: if fails getting document will throw error.
  pdfHandler.getPdfContent = function(file){
    var Content = [];
    pdf.getDocument(file).then(function(doc){
      for(let i = 0 ; i <= doc.numPages; i++){
        doc.getPage(i).then(function(page){
          page.getTextContent().then(function(text){
                for(var v=0; v < text.items.length; v++){
                  if(typeof(text.items[v].str) !== "undefined"){
                    if(typeof(Content[i]) !== "undefined"){
                      Content[i] += " " + text.items[v].str;
                    }
                    else{
                      Content[i] = text.items[v].str;
                    }
                  }
                }
            });
        });
      }
    },function(err){throw err;});
    return Content;
  }

}(window.pdfHandler = window.pdfHandler || {}, jQuery, pdf));
