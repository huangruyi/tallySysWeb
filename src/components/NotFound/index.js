import React, { Component } from 'react'
import NotFoundImg from './404.png'
import './style.less'

export default class NotFound extends Component {

    render() {
        return (
            <div className="notFound">
                <img src={NotFoundImg} />
            </div>
        )
    }
}