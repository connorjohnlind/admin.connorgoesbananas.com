import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../../store/actions/index';

class Topbar extends Component {
  logoutHandler = () => {
    localStorage.removeItem('token');
    this.props.authRevoke();
  }
  render() {
    if (this.props.auth.token) {
      return <button onClick={this.logoutHandler}>Logout</button>;
    }
    return null;
  }
}

Topbar.propTypes = {
  auth: PropTypes.shape({
    token: PropTypes.string,
  }).isRequired,
  authRevoke: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default connect(({ auth }) => ({ auth }), actions)(withRouter(Topbar));
