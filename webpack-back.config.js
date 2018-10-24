const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = {
  target: "node",
  entry: [path.join(__dirname, 'app', 'back.js')],
  output: {
    path: path.resolve(__dirname, 'dist', 'back'),
    filename: "bundle-back.js"
  },
  externals: [nodeExternals()],
};