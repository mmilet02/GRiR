import { GET_TABLE_TYPES, LOADING } from './types.js';
import axios from 'axios';
import { tokenConfig } from './authActions.js';
import { returnErrors } from './errorActions';

// Get all table types and set loading on false
export const getTableTypes = () => (dispatch, getState) => {
  dispatch(setTablesLoading());
  axios
    .get('/api/tableTypes', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_TABLE_TYPES,
        payload: res.data.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

//Sets loading on true
export const setTablesLoading = () => dispatch => {
  dispatch({
    type: LOADING
  });
};
