import React, { Component } from 'react'
import { Button, Icon, Popconfirm, message } from 'antd'
import PriceItemScss from './priceItem.module.scss'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { del } from '@/redux/list'

export class PriceItem extends Component {
  edit = () => {
    this.props.history && this.props.history.push(`/edit/${this.props.id}`)
  }
  del = () => {
    return this.props
  }
  confirm = e => {
    this.props.del(this.props.index)
  }
  render() {
    return (
      <div className={PriceItemScss['price_item']}>
        <Icon
          className={`price_item_icon ${PriceItemScss['price_item_icon']}`}
          type={this.props.category.iconName}
          style={{ color: '#1296db', fontSize: '25px' }}
        />
        <span>{this.props.title}</span>
        <span style={{ fontWeight: 700 }}>
          {this.props.category.type === 'outcome' ? '-' : '+'}
          {this.props.price} 元
        </span>
        <span>{this.props.date}</span>
        <div className={`operation ${PriceItemScss.operation}`}>
          <Button
            shape="circle"
            type="primary"
            icon="form"
            style={{ marginRight: '30px' }}
            onClick={this.edit}
          ></Button>
          <Popconfirm
            title="确定删除这条记录么?"
            onConfirm={this.confirm}
            okText="确定"
            cancelText="取消"
          >
            <Button
              shape="circle"
              type="danger"
              icon="close"
              onClick={this.del}
            ></Button>
          </Popconfirm>
        </div>
      </div>
    )
  }
}

PriceItem = withRouter(PriceItem)
const Connect = connect(
  null,
  { del }
)

export default Connect(PriceItem)
