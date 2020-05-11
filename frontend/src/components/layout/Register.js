import React, { useState } from 'react';
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
        className='mx-auto col-sm bg-light p-4 text-left'
        style={{ maxWidth: 450 }}
      >
        <form onSubmit={onSubmit}>
          <label className='form-group d-block'>
            Username:
            <input
              type='text'
              className='form-control mt-1'
              id='InputUser'
              name='username'
              onChange={onChange}
              value={username}
              required
            />
          </label>
          <label className='form-group d-block'>
            Email:
            <input
              type='email'
              className='form-control mt-1'
              id='InputEmail'
              name='email'
              onChange={onChange}
              value={email}
              required
            />
          </label>
          <label className='form-group d-block'>
            Password:
            <input
              type='password'
              className='form-control mt-1'
              id='InputPassword'
              name='password'
              onChange={onChange}
              value={password}
              required
            />
          </label>
          <label className='form-group d-block'>
            Verify password:
            <input
              type='password'
              className='form-control mt-1'
              id='InputPassword2'
              name='password2'
              onChange={onChange}
              value={password2}
              required
            />
          </label>
          <button type='submit' className='btn btn-primary'>
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
