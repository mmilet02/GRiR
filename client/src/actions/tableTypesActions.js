import { GET_TABLE_TYPES, LOADING } from './types.js';
import axios from 'axios';

// Get all table types and set loading on false
export const getTableTypes = () => dispach => {
  dispach(setTablesLoading());
  axios
    .get('/api/tableTypes')
    .then(res =>
      dispach({
        type: GET_TABLE_TYPES,
        payload: res.data.data
      })
    )
    .catch(err => console.log('ERROR', err));
};

//Sets loading on true
export const setTablesLoading = () => dispach => {
  dispach({
    type: LOADING
  });
};
