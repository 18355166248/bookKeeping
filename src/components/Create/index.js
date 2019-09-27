import React, { Component } from 'react'
import CategoryList from 'containers/CategoryList'
import PriceForm from 'components/Create/PriceForm'
import HeaderTitle from '../HeaderPrice/HeaderTitle'
import { Tabs } from 'antd'
import { connect } from 'react-redux'
import './index.scss'
const { TabPane } = Tabs

function callback(key) {
  console.log(key)
}

@connect(state => state)
class Create extends Component {
  onSelectCategory = () => {}
  render() {
    const { categoryList } = this.props.listReducer
    const props = {
      categoryList,
      onSelectCategory: this.onSelectCategory,
      selectCategory: categoryList[0]
    }
    return (
      <div>
        <HeaderTitle></HeaderTitle>
        <Tabs defaultActiveKey="1" onChange={callback} className="create_tabs">
          <TabPane tab="支出" key="1"></TabPane>
          <TabPane tab="收入" key="2"></TabPane>
        </Tabs>
        <CategoryList {...props}></CategoryList>
        <PriceForm className="pirce_form"></PriceForm>
      </div>
    )
  }
}

export default Create
