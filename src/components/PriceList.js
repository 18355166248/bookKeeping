import React, { Component } from 'react'
import PriceItem from './priceItem'

class PriceList extends Component {
  render() {
    return (
      <div>
        {this.props.list.map((v, i) => (
          <PriceItem {...v} key={i} />
        ))}
      </div>
    )
  }
}
export default PriceList
