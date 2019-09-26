import React, { Component } from 'react'
import { Icon } from 'antd'

class CategoryList extends Component {
  render() {
    return (
      <div className="category_select_component">
        {this.props.categoryList.map(v => (
          <div
            key={v.id}
            className={`category_items ${
              this.props.selectCategory &&
              this.props.selectCategory.findIndex(v1 => v1.id === v.id) > -1
                ? 'active'
                : ''
            }`}
          >
            <Icon type={v.iconName} />
            <span className="category_items_name">{v.name}</span>
          </div>
        ))}
      </div>
    )
  }
}

export default CategoryList
