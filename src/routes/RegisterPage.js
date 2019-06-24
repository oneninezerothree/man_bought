import React, { Component } from 'react';
import { connect } from 'dva';
// 公共头部组件
import CommonHeader from '../components/CommonHeader';
// 注册页内容
import RegisterPageContent from './Register/RegisterPageContent';

export default connect((state) => {
    return state;
})(
    class LoginPage extends Component {
        render() {
            return (
                <div className="view">
                    <CommonHeader></CommonHeader>
                    <RegisterPageContent></RegisterPageContent>
                </div>
            )
        }
    }
)