import React, { Component } from 'react'
import PriceItem from './priceItem/priceItem'

class PriceList extends Component {
  render() {
    return (
      <div style={{ borderTop: '1px solid #e8e8e8' }}>
        {this.props.list.length > 0 ? (
          this.props.list.map((v, i) => <PriceItem {...v} key={i} />)
        ) : (
          <div className="ac m_t_10 m_t_10" style={{ fontSize: '18px' }}>
            暂无数据
          </div>
        )}
      </div>
    )
  }
}
export default PriceList
