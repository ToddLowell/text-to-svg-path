"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const opentype = require('opentype.js');
const defaultFont = __dirname + '/fonts/Roboto-Black.ttf';
function getPath(fontPath = defaultFont, text) {
    if (!text || typeof text !== 'string')
        throw new Error('Provide a string');
    // load a font asynchronously
    return opentype
        .load(fontPath)
        .then((font) => {
        const path = font.getPath(text, 0, 0, 20).toPathData(2);
        return path;
    })
        .catch((err) => {
        console.error('Could not load font: ', err);
    });
}
const mainExport = {
    getPath: getPath,
};
exports.default = mainExport;
module.exports = mainExport;
module.exports.getPath = getPath;
//# sourceMappingURL=index.js.map