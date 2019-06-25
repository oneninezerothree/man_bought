import React from 'react'
import styles from './mine.css'
import {withRouter,Link} from 'react-router-dom'

class Header extends React.Component {
    state = {
        show : false
    }
    showList(){
        this.setState({
            show : !this.state.show
        })
    }
    render() {
        return (
            <header id={styles.header} className={styles.transparent}>
                <div className={styles.headerWrap}>
                    <div className={styles.headerL}> <a> 
                        <i className={styles.set}></i> </a> 
                    </div>
                    <div className={styles.headerTitle}>
                        <h1>我的商城</h1>
                    </div>
                    <div className={styles.headerR} > 
                        <a id={styles.headerNav} href="javascript:void(0);">
                            <i className={styles.more} onClick={this.showList.bind(this)}></i>
                            <sup></sup>
                        </a> 
                    </div>
                </div>
                <div className={this.state.show? `${styles.nctouchNavLayout} ${styles.show}` : `${styles.nctouchNavLayout}`} >
                    <div className={styles.nctouchNavMenu}> <span className={styles.arrow}></span>
                        <ul>
                            <li>
                                <Link to={{
                                    pathname : '/'
                                }}><i className={styles.home}></i>首页</Link></li>
                            <li>
                                <Link to={{
                                    pathname : '/search'
                                }}><i className={styles.search}></i>搜索</Link></li>
                            <li>
                                <Link to={{
                                    pathname : '/feilei'
                                }}><i className={styles.categroy}></i>分类</Link></li>
                            <li><a><i className={styles.message}></i>消息</a></li>
                            <li>   
                                <Link to={{
                                    pathname : '/cart'
                                }}><i className={styles.cart}></i>购物车<sup></sup></Link></li>
                        </ul>
                    </div>
                </div>
            </header>
        )
    }
}
export default withRouter(Header)