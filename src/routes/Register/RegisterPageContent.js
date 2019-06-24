import React, { Component } from 'react';
import { connect } from 'dva';

export default connect((state) => {
    return state;
})(
    class LoginPage extends Component {
        render() {
            return (
                <div className="view">
                    
                </div>
            )
        }
    }
)