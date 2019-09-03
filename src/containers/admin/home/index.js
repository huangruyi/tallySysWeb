import React, { Component, Fragment } from 'react'
import homeImg from './home.png'
import './style.less'
class Home extends Component {
    render() {
        return (
            <Fragment>
                <div className="homeTitle"><span>欢迎进入记账系统</span></div>
                <div className="homeImg">
                    <img src={homeImg} />
                </div>
            </Fragment>
        )
    }
}

export default Home;