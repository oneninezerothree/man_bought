import React from 'react';
import styles from './search.css'
import {withRouter , Link} from 'react-router-dom'
class Main extends React.Component {
    render() {
        return (
            <div id={styles.storeWrapper}>
                <div className={styles.nctouchSearchLayout}>
                    <dl className={styles.hotKeyword}>
                        <dt>热门搜索</dt>
                        <dd id={styles.hotListContainer}><ul>

                            <li><Link to={{
                                pathname : '/list',
                                search : `?name=${'潮男'}`,
                            }}>潮男</Link></li>

                            <li><Link to={{
                                pathname : '/list',
                                search : `?name=${'外套'}`,
                            }}>外套</Link></li>

                            <li><Link to={{
                                pathname : '/list',
                                search : `?name=${'七分裤'}`,
                            }}>七分裤</Link></li>

                            <li><Link to={{
                                pathname : '/list',
                                search : `?name=${'t恤'}`,
                            }}>t恤</Link></li>

                            <li><Link to={{
                                pathname : '/list',
                                search : `?name=${'衬衫'}`,
                            }}>衬衫</Link></li>

                            <li><Link to={{
                                pathname : '/list',
                                search : `?name=${'香水'}`,
                            }}>香水</Link></li>

                            <li><Link to={{
                                pathname : '/list',
                                search : `?name=${'帆布鞋'}`,
                            }}>帆布鞋</Link></li>

                            <li><Link to={{
                                pathname : '/list',
                                search : `?name=${'运动休闲'}`,
                            }}>运动休闲</Link></li>

                        </ul></dd>
                    </dl>
                    <dl>
                        <dt>历史纪录</dt>
                        <dd id={styles.searchHisListContainer}><ul>

                        </ul><a href="javascript:void(0);" className={styles.clearHistory} >清空历史</a></dd>
                    </dl>
                </div>
            </div>
        )
    }
}
export default withRouter(Main)