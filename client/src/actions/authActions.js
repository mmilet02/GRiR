import {
  RESTORAUNT_LOADED,
  RESTORAUNT_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types.js';
import { returnErrors } from './errorActions';
import { saveFloorPlan } from './floorPlanAction.js';
import axios from 'axios';

export const loadRestoraunt = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: RESTORAUNT_LOADING });

  axios
    .get('/api/auth', tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: RESTORAUNT_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Register restoraunt
export const register = ({
  Name,
  Email,
  Description,
  Type,
  Location,
  StartingHour,
  EndingHour,
  RestorauntPage,
  Phone,
  Viewes,
  ImgName,
  Password,
}) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({
    Name,
    Email,
    Description,
    Type,
    Location,
    StartingHour,
    EndingHour,
    RestorauntPage,
    Phone,
    Viewes,
    ImgName,
    Password,
  });

  axios
    .post('/api/restoraunts', body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      console.log(res.data.restoraunt._id);
      // dispatch(saveFloorPlan(floorPlanList, res.data.restoraunt._id));
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// Register customer
export const registerC = ({ Name, Email, Phone, Password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({
    Name,
    Email,
    Phone,
    Password,
  });

  axios
    .post('/api/customer', body, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// Login User
export const login = ({ Email, Password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ Email, Password });

  axios
    .post('/api/auth', body, config)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;

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
