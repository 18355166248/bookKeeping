import React, { Component } from 'react'
import { Icon, Row, Col } from 'antd'
import indexCss from './index.module.scss'

class CategoryList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectCatogoryId: props.selectCategory && props.selectCategory.id
    }
  }
  selectCategory = (event, v) => {
    this.setState({
      selectCatogoryId: v.id
    })
    this.props.onSelectCategory(v)
    event.preventDefault()
  }
  render() {
    const { categoryList } = this.props
    const { selectCatogoryId } = this.state
    return (
      <Row gutter={16} className="category_select_component">
        {categoryList.map((v, i) => (
          <Col
            span={4}
            key={v.id}
            className={`category_items ${
              selectCatogoryId && selectCatogoryId === v.id
                ? indexCss.active
                : ''
            } ${indexCss['category_items']}`}
            onClick={event => this.selectCategory(event, v)}
          >
            <Icon type={v.iconName} />
            <span className="category_items_name">{v.name}</span>
          </Col>
        ))}
      </Row>
    )
  }
}

export default CategoryList
