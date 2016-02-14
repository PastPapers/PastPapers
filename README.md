#Past papers#
####An application that fires random questions from past exam papers at you.####

These questions can be controlled by simple filters.
I am working on GCSE level first, then A level. Help will be needed in adding other levels of education.

The program has a backend which does the processing of questions, using regex, and will have an [electron](http://electron.atom.io/) frontend gui, via electron.

As most past papers are submitted as .pdf files we will be using [pdf.js](https://mozilla.github.io/pdf.js/) to read them. Papers are accessed via a http request and updated yearly(?). The urls for these files will be stored in a file somewhere for easy addition of new papers.

Currently there are some issues, as the past papers are encypted for AQA, we will have to ask them for acsess, before this point we will use
sample pdfs which have been created by myself.

 
