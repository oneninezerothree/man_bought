import React from 'react';
import { Router, Route, Switch } from 'dva/router';
// 登录页
import LoginPage from './routes/LoginPage';
// 注册页
import RegisterPage from './routes/RegisterPage';

import Home from '../src/routes/Home/Home'
import Search from '../src/routes/Search/Search'
import Mine from '../src/routes/Mine/Mine'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <Route path="/Register" exact component={RegisterPage} />
        <Route path="/" exact component={Home} />
        <Route path="/search" exact component={Search} />
        <Route path="/mine" exact component={Mine} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;