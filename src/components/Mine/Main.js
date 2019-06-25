import React from 'react'
import styles from './mine.css'
import {withRouter , Link} from 'react-router-dom'

class Main extends React.Component {
    render() {
        return (
            <div className={styles.scrollerBody}>
                <div className={styles.scrollerBox}>
                    <div className={styles.memberTop}>
                        <div className={styles.memberInfo}>
                            <a className={styles.defaultAvatar} style={{display:'block'}}></a>
                            <Link to={{
                                pathname : '/login',
                            }} className={styles.toLogin} >点击登录</Link>
                        </div>
                        <div className={styles.memberCollect}>
                            <span><a><i className={styles.favoriteGoods}></i><p>商品收藏</p></a></span>
                            <span><a><i className={styles.favoriteStore}></i><p>店铺收藏</p></a></span>
                            <span><a><i className={styles.goodsBrowse}></i><p>我的足迹</p></a></span>
                        </div>
                    </div>
                    <div className={styles.memberCenter}>
                        <dl className={styles.mt5}>
                            <dt><a>
                                <h3><i className={styles.mc01}></i>全部订单</h3>
                                <h5><i className={styles.arrowR}></i></h5>
                            </a></dt>
                            <dd>
                                <ul id={styles.orderUl}>
                                    <li><a><i className={styles.cc01}></i><p>待付款</p></a></li>
                                    <li><a><i className={styles.cc02}></i><p>待收货</p></a></li>
                                    <li><a><i className={styles.cc03}></i><p>待自提</p></a></li>
                                    <li><a><i className={styles.cc04}></i><p>待评价</p></a></li>
                                    <li><a><i className={styles.cc05}></i><p>退款/退货</p></a></li>
                                </ul>
                            </dd>
                        </dl>
                        <dl className={styles.mt5}>
                            <dt><a>
                                <h3><i className={styles.mc02}></i>我的财产</h3>
                                <h5><i className={styles.arrowR}></i></h5>
                            </a></dt>
                            <dd>
                                <ul id={styles.assetUl}>
                                    <li><a><i className={styles.cc06}></i><p>预存款</p></a></li>
                                    <li><a><i className={styles.cc07}></i><p>充值卡</p></a></li>
                                    <li><a><i className={styles.cc08}></i><p>代金券</p></a></li>
                                    <li><a><i className={styles.cc09}></i><p>红包</p></a></li>
                                    <li><a ><i className={styles.cc10}></i><p>积分</p></a></li></ul>
                            </dd>
                        </dl>
                        <dl className={styles.mt5}>
                            <dt><a>
                                <h3><i className={styles.mc03}></i>收货地址</h3>
                                <h5><i className={styles.arrowR}></i></h5>
                            </a></dt>
                        </dl>
                        <dl style={{borderTop: 'solid 0.05rem #EEE'}}>
                            <dt><a>
                                <h3><i className={styles.mc04}></i>系统设置</h3>
                                <h5><i className={styles.arrowR}></i></h5>
                            </a></dt>
                        </dl>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Main)