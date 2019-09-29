import React, { Component } from 'react'
import CategoryList from 'containers/CategoryList'
import PriceForm from 'components/Create/PriceForm'
import HeaderTitle from '../HeaderPrice/HeaderTitle'
import { Tabs } from 'antd'
import { connect } from 'react-redux'
import './index.scss'
const { TabPane } = Tabs

@connect(state => state)
class Create extends Component {
  onSelectCategory = () => {}
  render() {
    const { categoryList } = this.props.listReducer
    const inprops = {
      categoryList: categoryList.filter(v => v.type === 'income'),
      onSelectCategory: this.onSelectCategory,
      selectCategory: categoryList[0]
    }
    const outprops = {
      categoryList: categoryList.filter(v => v.type === 'outcome'),
      onSelectCategory: this.onSelectCategory,
      selectCategory: categoryList[0]
    }
    return (
      <div>
        <HeaderTitle></HeaderTitle>
        <Tabs defaultActiveKey="1" className="create_tabs">
          <TabPane tab="支出" key="1">
            <CategoryList {...inprops}></CategoryList>
          </TabPane>
          <TabPane tab="收入" key="2">
            <CategoryList {...outprops}></CategoryList>
          </TabPane>
        </Tabs>

        <PriceForm className="pirce_form"></PriceForm>
      </div>
    )
  }
}

export default Create
