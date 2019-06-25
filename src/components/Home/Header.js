import React from 'react'
import styles from './home.css'
import {withRouter , Link} from 'react-router-dom'

class Header extends React.Component {
    render() {
        return (
            <div className={styles.nctouchHomeTop}>
                <header id={styles.header}>
                    <div className={styles.logo}></div>
                    <div className={styles.headerWrap}> 
                        <Link to={{
                            pathname : '/search'
                        }} className={styles.headerInp}> 
                            <i className={styles.icon}></i> 
                            <span className={styles.searchInput} id={styles.keyword} placeholder=""></span> 
                        </Link> 
                    </div>
                    <div className={styles.headerR}>
                        <a id={styles.headerNav}><i className={styles.nsgdingdan}></i>
                            <p>消息</p>
                            <sup></sup>
                        </a>
                    </div>
                </header>
                <div className={styles.cohesive}></div>
                <div className={styles.advList} id={styles.mainContainer1}>
                    <div className={styles.swipeWrap}>
                        <div className={styles.item}>
                            <a>
                                <img src="https://www.nanshig.com/data/upload/mobile/special/s0/s0_06095292129789329.jpg" alt="" />
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)