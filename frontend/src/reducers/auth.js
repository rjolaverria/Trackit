import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTHORIZED,
  NOT_AUTHORIZED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DEACTIVATED,
  USER_UPDATED,
} from '../utils/constants';

const initialState = {
  token: localStorage.getItem('token'),
  authenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case AUTHORIZED:
      return {
        ...state,
        authenticated: true,
        loading: false,
        user: data,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', data.token);
      return {
        ...state,
        ...data,
        authenticated: true,
        loading: false,
        user: data.username,
      };
    case USER_UPDATED:
      return {
        ...state,
        user: data.user,
      };
    case LOGOUT:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case NOT_AUTHORIZED:
    case ACCOUNT_DEACTIVATED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        authenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}
