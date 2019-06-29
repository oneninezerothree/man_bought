import React from 'react'
import axios from 'axios';
import styles from './main.css'
import {withRouter , Link} from 'react-router-dom'

class Main extends React.Component {
    state = {
        goods: []
    }
    render() {
        return (
            <div className={styles.nctouchHomeLayout} id={styles.mainContainer2}>
                {this.state.goods.filter(function (item, index) {
                    return index
                }).map((item, i) => {
                    return (
                        <div className={styles.itemGoods} key={i}>
                            <div className={styles.titBar}>{item.goods.title}</div>
                            <ul className={styles.goodsList}>
                                {item.goods.item.map((item, i) => {
                                    return (
                                        <li key={item.goods_id}>
                                            <Link to={{
                                                pathname : '/detail',
                                                search : `?id=${item.goods_id}`,                                                
                                            }}>
                                                <div className={styles.goodsPic}><img src={item.goods_image} alt="" /></div>
                                                <dl className={styles.goodsInfo}>
                                                    <dt className={styles.goodsName}>{item.goods_name}</dt>
                                                    <dd className={styles.goodsPrice}>￥<em>{item.goods_price}</em></dd>
                                                </dl>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })
                }
            </div>
        )
    }
    async componentWillMount() {
        const goods = (await axios.get("https://www.nanshig.com/mobile/index.php")).data.datas
        this.setState({
            goods
        })
    }
}

export default withRouter(Main)