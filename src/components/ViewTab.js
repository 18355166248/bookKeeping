import React, { Component } from 'react'
import { Tabs, Icon } from 'antd'
import PriceList from './PriceList'

const list = [
  {
    id: 1,
    title: '买了airPods',
    price: 1098,
    date: '2019-09-17',
    category: {
      id: 1,
      name: '电子',
      type: 'outcome',
      iconName: 'bar-chart'
    }
  },
  {
    id: 2,
    title: '买了苹果11',
    price: 7999,
    date: '2019-09-27',
    category: {
      id: 1,
      name: '电子',
      type: 'outcome',
      iconName: 'mobile'
    }
  }
]

const { TabPane } = Tabs

function callback(key) {
  console.log(key)
}

export default class ViewTabs extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane
          tab={
            <span>
              <Icon type="car" /> Tab 1
            </span>
          }
          key="1"
        >
          <PriceList list={list}></PriceList>
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="crown" /> Tab 2
            </span>
          }
          key="2"
        >
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    )
  }
}
