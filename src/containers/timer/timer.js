import React, { useState, useEffect, useRef, useReducer } from 'react'

function Timer() {
  const [count, setCount] = useReducer((state) => {
    return state + 1
  }, 0)
  const time = useRef()

  useEffect(() => {
    if (!time.current) {
      time.current = setInterval(() => {
        setCount()
      }, 1000)
    }

    return () => {
      clearInterval(time.current)
    }
  }, [])

  return <div>{count}</div>
}

export default Timer
