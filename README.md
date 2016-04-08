[PastPapers](http://pastpapers.lexteam.xyz/)
==========

PastPapers allows students to do quick revision on subjects of their choice, with older exams.
Users can search through a catalog of past exams of which they can download to their system, and test themselves on.

## How does it work?

The program works by communicating with a REST API, which has an index of all the available papers, and some details 
on how to read them. The program then goes onto download the paper from it's original location. With the rest of the 
data given to it by the API PastPapers is able to 'decipher' the pdf file.

## problems 

as extraction of images via pdf.js has became very difficult we are making a new version to do it.


## What does it use?

We use:

- [Electron](http://electron.atom.io/)
- Custom carousel

## License

PastPapers is licensed under the MIT license and can be viewed [here](LICENSE.txt).
