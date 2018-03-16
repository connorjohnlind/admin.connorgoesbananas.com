import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../../../store/actions';

import './Sidebar.scss';

class Sidebar extends Component {
  logoutHandler = () => {
    localStorage.removeItem('token');
    this.props.authRevoke();
  }
  render() {
    return (
      <div className="Sidebar">
        <div className="links">
          <button onClick={this.logoutHandler}>Logout</button>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  auth: PropTypes.shape({
    token: PropTypes.string,
  }).isRequired,
  authRevoke: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default connect(({ auth }) => ({ auth }), actions)(withRouter(Sidebar));
