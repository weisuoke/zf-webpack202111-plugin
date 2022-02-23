const path = require('path');
const DonePlugin = require('./plugins/done-plugin')
const AssetsPlugin = require('./plugins/assets-plugin')
const ArchivePlugin = require('./plugins/archive-plugin')

module.exports = {
  mode: 'development',
  entry: "./src/index.js",
  devtool: false,
  plugins: [
    new DonePlugin(),
    new AssetsPlugin(),
    new ArchivePlugin()
  ]
}