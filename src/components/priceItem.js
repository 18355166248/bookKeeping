import React, { Component } from 'react'
import { Button, Icon } from 'antd'

export default class PriceItem extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px 40px'
        }}
      >
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
