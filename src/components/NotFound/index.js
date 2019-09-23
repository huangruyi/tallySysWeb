import React, { Component } from 'react'
import {
    Link
  } from 'react-router-dom'
import NotFoundImg from './404.png'
import { Result, Button } from 'antd'
import './style.less'

export default class NotFound extends Component {
    // goHome = () => {
    //     <Link to='/home'/>
    // }

    render() {
        return (
            <Result
                status="404"
                title="404"
                subTitle="页面不存在！"
                //extra={<Button type="primary" onClick={() => this.goHome()}>返回首页</Button>}
            />
            // <div className="notFound">
            //     <img src={NotFoundImg} />
            // </div>
        )
    }
}