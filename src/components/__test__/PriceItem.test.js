import React from 'react'
import { shallow } from 'enzyme'
import PriceItem from '../priceItem/priceItem'
import { constList, categoryList } from '../../mock'

const list = constList.map(v => {
  v.category = categoryList.find(v1 => v1.id === v.cid)
  return v
})

let wrapper
describe('测试 PriceItem组件', () => {
  beforeEach(() => {
    wrapper = shallow(<PriceItem {...list[0]} key={0} index={0} />)
  })
  it('图标是否渲染成功', () => {
    expect(wrapper.find('.price_item_icon').exists()).toBeTruthy()
  })
  it('测试事件是否执行', () => {
    const editFun = jest.spyOn(wrapper.instance(), 'edit')
    const delFun = jest.spyOn(wrapper.instance(), 'del')
    wrapper.instance().edit()
    expect(editFun).toHaveBeenCalled()
    editFun.mockRestore()
    wrapper.instance().del()
    expect(delFun).toHaveBeenCalled()
    delFun.mockRestore()
  })
})
