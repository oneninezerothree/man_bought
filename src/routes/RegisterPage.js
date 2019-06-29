import React, { Component } from 'react';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';

// 公共头部组件
import CommonHeader from '../components/CommonHeader';
// 注册页内容
import RegisterPageContent from './Register/RegisterPageContent';

export default withRouter(connect((state) => {
    return state;
})(
    class LoginPage extends Component {
        render() {
            return (
                <div className="view">
                    <CommonHeader params={{
                        textOne: '注册',
                        textTwo: '登录',
                        toPath: '/login'
                    }}></CommonHeader>
                    <RegisterPageContent></RegisterPageContent>
                </div>
            )
        }
    }
))