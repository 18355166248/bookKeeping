import React, { Component } from 'react'
import { Form, Input, DatePicker, Button } from 'antd'
import { connect } from 'react-redux'
import { add } from '@/redux/list'
import { withRouter } from 'react-router-dom'

@withRouter
@connect(
  {},
  { add }
)
class PriceForm extends Component {
  onChangeDate = () => {}

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.date = values.date.format('YYYY-MM-DD')
        console.log(values)
        this.props.add(values)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: {
        xs: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 5 }
      }
    }
    return (
      <div className={this.props.className}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="标题">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '请输入标题',
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="金额">
            {getFieldDecorator('amount', {
              rules: [
                {
                  required: true,
                  message: '请输入金额',
                  whitespace: true
                }
              ]
            })(<Input type="number" />)}
          </Form.Item>
          <Form.Item label="日期">
            {getFieldDecorator('date', {
              rules: [
                {
                  type: 'object',
                  required: true,
                  message: '请选择日期',
                  whitespace: true
                }
              ]
            })(
              <DatePicker
                onChange={this.onChangeDate}
                placeholder=""
                className="w100"
              />
            )}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { offset: 2 }
            }}
          >
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button
              style={{ marginLeft: '20px' }}
              onClick={() => this.props.history.push('/')}
            >
              取消
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create({ name: 'register' })(PriceForm)
