import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { connect } from 'dva';
// 登录页
import LoginPage from './routes/LoginPage';
// 注册页
import RegisterPage from './routes/RegisterPage';

import Home from '../src/routes/Home/Home'
import Search from '../src/routes/Search/Search'
import Mine from '../src/routes/Mine/Mine'
import Detail from './routes/Detail/Detail';
import Category from './routes/Category/Category';
import Lists from './routes/Lists/Lists';
// 购物车页
import ShoppingCart from './routes/ShoppingCart';
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <Route path="/Register" exact component={RegisterPage} />
        <Route path="/" exact component={Home} />
        <Route path="/search" exact component={Search} />
        <Route path="/mine" exact component={Mine} />
        <Route path="/register" exact component={RegisterPage} />
        <Route path="/cart" exact component={ShoppingCart} />
        <Route path="/detail" component={Detail} />
        <Route path="/category" exact component={Category} />
        <Route path="/lists" exact component={Lists} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;