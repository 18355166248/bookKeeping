import React, { Component } from 'react'
import TimePicker from 'containers/TimePicker/TimePicker'
import TotalPrice from 'components/TotalPrice/TotalPrice'
import HeaderPriceCss from './HeaderPrice.module.scss'
import HeaderTitle from './HeaderTitle'

export default class HeaderPrice extends Component {
  changeTime = ({ year, month }) => {
    this.props.changeState({
      year,
      month
    })
  }
  render() {
    return (
      <div className={HeaderPriceCss['header_price']}>
        <HeaderTitle></HeaderTitle>
        <div className={HeaderPriceCss['header_price_b']}>
          <TimePicker
            year={this.props.time.year}
            month={this.props.time.month}
            onChange={this.changeTime}
          />
          <TotalPrice
            totalInCome={this.props.total.inCome}
            totalOutCome={this.props.total.outCome}
          ></TotalPrice>
        </div>
      </div>
    )
  }
}
