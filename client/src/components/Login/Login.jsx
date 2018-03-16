import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoginForm from './LoginForm';
import Spinner from '../UI/Spinner/Spinner';

class Login extends Component {
  renderContent() {
    if (this.props.error) {
      return <div>{this.props.error}</div>;
    } else if (this.props.loading) {
      return <Spinner />;
    } else if (this.props.token) {
      return <Dashboard />;
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

const mapStateToProps = state => ({
  token: state.auth.string,
  error: state.auth.error,
  loading: state.auth.loading,
});

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

export default connect(mapStateToProps)(Login);
