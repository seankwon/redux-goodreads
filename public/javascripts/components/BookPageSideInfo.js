import React, { Component } from 'react'

export default class BookPageSideInfo extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="book-page-side-info col-3 ml3">
        <div className="shelves-container">
          {(this.props.bookInfo.popularShelves || []).map(shelf => 
            <div className="clearfix shelf-section">
              <span className="genre">{shelf.name}</span>
              <span className="count">Count: {shelf.count}</span>
            </div>
          )}
        </div>
      </div>
    )
  }
}
