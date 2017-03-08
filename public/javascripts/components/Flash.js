import React, { Component, PropTypes } from 'react';

export default class Flash extends Component {
  constructor(props) {
    super(props)

    this.state = {show: true}
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    this.setState({show: false})
  }

  render() {
    const { show } = this.state
    return (
      <div className="flash">
        {show ? (
          <div>
            <a onClick={this.handleClose} className="close">x</a>
            <p>Thank you for checking out books. Your books will be sent to your house shortly</p>
          </div>
        ) : ""}
      </div>
    )
  }
}
