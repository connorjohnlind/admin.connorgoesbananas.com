import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import LoginForm from './LoginForm';
import Spinner from '../UI/Spinner/Spinner';
import * as actions from '../../store/actions';

class Login extends Component {
  componentDidMount() {
    // if redux store is empty and localStorage token present, try to renew
    if (!this.props.auth.loading && localStorage.getItem('token')) {
      this.props.authRenew({ token: localStorage.getItem('token') }, this.props.history);
    }
  }
  renderContent() {
    if (this.props.auth.error) {
      localStorage.removeItem('token'); // prevents error message on a reload
      return <LoginForm err={this.props.auth.error.statusText} />;
    } else if (this.props.auth.loading) {
      return <Spinner />;
    }
    return <LoginForm />;
  }
  render() {
    return (
      <div>
        <h3>Connor Goes Bananas</h3>
        <h1>Content Management System</h1>
        {this.renderContent()}
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.shape({
    error: PropTypes.shape({
      statusText: PropTypes.string,
    }),
    loading: PropTypes.bool,
  }).isRequired,
  authRenew: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default connect(({ auth }) => ({ auth }), actions)(withRouter(Login));
