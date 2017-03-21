import React, { Component } from 'react'
import Loader from './Loader'

export default function Loadable(WrappedComponent, fetchFunc) {
  return class extends Component {
    constructor(props) {
      super(props)
    }

    componentDidMount() {
      fetchFunc()
    }

    render() {
      if (this.props.isFetching) {
        return <Loader />
      }
      return <WrappedComponent {...this.props} />
    }
  }
}

