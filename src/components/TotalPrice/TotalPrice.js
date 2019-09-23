import React, { Component } from 'react'
import totalPriceClass from './totalPrice.module.scss'

export default class TotalPrice extends Component {
  render() {
    return (
      <div className={totalPriceClass['total_price']}>
        <div>
          <span>收入: </span>
          <span className="totalInCome">{this.props.totalInCome}</span>
        </div>
        <div>
          <span>支出: </span>
          <span className="totalOutCome">{this.props.totalOutCome}</span>
        </div>
      </div>
    )
  }
}
