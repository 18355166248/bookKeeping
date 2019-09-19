import React, { Component } from 'react'
import { Button, Icon } from 'antd'
import PriceItemScss from './priceItem.module.scss'

export default class PriceItem extends Component {
  render() {
    return (
      <div className={PriceItemScss['price_item']}>
        <Icon
          type={this.props.category.iconName}
          style={{ color: '#1296db', fontSize: '20px' }}
        />
        <span>{this.props.title}</span>
        <span style={{ fontWeight: 700 }}>
          {this.props.category.type === 'outcome' ? '-' : '+'}
          {this.props.price} 元
        </span>
        <span>{this.props.date}</span>
        <div>
          <Button
            shape="circle"
            type="primary"
            icon="form"
            className="m_r_10"
          ></Button>
          <Button shape="circle" type="danger" icon="close"></Button>
        </div>
      </div>
    )
  }
}
