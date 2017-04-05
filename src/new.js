import React, {Component} from 'react'

export default class HelloMessage extends Component {
  constructor(props) {
    super(props)

    const {name} = props
    this.state = { name }
  }

  render() {
    const {name} = this.state
    return (
      <div>
        Hello!! {name}
      </div>
    )
  }
}
