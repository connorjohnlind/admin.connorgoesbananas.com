import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from './Sidebar/Sidebar';

import './Layout.scss';

const Layout = props => (
  <div className="Layout">
    <Sidebar />
    <main className="main">{props.children}</main>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: undefined,
};

export default Layout;
