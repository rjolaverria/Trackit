import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ authenticated }) => {
  if (authenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing text-center'>
      <div className='dark-overlay'>
        <div
          className='d-flex flex-column justify-content-center'
          style={{ height: '70vh' }}
        >
          <h1 className='display-1 font-weight-bold text-white mt-4 pt-4'>
            Tr<i className='fas fa-car-side' style={{ fontSize: '3.5rem' }}></i>
            ck it
          </h1>
          <p className='lead text-white'>
            Keep track of your miles traveled during work for taxes or employer
            reimbursement.
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-light btn-lg mx-1'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-primary btn-lg mx-1'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
Landing.propTypes = {
  authenticated: PropTypes.bool,
};

const mapDispatchToProps = (state) => ({
  authenticated: state.authReducer.authenticated,
});

export default connect(mapDispatchToProps)(Landing);
