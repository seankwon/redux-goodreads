var path = require('path')

module.exports = {
  entry: './public/javascripts/app.js',
  output: {
    path: path.join(__dirname, './public'),
    filename: 'bundle.js'
  },
  /*
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
    ],
    */
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
