Examinator is a app that fires random past paper questions at you, which can be controlled by simple filters.
I am working on GCSE level first, then a level, help will be needed to add other states which i do not know about.

The Examinator has a C++ backend which does the processing of questions via regex and will have a electron frontend gui as i have had difficulties building electron in windows.

as most past papers are submitted as .pdf files we will be using PoDoFo to read them nativley, theese past papers will be got by a http request and updated yearly(?) the urls for theese files will be put in a fiel somewhere so they can be easly edited.

questions that do not have writtern answer a currently a problem as detection of them are non-uniformal

this is under heavy development and will not be stable for a long time.
