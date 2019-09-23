import React, { Component } from 'react'
import ViewTab from 'components/ViewTab/ViewTab'
import HeaderPrice from 'components/HeaderPrice/HeaderPrice'
import { constList } from '@/mock'
import './App.scss'

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderPrice></HeaderPrice>
        <ViewTab list={constList}></ViewTab>
      </div>
    )
  }
}

export default App
