import React from 'react'
import { MyContext } from '@/App'

const WithContxt = Component => {
  return props => (
    <MyContext.Consumer>
      {
        state => <Component {...props} data={state}></Component>
      }
    </MyContext.Consumer>
  )
}

export default WithContxt