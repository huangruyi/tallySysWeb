import React, { Component } from 'react'
import defaultImg from '../../../public/default.png'
import { Avatar, Menu, Dropdown } from 'antd'
import './style.less'

class Header extends Component {

    logout = () => {
        console.log('退出登录')
    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item  onClick={this.logout}>
                    退出登录
                </Menu.Item>
            </Menu>
        );
        return (
            <div className="userInfo">
                <span>你好,Admin</span>
                <Dropdown overlay={menu} placement="bottomRight">
                    <Avatar src={defaultImg} />
                </Dropdown>
            </div>
        )
    }
}

export default Header;