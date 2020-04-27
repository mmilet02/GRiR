import {
  SAVE_FLOOR_PLAN,
  GET_FLOOR_PLANS,
  LOADING,
  GET_RESTORAUNTS,
  GET_CUSTOMERS,
  GET_GRADES,
  ADD_GRADE,
  UPDATE_FAVORITE,
} from './types.js';
import { returnErrors } from './errorActions';
import axios from 'axios';

export const getFloorPlans = () => (dispatch) => {
  dispatch(setLoading());
  axios
    .get('/api/floorPlans/getFP')
    .then((res) =>
      dispatch({
        type: GET_FLOOR_PLANS,
        payload: res.data.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const addGrade = (Grade, Comment, RestaurantID, CustomerID, token) => (
  dispatch
) => {
  console.log(token);
  let temp = {
    RestaurantID,
    CustomerID,
    Grade,
    Comment,
  };
  axios
    .post('/api/grades/addG', temp, tokenConfig(token))
    .then((res) =>
      dispatch({
        type: ADD_GRADE,
        payload: res.data.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const getGrades = () => (dispatch) => {
  dispatch(setLoading());
  axios
    .get('/api/grades/getG')
    .then((res) =>
      dispatch({
        type: GET_GRADES,
        payload: res.data.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const saveFloorPlan = (floorPlan, id) => (dispatch) => {
  console.log('uslo....');

  let temp = JSON.stringify({
    RestaurantID: id,
    NumbOfTables: floorPlan.length,
    TableList: floorPlan,
  });

  console.log(temp);
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  axios
    .post('/api/floorPlans', temp, config)
    .then((res) => {
      dispatch({
        type: SAVE_FLOOR_PLAN,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const setLoading = () => (dispatch) => {
  dispatch({
    type: LOADING,
  });
};

export const getRestoraunts = () => (dispatch) => {
  dispatch(setLoading());
  axios
    .get('/api/restoraunts')
    .then((res) =>
      dispatch({
        type: GET_RESTORAUNTS,
        payload: res.data.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const getCustomers = () => (dispatch) => {
  dispatch(setLoading());
  axios
    .get('/api/customer')
    .then((res) =>
      dispatch({
        type: GET_CUSTOMERS,
        payload: res.data.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const updateFavorite = (_id, Favorite, token) => (dispatch) => {
  let temp = {
    _id,
    Favorite,
    token,
  };
  axios
    .post('/api/customer/fav', temp, tokenConfig(token))
    .then((res) =>
      dispatch({
        type: UPDATE_FAVORITE,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
export const uploadImage = (formData) => (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  };

  axios
    .post('/api/restoraunts/image', formData, config)
    .then((res) => console.log(res.data))
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
// Setup config/headers and token
export const tokenConfig = (token) => {
  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
