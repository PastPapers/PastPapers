"use strict"

const fs = require("fs");
require("node-ensure");
const pdf = require('pdfjs-dist');
window.$ = window.jQuery = require("jquery");

(function(pdfHandler, $, PDFJS, undefined){
  pdfHandler.testPDF=function(file){
    pdf.getDocument(file).then(function(doc){
      for(var i=0; i < doc.numPages; i++){
        doc.getPage(i).then(function(page){
            console.log(page);
            page.getTextContent().then(function(text){
              console.log(text);
           });
        });
      }
    });
  }

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
    },function(err){
      console.log("error");
      console.log(err);
      return false;
    });
    return Content;
  }

  pdfHandler.save = function(txt, filename){
    fs.writeFile("pdf/"+filename, txt, function(err){
      if(err){console.log(err);}
      console.log("done");
    });
  }
}(window.pdfHandler = window.pdfHandler || {}, jQuery, pdf));
