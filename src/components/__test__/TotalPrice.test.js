import React from 'react'
import { shallow } from 'enzyme'
import TotalPrice from '../TotalPrice/TotalPrice'

const props = {
  totalInCome: 1000,
  totalOutCome: 2000
}

describe('test TotalPrice component', () => {
  it('component should render income&outcome number', () => {
    const wrapper = shallow(<TotalPrice {...props} />)
    expect(wrapper.find('.totalInCome').text() * 1).toEqual(1000)
    expect(wrapper.find('.totalOutCome').text() * 1).toEqual(2000)
  })
})
