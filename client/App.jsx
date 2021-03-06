import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import PostNew from './components/NewPost/NewPost';

const App = (props) => {
  let routes = (
    <Switch>
      <Route path="/" exact component={Login} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.auth.token) {
    routes = (
      <Layout>
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/new-post" exact component={PostNew} />
      </Layout>
    );
  }

  return (
    <div>
      {routes}
    </div>
  );
};

App.propTypes = {
  auth: PropTypes.shape({
    token: PropTypes.string,
  }).isRequired,
};

export default hot(module)(withRouter(connect(({ auth }) => ({ auth }))(App)));
