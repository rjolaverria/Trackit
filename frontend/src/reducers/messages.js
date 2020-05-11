import {
  REGISTER_FAIL,
  LOGIN_FAIL,
  NOT_AUTHORIZED,
  GET_TRIP_INFO,
  GET_TRIPS,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  TRIP_INFO_ERROR,
  TRIPS_ERROR,
  USER_UPDATED,
  ACCOUNT_DEACTIVATED,
  DELETE_TRIP,
  DELETE_TRIP_ERROR,
  ADD_TRIP,
} from '../utils/constants';

const initialState = {
  messages: {},
};

export default function (state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case TRIPS_ERROR:
    case TRIP_INFO_ERROR:
    case USER_UPDATED:
    case ACCOUNT_DEACTIVATED:
      return {
        messages: { ...data },
      };
    case DELETE_TRIP:
      return {
        messages: { deleted: 'Trip Deleted' },
      };
    case ADD_TRIP:
      return {
        messages: { success: 'Trip Added' },
      };
    case NOT_AUTHORIZED:
    case GET_TRIPS:
    case GET_TRIP_INFO:
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case LOGOUT:
      return {
        ...state,
        messages: {},
      };
    default:
      return state;
  }
}
