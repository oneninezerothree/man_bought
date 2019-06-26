import React from 'react';
import { Router, Route, Switch } from 'dva/router';
// 登录页
import LoginPage from './routes/LoginPage';
// 注册页
import RegisterPage from './routes/RegisterPage';
// 购物车页
import ShoppingCart from './routes/ShoppingCart';
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
        <Route path="/cart" exact component={ShoppingCart} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
