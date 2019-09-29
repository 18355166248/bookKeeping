import { categoryList } from '@/mock'
import { handleLocalStorage } from '@/utils/util'

const ADDLIST = 'ADDLIST'
const EDITLIST = 'EDITLIST'
const DELLIST = 'DELLIST'

const list = handleLocalStorage('list')
const initState = {
  list: list
    ? list.map(v => {
        v.category = categoryList.find(v1 => v1.id === v.cid)
        return v
      })
    : [],
  categoryList
}
export function listReducer(state = initState, action) {
  switch (action.type) {
    case ADDLIST:
      return {
        ...state,
        list: state.list.push(action.list)
      }
    case EDITLIST:
      state.list[action.index] = action.list
      return {
        ...state,
        list: state.list
      }
    case DELLIST:
      return {
        ...state,
        list: [
          ...state.list.slice(0, action.index),
          ...state.list.slice(action.index + 1)
        ]
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

export const add = list => {
  return dispatch => {
    dispatch(addList(list))
  }
}
