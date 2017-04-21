const fs = require("fs")
const express = require("express")
const bodyParser = require("body-parser")
const webpack = require("webpack")
const webpackMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require("webpack-hot-middleware")

app = express()
router = express.Router()

const webpackConfig = require("./webpack.config.js")
const compiler = webpack(webpackConfig)

app.use(bodyParser.json())
app.use(webpackMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath
}))
app.use(webpackHotMiddleware(compiler, {
  log: console.log
}))

app.get('/comments', (req, res) => {
  fs.readFile('./data/comments.json', (err, data) => {
    res.send(data)
  })
})

app.post('/comments', (req, res) => {
  const newComment = req.body

  console.log(newComment)

  fs.readFile('./data/comments.json', (err, data) => {
    const comments = JSON.parse(data)

    /// Update
    comments.push(newComment)

    fs.writeFile('./data/comments.json', JSON.stringify(comments), (err) => {
      res.send(comments)
    })
  })
})

app.listen(8080)
