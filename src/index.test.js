const textToPath = require('.').getPath;

const fontPath = __dirname + '/fonts/Roboto-Black.ttf';

test('should work', () => {
  expect(true).toBe(true);
});

test('path string', () => {
  // eslint-disable-next-line
  textToPath(fontPath, 'test').then((pathString) => {
    expect(typeof pathString).toBe('string');
    expect(pathString).toMatch(/^(?=M).*(?=Z$)/i);
  });
});

test('did not provide string', () => {
  expect(() => textToPath(fontPath)).toThrow();
  expect(() => textToPath(fontPath, 123)).toThrow();
});
