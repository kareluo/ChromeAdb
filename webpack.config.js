const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'chromeadb.js',
    path: path.resolve(__dirname, 'chrome-extensions/js')
  }
};
