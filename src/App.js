import React, { Component } from 'react'
import ViewTab from 'components/ViewTab/ViewTab'
import { connect } from 'react-redux'
import HeaderPrice from 'components/HeaderPrice/HeaderPrice'
import { repairZero } from 'utils/util'
import { changeDate } from '@/redux/list'
import './App.scss'
import PdfDemo from './containers/PdfDemo/PdfDemo'
import Timer from './containers/timer/timer'

export const MyContext = React.createContext()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: {
        year: this.props.listReducer.year,
        month: this.props.listReducer.month,
      },
    }
  }
  changeState = (time) => {
    this.setState({
      time,
    })
    this.props.changeDate(time)
  }
  render() {
    const list = this.props.listReducer.list.filter((v) => {
      return (
        v.date &&
        v.date.indexOf(
          `${this.state.time.year}-${repairZero(this.state.time.month)}`
        ) > -1
      )
    })
    const total = {
      inCome: 0,
      outCome: 0,
    }
    list.forEach((v) => {
      if (v.category.type === 'income') {
        total.inCome += Number(v.price)
      } else if (v.category.type === 'outcome') {
        total.outCome += Number(v.price)
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
        <Timer />
        <PdfDemo />
      </MyContext.Provider>
    )
  }
}

export default connect((state) => state, { changeDate })(App)
