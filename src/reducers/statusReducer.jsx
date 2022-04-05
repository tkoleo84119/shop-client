import _ from 'lodash'
import { ERROR_STATUS, SUCCESS_STATUS, RESET_STATUS } from '../actions/type'

export const statusReducer = (state = {}, action) => {
  switch (action.type) {
    case SUCCESS_STATUS:
      return { ...state, status: action.payload.status, message: action.payload.message }
    case ERROR_STATUS:
      return { ...state, status: action.payload.status, message: action.payload.message }
    case RESET_STATUS:
      return _.omit(state, ['status', 'message'])
    default:
      return state
  }
}
