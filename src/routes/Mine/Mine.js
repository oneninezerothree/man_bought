import React from 'react'
import Header from '../../components/Mine/Header'
import Main from '../../components/Mine/Main'
import Footer from '../../components/Footer/Footer'


class Mine extends React.Component{
    render(){
        return(
            <div>
                <Header></Header>
                <Main></Main>
                <Footer></Footer>
            </div>
        )
    }
}
export default Mine