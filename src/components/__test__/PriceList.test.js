import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import PriceList from '../PriceList'
import PriceItem from '../priceItem/priceItem'
import { constList, categoryList } from '../../mock'

const list = constList.map(v => {
  v.category = categoryList.find(v1 => v1.id === v.cid)
  return v
})
let wrapper
describe('测试 PriceList 组件', () => {
  beforeEach(() => {
    wrapper = shallow(<PriceList list={list} />)
  })
  it('匹配快照', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('PriceItem组件应该渲染了4个', () => {
    expect(wrapper.find(PriceItem).length).toBe(4)
  })
  it('PriceList组件空数据的时候是否显示暂无数据', () => {
    wrapper.setProps({list: []})
    expect(wrapper.find('.empty_data').exists()).toBeTruthy()
  })
})
