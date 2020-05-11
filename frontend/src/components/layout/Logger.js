import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTripInfo, addTrip } from '../../actions/trips';

import Loading from './Loading';

const Logger = ({ getTripInfo, addTrip, currentTripInfo, loading }) => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    distance_traveled: '',
    date_traveled: '',
  });

  const [displayAdd, toggleAdd] = useState(false);
  const { origin, destination, distance_traveled, date_traveled } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    if (currentTripInfo.distance) {
      setFormData({
        ...formData,
        origin: currentTripInfo.start_address,
        destination: currentTripInfo.end_address,
        distance_traveled: currentTripInfo.distance.text,
      });
      toggleAdd(true);
    }
  }, [currentTripInfo]);

  const onSubmit = async (e) => {
    e.preventDefault();
    getTripInfo(origin, destination);
  };

  const add = () => {
    addTrip(
      origin,
      destination,
      distance_traveled.replace(/[^\d.]/g, ''),
      date_traveled
    );
    setFormData({
      origin: '',
      destination: '',
      distance_traveled: '',
      date_traveled: '',
    });
    toggleAdd(false);
  };
  return (
    <section className='p-4'>
      <h3 className='text-primary mb-3'>
        <i className='fas fa-pencil-alt text-secondary'></i> Log a trip
        {loading && (
          <span className='ml-4' style={{ position: 'relative' }}>
            <Loading size={30} />
          </span>
        )}
      </h3>
      <div id='logger'>
        <form onSubmit={onSubmit}>
          <div className='row s-trans'>
            <div className='col-auto mb-2'>
              <input
                type='date'
                className='form-control shadow'
                placeholder='Date Traveled...'
                name='date_traveled'
                value={date_traveled}
                onChange={onChange}
                required
              />
            </div>
            <div className='col-auto mb-2'>
              <input
                type='text'
                className='form-control shadow'
                placeholder='Origin...'
                name='origin'
                value={origin}
                onChange={onChange}
                required
              />
            </div>
            <div className='col-auto mb-2'>
              <input
                type='text'
                className='form-control shadow'
                placeholder='Destination...'
                name='destination'
                value={destination}
                onChange={onChange}
                required
              />
            </div>
            {distance_traveled && (
              <div className='col-auto trans-fade'>
                <span className='font-weight-bold text-danger'>Distance: </span>{' '}
                {distance_traveled}
              </div>
            )}
            <div className='col-auto mb-2'>
              <button type='submit' className='btn btn-primary shadow'>
                Calculate
              </button>
              {displayAdd && (
                <button
                  onClick={add}
                  className='ml-2 btn btn-danger trans-fade shadow'
                >
                  Log Trip
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

Logger.propTypes = {
  getTripInfo: PropTypes.func.isRequired,
  addTrip: PropTypes.func.isRequired,
  currentTripInfo: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (state) => ({
  currentTripInfo: state.tripsReducer.currentTripInfo,
  loading: state.tripsReducer.loading,
});

export default connect(mapDispatchToProps, { getTripInfo, addTrip })(Logger);
