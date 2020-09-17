import { GET_RESERVATIONS, ADD_RESERVATION, LOADING } from './types.js';
import { returnErrors } from './errorActions';
import { tokenConfig } from './floorPlanAction.js';
import axios from 'axios';

//Gets a reservation by _id
export const getReservation = () => (dispatch) => {
  dispatch(setLoading());
  axios
    .get('/api/reservation/getR')
    .then((res) =>
      dispatch({
        type: GET_RESERVATIONS,
        payload: res.data.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
//Add a reservation, tokein is required
export const addReservation = (reservation, token) => (dispatch) => {
  axios
    .post('/api/reservation', reservation, tokenConfig(token))
    .then((res) =>
      dispatch({
        type: ADD_RESERVATION,
        payload: res.data.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
//Set loading on true
export const setLoading = () => (dispatch) => {
  dispatch({
    type: LOADING,
  });
};
