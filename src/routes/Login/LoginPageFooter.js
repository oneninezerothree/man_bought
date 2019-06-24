import React, { Component } from 'react';
import styles from './LoginPageFooter.css'
export default class LoginPageFooter extends Component {
    render() {
        return (
            <div className={styles.jointLogin}>
                <h2><span>合作账号登录</span></h2>
                <ul id="connect">
                    <li><span className={styles.weibo}></span></li>
                    <li><span className={styles.qq}></span></li>
                    <li className={styles.wxshow} style={{
                        display: 'none'
                    }}><span className={styles.wxshow}></span></li>
                </ul>
            </div>
        )
    }
}