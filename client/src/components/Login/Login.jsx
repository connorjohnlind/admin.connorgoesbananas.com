import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import LoginForm from './LoginForm';
import Spinner from '../UI/Spinner/Spinner';
import * as actions from '../../store/actions';

class Login extends Component {
  renderContent() {
    if (this.props.auth.error) {
      localStorage.removeItem('token'); // prevents error message on a reload
      return <div>{this.props.auth.error}</div>;
    } else if (this.props.auth.loading) {
      return <Spinner />;
    } else if (!this.props.auth.loading && localStorage.getItem('token')) {
      this.props.authRenew({ token: localStorage.getItem('token') }, this.props.history);
      return <Spinner />;
    }
    return <LoginForm />;
  }
  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

Login.propTypes = {
  token: PropTypes.string,
  error: PropTypes.shape({}),
  loading: PropTypes.bool,
};

Login.defaultProps = {
  token: null,
  error: null,
  loading: null,
};

export default connect(({ auth }) => ({ auth }), actions)(withRouter(Login));
