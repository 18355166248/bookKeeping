import React from 'react'
import './App.css'
import ViewTab from './components/ViewTab'
import TimePicker from 'containers/TimePicker/TimePicker'

function App() {
  const year = 2019
  const month = 9
  return (
    <div className="App">
      <TimePicker year={year} month={month} />
      <ViewTab></ViewTab>
    </div>
  )
}

export default App
