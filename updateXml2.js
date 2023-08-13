const fs = require('fs');
const xml2js = require('xml2js');

const filePath = 'path/to/your/textfile.xml';

fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    xml2js.parseString(data, (parseErr, result) => {
        if (parseErr) {
            console.error('Error parsing XML:', parseErr);
            return;
        }

        const videoClips = result.Project.Extents[0].VideoClip;
        const mediaItems = result.Project.MediaItems[0].MediaItem;

        videoClips.forEach(videoClip => {
            const outTime = parseFloat(videoClip.$.outTime);
            const inTime = parseFloat(videoClip.$.inTime);

            if (outTime <= inTime) {
                const mediaItemID = videoClip.$.mediaItemID;
                const correspondingMediaItem = mediaItems.find(
                    mediaItem => mediaItem.$.id === mediaItemID
                );

                if (correspondingMediaItem) {
                    const duration = parseFloat(correspondingMediaItem.$.duration);
                    videoClip.$.outTime = duration.toString();
                }
            }
        });

        const builder = new xml2js.Builder();
        const updatedXml = builder.buildObject(result);

        fs.writeFile(filePath, updatedXml, 'utf-8', writeErr => {
            if (writeErr) {
                console.error('Error writing the updated file:', writeErr);
                return;
            }
            console.log('OutTimes updated successfully.');
        });
    });
});
