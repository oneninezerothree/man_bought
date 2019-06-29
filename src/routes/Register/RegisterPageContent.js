import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './RegisterPageContent.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
// 公共弹窗组件
import CommonCover from '../../components/CommonCover';
export default withRouter(connect((state) => {
    return state;
})(
    class LoginPage extends Component {
        // 初始化数据
        constructor(props) {
            super(props)
            this.state = {
                telephone: '',
                password: '',
                verifyCode: '',
                currentCode: '',
                regBtnClass: false,
                checkedBox: true,
                errirHintText: '',
                showDelUser: false,
                showDelPsw: false,
                showDelVerify: false,
            }
        }
        // 挂载之后
        componentDidMount() {
            // 挂载之后获取一次验证码
            this.getVerifyCode();
        }

        // 获取当前验证码
        getVerifyCode() {
            let code = '123456789012345678901234567890asdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
            let currentCode = [];

            for (let i = 0; i < 6; i++) {
                currentCode.push(code.split('')[(Math.random() * code.length).toFixed(0)])
            }
            this.setState(
                () => {
                    return {
                        currentCode: currentCode.join(''),
                    }
                }
            )
        }

        // 判断三个输入框非空更换类名
        ifInputValue() {
            if (this.state.telephone !== '' && this.state.password !== '' && this.state.verifyCode !== '') {
                this.setState(
                    () => {
                        return {
                            regBtnClass: true
                        }
                    }
                )
            } else {
                this.setState(
                    () => {
                        return {
                            regBtnClass: false
                        }
                    }
                )
            }
        }

        // 同步表单输入数据
        syncInputValue(type) {
            // 当前输入为手机号框时
            if (type === 'telephone') {
                // 同步输入框值
                this.setState(
                    () => {
                        return {
                            telephone: this.refs.telephone.value,
                        }
                    },
                    // 设置新值后调用判断非空
                    () => {
                        this.ifInputValue();
                    }
                )
                // 判断清除按钮出现
                if (this.refs.telephone.value) {
                    this.setState({
                        showDelUser: true
                    })
                } else {
                    this.setState({
                        showDelUser: false
                    })
                }
                // 当前输入为密码框时
            } else if (type === 'password') {
                // 同步输入框值
                this.setState(
                    () => {
                        return {
                            password: this.refs.password.value
                        }
                    },
                    // 设置新值后调用判断非空
                    () => {
                        this.ifInputValue();
                    }
                )
                // 判断清除按钮出现
                if (this.refs.password.value) {
                    this.setState({
                        showDelPsw: true
                    })
                } else {
                    this.setState({
                        showDelPsw: false
                    })
                }
                // 当前输入为验证码框时
            } else if (type === 'verifyCode') {
                // 同步输入框值
                this.setState(
                    () => {
                        return {
                            verifyCode: this.refs.verifyCode.value
                        }
                    },
                    // 设置新值后调用判断非空
                    () => {
                        this.ifInputValue();
                    }
                )
                // 判断清除按钮出现
                if (this.refs.verifyCode.value) {
                    this.setState({
                        showDelVerify: true
                    })
                } else {
                    this.setState({
                        showDelVerify: false
                    })
                }
            }
        }

        // 清除输入内容
        deleteContent(node) {
            if (node === 'telephone') {
                this.refs.telephone.value = '';
                this.setState({
                    showDelUser: false,
                })
            } else if (node === 'password') {
                this.refs.password.value = '';
                this.setState({
                    showDelPsw: false,
                })
            } else {
                this.refs.verifyCode.value = '';
                this.setState({
                    showDelVerify: false,
                })
            }
        }
        // 注册按钮点击事件
        async registerFunction() {
            // 手机号正则
            let verifyTelephone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
            // 第一层判断非空
            if (this.state.telephone !== '' && this.state.password !== '' && this.state.verifyCode !== '') {
                // 判断手机号是否可用
                if (!verifyTelephone.test(this.state.telephone)) {
                    this.props.dispatch({
                        type: 'example/save',
                        payload: {
                            inputErrorHint: true,
                            errorHintText: '请输入正确手机号！'
                        }
                    })
                    // 判断验证码是否正确
                } else if (this.state.password.length < 6) {
                    this.props.dispatch({
                        type: 'example/save',
                        payload: {
                            inputErrorHint: true,
                            errorHintText: '密码最少6位！'
                        }
                    })
                } else if (this.state.verifyCode.toLowerCase() !== this.state.currentCode.toLowerCase()) {
                    this.props.dispatch({
                        type: 'example/save',
                        payload: {
                            inputErrorHint: true,
                            errorHintText: '验证码有误！'
                        }
                    })
                    // 判断是否勾选协议
                } else if (!this.state.checkedBox) {
                    this.props.dispatch({
                        type: 'example/save',
                        payload: {
                            inputErrorHint: true,
                            errorHintText: '请勾选协议！'
                        }
                    })
                } else {
                    const responseData = await axios.get(`http://localhost:3000/mongodb/register?username=${this.state.telephone}&password=${this.state.password}`);
                    if (responseData.data.status) {
                        this.props.dispatch({
                            type: 'example/save',
                            payload: {
                                inputErrorHint: true,
                                errorHintText: '注册成功！'
                            }
                        })
                        setTimeout(() => {
                            document.cookie = `username=${this.state.telephone}`;
                            this.props.history.push('/');
                        }, 1500);
                    } else {
                        this.props.dispatch({
                            type: 'example/save',
                            payload: {
                                inputErrorHint: true,
                                errorHintText: '用户名已存在！'
                            }
                        })
                    }

                }
            } else {
                this.props.dispatch({
                    type: 'example/save',
                    payload: {
                        inputErrorHint: true,
                        errorHintText: '请将信息填写完整！'
                    }
                })
            }
        }
        render() {
            return (
                <div className={styles.nctouchInpCon}>
                    <form action="" method="">
                        <ul className={styles.formBox}>
                            <li className={styles.formItem}>
                                <h4>手&nbsp;机&nbsp;号</h4>
                                <div className={styles.inputBox}>
                                    <input vlaue={this.state.telephone} ref="telephone" onChange={
                                        () => {
                                            this.syncInputValue('telephone');
                                        }
                                    } placeholder="请输入手机号" defaultValue={this.state.telephone} className={styles.inp} name="usermobile" id="usermobile" maxLength="11" />
                                    <span style={{
                                        display: this.state.showDelUser ? 'block' : 'none',
                                    }} onClick={
                                        () => {
                                            this.deleteContent('telephone');
                                            this.syncInputValue('telephone');
                                        }
                                    } className={styles.inputDel}></span></div>
                            </li>
                            <li className={styles.formItem}>
                                <h4>密　码</h4>
                                <div className={styles.inputBox}>
                                    <input defaultValue={this.state.password} ref="password" onChange={
                                        () => {
                                            this.syncInputValue('password');
                                        }
                                    } type="password" placeholder="登录密码" className={styles.inp} name="pwd" id="userpwd" />
                                    <span style={{
                                        display: this.state.showDelPsw ? 'block' : 'none',
                                    }} onClick={
                                        () => {
                                            this.deleteContent('password');
                                            this.syncInputValue('password');
                                        }
                                    } className={styles.inputDel}></span> </div>
                            </li>
                            <li className={styles.formItem}>
                                <h4>验&nbsp;证&nbsp;码</h4>
                                <div className={styles.inputBox}>
                                    <input type="text" ref="verifyCode" defaultValue={this.state.verifyCode} onChange={
                                        () => {
                                            this.syncInputValue('verifyCode');
                                        }
                                    } id="captcha" name="captcha" maxLength="6" size="10" className={styles.inp} placeholder="输入验证码" />
                                    <span style={{
                                        display: this.state.showDelVerify ? 'block' : 'none',
                                    }} onClick={
                                        () => {
                                            this.deleteContent('verifyCode');
                                            this.syncInputValue('verifyCode');
                                        }
                                    } className={`${styles.inputDel} ${styles.code}`}></span><span id="refreshcode" className={styles.codeImg}><span onClick={() => {
                                        this.getVerifyCode();
                                    }}>{this.state.currentCode}</span></span>
                                    <input type="hidden" id="codekey" name="codekey" value="241da99b" />
                                </div>
                            </li>
                        </ul>
                        <div className={styles.rememberForm}>
                            <input id="checkbox" type="checkbox" defaultChecked={this.state.checkedBox} onClick={
                                // 点击置反选中默认值
                                () => {
                                    this.setState(
                                        () => {
                                            return {
                                                checkedBox: !this.state.checkedBox,
                                            }
                                        }
                                    )
                                }
                            } />
                            <label htmlFor="checkbox">同意</label>
                            <a className={styles.regCms} target="_blank">用户注册协议</a> </div>
                        <div className={`${styles.formBtn} ${this.state.regBtnClass ? styles.ok : ''}`}><span onClick={this.registerFunction.bind(this)} className={styles.btn} id="refister_mobile_btn">注册</span></div>
                    </form>
                    {this.props.example.inputErrorHint ? <CommonCover /> : ''}
                </div>
            )
        }
    }
))