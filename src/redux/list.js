import { constList, categoryList } from '@/mock'

const EDITLIST = 'EDITLIST'
const DELLIST = 'DELLIST'

const initState = {
  list: constList.map(v => {
    v.category = categoryList.find(v1 => v1.id === v.cid)
    return v
  })
}
export function listReducer(state = initState, action) {
  switch (action.type) {
    case EDITLIST:
      return {
        ...state,
        list: action.list
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

function editList(list) {
  return {
    type: EDITLIST,
    list
  }
}

function delList(index) {
  return {
    type: DELLIST,
    index
  }
}
