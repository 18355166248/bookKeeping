import React, { Component } from 'react'
import { Menu, Dropdown, Icon, Button } from 'antd'
import TimePickerClass from './TimePicker.module.scss'
import './TimePicker.scss'
import { range } from 'utils/util'

export default class TimePicker extends Component {
  render() {
    const { year, month } = this.props
    const yearList = range(9, -4).map(v => this.props.year + v)
    const monthList = range(12, 1)

    const menu = (
      <Menu>
        <Menu.Item key="0" className="time_picker_menu_item">
          <div className={TimePickerClass['drop_down']}>
            <div>
              {yearList.map(v => (
                <div key={v}>{v}</div>
              ))}
            </div>
            <div>
              {monthList.map(v => (
                <div key={v}>{v}</div>
              ))}
            </div>
          </div>
        </Menu.Item>
      </Menu>
    )

    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <Button className={TimePickerClass.btn}>
          {this.props.year && this.props.month ? (
            <span className="ac po100">{`${year} 年 ${month} 月`}</span>
          ) : (
            ''
          )}
          <Icon type="down" className={TimePickerClass.rightArrow} />
        </Button>
      </Dropdown>
    )
  }
}
