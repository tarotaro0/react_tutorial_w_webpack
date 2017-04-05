import React from 'react'
import ReactDOM from 'react-dom'
import HelloMessage, {GoodbyeMessage} from './new.js'

ReactDOM.render(
  (<HelloMessage name='Jane'/>),
  document.getElementById('container')
)
