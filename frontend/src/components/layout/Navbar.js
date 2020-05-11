import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth, logout }) => {
  const guest = (
    <Fragment>
      <li className='nav-item'>
        <h6>
          <Link className='nav-link text-white' to='/login'>
            <i className='fas fa-sign-in-alt mr-1' />
            <span className='non-mobile'>Sign in</span>
          </Link>
        </h6>
      </li>
      <li className='nav-item'>
        <h6>
          <Link className='nav-link text-white' to='/Register'>
            <i className='fa fa-pencil-square-o mr-1' aria-hidden='true' />
            <span className='non-mobile'>Register</span>
          </Link>
        </h6>
      </li>
    </Fragment>
  );

  const user = (
    <Fragment>
      <li className='nav-item'>
        <h6>
          <Link className='nav-link text-white' to='/account'>
            <i className='fas fa-user mr-1'></i>
            <span className='non-mobile'>My Account</span>
          </Link>
        </h6>
      </li>
      <li className='nav-item'>
        <h6>
          <a className='nav-link text-white' onClick={logout} href='#'>
            <i className='fas fa-sign-out-alt mr-1' />
            <span className='non-mobile'>Logout</span>
          </a>
        </h6>
      </li>
    </Fragment>
  );

  return (
    <nav className='navbar navbar-expand-sm navbar-light bg-primary'>
      <a className='navbar-brand' href='/'>
        <h2 className='text-white font-weight-bold'>
          Tr<i className='fas fa-car-side' style={{ fontSize: '1.2rem' }}></i>ck
          it
        </h2>
      </a>
      <ul className='nav-items ml-auto'>{auth.authenticated ? user : guest}</ul>
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapDispatchToProps, { logout })(Navbar);
