import React from 'react'
import { mount } from 'enzyme'
import CategoryList from '../CategorySelect'
import { categoryList } from '../../mock'

let props = {
  categoryList,
  onSelectCategory: jest.fn()
}

let props_with_catogory = {
  categoryList,
  onSelectCategory: jest.fn(),
  selectCategory: categoryList[0]
}

describe('渲染 Categorylist 组件', () => {
  it('渲染组件应该渲染dom', () => {
    const wrapper = mount(<CategoryList {...props} />)
    expect(wrapper.find('.category_items').length).toEqual(categoryList.length)
    expect(wrapper.find('.category_items.active').length).toEqual(0)
    const firstIcon = wrapper
      .find('.category_items')
      .first()
      .find('Icon')
    expect(firstIcon.length).toEqual(1)
    expect(firstIcon.props().type).toEqual(categoryList[0].iconName)
    const firstName = wrapper
      .find('.category_items')
      .first()
      .find('.category_items_name')
    expect(firstName.text()).toEqual(categoryList[0].name)
  })
  it('传入数据高亮', () => {
    const wrapper = mount(<CategoryList {...props_with_catogory} />)
    expect(wrapper.find('.category_items.active').length).toEqual(1)
  })
  it('点击进行高亮', () => {
    const wrapper = mount(<CategoryList {...props_with_catogory} />)
    wrapper.find('.category_items').at(1).simulate('click')
    expect(props_with_catogory.onSelectCategory).toHaveBeenCalledWith(categoryList[1])
    expect(wrapper.find('.category_items').at(1).hasClass('active')).toEqual(true)
  })
})
