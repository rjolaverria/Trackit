import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  auth: { authenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !authenticated && !loading ? (
        <Redirect to='/login' />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapDispatchtoProps = (state) => ({
  auth: state.authReducer,
});
export default connect(mapDispatchtoProps)(PrivateRoute);
