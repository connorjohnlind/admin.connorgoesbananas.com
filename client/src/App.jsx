import React from 'react';
import { Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import NewPost from './components/NewPost/NewPost';

const App = () => (
  <div>
    <Route path="/" exact component={Login} />
    <Route path="/dashboard" exact component={Dashboard} />
    <Route path="/new-post" exact component={NewPost} />
  </div>
);

export default App;
