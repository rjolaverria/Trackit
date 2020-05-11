import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTrips, addTrip } from '../../actions/trips';

import Logger from './Logger';
import Charts from './Charts';
import Trips from './Trips';

const Dashboard = ({ auth, getTrips, trips }) => {
  useEffect(() => {
    getTrips();
  }, []);
  return (
    <Fragment>
      <h1 className='p-4 m-0 text-dark font-weight-bold'>
        <i className='fas fa-tachometer-alt text-primary'></i> Dashboard
      </h1>
      <Charts />
      <Logger />
      <Trips />
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getTrips: PropTypes.func.isRequired,
  trips: PropTypes.array.isRequired,
};

const mapDispatchToProps = (state) => ({
  auth: state.authReducer,
  trips: state.tripsReducer.trips,
});

export default connect(mapDispatchToProps, { getTrips, addTrip })(Dashboard);
