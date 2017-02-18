import React, { Component } from 'react'

export default class BookPageMainInfo extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="book-page-main-info col-8">
        <div className="title-description-container flex flex-wrap">
          <div className="col-3">
            <img src={this.props.bookInfo.imageUrl} />
          </div>
          <div className="col-9">
            <h3>{this.props.bookInfo.title}</h3>
            <h4>{this.props.bookInfo.author}</h4>
            <p dangerouslySetInnerHTML={{__html: this.props.bookInfo.description}}></p>
          </div>
        </div>
      </div>
    )
  }
}
