import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Dashboard.scss';

class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard">
        <div>Dashboard!</div>
        <Link to="/new-post" className="">
          New Post
        </Link>
        <p>Hey!</p>
        <p>Hey!</p>
        <p>Hey!</p>
        <p>Hey!</p>
        <p>Hey!</p>
        <p>Hey!</p>
      </div>
    );
  }
}


export default Dashboard;
