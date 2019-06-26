import React, { Component } from "react";
import styles from './CartContent.css'
import { connect } from "dva";
let ifUpdate = true;
export default connect(state => {
    return state;
})(
    class ShoppingCart extends Component {
        constructor(props) {
            super(props)
            this.state = {
                goodsList: this.props.example.goodsList,
                newGoodsList: [],
                currentShopIndex: null,
                currentGoodsIndex: null,
                selectAll: true,
                totalPrice: 0,
                totalNum: 0,
            }
        }
        // 更改旧数组数据
        // componentDidMount() {
        //     const newGoodsList = this.state.goodsList.map((item) => {
        //         return item.data.map((item) => {
        //             item.status = true;
        //             return item;
        //         });
        //     })
        //     this.setState(
        //         () => {
        //             return {
        //                 newGoodsList: newGoodsList,
        //             }
        //         })
        // }

        shouldComponentUpdate() {
            if (ifUpdate) {
                let shopSelectLength = this.state.goodsList.filter((item) => item.selectStatus);
                // 店铺判定自动全选
                setTimeout(() => {
                    let goodsSelectLength = this.state.goodsList[this.state.currentShopIndex].data.filter((item) => item.status);
                    if (goodsSelectLength.length !== this.state.goodsList[this.state.currentShopIndex].data.length) {
                        console.log(1)
                        // this.setState(
                        //     () => {
                        //         return {
                        //              conosole.log(1)
                        //         }
                        //     }
                        // )
                    } else {

                    }
                })
                // 全部判定自动全选
                if (shopSelectLength.length !== this.state.goodsList.length) {
                    this.setState(
                        () => {
                            return {
                                selectAll: false,
                            }
                        }
                    )
                } else {
                    this.setState(
                        () => {
                            return {
                                selectAll: true,
                            }
                        }
                    )
                }
                ifUpdate = false;
            }
            return true;
        }

        changeIfUpdate() {
            ifUpdate = true;
        }

        allSelect() {
            if (this.state.selectAll) {
                this.state.goodsList.forEach((item) => {
                    item.selectStatus = false;
                    item.data.forEach((item) => {
                        item.status = false;
                    })
                })
            } else {
                this.state.goodsList.forEach((item) => {
                    item.selectStatus = true;
                    item.data.forEach((item) => {
                        item.status = true;
                    })
                })
            }
        }

        shopAllSelect(index, boolean) {
            this.state.goodsList[index].data.forEach((item) => {
                item.status = boolean;
            })
        }

        render() {
            return (
                <div className={styles.nctouchMainLayout} >
                    <div id={styles.cartListWp}>
                        {
                            this.state.goodsList.map((item, index) => {
                                return <div className={styles.nctouchCartContainer} key={index}>
                                    <dl className={styles.nctouchCartStore}>
                                        <dt>
                                            <span className={styles.storeCheck}>
                                                <input
                                                    className={styles.storeCheckbox}
                                                    type="checkbox"
                                                    readOnly
                                                    checked={item.selectStatus}
                                                    onClick={
                                                        () => {
                                                            this.changeIfUpdate();
                                                            item.selectStatus = !item.selectStatus;
                                                            this.setState(
                                                                () => {
                                                                    return {
                                                                        currentShopIndex: index,
                                                                    }
                                                                }
                                                            )
                                                            this.shopAllSelect(index, item.selectStatus);
                                                        }
                                                    }
                                                />
                                            </span>
                                            <i className={styles.iconStore}></i>
                                            {item.shopName}
                                        </dt>
                                    </dl>
                                    <ul className={styles.nctouchCartItem}>
                                        {
                                            item.data.map((itemOne, indexOne) => {
                                                return <li className={styles.cartLitemwCnt} key={indexOne} ref="goodsLength">
                                                    <div className={styles.goodsCheck}>
                                                        <input
                                                            type="checkbox"
                                                            readOnly
                                                            checked={itemOne.status}
                                                            name="cart_id"
                                                            onClick={
                                                                () => {
                                                                    this.changeIfUpdate();
                                                                    itemOne.status = !itemOne.status;
                                                                    this.setState(
                                                                        () => {
                                                                            return {
                                                                                currentGoodsIndex: indexOne,
                                                                                currentShopIndex: index,
                                                                            }
                                                                        }
                                                                    )
                                                                }
                                                            }
                                                        />
                                                    </div>
                                                    <div className={styles.goodsPic}>
                                                        <a>
                                                            <img
                                                                src={itemOne.imgUrl}
                                                                alt=""
                                                            />
                                                        </a>
                                                    </div>
                                                    <dl className={styles.goodsInfo}>
                                                        <dt className={styles.goodsName}>
                                                            {" "}
                                                            <a>
                                                                {" "}
                                                                {itemOne.goodsName}{" "}
                                                            </a>
                                                        </dt>
                                                        <dd className={styles.goodsType} />
                                                    </dl>
                                                    <div className={styles.goodsDel}>
                                                        <span></span>
                                                    </div>
                                                    <div className={styles.goodsSubtotal}>
                                                        {" "}
                                                        <span className={styles.goodsPrice}>
                                                            ￥<em>{itemOne.goodsPrice}</em>
                                                        </span>
                                                        <span className={styles.goodsSale} />
                                                        <div className={styles.valueBox}>
                                                            <span className={styles.minus}>
                                                                <a>&nbsp;</a>
                                                            </span>
                                                            <span>
                                                                <input
                                                                    type="text"
                                                                    readOnly
                                                                    pattern="[0-9]*"
                                                                    className={`${styles.buyNum} ${styles.buynum}`}
                                                                    defaultValue={itemOne.goodsNum}
                                                                />
                                                            </span>
                                                            <span className={styles.add}>
                                                                <a>&nbsp;</a>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>;
                                            })
                                        }
                                    </ul>
                                </div>;
                            })
                        }
                        <div className={styles.nctouchCartBottom}>
                            <div className={styles.allCheck}>
                                <input
                                    readOnly
                                    className={styles.allCheckbox}
                                    type="checkbox"
                                    checked={this.state.selectAll}
                                    onClick={
                                        () => {
                                            this.setState(
                                                () => {
                                                    return {
                                                        selectAll: !this.state.selectAll,
                                                    }
                                                },
                                                () => {
                                                    this.changeIfUpdate();
                                                }
                                            )
                                            this.allSelect();
                                        }
                                    }
                                />
                            </div>
                            <div className={styles.total}>
                                <dl className={styles.totalMoney}>
                                    <dt>合计总金额：</dt>
                                    <dd>
                                        ￥<em>334.00</em>
                                    </dd>
                                </dl>
                            </div>
                            <div className={`${styles.checkOut} ${styles.ok}`}>
                                <span>确认信息</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
);