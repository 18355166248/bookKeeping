import React, { Component } from 'react'
import { Button, Icon } from 'antd'
import PriceItemScss from './priceItem.module.scss'

export default class PriceItem extends Component {
  edit = () => {
    return this.props
  }
  del = () => {
    return this.props
  }
  render() {
    return (
      <div className={PriceItemScss['price_item']}>
        <Icon
          className="price_item_icon"
          type={this.props.category.iconName}
          style={{ color: '#1296db', fontSize: '20px' }}
        />
        <span>{this.props.title}</span>
        <span style={{ fontWeight: 700 }}>
          {this.props.category.type === 'outcome' ? '-' : '+'}
          {this.props.price} 元
        </span>
        <span>{this.props.date}</span>
        <div className="operation">
          <Button
            shape="circle"
            type="primary"
            icon="form"
            className="m_r_10"
            onClick={this.edit}
          ></Button>
          <Button
            shape="circle"
            type="danger"
            icon="close"
            onClick={this.del}
          ></Button>
        </div>
      </div>
    )
  }
}
