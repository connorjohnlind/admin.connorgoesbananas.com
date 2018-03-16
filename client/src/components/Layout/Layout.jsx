import React from 'react';
import PropTypes from 'prop-types';

import Topbar from '../Navigation/Topbar';

const Layout = props => (
  <div>
    <Topbar />
    <main>
      {props.children}
    </main>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: undefined,
};

export default Layout;
