import React, { Component } from 'react'
import { Tabs, Icon, Button } from 'antd'

import PriceList from '../PriceList'
import './viewTab.scss'

const { TabPane } = Tabs

export default class ViewTab extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="1" className="book_tabs">
        <TabPane
          tab={
            <span>
              <i
                className="iconfont icon-liebiao ver_m"
                style={{ fontSize: '17px' }}
              ></i>{' '}
              <span className="ver_m m_l_10">列表模式</span>
            </span>
          }
          key="1"
        >
          <div style={{ padding: '10px 20px' }}>
            <Button type="primary" style={{ width: '100%' }} className="m_b_20">
              <Icon
                type="plus-circle"
                theme="filled"
                className="ver_t_t"
                style={{ fontSize: '18px' }}
              />
              <span className="ver_t">创建一条新的记账记录</span>
            </Button>
            <PriceList list={this.props.list}></PriceList>
          </div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <i
                className="iconfont icon-tubiao ver_m"
                style={{ fontSize: '18px' }}
              ></i>{' '}
              <span className="ver_m m_l_10">图表模式</span>
            </span>
          }
          key="2"
        >
          <div style={{ padding: '10px 20px' }}>Content of Tab Pane 2</div>
        </TabPane>
      </Tabs>
    )
  }
}
