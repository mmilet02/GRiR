import {
  GET_RESERVATIONS,
  ADD_RESERVATION,
  LOADING,
} from '../actions/types.js';

const initialState = {
  reservations: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_RESERVATIONS:
      return {
        ...state,
        reservations: action.payload,
        loading: false,
      };
    case ADD_RESERVATION:
      return {
        ...state,
        reservations: [...state.reservations, action.payload],
      };
    case LOADING:
      return {
        ...state,
        load: true,
      };
    default:
      return state;
  }
}
