import React, { Component } from 'react'
import { Menu, Dropdown, Icon, Button } from 'antd'
import TimePickerClass from './TimePicker.module.scss'
import './TimePicker.scss'
import { range } from 'utils/util'

export default class TimePicker extends Component {
  constructor(props) {
    super(props)
    const { year, month } = props
    this.state = {
      year,
      month
    }
  }
  selectTime = (type, value) => {
    this.setState({
      [type]: value
    })
  }

  render() {
    const yearList = range(9, -4).map(v => this.props.year + v)
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
                  className={`${v === this.state.year ? TimePickerClass.active : ''} ${
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
                  className={`${v === this.state.month ? TimePickerClass.active : ''} ${
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
        <Button className={TimePickerClass.btn}>
          {this.props.year && this.props.month ? (
            <span className="ac po100">{`${this.state.year} 年 ${this.state.month} 月`}</span>
          ) : (
            ''
          )}
          <Icon type="down" className={TimePickerClass.rightArrow} />
        </Button>
      </Dropdown>
    )
  }
}
