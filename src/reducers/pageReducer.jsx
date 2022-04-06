import { NEXT_PAGE, PRE_PAGE, RESET_PAGE } from '../actions/type'

const initialState = {
  page: 1,
  limit: 11,
  pageResults: 10
}

export const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_PAGE:
      return { ...state, page: action.page }
    case PRE_PAGE:
      return { ...state, page: action.page }
    case RESET_PAGE:
      return { ...state, page: 1 }
    default:
      return state
  }
}
