require('dotenv').config();
const TextToPath = require('./index');

const TOKEN = process.env.GoogleFontsDeveloperAPI;
const functions = new TextToPath();

test('path string', () => {
  expect.assertions(2);
  // console.log(functions.getPath('test'));

  return functions.getPath('test').then((pathString: string) => {
    expect(typeof pathString).toBe('string');
    expect(pathString).toMatch(/^(?=M).*(?=Z$)/i);
  });
});

// eslint-disable-next-line
// test('xy-coords array', () => {
//   expect.assertions(1);

//   return functions.getXY('test').then((res: object[]) => {
//     expect(typeof res).toBe('array');
//   });
// });

test('did not provide string', () => {
  expect(() => functions.getPath()).toThrow();
  expect(() => functions.getPath(123)).toThrow();
});

test('did not provide api key', () => {
  const textToPath = new TextToPath();
  expect(() => textToPath.getFontList()).toThrow();
});

test('get font list', () => {
  expect.assertions(1);

  const textToPath = new TextToPath(TOKEN);
  return textToPath.getFontList().then((res: string[]) => {
    expect(res).toContain('Roboto');
  });
});

test('wrong api key', () => {
  expect.assertions(1);

  const textToPath2 = new TextToPath('abcde');
  return textToPath2.getFontList().catch((err: Error) => {
    expect(err).toBeTruthy();
  });

  // return expect(textToPath2.getFontList()).rejects.toBeTruthy();
});
