import React, { Component } from 'react';
import styles from './CommonHeader.css';
import { Link, withRouter } from 'react-router-dom';
export default withRouter(class R_CommHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            onDropdown: false
        }
    }
    changeDropdown() {
        this.setState(
            () => {
                return {
                    onDropdown: !this.state.onDropdown
                }
            },
            () => {
                this.refs.clickClose.onclick = () => {
                    this.setState(
                        () => {
                            return {
                                onDropdown: false
                            }
                        }
                    )
                }
            }
        )
    }
    componentDidUpdate() {

    }
    render() {
        return (
            <header className={`${styles.Rheader} ${styles.fixed}`}>
                <div className={styles.headerWrap}>
                    <div className={styles.headerL}>
                        {
                            this.props.params.showDropdown ? <a onClick={() => { this.props.history.goBack() }}><i className={styles.back}></i></a> : <Link to="/"><i className={styles.home}></i></Link>
                        }
                    </div>
                    <div className={styles.headerTitle}>
                        <h1>{this.props.params.textOne}</h1>
                    </div>
                    <div className={styles.headerR}>
                        {
                            this.props.params.showDropdown ? <span onClick={
                                () => {
                                    this.changeDropdown();
                                }
                            } id={styles.headerNav}><i className={styles.more}></i><sup></sup></span> : <Link id={styles.headerNav} to={{
                                pathname: this.props.params.toPath,
                            }} className={styles.text}>{this.props.params.textTwo}</Link>
                        }
                    </div>
                </div>
                <div ref="clickClose" className={`${styles.nctouchNavLayout} ${this.state.onDropdown ? styles.show : ''}`}>
                    <div className={styles.nctouchNavMenu}> <span className={styles.arrow}></span>
                        <ul>
                            <li><Link to="/"><i className={styles.home}></i>首页</Link></li>
                            <li><Link to="search"><i className={styles.search}></i>搜索</Link></li>
                            <li><Link to="/classify"><i className={styles.categroy}></i>分类</Link></li>
                            <li><Link to="message"><i className={styles.message}></i>消息</Link></li>
                            <li><Link to="my"><i className={styles.member}></i>我的商城</Link></li>
                        </ul>
                    </div>
                </div>
            </header>
        )
    }
})