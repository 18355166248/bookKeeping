import React from 'react'
import { shallow } from 'enzyme'
import PriceList from '../PriceList'
import { constList, categoryList } from '../../mock'

const list = constList.map(v => {
  v.category = categoryList.find(v1 => v1.id === v.cid)
  return v
})

let wrapper
describe('test PriceList component', () => {
  beforeEach(() => {
    wrapper = shallow(<PriceList list={list} />)
    console.log(wrapper)
  })
  it('should render the compinent to match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
