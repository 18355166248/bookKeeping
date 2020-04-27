import React, { useState, useEffect } from 'react'
import { UseInterval } from './timeUtil'

function Timer() {
  const [count, setCount] = useState(0)

  UseInterval(() => {
    setCount(count + 1)
  }, 1000)

  return <div>{count}</div>
}

export default Timer
