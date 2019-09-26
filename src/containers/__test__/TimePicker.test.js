import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import TimePciker from '../TimePicker/TimePicker'

let wrapper, props
describe('测试 Timepicker 组件', () => {
  beforeEach(() => {
    props = {
      year: '2019',
      month: '9',
      onChange: jest.fn()
    }
    wrapper = shallow(<TimePciker {...props} />)
  })
  it('匹配快照', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('年份渲染是否正确', () => {
    const Input = wrapper.find('Input')
    expect(Input.props().value).toEqual(`${props.year} 年 ${props.month} 月`)
  })
})
