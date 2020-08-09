import React, { useState, useEffect, useRef } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { toast } from 'react-toastify';

const Register = ({ register, authenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const inputRef = useRef(null);
  useEffect(() => inputRef.current.focus(), []);

  const { username, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password2 !== password) {
      toast.error('Passwords dont match', { position: 'top-center' });
    } else if (password.length < 6) {
      toast.error('Password too weak', { position: 'top-center' });
    } else {
      register({ username, email, password });
    }
  };

  if (authenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='text-center mt-4 container'>
      <h1 className='display-3 text-primary mb-4'>Register</h1>
      <div
        className='mx-auto col-sm bg-light p-4 text-left shadow'
        style={{ maxWidth: 450 }}
      >
        <form onSubmit={onSubmit}>
          <label className='form-group d-block bg-white shadow p-1'>
            <input
              type='text'
              ref={inputRef}
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
              type='email'
              className='form-control mt-1 border-0'
              id='InputEmail'
              name='email'
              onChange={onChange}
              value={email}
              placeholder='Email Address'
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
          <label className='form-group d-block bg-white shadow p-1'>
            <input
              type='password'
              className='form-control mt-1 border-0'
              id='InputPassword2'
              name='password2'
              onChange={onChange}
              value={password2}
              placeholder='Verify Password'
              required
            />
          </label>
          <button type='submit' className='btn btn-primary shadow'>
            Register
          </button>
        </form>
        <p className='mt-4 text-center'>
          Have an account?
          <Link className='text-primary ml-1' to='/login'>
            Log In
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

Register.propTypes = {
  authenticated: PropTypes.bool,
};

const mapDispatchToProps = (state) => ({
  authenticated: state.authReducer.authenticated,
});

export default connect(mapDispatchToProps, { register })(Register);
