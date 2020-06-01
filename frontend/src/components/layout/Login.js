import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, authenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
  };

  if (authenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='text-center mt-4 container'>
      <h1 className='display-3 text-primary mb-4'>Sign In</h1>
      <div
        className='mx-auto col-sm bg-light p-4 text-left shadow'
        style={{ maxWidth: 450 }}
      >
        <form onSubmit={onSubmit}>
          <label className='form-group d-block bg-white shadow p-1'>
            <input
              type='text'
              className='form-control mt-1 border-0'
              id='InputUser'
              name='username'
              onChange={onChange}
              value={username}
              placeholder='Username'
              required
            />
          </label>
          <label className='form-group d-block bg-white shadow p-1'>
            <input
              type='password'
              className='form-control mt-1 border-0'
              id='InputPassword'
              name='password'
              onChange={onChange}
              value={password}
              placeholder='Password'
              required
            />
          </label>
          <button type='submit' className='btn btn-primary shadow'>
            Sign In
          </button>
        </form>
        <p className='mt-4 text-center'>
          Don't have an account?
          <Link className='text-primary ml-1' to='/register'>
            Register here
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

Login.propTypes = {
  authenticated: PropTypes.bool,
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (state) => ({
  authenticated: state.authReducer.authenticated,
});

export default connect(mapDispatchToProps, { login })(Login);
