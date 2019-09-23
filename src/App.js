import React, { Component } from 'react'
import ViewTab from 'components/ViewTab/ViewTab'
import HeaderPrice from 'components/HeaderPrice/HeaderPrice'
import { constList, categoryList } from '@/mock'
import { repairZero } from 'utils/util'
import './App.scss'

class App extends Component {
  constructor() {
    super()
    this.state = {
      time: {
        year: 2019,
        month: 9
      }
    }
  }
  changeState = time => {
    this.setState({
      time
    })
  }
  render() {
    const list = constList
      .map(v => {
        v.category = categoryList.find(v1 => v1.id === v.cid)
        return v
      })
      .filter(v => {
        return (
          v.date.indexOf(
            `${this.state.time.year}-${repairZero(this.state.time.month)}`
          ) > -1
        )
      })
    const total = {
      inCome: 0,
      outCome: 0
    }
    list.forEach(v => {
      if (v.category.type === 'income') {
        total.inCome += v.price
      } else if (v.category.type === 'outcome') {
        total.outCome += v.price
      }
    })

    return (
      <div className="App">
        <div>
          <HeaderPrice
            changeState={this.changeState}
            time={this.state.time}
            total={total}
          ></HeaderPrice>
          <ViewTab list={list}></ViewTab>
        </div>
      </div>
    )
  }
}

export default App
