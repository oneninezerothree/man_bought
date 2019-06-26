import React, { Component } from 'react';
import { connect } from 'dva';
// 公共头部组件
import CommonHeader from '../components/CommonHeader';
// 登录页表单
import LoginPageContent from './Login/LoginPageContent';
// 登录页尾部
import LoginPageFooter from './Login/LoginPageFooter';
// 公共弹窗
import CommonCover from '../components/CommonCover';
export default connect((state) => {
    return state;
})(
    class LoginPage extends Component {
        render() {
            return (
                <div className="view">
                    <CommonHeader params={{
                        textOne: '登录',
                        textTwo: '注册',
                        toPath: '/register'
                    }}></CommonHeader>
                    <LoginPageContent></LoginPageContent>
                    <LoginPageFooter></LoginPageFooter>
                    {this.props.example.inputErrorHint ? <CommonCover /> : ''}
                </div>
            )
        }
    }
)