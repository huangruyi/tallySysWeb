import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import logo from '../../../public/logo.png'
import moduleList from '../../common/moduleConfig'
import Common from '../../common/common'
import './style.less'
const { SubMenu } = Menu;
class SiderLeft extends Component {

    state = {
        curSelectKey: Common.HOME_URL,
        curOpenKey: ''
    }

    componentWillMount = () => {
        this.initExpandSubMenu()
    }

    renderMenu = item => {
        const { sLinkurl, sIcon, sName, children } = item;
        if (children && children.length > 0) {
            return this.renderChildMenu(item)
        } else {
            return (
                <Menu.Item key={sLinkurl}>
                    <Link to={sLinkurl}>
                        {sIcon && <Icon type={sIcon} />}
                        <span>{sName}</span>
                    </Link>
                </Menu.Item>
            )
        }
    }
    renderChildMenu = item => {
        const { sLinkurl, sIcon, sName, children } = item;
        return (
            <Menu.SubMenu
                key={sLinkurl}
                title={
                    <span>
                        {
                            sIcon && <Icon type={sIcon} />
                        }
                        <span>{sName}</span>
                    </span>
                }
            >
                {
                    children.map(childItem => {
                        return this.renderMenu(childItem)
                    })
                }
            </Menu.SubMenu>
        )
    }
    setSelectedKey = item => {
        this.setState({
            curSelectKey: item.key
        })
    }

    initExpandSubMenu = () => {
        const { routeLinkurl } = this.props;
        const param = routeLinkurl.split(Common.ROOT_URL);
        if (param.length === 3) {
            this.setState({
                curOpenKey: Common.ROOT_URL + param[1]
            })
        }
    }

    render() {
        const { curSelectKey, curOpenKey } = this.state;
        const { collapsed } = this.props;
        return (
            <div style={{ height: '100vh' }}>
                <div className="logo">
                    <img src={logo} />
                    {
                        !collapsed && <span>{Common.TITLE}</span>
                    }
                </div>
                <Menu
                    onClick={this.setSelectedKey}
                    theme="dark"
                    mode="inline"
                    selectedKeys={[curSelectKey]}
                    defaultOpenKeys={[curOpenKey]}
                >
                    {
                        moduleList.map(item => {
                            return this.renderMenu(item)
                        })
                    }
                </Menu>
            </div>
        )
    }

    componentDidMount = () => {
        let { routeLinkurl } = this.props;
        if (routeLinkurl === Common.ROOT_URL) {
            routeLinkurl = Common.HOME_URL;
        }
        this.setState({
            curSelectKey: routeLinkurl
        })
    }
}

export default SiderLeft;