import React, { Component } from 'react'
import TimePicker from 'containers/TimePicker/TimePicker'
import TotalPrice from 'components/TotalPrice/TotalPrice'
import HeaderPriceCss from './HeaderPrice.module.scss'

export default class HeaderPrice extends Component {
  constructor() {
    super()
    this.state = {
      year: 2019,
      month: 9,
      totalInCome: 0,
      totalOutCome: 0
    }
  }

  changeTime = ({ year, month }) => {
    this.setState({
      year,
      month
    })
  }
  render() {
    return (
      <div className={HeaderPriceCss['header_price']}>
        <TimePicker
          year={this.state.year}
          month={this.state.month}
          onChange={this.changeTime}
        />
        <TotalPrice
          totalInCome={this.state.totalInCome}
          totalOutCome={this.state.totalOutCome}
        ></TotalPrice>
      </div>
    )
  }
}
