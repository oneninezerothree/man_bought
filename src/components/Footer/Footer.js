import React from 'react'
import styles from './footer.css'
import {withRouter, Link } from 'react-router-dom'

class Footer extends React.Component {
    render() {
        return (
            <footer id={styles.footer}>
                <div id={styles.footnav} className={`${styles.footnav} ${styles.clearfix}`}>
                    <ul>
                        <li><Link
                            to={{
                                pathname : '/'
                            }}    
                        ><i className={styles.home}></i><p>首页</p></Link></li>
                        <li><Link
                            to={{
                                pathname : '/category'
                            }}    
                        ><i className={styles.categroy}></i><p>分类</p></Link></li>
                        <li><Link
                            to={{
                                pathname : '/cart'
                            }}    
                        ><i className={styles.cart}></i><p>购物车</p></Link></li>
                        <li><Link
                            to={{
                                pathname : '/mine'
                            }}    
                        ><i className={styles.member}></i><p>我的</p></Link></li>
                    </ul>
                </div>
            </footer>
        )
    }
}
export default withRouter(Footer)