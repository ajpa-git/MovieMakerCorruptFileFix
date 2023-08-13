# MovieMakerCorruptFileFix
Just two scripts to fix the way old Windows Movie Maker breaks its own files. This script OVERWRITES the file, so make sure you make a copy of the file before running the script on it.
1. Based on Javascript/Node, and you need to install the xml2js library using npm:
```
   npm install xml2js
```
3. Replace 'path/to/your/textfile.xml' with the actual path to your Movie Maker project file.
4. Run the scripts using Node.js: 
```
    node updateXml.js
    node updateXml2.js
```
5. If that was the issue, the file will now open in Windows Movie Maker.
## How does it work?
### updateXml.js
This script updates the outTime attributes of <VideoClip> elements with outTime="0" using the corresponding duration value from the corresponding <MediaItem> elements in your XML structure.
### updateXml2.js
This script ensures that for each <VideoClip> element, the outTime is greater than the inTime. If not, it will update the outTime with the duration value from the corresponding <MediaItem> element.

## Acknowledgments
Solution found thanks to the considerate_guy post in [the Microsoft forum:] https://answers.microsoft.com/en-us/windows/forum/all/help-with-corrupted-wlmp-file/40d46f3e-4379-4463-aa49-aae568927463 
"I opened up your project file in Notepad and noticed that Movie Maker has indeed corrupted your project. There are several VideoClip items that have an outTime equal to zero. In particular, if the inTime is positive and the outTime is zero, that is essentially a clip with a negative length and that causes Movie Maker fits the next time it opens the project.

You aren't the only one plagued by this problem but I've yet to see Microsoft acknowledge this issue. You are usually then forced to either start over or to try to manually fix the problem yourself.

If you want to try fixing the problem yourself, make a *copy* of the project file. Right-click on the project file and choose "Open with..." and pick Notepad. (However, don't make that the default file association or all future projects will try to launch Notepad rather than Movie Maker).

Now manually find each instance of outTime and check the value. If it is 0 or earlier than the inTime, change it to be equal to the length of the original clip. You can find the length of each media item listed at the top of the file.

It's a tedious process and I've done it for small corrupted projects. But I can't commit that level of time (since I'm just a volunteer here) to fixing every file that gets corrupted by Movie Maker.  But hopefully the steps are enough to help you fix it yourself (or decide to start over).

Again, I'm sorry that Movie Maker has this issue and that you are only being told to reinstall/repair/scan your system for something that is clearly a corrupted project file, not a corrupted program."
