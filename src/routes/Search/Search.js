import React from 'react'
import Header from '../../components/Search/Header'
import Main from '../../components/Search/Main'
import Footer from '../../components/Footer/Footer'

class Search extends React.Component{
    render(){
        return(
            <div>
                <Header></Header>
                <Main></Main>
                <Footer></Footer>
            </div>
        )
    }
    componentWillMount(){
        document.getElementById('root').scrollIntoView(true);
    }
}
export default Search