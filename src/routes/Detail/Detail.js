import React, { Component } from 'react'
import { Icon, Carousel, WingBlank, List, Badge, Stepper } from 'antd-mobile';
import styles from './Detail.scss';

//与请求数据有关
import axios from 'axios';

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val: 3,
            imgHeight: 176,
            nav_menuStatus: false,
            maskStatus: false,
            goodsId: 223333,
            goods_id: '',
            goods_name: '',
            goods_price: '',
            goods_salenum: '',
            goods_url: '',
            shopName: '',
            picDate: [],
            goods_commend_list: [],
            color: ['Black', 'Red', 'Grey', 'PINK and White', 'RED and White', 'Shine and White', 'Green and White'],
            size: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
            //激活
            isColorActive: 0,
            colorNow: '',
            sizeNow: '',
            isSizeActive: 0,
        };
    }
    onChange = (val) => {
        // console.log(val);
        this.setState({ val });
    }

    getColor(idx, item) {
        this.setState({
            isColorActive: idx,
            colorNow: item
        })

    }
    getSize(idx, item) {
        this.setState({
            isSizeActive: idx,
            sizeNow: item
        })
        // const cartlist = JSON.parse(localStorage.getItem('cartlist'))
        // console.log('cartlist',cartlist)
    }
    cartlist() {
        return JSON.stringify({
            goods_id: this.state.goods_id,
            goods_name: this.state.goods_name,
            goods_price: this.state.goods_price,
            goods_salenum: this.state.goods_salenum,
            picDate: this.state.picDate,
            colorNow: this.state.colorNow,
            sizeNow: this.state.sizeNow,
        })
    }
    async componentDidMount() {
        let goodsId = 0;
        if (this.props.location.query) {
            sessionStorage.setItem('goodsId', this.props.location.query.goodsId)
        }
        goodsId = sessionStorage.getItem('goodsId')
        //获取数据
        // let goodsId = this.state.goodsId
        // if(this.props.location.query!=undefined){
        //     goodsId= this.props.location.query.goodsId
        // }else{
        //     goodsId = this.state.goodsId
        // }
        //获取所有数据
        let data = (await axios.get(`https://www.nanshig.com/mobile/index.php?act=goods&op=goods_detail&goods_id=${goodsId}&key=`)).data.datas
        console.log(data)
        //获取图片数据
        let picDate = []
        for (var key in data.spec_image) {
            picDate.push(data.spec_image[key]);
        }
        //设置数据
        this.setState({
            // goodsId:goodsId,
            goods_id: data.goods_info.goods_id,
            goods_name: data.goods_info.goods_name,
            goods_price: data.goods_info.goods_price,
            goods_salenum: data.goods_info.goods_salenum,
            goods_url: data.goods_image.split(',')[0],
            picDate: picDate,
            goods_commend_list: data.goods_commend_list,
            shopName: data.store_info.store_name

        })

    }
    componentWillunmount() {
        sessionStorage.clear('goodsId')
    }
    showCommend() {
        let arr = this.state.goods_commend_list
        if (arr != undefined) {
            return arr.map((item, index) => {
                return <li className={styles.singleitem} key={index}>
                    <img src={item.goods_image_url} alt='' />
                    <div className={styles.head}>{item.goods_name}</div>
                    <div>￥{item.goods_promotion_price}</div>
                </li>
            })
        }
    }
    addShoppingCart() {
        console.log(JSON.parse(sessionStorage.getItem('cartData')));
        let agreeAddGoods = 0;
        let agreeAddStore = 0;
        let NewData = [];
        let newShop = [];
        if (JSON.parse(sessionStorage.getItem('cartData')) !== null && JSON.parse(sessionStorage.getItem('cartData')) != 0) {
            NewData = JSON.parse(sessionStorage.getItem('cartData')).map((item, index) => {
                if (item.shopName === this.state.shopName) {
                    item.data.forEach((dataItem) => {
                        if (dataItem.id === this.state.goods_id) {
                            console.log('已有店铺添加商品数量')
                            dataItem.goodsNum = ++dataItem.goodsNum;
                        } else {
                            agreeAddGoods++;
                        }
                        if (agreeAddGoods === item.data.length) {
                            console.log('已有店铺添加新商品');
                            item.data.push({
                                id: this.state.goods_id,
                                goodsName: this.state.goods_name,
                                goodsPrice: this.state.goods_price,
                                goodsNum: 1,
                                imgUrl: this.state.goods_url,
                                status: true
                            })
                        }
                        return dataItem;
                    })

                }else{
                    agreeAddStore++;
                    newShop = JSON.parse(sessionStorage.getItem('cartData'));
                    console.log('新店铺商品');
                    newShop.push({
                        shopName: this.state.shopName,
                        selectStatus: true,
                        data: [{
                            id: this.state.goods_id,
                            goodsName: this.state.goods_name,
                            goodsPrice: this.state.goods_price,
                            goodsNum: 1,
                            imgUrl: this.state.goods_url,
                            status: true
                        }]
                    })
                }
                return item;
            })
            if(agreeAddStore ===  JSON.parse(sessionStorage.getItem('cartData')).length) {
                NewData = newShop;
            }
            sessionStorage.setItem('cartData', JSON.stringify(NewData));
        } else {
            console.log('购物车为空，添加第一条数据');
            sessionStorage.setItem('cartData', JSON.stringify([
                {
                    data: [{
                        id: this.state.goods_id,
                        goodsName: this.state.goods_name,
                        goodsPrice: this.state.goods_price,
                        goodsNum: 1,
                        imgUrl: this.state.goods_url,
                        status: true
                    }],
                    selectStatus: true,
                    shopName: this.state.shopName
                }
            ]))
        }
    }
    render() {

        return (

            <div style={{
                fontSize: '14px'
            }}>
                <div className={styles.lubotu}>
                    <WingBlank>
                        <Carousel
                            autoplay={true}
                            autoplayInterval={3000}
                            infinite={true}
                        // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        // afterChange={index => console.log('slide to', index)}
                        >
                            {this.state.picDate.map(val => (
                                <a
                                    key={val}
                                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                >
                                    <img
                                        src={val}
                                        alt=""
                                        style={{ width: '100%', verticalAlign: 'top' }}
                                        onLoad={() => {
                                            // fire window resize event to change height
                                            window.dispatchEvent(new Event('resize'));
                                            this.setState({ imgHeight: 'auto' });
                                        }}
                                    />
                                </a>
                            ))}
                        </Carousel>
                    </WingBlank>
                    <div className={styles.back}
                        onClick={
                            () => {
                                this.props.history.goBack(-1)
                                console.log(this.props.history)
                            }
                        }
                    >
                        <Icon className={styles.icon} type="left" color="#F5ACB2" />
                    </div>
                    <div className={styles.more} onClick={() => { this.setState({ nav_menuStatus: !this.state.nav_menuStatus }) }}>
                        <Icon className={styles.icon} type="ellipsis" color="#F5ACB2" />
                    </div>
                    <div className={styles.favorite}>
                        <img src="img/favorite.png" />
                    </div>

                    <ul className={styles.nav_menu} style={{ display: this.state.nav_menuStatus ? 'block' : 'none' }}>
                        <li>
                            <img src='img/home.png' />
                            <span>首页</span>
                        </li>
                        <li>
                            <img src='img/seacher.png' />
                            <span>搜索</span>
                        </li>
                        <li>
                            <img src='img/categroy.png' />
                            <span>分类</span>
                        </li>
                        <li>
                            <img src='img/message.png' />
                            <span>消息</span>
                        </li>
                        <li>
                            <img src='img/cart.png' />
                            <span>购物车</span>
                        </li>
                        <li>
                            <img src='img/member.png' />
                            <span>我的商城</span>
                        </li>
                    </ul>
                </div>
                <div className={styles.content}>

                    <div className={styles.goods_info}>
                        <h4 className={styles.goods_title}>
                            {this.state.goods_name}
                        </h4>
                        <div className={styles.goods_assist}>
                            <span className={styles.goods_price}>￥<span>{this.state.goods_price}</span></span>
                            <span className={styles.goods_sold}>销量:
                                <i>{this.state.goods_salenum}</i>
                            </span>
                        </div>
                    </div>
                    <div className={styles.goods_detail}>
                        <div className={styles.itme_name}>送至</div>
                        <div className={styles.item_con}>
                            <dl className={styles.goods_detail_freight}>
                                <dt>
                                    <span className={styles.get_area_selected_name}>全国</span>
                                    <strong className={styles.get_area_selected_whether}>有货</strong>
                                    <img src='img/location.png' />
                                </dt>
                                <dd className={styles.get_area_selected_content}>免运费</dd>
                            </dl>
                        </div>
                    </div>
                    <div className={styles.goods_selected}>
                        <List.Item onClick={() => { this.setState({ maskStatus: !this.state.maskStatus }) }}>
                            <span style={{ fontSize: '14px' }}>已选</span>
                            <Badge text="颜色 黑色" style={{ marginLeft: 12, padding: '0 3px', backgroundColor: '#f19736', borderRadius: 2 }} />
                            <Badge text="尺码 M" style={{ marginLeft: 12, padding: '0 3px', backgroundColor: '#21b68a', borderRadius: 2 }} />
                            <Icon type="right" style={{ float: 'right', }} />

                        </List.Item>
                        <div className={styles.mask} style={{ display: this.state.maskStatus ? 'block' : 'none' }}>
                            <div className={styles.close} onClick={() => { this.setState({ maskStatus: !this.state.maskStatus }) }}>
                                <img src="img/close.png" />
                            </div>
                            <div className={styles.goods_content}>

                                <div className={styles.goods_pic}>
                                    <img src="img/111.jpg" />
                                </div>
                                <div className={styles.goods_info}>
                                    <h4 className={styles.goods_title}>{this.state.goods_name}</h4>
                                    <div className={styles.goods_assist}>
                                        <span className={styles.goods_price}>￥<span>{this.state.goods_price}</span></span>
                                        <span className={styles.goods_sold}>库存:
                                            <i>264</i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.goods_color}>
                                <h3>颜色:</h3>
                                <div className={styles.goods_color_select} >
                                    {this.state.color.map((item, idx) => {
                                        return <div className={this.state.isColorActive === idx ? `${styles.active}` : ""} onClick={this.getColor.bind(this, idx, item)} key={idx}>{item}</div>
                                    })}


                                </div>
                            </div>
                            <div className={styles.goods_size}>
                                <h3>尺码</h3>
                                <div className={styles.goods_size_select}>
                                    {this.state.size.map((item, idx) => {
                                        return <div className={this.state.isSizeActive === idx ? `${styles.active}` : ""} onClick={this.getSize.bind(this, idx, item)} key={idx}>{item}</div>
                                    })}
                                </div>
                            </div>

                            <div className={styles.goods_value}>
                                <List>
                                    <List.Item
                                        wrap
                                        extra={
                                            <Stepper
                                                style={{ width: '100%', minWidth: '100px' }}
                                                showNumber
                                                max={10}
                                                min={1}
                                                value={this.state.val}
                                                onChange={this.onChange}
                                            />}
                                    >
                                        购买数量
                                    </List.Item>

                                </List>
                            </div>
                        </div>
                    </div>
                    <div className={styles.goods_comment}>
                        <List.Item>
                            <span>商品评价</span>
                            <span>好评率<i>15.9%</i></span>
                            <span>(<i>0</i>)人评价</span>
                            <Icon type="right" style={{ float: 'right' }} />
                        </List.Item>
                    </div>
                    <div className={styles.store_name}>
                        <List.Item>
                            <img src="img/store.png" />
                            <span>潮男搭配师</span>
                            <Icon type="right" style={{ float: 'right' }} />
                        </List.Item>
                        <List.Item>
                            <div className={styles.store_rate}>
                                <span className="">描述相符
                                    <em>5</em>
                                    <i></i>
                                </span>
                                <span className="">服务态度
                                    <em>4.3</em>
                                    <i></i>
                                </span>
                                <span className="">发货速度
                                    <em>4.3</em>
                                    <i></i>
                                </span>
                            </div>
                        </List.Item>
                    </div>
                    <div className={styles.store_recommend}>
                        <h4>店铺推荐</h4>
                        <ul>
                            {this.showCommend()}
                        </ul>
                    </div>
                </div>
                <footer>
                    <div className={styles.common}>
                        <img src="img/kefu.png" /><br />
                        <span>客服</span>
                    </div>
                    <div className={styles.common} onClick={() => {
                        this.props.history.push('/cart');
                    }}>
                        <img src="img/cart2.png" /><br />
                        <span>购物车</span>
                    </div>
                    <div className={styles.buy}>立即购买</div>
                    <div className={styles.cart}
                        onClick={this.addShoppingCart.bind(this)}
                    >加入购物车</div>
                </footer>
            </div>

        )
    }
}