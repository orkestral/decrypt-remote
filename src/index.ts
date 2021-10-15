import { decryptMedia } from './decrypt';
const mime = require('mime-types');
const fs = require('fs');

export class Decrypta {
processMessage = async message => {
    if (message.mimetype) {
      const filename = `${message.t}.${mime.extension(message.mimetype)}`;
      const mediaData = await decryptMedia(message);
      const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
        'base64'
      )}`;
      fs.writeFile(filename, mediaData, function(err) {
        if (err) {
          return console.log(err);
        }
        console.log('The file was saved!');
      });
    }
  }


 decrypt(file){

    let typee = file.mimetype.split('/')[0]

    let type = 'DOCUMENT'

    switch (typee[0]) {
        case 'audio':
            type = 'AUDIO'
            break;
        case 'image':
            type = 'IMAGE'
            break;
        case 'video':
            type = 'VIDEO'
            break;
   
    }

    let message = {
    clientUrl: file.url,
    mediaKey: file.mediaKey.toString('base64'),
    filehash: file.fileSha256,
    mimetype: file.mimetype,
    type: type,
    size: file.fileLength.low
    }

    return this.processMessage(message)
}
}