import React, { Component } from 'react'
import { Button, Icon } from 'antd'
import PriceItemScss from './priceItem.module.scss'

export default class PriceItem extends Component {
  render() {
    return (
      <div className={PriceItemScss['price_item']}>
        <Icon type={this.props.category.iconName} />
        <span>{this.props.title}</span>
        <span>
          {this.props.category.type === 'outcome' ? '-' : '+'}
          {this.props.price}
        </span>
        <span>{this.props.date}</span>
        <div>
          <Button icon="form" size="small" className="m_r_10"></Button>
          <Button icon="close" size="small"></Button>
        </div>
      </div>
    )
  }
}
