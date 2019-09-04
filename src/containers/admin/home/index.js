import React, { Component } from 'react'
import homeImg from './home.png'
import './style.less'
class Home extends Component {
    render() {
        return (
            <div className="homeContainer">
                {/* <div className="homeTitle"><span>欢迎进入记账系统</span></div> */}
                <div className="homeImg">
                    <img src={homeImg} />
                </div>
            </div>
        )
    }
}

export default Home;