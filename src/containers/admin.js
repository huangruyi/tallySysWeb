import React, { Component } from 'react'
import { withRouter } from 'react-router'
import SiderLeft from '../components/SiderLeft'
import HeaderTop from '../components/Header'
import FooterBottom from '../components/Footer'
import NotFound from '../components/NotFound'
import { Layout, Menu, Icon } from 'antd'
import './style.less'
import './reset.css'
const { Header, Footer, Sider, Content } = Layout;

class Admin extends Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        const { collapsed } = this.state;
        const { location } = this.props;
        console.log(this.props.location)
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <SiderLeft
                        collapsed={collapsed}
                        routeLinkurl={location.pathname}
                    />
                </Sider>
                <Layout>
                    <Header className="header">
                        <div>
                            <Icon
                                className="trigger"
                                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                            <HeaderTop />
                        </div>
                    </Header>
                    <Content className="content">
                        {this.props.children}
                    </Content>
                    <Footer>
                        <FooterBottom />
                    </Footer>
                </Layout>
            </Layout>
        )
    }

}

export default withRouter(Admin);