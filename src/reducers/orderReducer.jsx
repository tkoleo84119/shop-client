import _ from 'lodash'

import { GET_ALL_ORDERS } from '../actions/type'

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return { ..._.mapKeys(action.payload.data.orders, '_id') }
    default:
      return state
  }
}
