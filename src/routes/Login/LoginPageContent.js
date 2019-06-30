import React, { Component } from 'react';
import styles from './LoginPageContent.css'
import { connect } from 'dva';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
export default withRouter(connect((state) => {
    return state;
})(class LoginPageContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            selectAging: true,
        }
    }

    //  同步输入值
    syncInputValue(node) {
        if (node === 'username') {
            this.setState(
                () => {
                    return {
                        username: this.refs.username.value,
                    }
                }
            )
        } else {
            this.setState(
                () => {
                    return {
                        password: this.refs.password.value,
                    }
                },
            )
        }
    }
    //设置 cookie
    setCookie(key, val, iDay) {
        let time = new Date();
        time.setDate(time.getDate() + iDay);
        document.cookie = key + '=' + val + ';expires=' + time;
    }

    // 点击登录
    async LoginFunction() {
        const requestData = await axios.get(`http://120.79.238.129:3000/mongodb/login?username=${this.state.username}&password=${this.state.password}`)

        // 非空
        if (this.state.username !== '' && this.state.password !== '') {
            // 已注册
            if (requestData.data.status) {
                // 勾选7天
                if (this.state.selectAging) {
                    this.setCookie('uesrname', this.state.username, 7);
                    // 未勾选7天
                } else {
                    this.setCookie('uesrname', this.state.username, 0);
                }
                this.props.dispatch({
                    type: 'example/save',
                    payload: {
                        inputErrorHint: true,
                        errorHintText: '登录成功！'
                    }
                })
                setTimeout(() => {
                    this.props.history.push('/');
                }, 1600);
                // 未注册
            } else {
                this.props.dispatch({
                    type: 'example/save',
                    payload: {
                        inputErrorHint: true,
                        errorHintText: '用户名或密码有误！'
                    }
                })
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
            <div className={`${styles.nctouchMainLayout} ${styles.fixedWidth}`}>
                <div className={styles.nctouchInpCon}>
                    <form action="" method="">
                        <ul className="form-box">
                            <li className="form-item">
                                <h4>账　户</h4>
                                <div className={styles.inputBox}>
                                    <input type="text" defaultValue={this.state.username} onChange={
                                        () => {
                                            this.syncInputValue('username');
                                        }
                                    } ref="username" placeholder="用户名/手机" maxLength="11" className={styles.inp} name="username" id="username" />
                                    <span className={styles.inputDel}></span> </div>
                            </li>
                            <li className="form-item">
                                <h4>密　码</h4>
                                <div className={styles.inputBox}>
                                    <input type="password" defaultValue={this.state.password} onChange={
                                        () => {
                                            this.syncInputValue('password');
                                        }
                                    } ref="password" placeholder="登录密码" className={styles.inp} name="pwd" id="userpwd" />
                                    <span className={styles.inputDel}></span> </div>
                            </li>
                        </ul>
                        <div className={styles.rememberForm}>
                            <input id="checkbox" type="checkbox" defaultChecked={this.state.selectAging} onClick={
                                () => {
                                    this.setState(
                                        () => {
                                            return {
                                                selectAging: !this.state.selectAging
                                            }
                                        }
                                    )
                                }
                            } className="checkbox" />
                            <label htmlFor="checkbox">七天自动登录</label>
                            <a className={styles.forgotPassword}>忘记密码？</a> </div>
                        <div className="error-tips"></div>
                        <div className={`${styles.formBtn} ${styles.ok}`}><span onClick={this.LoginFunction.bind(this)} className={styles.btn} id="loginbtn">登录</span></div>
                    </form>
                </div>
            </div>
        )
    }
}))