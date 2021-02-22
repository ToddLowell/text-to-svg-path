import axios from 'axios';
import * as opentype from 'opentype.js';

const defaultFont = 'http://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmYUtvAx05IsDqlA.ttf';

class App {
  constructor(private apiKey: string = '') {}

  getPath(text: string): void {
    if (!text || typeof text !== 'string') throw new Error('Provide a string');

    return (opentype as any).load(defaultFont).then((font: opentype.Font) => {
      const path = font.getPath(text, 0, 0, 20).toPathData(2);
      return path;
    });
  }

  // getXY(text: string): Promise<Array<string>> {
  //   if (!text || typeof text !== 'string') throw new Error('Provide a string');

  //   return opentype
  //     .load(defaultFont)
  //     .then((font: Font) => {
  //       const textPath = font.getPath(text, 0, 0, 20).toPathData(2);

  //       const textPathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  //       textPathEl.setAttribute('d', textPath);
  //       const textPathLength = Math.floor(textPathEl.getTotalLength());

  //       console.log(123, textPath);

  //       const coords = [];
  //       for (let i = 0; i < textPathLength; i++) {
  //         coords.push({
  //           x: textPathEl.getPointAtLength(i).x * 5,
  //           y: textPathEl.getPointAtLength(i).y * 5,
  //         });
  //       }

  //       console.log(456, coords);

  //       return coords;
  //     })
  //     .catch((err: Error) => {
  //       console.error('Could not load font: ', err);
  //     });
  // }

  getFontList(sort: undefined | 'alpha' | 'date' | 'popularity' | 'style' | 'trending'): Promise<Array<string>> {
    if (this.apiKey) {
      const fontListArr: string[] = [];
      const sortBy = sort ? `&sort=${sort}` : '';
      const url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${this.apiKey}${sortBy}`;

      return axios.get(url).then((res) => {
        const items = res.data.items;

        for (const item of items) {
          fontListArr.push(item.family);
        }

        return fontListArr;
      });
      // .catch((err) =>  err });
    } else {
      throw new Error('API Key not provided.');
    }
  }
}

export default App;
module.exports = App;
