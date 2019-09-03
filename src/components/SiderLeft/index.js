import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import logo from '../../../public/logo.png'
import './style.less'

class SiderLeft extends Component {

    render() {
        const { collapsed } = this.props;
        return (
            <div style={{ height: '100vh' }}>
                <div className="logo">
                    <img src={logo} />
                    {
                        !collapsed && <span>TallySysWeb</span>
                    }                   
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']}>
                    <Menu.Item key="home">
                        <Icon type="home" />
                        <span>首页</span>
                    </Menu.Item>
                    <Menu.Item key="userCenter">
                        <Icon type="user" />
                        <span>个人中心</span>
                    </Menu.Item>
                    <Menu.Item key="income">
                        <Icon type="upload" />
                        <span>收入管理</span>
                    </Menu.Item>
                    <Menu.Item key="storage">
                        <Icon type="upload" />
                        <span>存储管理</span>
                    </Menu.Item>
                    <Menu.Item key="spending">
                        <Icon type="upload" />
                        <span>支出管理</span>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }

}

export default SiderLeft;