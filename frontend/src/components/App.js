import React, { Fragment, useEffect } from 'react';
import { render } from 'react-dom';

// Routing
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../components/routing/PrivateRoute';

// Components
import Navbar from './layout/Navbar';
import Landing from './layout/Landing';
import Login from './layout/Login';
import Register from './layout/Register';
import Dashboard from './layout/Dashboard';
import Account from './layout/Account';

// Redux
import { Provider } from 'react-redux';
import store from '../store';

// Auth
import { authorizeUser } from '../actions/auth';

//Alert
import 'react-toastify/dist/ReactToastify.css';
import Alert from './layout/Alert';

const App = () => {
  useEffect(() => {
    store.dispatch(authorizeUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <main>
            <Alert />
            <Switch>
              <Route exact path='/' component={Landing} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/account' component={Account} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
            </Switch>
          </main>
        </Fragment>
      </Router>
    </Provider>
  );
};

render(<App />, document.getElementById('app'));
