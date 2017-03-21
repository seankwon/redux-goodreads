var webpack = require('webpack')

module.exports = {
  entry: './public/javascripts/app.js',
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  node: {
    fs: 'empty'
  }
}
