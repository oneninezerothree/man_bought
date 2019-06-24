import React, { Component } from 'react';
import { connect } from 'dva';
// 公共头部组件
import CommonHeader from '../components/CommonHeader';
// 登录页表单
import LoginPageContent from './Login/LoginPageContent';
// 登录页尾部
import LoginPageFooter from './Login/LoginPageFooter';

export default connect((state) => {
    return state;
})(
    class LoginPage extends Component {
        render() {
            return (
                <div className="view">
                    <CommonHeader></CommonHeader>
                    <LoginPageContent></LoginPageContent>
                    <LoginPageFooter></LoginPageFooter>
                </div>
            )
        }
    }
)