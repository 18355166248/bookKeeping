import React, { useState, useEffect } from 'react';
import { Form, Input, Icon, Button, Row, Col, Select } from 'antd';
import FormRepeat from './FormRepeat';
import { demoSelectList } from './data';

function FormDemo(props) {
  const { form, data } = props;

  const { getFieldDecorator } = form;

  return (
    <FormRepeat
      form={form}
      list={data.check}
      formKey="check"
      renderItem={({ item, index, keys, k, add, remove }) => (
        <div className="formRepeatItem" key={k}>
          <Row>
            <Col span={2} style={{ marginTop: '50px' }}>{k}</Col>
            <Col span={6}>
              <Form.Item
                label="检查"
              >
                {getFieldDecorator(`check[${k}].name1`, {
                  initialValue: item?.name1
                })(<Input style={{ width: '90%', marginRight: 8 }} />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="测试"
              >
                {getFieldDecorator(`check[${k}].name2`, {
                  initialValue: item?.name2
                })(<Input style={{ width: '90%', marginRight: 8 }} />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="人员"
              >
                {getFieldDecorator(`check[${k}].name3`, {
                  initialValue: item?.name3.split(',')
                })(<Select
                  mode="multiple"
                  style={{ width: '100%' }}
                >
                  {demoSelectList.map(select => (
                    <Select.Option key={select.value} value={select.value}>
                      {select.label}
                    </Select.Option>
                  ))}
                </Select>)}
              </Form.Item>
            </Col>
            <Col span={3}>
              {keys.length > 1 ? (
                <Icon
                  style={{ marginTop: '50px', marginLeft: '20px' }}
                  type="minus-circle-o"
                  onClick={() => remove(k)}
                  className="delBtn"
                />
              ) : null}</Col>
          </Row>
        </div>
      )}
      footer={({ add }) => (
        <Form.Item wrapperCol={{ offset: 2 }}>
          <div className="addBtn">
            <Button
              type="dashed"
              onClick={add}
              style={{ width: '100px' }}
            >
              <Icon type="plus" />添加
          </Button>
          </div>
        </Form.Item>
      )}
    />
  )
}

export default Form.create()(FormDemo);
