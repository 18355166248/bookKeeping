import { categoryList } from '@/mock'
import { handleLocalStorage } from '@/utils/util'

const ADDLIST = 'ADDLIST'
const EDITLIST = 'EDITLIST'
const DELLIST = 'DELLIST'

const list = handleLocalStorage('list')
const initState = {
  list: list || [],
  categoryList
}
export function listReducer(state = initState, action) {
  switch (action.type) {
    case ADDLIST:
      state.list.push(action.list)
      handleLocalStorage('list', state.list)
      return state
    case EDITLIST:
      state.list[action.index] = action.list
      handleLocalStorage('list', state.list)
      return state
    case DELLIST:
      const list = [
        ...state.list.slice(0, action.index),
        ...state.list.slice(action.index + 1)
      ]
      handleLocalStorage('list', list)
      return {
        ...state,
        list
      }
    default:
      return state
  }
}

function addList(list) {
  return {
    type: ADDLIST,
    list
  }
}
function editList(index, list) {
  return {
    type: EDITLIST,
    index,
    list
  }
}

function delList(index) {
  return {
    type: DELLIST,
    index
  }
}

export const add = ({ list }) => {
  return dispatch => {
    dispatch(addList(list))
  }
}

export const edit = ({ index, list }) => {
  return dispatch => {
    dispatch(editList(index, list))
  }
}

export const del = index => {
  return dispatch => {
    dispatch(delList(index))
  }
}
