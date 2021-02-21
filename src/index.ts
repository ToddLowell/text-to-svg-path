import { Font } from 'opentype.js';
const opentype = require('opentype.js');

const defaultFont = __dirname + '/fonts/Roboto-Black.ttf';

function getPath(fontPath: string = defaultFont, text: string) {
  if (!text || typeof text !== 'string') throw new Error('Provide a string');

  // load a font asynchronously
  return opentype
    .load(fontPath)
    .then((font: Font) => {
      const path = font.getPath(text, 0, 0, 20).toPathData(2);

      return path;
    })
    .catch((err: Error) => {
      console.error('Could not load font: ', err);
    });
}

const mainExport = {
  getPath: getPath,
};

export default mainExport;
module.exports = mainExport;
module.exports.getPath = getPath;
