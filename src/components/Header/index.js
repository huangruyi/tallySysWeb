import React, { Component } from 'react'
import defaultImg from '../../../public/default.png'
import { Avatar, Menu, Dropdown } from 'antd'
import './style.less'

class Header extends Component {

    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    个人信息
                </Menu.Item>
                <Menu.Item>
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