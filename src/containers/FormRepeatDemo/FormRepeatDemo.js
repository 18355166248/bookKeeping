import React from 'react';
import FormRepeat from '../../components/FormRepeat/FormRepeat';
import { demoSelect } from './data';
import { Form, Input, Icon, Button } from 'antd';

function FormRepeatDemo (props) {
  const { form } = props;
  const { getFieldDecorator } = form;
  console.log(demoSelect);

  return (
    <div>
      <Form>
        <Form.Item label="名字">
          {getFieldDecorator('name', {
            initialValue: demoSelect.name
          })(<Input />)}
        </Form.Item>
        <Form.Item label="名字2">
          {getFieldDecorator('name2', {
            initialValue: demoSelect.name2
          })(<Input />)}
        </Form.Item>
        
      </Form>
      {/* <FormRepeat /> */}
    </div>
  )
}

export default Form.create()(FormRepeatDemo);
