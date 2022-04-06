import _ from 'lodash'
import { LOGIN, LOGOUT, GET_CURRENT_USER } from '../actions/type'

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return { isLoggedIn: true, token: action.payload.token, user: action.payload.data.user }
    case LOGOUT:
      return { ..._.omit(state, ['token', 'user']), isLoggedIn: false }
    case GET_CURRENT_USER:
      return { ...state, user: action.payload.data.user }
    default:
      return state
  }
}
