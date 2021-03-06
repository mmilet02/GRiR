import { GET_TABLE_TYPES, LOADING } from '../actions/types.js';

const initialState = {
  tableTypes: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TABLE_TYPES:
      return {
        ...state,
        tableTypes: action.payload,
        loading: false
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
