
#Past papers is a app that fires random past paper questions at you. 

these questions can be controlled by simple filters.
I am working on GCSE level first, then a level, help will be needed to add other states which I do not know about.

The program has a backend which does the processing of questions via regex and will have a electron frontend gui as I have had difficulties building electron in windows.

As most past papers are submitted as .pdf files we will be using pdf.js to read them, theese past papers will be got by a http request and updated yearly(?) the urls for theese files will be put in a file somewhere so they can be easly edited.

##REMINDER:
add button sometimes overlaps slider button,
check for intersect with link tags if so use arrow only mode.
