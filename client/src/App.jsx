import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import PostNew from './components/PostNew/PostNew';

const App = () => (
  <div>
    <Route path="/" exact component={Dashboard} />
    <Route path="/new-post" exact component={PostNew} />
  </div>
);

export default App;
