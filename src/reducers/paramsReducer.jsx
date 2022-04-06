import _ from 'lodash'
import {
  ADD_PARAMS_CATEGORY,
  REMOVE_PARAMS_CATEGORY,
  ADD_PARAMS_NAME,
  REMOVE_PARAMS_NAME
} from '../actions/type'

export const paramsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PARAMS_CATEGORY:
      return { ...state, category: action.value }
    case REMOVE_PARAMS_CATEGORY:
      return _.omit(state, ['category'])
    case ADD_PARAMS_NAME:
      return { ...state, name: action.value }
    case REMOVE_PARAMS_NAME:
      return _.omit(state, ['name'])
    default:
      return state
  }
}
