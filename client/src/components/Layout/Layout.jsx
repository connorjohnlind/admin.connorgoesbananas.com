import React from 'react';
import PropTypes from 'prop-types';

import Topbar from '../Navigation/Topbar';

const Layout = props => (
  <div>
    <ul className="side-nav fixed">
      <li><a href="#!">First Sidebar Link</a></li>
      <li><a href="#!">Second Sidebar Link</a></li>
    </ul>

    <Topbar />
    <main>{props.children}</main>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: undefined,
};

export default Layout;
