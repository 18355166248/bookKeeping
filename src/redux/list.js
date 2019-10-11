import { categoryList } from '@/mock'
import axios from '@/axios'

const ADDLIST = 'ADDLIST'
const EDITLIST = 'EDITLIST'
const DELLIST = 'DELLIST'
const CHANGEDATE = 'CHANGEDATE'

// const list = handleLocalStorage('list')
const initState = {
  list: [],
  categoryList,
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1
}
export function listReducer(state = initState, action) {
  switch (action.type) {
    case ADDLIST:
      state.list.push(action.list)
      // handleLocalStorage('list', state.list) // 修改为axios请求 不需要存在localStorage
      return state
    case EDITLIST:
      state.list[action.index] = action.list
      // handleLocalStorage('list', state.list) // 修改为axios请求 不需要存在localStorage
      return state
    case DELLIST:
      const list = [
        ...state.list.slice(0, action.index),
        ...state.list.slice(action.index + 1)
      ]
      // handleLocalStorage('list', list) // 修改为axios请求 不需要存在localStorage
      return {
        ...state,
        list
      }
    case CHANGEDATE:
      return { ...state, ...action.date }
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

function dateChange(date) {
  return {
    type: CHANGEDATE,
    date
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

// 修改year month
export const changeDate = date => {
  return dispatch => {
    dispatch(dateChange(date))
  }
}
