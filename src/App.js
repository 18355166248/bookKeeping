import React, { Component } from 'react'
import ViewTab from 'components/ViewTab/ViewTab'
import { connect } from 'react-redux'
import HeaderPrice from 'components/HeaderPrice/HeaderPrice'
import { repairZero } from 'utils/util'
import './App.scss'

export const MyContext = React.createContext()

@connect(state => state)
class App extends Component {
  constructor(props) {
    super(props)
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
    const list = this.props.listReducer.list.filter(v => {
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
      <MyContext.Provider value={{ name: 123 }}>
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
      </MyContext.Provider>
    )
  }
}

export default App
