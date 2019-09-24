import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

@withRouter
class InitRouter extends Component {
  constructor(props) {
    super(props)
    props.history.replace('/home')
  }
  render() {
    return <div></div>
  }
}

export default InitRouter
