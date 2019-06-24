import React from 'react';
import { Router, Route, Switch } from 'dva/router';
// 登录页
import LoginPage from './routes/LoginPage';
// 注册页
import RegisterPage from './routes/RegisterPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <Route path="/Register" exact component={RegisterPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
