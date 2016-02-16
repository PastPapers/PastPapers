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


})(window.pastPaper = window.pastPaper || {}, jQuery, pdf);
