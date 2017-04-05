var html = require("html-webpack-plugin")

module.exports = {
  entry: './src/index.js',
  plugins: [
    new html({
      template: 'html-loader!./index.html',
      hash: true,
      inject: true
    })
  ]
}
