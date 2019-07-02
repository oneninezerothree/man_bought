import React, { Component } from 'react'
import { Icon,Grid,Tabs, WhiteSpace } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import styles from './Category.scss';
//与请求数据有关
import axios from 'axios'; 
//与跳转有关
import { Link,withRouter } from 'react-router-dom'
import Header from '../../components/Search/Header';
import Footer from '../../components/Footer/Footer';
function renderTabBar(props) {
    return (<Sticky>
      {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
  }
const tabs = [
    { title: '上装', key: 0},
    { title: '下装', key: 1},
    { title: '鞋靴', key: 2},
    { title: '美妆', key: 3},
    { title: '套装', key: 4},
];
class Category extends Component {
    state ={
        recommendList:[],
        classList:{},
        gc_idArr:[
            {shangzhuang:256,gc_id:256},
            {kuzi:2,gc_id:2},
            {xiexue:1,gc_id:1},
            {meizhuang:470,gc_id:470},
            {taozhuang:3,gc_id:3}
        ],

        gc_id:256,
    }
    showlist(){
        let arr =  this.state.classList.child
        if(arr != undefined){
                    return   arr.map((item,index)=>{
                    return <li className={styles.singleitem} key={index}
                            onClick={
                                ()=>{
                                    this.props.history.push({
                                        pathname:'/lists',
                                        query: {
                                            gc_id:item.gc_id
                                        },
                                        
                                    });
                                }
                                
                            }
                    >
                                <img src={item.gc_image} alt=''/>
                                <div>{item.gc_name}</div>
                            </li>
            })
        }
   }
    showrecommend(){
        let arr =  this.state.recommendList
        if(arr != undefined){
                    return   arr.map((item,index)=>{
                    return <li className={styles.singleitem} key={index}
                    onClick={
                        ()=>{
                            this.props.history.push({
                                pathname:'/detail',
                                query: {
                                    goodsId:item.goods_id
                                },
                                
                            });
                        }
                        
                    }
                    >
                                <img src={item.goods_image_url} alt=''/>
                                <div className={styles.head}>{item.goods_name}</div>
                                <div style={{color:'red'}}>￥{item.goods_price}</div>
                            </li>
            })
        }
    }
    //changeData
    async changeData(gc_id){

        if(gc_id == this.state.gc_id){
           gc_id = this.state.gc_id
        };
        console.log(gc_id)
        let classList =(await axios.get('https://www.nanshig.com/mobile/index.php?act=goods_class&op=get_child_all&gc_id='+gc_id)).data.datas.class_list[0]
        let recommendList =(await axios.get(`https://www.nanshig.com/mobile/index.php?act=goods&op=goods_list&gc_id=${gc_id}&page=20`)).data.datas.goods_list
        this.setState({
            recommendList:recommendList,
            classList:classList,
        }) 
    }
     componentDidMount(){
        this.changeData(this.state.gc_id)   
     }
     methods ={

     }
    render() {
        return (
            <div>
                <Header/>
                <header style={{
                    background: 'none',
                    position: 'relative',
                    marginTop: '1.95rem',
                    zIndex: 1000,
                }}>
                    <StickyContainer>
                        <Tabs tabs={tabs}  onTabClick={(tab, index) => { this.setState({gc_id:this.state.gc_idArr[tab.key].gc_id}) 
                        let gc_id=this.state.gc_idArr[tab.key].gc_id
                        this.changeData(gc_id)
                    }}
                            initialPage={0}
                            renderTabBar={renderTabBar}
                        >
                        </Tabs>
                    </StickyContainer>
                </header>
                <div className={styles.categroylist}>
                    <div className={styles.title}>
                        <span className={styles.name}>{this.state.classList.gc_name}</span >
                        <Icon className={styles.icon} type="right" />
                    </div>
                    <ul className={styles.upperwear}>
                        {  
                            this.showlist()
                        }
                    </ul>
                </div>
                <div className={styles.recommend}>
                    <div className={styles.title}>
                        <h3 className={styles.name}>商品推荐</h3>
                    </div>
                    <ul className={styles.recommendlist}>
                        {this.showrecommend()}
                    </ul>
                </div>
                <Footer/>
            </div>
        )
    }
}


export default withRouter(Category)