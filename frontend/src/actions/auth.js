import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTHORIZED,
  NOT_AUTHORIZED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_UPDATED,
  ACCOUNT_DEACTIVATED,
} from '../utils/constants';

// Authorize User
export const authorizeUser = () => async (dispatch) => {
  let token;
  if (localStorage.token) {
    token = localStorage.token;
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  try {
    const res = await axios.get('/api/auth/user', config);

    dispatch({
      type: AUTHORIZED,
      data: res.data,
    });
  } catch (error) {
    dispatch({
      type: NOT_AUTHORIZED,
    });
  }
};

// Register User
export const register = ({ username, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ username, email, password });

  try {
    const res = await axios.post('api/auth/register', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      data: res.data,
    });
    dispatch(authorizeUser());
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      data: error.response.data,
    });
  }
};

// User Login
export const login = ({ username, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ username, password });

  try {
    const res = await axios.post('api/auth/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      data: res.data,
    });
    dispatch(authorizeUser());
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      data: error.response.data,
    });
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

// Update User Info
export const updateUser = (username, email, first_name, last_name) => async (
  dispatch
) => {
  let token;
  if (localStorage.token) {
    token = localStorage.token;
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  const body = JSON.stringify({ username, email, first_name, last_name });
  try {
    const res = await axios.patch('api/auth/user/update', body, config);
    dispatch({
      type: USER_UPDATED,
      data: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Deactivate User
export const deactivateUser = () => async (dispatch) => {
  let token;
  if (localStorage.token) {
    token = localStorage.token;
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  try {
    const res = await axios.get('api/auth/user/deactivate', config);
    dispatch({
      type: ACCOUNT_DEACTIVATED,
      data: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
