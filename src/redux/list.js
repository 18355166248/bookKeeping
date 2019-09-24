const EDITLIST = 'EDITLIST'
const DELLIST = 'DELLIST'

const initState = {
  list: []
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
