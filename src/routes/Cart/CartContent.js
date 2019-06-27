import React, { Component } from "react";
import styles from './CartContent.css'
import { connect } from "dva";
import { Link } from 'react-router-dom'
let ifUpdate = true;
let allGoodsTotao = 0;
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
        shopAllAutoSelect() {
            // 店铺判定自动全选
            setTimeout(() => {
                let goodsSelectLength = this.state.goodsList[this.state.currentShopIndex].data.filter((item) => item.status);
                if (goodsSelectLength.length !== this.state.goodsList[this.state.currentShopIndex].data.length) {
                    this.setState(
                        () => {
                            return {
                                goodsList: this.state.goodsList.map((item, index) => {
                                    if (index === this.state.currentShopIndex) {
                                        item.selectStatus = false;
                                    }
                                    return item
                                })
                            }
                        }
                    )
                } else {
                    this.setState(
                        () => {
                            return {
                                goodsList: this.state.goodsList.map((item, index) => {
                                    if (index === this.state.currentShopIndex) {
                                        item.selectStatus = true;
                                    }
                                    return item;
                                })
                            }
                        }
                    )
                }
            })
        }
        shouldComponentUpdate() {
            // console.log(this.state.currentShopIndex)
            if (ifUpdate) {
                setTimeout(() => {
                    let shopSelectLength = this.state.goodsList.filter((item) => item.selectStatus === true);
                    // 全部判定自动全选
                    if (shopSelectLength.length !== this.state.goodsList.length) {
                        this.setState(
                            () => {
                                return {
                                    selectAll: false,
                                }
                            },
                            () => {
                            }
                        )
                    } else {
                        this.setState(
                            () => {
                                return {
                                    selectAll: true,
                                }
                            },
                            () => {
                            }
                        )
                    }
                    ifUpdate = false;
                })
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
        addQuantity(shopIndex, goodsIndex) {
            this.setState(
                () => {
                    return {
                        goodsList: this.state.goodsList.map((item, index) => {
                            if (index === shopIndex) {
                                item.data.map((item, index) => {
                                    if (index === goodsIndex) {
                                        item.goodsNum++;
                                    }
                                    return item;
                                })
                            }
                            return item;
                        })
                    }
                }
            )
        }

        minusQuantity(shopIndex, goodsIndex) {
            this.setState(
                () => {
                    return {
                        goodsList: this.state.goodsList.map((item, index) => {
                            if (index === shopIndex) {
                                item.data.map((item, index) => {
                                    if (index === goodsIndex && item.goodsNum > 1) {
                                        item.goodsNum--;
                                    }
                                    return item;
                                })
                            }
                            return item;
                        })
                    }
                }
            )
        }

        confirmDelete() {
            this.setState(
                () => {
                    return {
                        goodsList: this.state.goodsList.filter((item, index) => {
                            if (this.state.currentShopIndex === index) {
                                item.data = item.data.filter((item, index) => {
                                    return index !== this.state.currentGoodsIndex;
                                })
                            }
                            return item.data.length >= 1;
                        })
                    }
                },
                () => {
                    if (this.state.goodsList.length >= 1) {
                        this.refs.cover.style.display = 'none';
                    }
                }
            )
        }
        render() {
            sessionStorage.setItem('cartData', JSON.stringify(this.state.goodsList));
            allGoodsTotao = 0;
            return (
                this.state.goodsList.length > 0 ? <div className={styles.nctouchMainLayout} >
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
                                                            setTimeout(() => {
                                                                this.setState(
                                                                    () => {
                                                                        return {
                                                                            currentShopIndex: index,
                                                                        }
                                                                    }
                                                                )
                                                            })
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
                                                let goodsTotal = 0;
                                                if (itemOne.status === true) {
                                                    goodsTotal += Number(itemOne.goodsPrice) * itemOne.goodsNum
                                                    allGoodsTotao += goodsTotal;
                                                }
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
                                                                    this.shopAllAutoSelect();
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
                                                        <span onClick={
                                                            () => {
                                                                this.setState({
                                                                    currentShopIndex: index,
                                                                    currentGoodsIndex: indexOne
                                                                })
                                                                this.refs.cover.style.display = 'block';
                                                            }
                                                        }></span>
                                                    </div>
                                                    <div className={styles.goodsSubtotal}>
                                                        {" "}
                                                        <span className={styles.goodsPrice}>
                                                            ￥<em>{itemOne.goodsPrice}</em>
                                                        </span>
                                                        <span className={styles.goodsSale} />
                                                        <div className={styles.valueBox}>
                                                            <span onClick={this.minusQuantity.bind(this, index, indexOne)} className={styles.minus}>
                                                                <a>&nbsp;</a>
                                                            </span>
                                                            <span>
                                                                <input
                                                                    type="text"
                                                                    readOnly
                                                                    pattern="[0-9]*"
                                                                    className={`${styles.buyNum}`}
                                                                    value={itemOne.goodsNum}
                                                                />
                                                            </span>
                                                            <span onClick={() => {
                                                                this.addQuantity(index, indexOne);
                                                            }} className={styles.add}>
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
                                        ￥<em>{allGoodsTotao}</em>
                                    </dd>
                                </dl>
                            </div>
                            <div className={`${styles.checkOut} ${styles.ok}`}>
                                <span>确认信息</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.sDialogWrapper} ref="cover" style={{
                        display: 'none'
                    }}>
                        <div className={styles.sDialogMask} style={{
                            height: '934px'
                        }}></div>
                        <div style={{
                            left: '50%',
                            top: '368px',
                            marginLeft: '-126.5px'
                        }} className={`${styles.sDialogWrapper} ${styles.sDialogSkinRed}`}>
                            <div className={styles.sDialogContent}>确认删除吗？</div>
                            <div className={styles.sDialogBtnWrapper}>
                                <span onClick={this.confirmDelete.bind(this)} className="s-dialog-btn-ok">确定</span>
                                <span onClick={
                                    () => {
                                        this.refs.cover.style.display = 'none';
                                    }
                                } className="s-dialog-btn-cancel">取消</span>
                            </div>
                        </div>
                    </div>
                </div>
                    : <div className={`${styles.nctouchNorecord} ${styles.cart}`}>
                        <div className={styles.norecordIco}><i></i></div>
                        <dl>
                            <dt>您的购物车还是空的</dt>
                            <dd>去挑一些中意的商品吧</dd>
                        </dl>
                        <Link to="/" className={styles.btn}>随便逛逛</Link>
                    </div>
            );
        }
    }
);