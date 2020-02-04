import React, { useState, useEffect } from 'react';
import { Form, Input, Icon, Button, Row, Col, Select } from 'antd';
import FormRepeat from './FormRepeat';
import { data, demoSelectList } from './data';

const formKeyList = {
  check: {
    key: 'check',
  },
  tooth: {
    key: 'tooth',
  }
}

function FormDemo(props) {
  const { form } = props;

  const [formData, setFormData] = useState({});
  const [selectList, setSelectList] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        Object.keys(formKeyList).forEach(forKey => {
          console.log(values[`${forKey}Keys`].map(key => values[forKey][key]))
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const { getFieldDecorator } = form;

  return (
    <Form onSubmit={handleSubmit}>
      <FormRepeat
        list={formData[formKeyList.check.key]}
        form={form}
        formKey={formKeyList.check.key}
        renderItem={({ item, index, keys, k, add, remove }) => (
          <Row key={k}>
            <Col span={2} style={{ marginTop: '50px' }}>{k}</Col>
            <Col span={6}>
              <Form.Item
                label="检查"
              >
                {getFieldDecorator(`${formKeyList.check.key}[${k}].name1`, {
                  initialValue: item?.name1
                })(<Input style={{ width: '90%', marginRight: 8 }} />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="测试"
              >
                {getFieldDecorator(`${formKeyList.check.key}[${k}].name2`, {
                  initialValue: item?.name2
                })(<Input style={{ width: '90%', marginRight: 8 }} />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="人员"
              >
                {getFieldDecorator(`${formKeyList.check.key}[${k}].name3`, {
                  initialValue: item?.name3.split(',')
                })(<Select
                  mode="multiple"
                  style={{ width: '100%' }}
                >
                  {selectList.map(select => (
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
                />
              ) : null}</Col>
          </Row>
        )}
        footer={({ add }) => (
          <Form.Item wrapperCol={{ offset: 2 }}>
            <Button type="dashed" onClick={add} style={{ width: '100px' }}>
              <Icon type="plus" />添加
            </Button>
          </Form.Item>
        )}
      />
      <FormRepeat
        list={formData[formKeyList.tooth.key]}
        form={form}
        formKey={formKeyList.tooth.key}
        renderItem={({ item, index, keys, k, add, remove }) => (
          <Row key={k}>
            <Col span={2} style={{ marginTop: '50px' }}>{k}</Col>
            <Col span={10}>
              <Form.Item
                label="检查"
              >
                {getFieldDecorator(`${formKeyList.tooth.key}[${k}].too`, {
                  initialValue: item?.too
                })(<Input style={{ width: '90%', marginRight: 8 }} />)}
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label="测试"
              >
                {getFieldDecorator(`${formKeyList.tooth.key}[${k}].too2`, {
                  initialValue: item?.too2
                })(<Input style={{ width: '90%', marginRight: 8 }} />)}
              </Form.Item>
            </Col>
            <Col span={2}>
              {keys.length > 1 ? (
                <Icon
                  style={{ marginTop: '50px' }}
                  type="minus-circle-o"
                  onClick={() => remove(k)}
                />
              ) : null}</Col>
          </Row>
        )}
        footer={({ add }) => (
          <Form.Item wrapperCol={{ offset: 2 }}>
            <Button type="dashed" onClick={add} style={{ width: '100px' }}>
              <Icon type="plus" />添加
            </Button>
          </Form.Item>
        )}
      />
      <Form.Item  wrapperCol={{ offset: 2 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );

  function init() {
    setTimeout(() => {
      setFormData(data);
      setSelectList(demoSelectList);
    }, 500)
  }
}

export default Form.create()(FormDemo);
