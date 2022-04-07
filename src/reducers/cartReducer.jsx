import _ from 'lodash'
import { ADD_TO_CART, CHANGE_PRO_NUM, REMOVE_FROM_CART, RESET_CART } from '../actions/type'

export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, [action.product._id]: action.product }
    case REMOVE_FROM_CART:
      return _.omit(state, [action.id])
    case CHANGE_PRO_NUM:
      return { ...state, [action.id]: action.product }
    case RESET_CART:
      return {}
    default:
      return state
  }
}
