import _ from 'lodash'

import { GET_ALL_PRODUCTS } from '../actions/type'

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return { ..._.mapKeys(action.payload.data.products, '_id') }
    default:
      return state
  }
}
