import React, { Component } from 'react'

export default class BookPage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    //get Initial Data
    this.props.fetchBookInfoIfNeeded((this.props.params.bookid))
  }

  render() {
    return (
      <div className="book-page-container">
        {this.props.bookInfo.title}
      </div>
    )
  }
}

