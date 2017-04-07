import React from 'react'
import ReactDOM from 'react-dom'
import HelloMessage, {GoodbyeMessage} from './new.js'
import {CommentBox} from './react_tutorial.js'

ReactDOM.render(
  (<HelloMessage name={"100"}/>),
  document.getElementById('container')
)

ReactDOM.render(
  <CommentBox url="/comments" pollInterval={2000} />,
  document.getElementById('content')
)
