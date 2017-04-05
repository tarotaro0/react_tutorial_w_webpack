var html = require("html-webpack-plugin")

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: './src/index.js',
  plugins: [
    new html({
      template: 'html-loader!./index.html',
      hash: true,
      inject: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
