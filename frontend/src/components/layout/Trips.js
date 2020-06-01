import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllCSV, getResultsCSV, deleteTrip } from '../../actions/trips';

const Trips = ({ trips, getAllCSV, getResultsCSV, deleteTrip }) => {
  // Time helpers
  const today = Date.now();
  const week = 604800000;
  const month = 2592000000;
  const year = 31556952000;
  const convertDate = (date) => {
    date = new Date(date);
    const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    return newDate.toDateString();
  };

  // State
  const [searchData, setSearchData] = useState({
    type: '',
    date: '',
    origin: '',
    destination: '',
    search: false,
    results: [],
  });
  const { type, date, origin, destination, results } = searchData;

  // Display Recent trips
  const displayRecent = () => {
    return trips.filter((trip) => {
      return (
        Date.parse(trip.date_added) < today &&
        Date.parse(trip.date_added) > today - week
      );
    });
  };

  // Run when trips change
  useEffect(() => {
    let list = displayRecent();
    setSearchData({ ...searchData, results: list.slice(0, 9) });
  }, [trips]);

  // Form Handlers
  const onSubmit = (e) => {
    e.preventDefault();
    let list;
    switch (type) {
      case 'origin':
        list = trips.filter((trip) => trip.origin.includes(origin));
        break;
      case 'destination':
        list = trips.filter((trip) => trip.destination.includes(destination));
        break;
      case 'date':
        list = trips.filter(
          (trip) => Date.parse(trip.date_traveled) === Date.parse(date)
        );
        break;
      case 'week':
        list = trips.filter((trip) => {
          return (
            Date.parse(trip.date_traveled) < today &&
            Date.parse(trip.date_traveled) > today - week
          );
        });
        break;
      case 'month':
        list = trips.filter((trip) => {
          return (
            Date.parse(trip.date_traveled) < today &&
            Date.parse(trip.date_traveled) > today - month
          );
        });
        break;
      case '3 months':
        list = trips.filter((trip) => {
          return (
            Date.parse(trip.date_traveled) < today &&
            Date.parse(trip.date_traveled) > today - month * 3
          );
        });
        break;
      case '6 months':
        list = trips.filter((trip) => {
          return (
            Date.parse(trip.date_traveled) < today &&
            Date.parse(trip.date_traveled) > today - month * 6
          );
        });
        break;
      case 'year':
        list = trips.filter((trip) => {
          return (
            Date.parse(trip.date_traveled) < today &&
            Date.parse(trip.date_traveled) > today - year
          );
        });
        break;
      case 'recent':
        list = displayRecent();
        break;
      default:
        break;
    }
    setSearchData({
      ...searchData,
      results: list,
      search: true,
    });
  };
  const onChange = (e) =>
    setSearchData({ ...searchData, [e.target.name]: e.target.value });

  // Total miles
  const resultsTotal = () => {
    let total = 0;
    results.forEach((trip) => {
      total += trip.distance_traveled;
    });
    return total.toFixed(1);
  };

  return (
    <section className='bg-light p-4'>
      <h3 className='text-primary mb-3'>
        <i className='fas fa-table text-secondary'></i> My Trips
      </h3>
      <div id='trips'>
        <div className='d-flex justify-content-between mb-4'>
          {/* Search Form */}
          <form className='row s-trans' onSubmit={onSubmit}>
            <div className='col-auto mb-1'>
              <select
                className='form-control shadow'
                name='type'
                value={type}
                onChange={onChange}
              >
                <option value=''>Search by...</option>
                <option value='origin'>Origin</option>
                <option value='destination'>Destination</option>
                <option value='date'>Specific Date</option>
                <option value='week'>Last week</option>
                <option value='month'>Last Month</option>
                <option value='3 months'>Last 3 Months</option>
                <option value='6 months'>Last 6 Months</option>
                <option value='year'>Last Year</option>
                <option value='recent'>Recently Added</option>
              </select>
            </div>
            {type === 'date' && (
              <div className='col-auto mb-1 trans-fade'>
                <input
                  type='date'
                  className='form-control shadow'
                  placeholder='Date'
                  name='date'
                  value={date}
                  onChange={onChange}
                />
              </div>
            )}
            {type === 'origin' && (
              <div className='col-auto mb-1 trans-fade'>
                <input
                  type='text'
                  className='form-control shadow'
                  placeholder='Enter origin'
                  name='origin'
                  value={origin}
                  onChange={onChange}
                />
              </div>
            )}
            {type === 'destination' && (
              <div className='col-auto mb-1 trans-fade'>
                <input
                  type='text'
                  className='form-control shadow'
                  placeholder='Enter destination'
                  name='destination'
                  value={destination}
                  onChange={onChange}
                />
              </div>
            )}
            <div className='col-auto mb-1'>
              <button type='submit' className='btn btn-danger shadow'>
                Search
              </button>
            </div>
          </form>
          <div className='col-auto'>
            <button
              onClick={() => getResultsCSV(results)}
              className='btn btn-primary shadow'
            >
              Get CSV
            </button>
          </div>
        </div>

        {/* Trips Table */}
        <div>
          <h4 className='text-center'>
            {searchData.search ? 'Search Results' : 'Recent Trips'}
          </h4>
          <table className='table table-hover table-sm mt-2 bg-white trans-fade shadow rounded-all'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>From</th>
                <th scope='col'>To</th>
                <th scope='col'>Date</th>
                <th scope='col'>Distance</th>
                <th>{''}</th>
              </tr>
            </thead>
            <tbody>
              {results && results.length > 0 ? (
                <Fragment>
                  {results.map((trip) => (
                    <tr key={trip.id}>
                      <td>{trip.origin}</td>
                      <td>{trip.destination}</td>
                      <td>{convertDate(trip.date_traveled)}</td>
                      <td>{trip.distance_traveled}</td>
                      <td>
                        <button
                          onClick={() => deleteTrip(trip.id)}
                          className='btn btn-danger btn-sm'
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className='table-primary'>
                    <td
                      colSpan='3'
                      className='text-right font-weight-bold pr-2'
                    >
                      Total Miles:
                    </td>
                    <td colSpan='2'>{resultsTotal()}</td>
                  </tr>
                </Fragment>
              ) : (
                <tr>
                  <td>
                    <h5>No trips...</h5>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

Trips.propTypes = {
  trips: PropTypes.array.isRequired,
  getAllCSV: PropTypes.func.isRequired,
  getResultsCSV: PropTypes.func.isRequired,
  deleteTrip: PropTypes.func.isRequired,
};

const mapDispatchToProps = (state) => ({
  trips: state.tripsReducer.trips,
});

export default connect(mapDispatchToProps, {
  getAllCSV,
  deleteTrip,
  getResultsCSV,
})(Trips);
