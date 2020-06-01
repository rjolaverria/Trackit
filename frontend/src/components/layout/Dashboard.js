import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTrips, addTrip } from '../../actions/trips';

import Logger from './Logger';
import Charts from './Charts';
import Trips from './Trips';

const Dashboard = ({ getTrips }) => {
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
  getTrips: PropTypes.func.isRequired,
};

export default connect(null, { getTrips, addTrip })(Dashboard);
