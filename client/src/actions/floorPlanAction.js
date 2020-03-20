import { SAVE_FLOOR_PLAN, GET_FLOOR_PLANS, LOADING } from './types.js';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions.js';
import axios from 'axios';

export const getFloorPlans = () => dispatch => {
  dispatch(setLoading());
  axios
    .get('/api/floorPlans/getFP')
    .then(res =>
      dispatch({
        type: GET_FLOOR_PLANS,
        payload: res.data.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const saveFloorPlan = floorPlan => (dispatch, getState) => {
  console.log('uslo....');

  let temp = {
    RestaurantID: '2',
    NumbOfTables: floorPlan.length,
    TableList: floorPlan
  };
  axios
    .post('/api/floorPlans', temp, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: SAVE_FLOOR_PLAN,
        payload: res.data.data
        // payload2: res.data.data2
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const setLoading = () => dispatch => {
  dispatch({
    type: LOADING
  });
};
