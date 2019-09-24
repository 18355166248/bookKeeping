import React, { Component } from 'react'
import PriceItem from './priceItem/priceItem'
import PropTypes from 'prop-types'

class PriceList extends Component {
  render() {
    return (
      <div style={{ borderTop: '1px solid #e8e8e9' }}>
        {this.props.list.length > 0 ? (
          this.props.list.map((v, i) => <PriceItem {...v} key={i} />)
        ) : (
          <div
            className="ac m_t_10 m_t_10 empty_data"
            style={{ fontSize: '18px' }}
          >
            暂无数据
          </div>
        )}
      </div>
    )
  }
}

PriceList.propTypes = {
  list: PropTypes.array.isRequired
}
export default PriceList
