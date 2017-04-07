import React, {Component} from 'react'

export default class HelloMessage extends Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired
  }

  render() {
    const {name} = this.props
    return (
      <div>
        Hello!! {name}
      </div>
    )
  }
}
