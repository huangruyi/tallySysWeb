import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['/home']}>
                    <Menu.Item key="/home">
                        <Link to="/home">
                            <Icon type="home" />
                            <span>首页</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/userCenter">
                        <Link to="/userCenter">
                            <Icon type="user" />
                            <span>个人中心</span>
                        </Link>

                    </Menu.Item>
                    <Menu.Item key="/incomeManage">
                        <Link to="/incomeManage">
                            <Icon type="money-collect" />
                            <span>收入管理</span>
                        </Link>

                    </Menu.Item>
                    <Menu.Item key="/storageManage">
                        <Link to="/storageManage">
                            <Icon type="transaction" />
                            <span>存储管理</span>
                        </Link>

                    </Menu.Item>
                    <Menu.Item key="/spendingManage">
                        <Link to="/spendingManage">
                            <Icon type="account-book" />
                            <span>支出管理</span>
                        </Link>

                    </Menu.Item>
                </Menu>
            </div>
        )
    }

}

export default SiderLeft;