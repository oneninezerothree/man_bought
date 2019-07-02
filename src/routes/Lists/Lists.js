import React, { Component } from 'react'
import { Icon, Accordion, List } from 'antd-mobile';
import styles from './Lists.scss';
//与请求数据有关
import axios from 'axios';
//与跳转有关
import { Link, withRouter } from 'react-router-dom';
import Search from '../../components/Search/Header';
class Lists extends Component {
    state = {
        concealStatus: false,
        showStatus: true,
        goodsList: [],
        gc_id: 256,
        curpage: 1,
        inputValue: '',
    }
    showList() {
        let arr = this.state.goodsList
        console.log(arr)
        if (arr != undefined) {
            if (this.state.inputValue != '') {

                console.log(arr)
                arr = arr.filter((item) => {
                    return item.goods_name.indexOf(this.state.inputValue) != -1

                })
            }

            return arr.map((item, index) => {
                return <li key={index} onClick={
                    () => {
                        window.removeEventListener('scroll', this.handleScroll.bind(this));
                        this.props.history.push({
                            pathname: '/detail',
                            query: {
                                goodsId: item.goods_id
                            },

                        });
                    }

                }>
                    <div className={styles.goods_pic} >
                        <img src={item.goods_image_url} />
                    </div>
                    <div className={styles.goods_info}>
                        <h4 className={styles.goods_title}>{item.goods_name}</h4>
                        <span className={styles.goods_price}>￥<em>{item.goods_price}</em></span>
                        <div className={styles.goods_assist}>
                            <span className={styles.goods_sold}>销量
                                    <em>{item.goods_salenum}</em>
                            </span>
                        </div>
                    </div>
                </li>
            })
        }
    }
    async componentDidMount() {
        //与滚动有关
        this.watchScroll(this.handleScroll.bind(this))
        // window.addEventListener('scroll', this.scrollAction.bind(this),false);	
        // window.onscroll = this.handleScroll.bind(this)
        let gc_id = 256
        if (this.props.location.query) {
            gc_id = this.props.location.query.gc_id
        }
        let goodsList = (await axios.get(`https://www.nanshig.com/mobile/index.php?act=goods&op=goods_list&gc_id=${gc_id}&page=10&curpage=1&gc_id=${gc_id}`)).data.datas.goods_list
        this.setState({
            gc_id: gc_id,
            goodsList: goodsList,
        })
    }
    /** 监听滚动的主要函数*/
    async handleScroll() {
        let clientH = this.refs.bodyBox.clientHeight; //可视区域高度
        let scrollTop = window.scrollY;  //滚动条滚动高度
        let scrollHeight = window.innerHeight; //滚动内容高度
        let gc_id = this.state.gc_id
        let mypage = ++this.state.curpage

        if ((scrollTop + scrollHeight) > (clientH)) {
            let news = (await axios.get(`https://www.nanshig.com/mobile/index.php?act=goods&op=goods_list&gc_id=${gc_id}&page=10&curpage=${mypage}&gc_id=${gc_id}`)).data.datas.goods_list
            // console.log(news)
            this.setState({
                curpage: mypage,
                goodsList: [...this.state.goodsList, ...news]
            })
        }
    }
    /** 监听滚动的测试函数*/
    scrollAction() {
        window.onscroll = function () {
            console.log(6666)
        }
    }
    /** 事件监听函数*/
    watchScroll(handler) {
        if (window.onscroll == null) {
            window.onscroll = handler
        } else if (typeof window.onscroll == 'function') {
            var oldHandler = window.onscroll;
            window.onscroll = () => {
                handler();
                oldHandler();
            }
        }
    }
    render() {
        return (
            <div id="list" ref="bodyBox">
                <Search />
                <header style={{
                    zIndex: 999,
                    marginTop: '1.95rem',
                }}>
                    <nav className={styles.navlist} onScroll={() => { console.log(666) }} style={{ borderBottom: '1px solid #ddd' }}>
                        <div className={styles.comprehensive} onClick={() => { this.setState({ concealStatus: !this.state.concealStatus }) }}><span>综合排序</span><Icon className={styles.icon} type="down" size="xxs" /></div>
                        <div className={styles.sales}><span>销量优先</span></div>
                        <div className={styles.screen}><span>筛选</span><Icon className={styles.icon} type="down" size="xxs" /></div>
                        <div className={styles.browse_mode} onClick={() => { this.setState({ showStatus: !this.state.showStatus }) }}><Icon className={styles.icon} type="ellipsis" /></div>
                    </nav>
                    <ul className={styles.conceal} style={{
                        display: this.state.concealStatus ? 'block' : 'none'
                    }}>
                        <li>
                            <span>综合排序</span>
                            <Icon className={styles.icon} type="check" size="s" />
                        </li>
                        <li>
                            <span>价格从低到高</span>
                            <Icon className={styles.icon} type="check" size="s" />
                        </li>
                        <li>
                            <span>价格从高到低</span>
                            <Icon className={styles.icon} type="check" size="s" />
                        </li>
                        <li>
                            <span>人气排序</span>
                            <Icon className={styles.icon} type="check" size="s" />
                        </li>
                    </ul>
                    {/* <div><input type='text' ref='input' onChange={
                            (e)=>{
                                    this.setState({
                                        inputValue:e.target.value
                                    })
                            }
                            }/>
                            {this.state.inputValue}
                    </div> */}
                </header>
                <ul className={styles.goodslist} style={{ display: this.state.showStatus ? 'block' : 'none' }}>
                    {this.showList()}
                </ul>
                <ul className={styles.goodslisttwo} style={{ display: this.state.showStatus ? 'none' : 'flex' }}>
                    {this.showList()}
                </ul>

            </div>
        )
    }
    componentWillUnmount() {
        // console.log(666)
        // window.removeEventListener('scroll', this.scrollAction.bind(this),false);
        // window.onscroll = null;
        //移除监听
        this.removeScroll();
    }

    /** 删除事件监听*/
    removeScroll() {
        window.onscroll = '';
    }

}

export default withRouter(Lists)

// 监听事件移除失败解决方法
// componentDidMount(){
// this.watchScroll(this.scrollAction.bind(this))
// }
// componentWillUnmount(){
// this.removeScroll();
// }
// /** 监听滚动的主要函数*/
// scrollAction(){
// window.onscroll=function(){
// console.log(6666)
// }
// }
// /** 事件监听函数*/
// watchScroll(handler){
// if(window.onscroll==null){
// window.onscroll=handler
// }else if(typeof window.onscroll =='function'){
// var oldHandler=window.onscroll;
// window.onscroll=()=>{
// handler();
// oldHandler();
// }
// }
// }
// /** 删除事件监听*/
// removeScroll(){
// window.onscroll='';
// }