import axios from 'axios';
import FileDownload from 'js-file-download';
import {
  GET_TRIPS,
  TRIPS_ERROR,
  GET_TRIP_INFO,
  TRIP_INFO_ERROR,
  ADD_TRIP,
  ADD_TRIP_ERROR,
  GET_CSV,
  CSV_ERROR,
  DELETE_TRIP,
  DELETE_TRIP_ERROR,
  LOADING_TRIPS,
} from '../utils/constants';

// Get All Trips
export const getTrips = () => async (dispatch) => {
  dispatch({
    type: LOADING_TRIPS,
  });

  let token;
  if (localStorage.token) {
    token = localStorage.token;
  }
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  try {
    const res = await axios.get('/api/trips', config);

    dispatch({
      type: GET_TRIPS,
      data: res.data,
    });
  } catch (error) {
    dispatch({
      type: TRIPS_ERROR,
    });
  }
};

// Get Google Trip Info
export const getTripInfo = (origin, destination) => async (dispatch) => {
  dispatch({
    type: LOADING_TRIPS,
  });

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

  const body = JSON.stringify({ origin, destination });

  try {
    const res = await axios.post('/api/trips/get_info', body, config);

    dispatch({
      type: GET_TRIP_INFO,
      data: res.data[0].legs[0],
    });
  } catch (error) {
    dispatch({
      type: TRIP_INFO_ERROR,
    });
  }
};

// Add Trip
export const addTrip = (
  origin,
  destination,
  distance_traveled,
  date_traveled
) => async (dispatch) => {
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

  date_traveled = new Date(date_traveled).toISOString();

  const body = JSON.stringify({
    origin,
    destination,
    distance_traveled,
    date_traveled,
  });

  try {
    const res = await axios.post('/api/trips/add', body, config);

    dispatch({
      type: ADD_TRIP,
      data: res.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_TRIP_ERROR,
    });
  }
};

// Add Trip
export const deleteTrip = (tripId) => (dispatch) => {
  let token;
  if (localStorage.token) {
    token = localStorage.token;
  }
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  try {
    axios.delete(`/api/trips/${tripId}`, config);

    dispatch({
      type: DELETE_TRIP,
      data: tripId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TRIP_ERROR,
    });
  }
};

// Get Results CSV
export const getResultsCSV = (results) => async (dispatch) => {
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

  results.forEach((trip) => {
    delete trip.id;
    delete trip.user;
  });

  const body = JSON.stringify(results);

  try {
    const res = await axios.post('/api/trips/csv/results', body, config);

    dispatch({
      type: GET_CSV,
    });
    FileDownload(res.data, 'trips.csv');
  } catch (error) {
    dispatch({
      type: CSV_ERROR,
    });
  }
};

// Get All Data CSV
export const getAllCSV = () => async (dispatch) => {
  dispatch({
    type: LOADING_TRIPS,
  });

  let token;
  if (localStorage.token) {
    token = localStorage.token;
  }
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  try {
    const res = await axios.get('/api/trips/csv/all', config);
    dispatch({
      type: GET_CSV,
    });
    FileDownload(res.data, 'trips.csv');
  } catch (error) {
    dispatch({
      type: CSV_ERROR,
    });
  }
};
