import React, { Component } from 'react'
import { Menu, Dropdown, Icon, Input } from 'antd'
import TimePickerClass from './TimePicker.module.scss'
import './TimePicker.scss'
import { range } from '../../utils/util'

export default class TimePicker extends Component {
  selectTime = (type, value) => {
    const { year, month } = this.props
    this.setState({
      [type]: value
    })
    let obj = {}
    if (type === 'year') {
      obj = {
        year: value,
        month: month || new Date().getMonth() + 1
      }
    } else if (type === 'month') {
      obj = {
        year: year || new Date().getFullYear(),
        month: value
      }
    }
    this.props.onChange(obj)
  }

  clear = () => {
    this.props.onChange({ year: '', month: '' })
  }

  render() {
    const { year, month } = this.props
    let startYear = this.props.startYear
    if (!startYear) startYear = new Date().getFullYear()
    const yearList = range(9, -4).map(v => Number(startYear) + v)
    const monthList = range(12, 1)

    const menu = (
      <Menu className={TimePickerClass['drop_down_menu']}>
        <Menu.Item key="0" className="time_picker_menu_item">
          <div className={TimePickerClass['drop_down']}>
            <div>
              {yearList.map(v => (
                <div
                  onClick={() => this.selectTime('year', v)}
                  key={v}
                  className={`${v === year ? TimePickerClass.active : ''} ${
                    TimePickerClass['common_cell']
                  }`}
                >
                  {v} 年
                </div>
              ))}
            </div>
            <div>
              {monthList.map(v => (
                <div
                  onClick={() => this.selectTime('month', v)}
                  key={v}
                  className={`${v === month ? TimePickerClass.active : ''} ${
                    TimePickerClass['common_cell']
                  }`}
                >
                  {v} 月
                </div>
              ))}
            </div>
          </div>
        </Menu.Item>
      </Menu>
    )

    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <Input
          readOnly
          value={
            this.props.year && this.props.month ? `${year} 年 ${month} 月` : ''
          }
          className={`${TimePickerClass.btn} ${
            this.props.clearable && this.props.year && this.props.month
              ? TimePickerClass['clearable_show_btn']
              : ''
          }`}
          suffix={
            this.props.clearable ? (
              <span>
                <Icon
                  type="close-circle"
                  theme="filled"
                  onClick={this.clear}
                  className={TimePickerClass['clear_icon']}
                />
                <Icon
                  type="calendar"
                  className={TimePickerClass['calendar_icon']}
                />
              </span>
            ) : (
              <Icon type="calendar" />
            )
          }
        />
      </Dropdown>
    )
  }
}
