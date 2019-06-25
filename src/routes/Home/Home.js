import React,{Component} from 'react'

import Header from '.././../components/Home/Header'
import Main from '.././../components/Home/Main'
import Footer from '../../components/Footer/Footer'
import './base.scss'

class Home extends Component{

    render(){
        return (
            <div>
                <Header></Header>
                <Main></Main>
                <Footer></Footer>
            </div>
        )
    }
}

export default Home