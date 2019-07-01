import React, { Component } from 'react';
import { connect } from 'dva';
// 公共头部
import CommonHeader from '../components/CommonHeader';
// 购物车商品列表
import CartContent from './Cart/CartContent';
export default connect((state) => {
    return state;
})(class ShoppingCart extends Component {
    componentDidMount() {
        console.log(JSON.parse(sessionStorage.getItem('cartData')))
        this.props.dispatch({
            type: 'example/save',
            payload: {
                goodsList: JSON.parse(sessionStorage.getItem('cartData'))
            }
        })
        setTimeout(() => {
            console.log(this.props.example);
        })
    }
    render() {
        return (
            <div className="view">
                <CommonHeader params={{
                    textOne: '购物车',
                    showDropdown: true,
                }} />
                <CartContent />
            </div>
        )
    }
})