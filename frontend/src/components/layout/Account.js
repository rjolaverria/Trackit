import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { updateUser, deactivateUser } from '../../actions/auth';
import { getAllCSV } from '../../actions/trips';
import { connect } from 'react-redux';

const Account = ({ auth: { user }, updateUser, deactivateUser, getAllCSV }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
  });
  const { username, email, first_name, last_name } = formData;

  useEffect(() => {
    setFormData({
      username: !user || !user.username ? '' : user.username,
      email: !user || !user.email ? '' : user.email,
      first_name: !user || !user.first_name ? '' : user.first_name,
      last_name: !user || !user.last_name ? '' : user.last_name,
    });
  }, [user]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateUser(username, email, first_name, last_name);
  };

  return (
    <section>
      <h1 className='p-4 m-0 text-dark font-weight-bold'>
        <i className='fas fa-user mr-1 text-primary'></i> My Account
      </h1>

      <div className='col-sm p-4 text-left' style={{ maxWidth: 450 }}>
        <form onSubmit={onSubmit}>
          <label className='form-group d-block bg-light shadow p-1'>
            Username:
            <input
              type='text'
              className='form-control border-0'
              id='InputUser'
              name='username'
              onChange={onChange}
              value={username}
              disabled
            />
          </label>
          <label className='form-group d-block bg-white shadow p-1'>
            Email:
            <input
              type='email'
              className='form-control border-0'
              id='InputEmail'
              name='email'
              onChange={onChange}
              value={email}
              required
            />
          </label>
          <label className='form-group d-block bg-white shadow p-1'>
            First Name:
            <input
              type='text'
              className='form-control border-0'
              id='first_name'
              name='first_name'
              onChange={onChange}
              value={first_name}
              required
            />
          </label>
          <label className='form-group d-block bg-white shadow p-1'>
            Last Name:
            <input
              type='text'
              className='form-control border-0'
              id='last_name'
              name='last_name'
              onChange={onChange}
              value={last_name}
              required
            />
          </label>
          {user &&
          (first_name !== user.first_name ||
            last_name !== user.last_name ||
            email !== user.email) ? (
            <button type='submit' className='btn btn-primary shadow'>
              Save
            </button>
          ) : (
            <button type='submit' className='btn btn-primary shadow' disabled>
              Save
            </button>
          )}
        </form>
        <div className='mt-4'>
          <p>
            Export All of your trips:{' '}
            <button
              onClick={() => getAllCSV()}
              className='ml-1 btn btn-sm btn-primary shadow'
            >
              Export All
            </button>
          </p>
          <p>
            Want to deactivate your account?{' '}
            <button
              onClick={() => deactivateUser()}
              className=' ml-1 btn-danger btn btn-sm shadow'
            >
              Deactivate
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

Account.propTypes = {
  auth: PropTypes.object.isRequired,
  deactivateUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  getAllCSV: PropTypes.func.isRequired,
};

const mapDispatchToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapDispatchToProps, {
  updateUser,
  deactivateUser,
  getAllCSV,
})(Account);
