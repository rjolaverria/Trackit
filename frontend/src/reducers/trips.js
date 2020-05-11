import {
  GET_TRIPS,
  TRIPS_ERROR,
  GET_TRIP_INFO,
  ADD_TRIP,
  LOGOUT,
  ACCOUNT_DEACTIVATED,
  NOT_AUTHORIZED,
  DELETE_TRIP,
  LOADING_TRIPS,
} from '../utils/constants';

const initialState = {
  currentTripInfo: {},
  trips: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case GET_TRIPS:
      return {
        ...state,
        trips: data,
        loading: false,
      };
    case GET_TRIP_INFO:
      return {
        ...state,
        currentTripInfo: data,
        loading: false,
      };
    case ADD_TRIP:
      return {
        ...state,
        trips: [data, ...state.trips],
        loading: false,
      };
    case DELETE_TRIP:
      return {
        ...state,
        trips: state.trips.filter((trip) => trip.id !== data),
        loadin: false,
      };
    case LOADING_TRIPS:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT:
    case ACCOUNT_DEACTIVATED:
    case NOT_AUTHORIZED:
      return {
        currentTripInfo: {},
        trips: [],
        loading: false,
      };
    default:
      return state;
  }
}
