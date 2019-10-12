import axios from '@/axios'

const INITLIST = 'INITLIST'
const ADDLIST = 'ADDLIST'
const EDITLIST = 'EDITLIST'
const DELLIST = 'DELLIST'
const CHANGEDATE = 'CHANGEDATE'

// const list = handleLocalStorage('list')
const initState = {
  list: [],
  categoryList: [],
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1
}
export function listReducer(state = initState, action) {
  switch (action.type) {
    case INITLIST:
      state = { ...state, ...action.list }
      return state
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

function initList(list) {
  return {
    type: INITLIST,
    list
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

// 初始化数据
export const init = () => {
  return dispatch => {
    Promise.all([axios.get('/constList'), axios.get('/categoryList')]).then(
      res => {
        const arr = res[0].data.map(v => {
          const vv = res[1].data.find(v1 => v1.id === v.cid)
          vv && (v.category = vv)
          return v
        })
        const list = {
          list: arr,
          categoryList: res[1].data
        }
        dispatch(initList(list))
      }
    )
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
