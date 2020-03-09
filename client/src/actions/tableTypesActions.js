import { GET_TABLE_TYPES, TABLES_LOADING } from './types.js';
import axios from 'axios';

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

export const setTablesLoading = () => dispach => {
  dispach({
    type: TABLES_LOADING
  });
};
