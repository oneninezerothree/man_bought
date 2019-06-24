import React, { Component } from 'react';
import styles from './LoginPageContent.css'
export default class LoginPageContent extends Component {
    render() {
        return (
            <div className={`${styles.nctouchMainLayout} ${styles.fixedWidth}`}>
                <div className={styles.nctouchInpCon}>
                    <form action="" method="">
                        <ul className="form-box">
                            <li className="form-item">
                                <h4>账　户</h4>
                                <div className={styles.inputBox}>
                                    <input type="text" placeholder="用户名/邮箱/已验证手机" className={styles.inp} name="username" id="username" />
                                    <span className={styles.inputDel}></span> </div>
                            </li>
                            <li className="form-item">
                                <h4>密　码</h4>
                                <div className={styles.inputBox}>
                                    <input type="password"  placeholder="登录密码" className={styles.inp} name="pwd" id="userpwd" />
                                    <span className={styles.inputDel}></span> </div>
                            </li>
                        </ul>
                        <div className={styles.rememberForm}>
                            <input id="checkbox" type="checkbox" defaultChecked="checked" className="checkbox" />
                            <label htmlFor="checkbox">七天自动登录</label>
                            <a className={styles.forgotPassword} href="find_password.html">忘记密码？</a> </div>
                        <div className="error-tips"></div>
                        <div className={`${styles.formBtn} ${styles.ok}`}><span  className={styles.btn} id="loginbtn">登录</span></div>
                    </form>
                </div>
            </div>
        )
    }
}