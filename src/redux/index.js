import { combineReducers } from 'redux'

import { listReducer } from './list'

const reducer = combineReducers({listReducer})

export default reducer