import _ from 'lodash'
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/type'

export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, [action.product._id]: action.product }
    case REMOVE_FROM_CART:
      return _.omit(state, [action.id])
    default:
      return state
  }
}
