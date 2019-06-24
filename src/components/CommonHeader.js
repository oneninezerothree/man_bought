import React, { Component } from 'react';
import styles from './CommonHeader.css';
import { Link } from 'react-router-dom';
export default class R_CommHeader extends Component {
    render() {
        return (
            <header className={styles.Rheader}>
                <div className={styles.headerWrap}>
                    <div className={styles.headerL}><a href="../../index.html"><i className={styles.home}></i></a></div>
                    <div className={styles.headerTitle}>
                        <h1>登录</h1>
                    </div>
                    <div className={styles.headerR}> <Link id={styles.headerNav} to={{
                        pathname: '/register',
                    }} className={styles.text}>注册</Link></div>
                </div>
            </header>
        )
    }
}