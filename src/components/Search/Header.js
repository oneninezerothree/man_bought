import React from 'react'
import styles from './search.css'
import {withRouter , Link} from 'react-router-dom'

class Header extends React.Component{
    state = {
        searchInputValue:''
    }
    getsearchInputValue(e){
        this.setState({
            searchInputValue : e.target.value
        })
    }
    del(){
        this.setState({
            searchInputValue:''
        })
    }
    render(){
        return(
            <header id={styles.header}>
                <div className={styles.headerWrap}>
                    <div className={styles.headerL}>
                        <a href="javascript:history.go(-1)">
                            <i className={styles.back}></i>
                        </a>
                    </div>
                    <div  className= {this.state.searchInputValue? `${styles.headerInp} ${styles.write}`: `${styles.headerInp}`} >
                        <i className={styles.icon}></i>
                        <input 
                            type="text" 
                            className={styles.searchInput} 
                            id={styles.keyword} 
                            placeholder="请输入搜索关键词" 
                            value={this.state.searchInputValue} 
                            onChange={this.getsearchInputValue.bind(this)}
                        />
                        <span className={styles.inputDel} onClick={this.del.bind(this)}></span>
                    </div>
                    <div className={styles.headerR}>
                        <Link
                            id={styles.headerNav} 
                            href="javascript:void(0);" 
                            className={styles.searchBtn}
                            to={{
                                pathname  : '/list',
                                search : `?name=${this.state.searchInputValue}`
                            }}
                        >搜索</Link>
                    </div>
                </div>
            </header>
        )
    }
}
export default withRouter(Header)