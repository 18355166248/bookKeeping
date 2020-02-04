import React from 'react';
import { mount } from 'enzyme';
import FormDemo from '../Form/Form';
import { Input, Select } from 'antd';
import { data } from '../Form/data';

let wrapper;

describe('测试FormRepeat组件', () => {
  beforeEach(() => {
    wrapper = mount(<FormDemo data={data} />)
  })

  it('渲染列表长度是否正确', () => {
    expect(wrapper.find('.formRepeatItem').length).toBe(1);
  })

  it('渲染表单是否正确', () => {
    expect(wrapper.find(Input).length).toBe(2);

    expect(wrapper.find(Select).length).toBe(1);

    expect(wrapper.find('.addBtn').length).toBe(1);
  })

  it('测试增加事件是否正确', () => {
    wrapper.find('.addBtn button').simulate('click');

    expect(wrapper.find(Input).length).toBe(4);

    expect(wrapper.find(Select).length).toBe(2);
  })

  it('测试删除事件是否正确', () => {
    wrapper.find('.addBtn button').simulate('click');

    expect(wrapper.find(Input).length).toBe(4);

    expect(wrapper.find(Select).length).toBe(2);

    wrapper.find('i.delBtn').first().simulate('click');

    expect(wrapper.find(Input).length).toBe(2);

    expect(wrapper.find(Select).length).toBe(1);
  })
})
