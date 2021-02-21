const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: './src',
  output: {
    path: path.join(__dirname, 'dist'),
    library: {
      type: 'umd',
      name: 'textToPath',
    },
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', include: path.resolve(__dirname, 'src') },
      // { test: /\.json$/, loaders: ['json'], include: context },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin({ extractComments: false })],
  },
};
