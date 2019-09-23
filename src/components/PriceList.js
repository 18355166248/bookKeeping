import React, { Component } from 'react'
import PriceItem from './priceItem/priceItem'

class PriceList extends Component {
  render() {
    return (
      <div style={{ borderTop: '1px solid #e8e8e8' }}>
        {this.props.list.map((v, i) => (
          <PriceItem {...v} key={i} />
        ))}
      </div>
    )
  }
}
export default PriceList
