import _ from 'lodash'
import { LOGIN, LOGOUT, UPDATE_PASSWORD, GET_CURRENT_USER, UPDATE_USER } from '../actions/type'

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return { isLoggedIn: true, token: action.payload.token, user: action.payload.data.user }
    case LOGOUT:
      return { ..._.omit(state, ['token', 'user']), isLoggedIn: false }
    case UPDATE_PASSWORD:
      return { ...state, token: action.payload.token, user: action.payload.data.user }
    case GET_CURRENT_USER:
      return { ...state, user: action.payload.data.user }
    case UPDATE_USER:
      return { ...state, user: action.payload.data.user }
    default:
      return state
  }
}
