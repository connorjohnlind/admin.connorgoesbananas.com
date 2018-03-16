import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <div>Dashboard!</div>
        <Link to="/new-post" className="">
          New Post
        </Link>
      </div>
    );
  }
}


export default Dashboard;
