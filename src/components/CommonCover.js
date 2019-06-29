import React, { Component } from 'react';
import styles from './CommonCover.css';
import { connect } from 'dva';
export default connect((state) => {
    return state
})(
    class CommonCover extends Component {
        // 自动关闭弹窗
        hintAutoClose() {
            //1.2s 自动关闭
            setTimeout(() => {
                this.props.dispatch({
                    type: 'example/save',
                    payload: {
                        inputErrorHint: false,
                    }
                })
            }, 1500);
        }
        // 挂载后关闭弹窗
        componentDidMount() {
            this.hintAutoClose();
        }
        render() {
            return (
                <div>
                    {/* 输入框错误提示 */}
                    <div style={{
                        display: this.props.example.inputErrorHint ? 'block' : 'none',
                    }} className={styles.errorTips}>
                        <p>{this.props.example.errorHintText}</p>
                    </div>
                    {/* 界面遮罩 */}
                    <div style={{
                        display: this.props.example.inputErrorHint ? 'block' : 'none',
                    }} className={styles.cover}></div>
                </div>
            )
        }
    }
)