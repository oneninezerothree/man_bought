import React from 'react';
import { Router, Route, Switch } from 'dva/router';

import Home from '../src/routes/Home/Home'
import Search from '../src/routes/Search/Search'
import Mine from '../src/routes/Mine/Mine'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/search" exact component={Search} />
        <Route path="/mine" exact component={Mine} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;