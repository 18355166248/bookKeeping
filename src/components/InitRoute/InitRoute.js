import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { init } from '@/redux/list'

@withRouter
@connect(
  null,
  { init }
)
class InitRouter extends Component {
  constructor(props) {
    super(props)
    props.init()
  }
  render() {
    return <div></div>
  }
}

export default InitRouter
