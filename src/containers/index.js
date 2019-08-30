import React, { Component } from 'react'
import { Layout } from 'antd'
import HeaderTop from '../components/Header'
import SiderLeft from '../components/SiderLeft'
import FooterBottom from '../components/Footer'

const { Header, Footer, Sider, Content } = Layout;

class Admin extends Component {

    state = {
        collapsed: false,
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <SiderLeft />
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        {/* <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        /> */}
                        {/* <HeaderTop /> */}
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280,
                        }}>
                        Content
                    </Content>
                    <Footer>
                        {/* <Footer /> */}
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Admin;