var debug = process.env.NODE_ENV !== "production"
var webpack = require('webpack')

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./client/js/index.js",
  output: {
    path: __dirname + "/public/js/",
    filename: "script.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
}