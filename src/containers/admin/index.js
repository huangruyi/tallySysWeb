import React, { Component, Fragment, Children } from 'react'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import SiderLeft from '../../components/SiderLeft'
import HeaderTop from '../../components/Header'
import FooterBottom from '../../components/Footer'
import { Layout, Icon } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions as LoginActions } from '../../reducers/login'
import { actions as IndexActions } from '../../reducers'
import api from '../../fetch/api'
import { axiosRest } from '../../fetch/fetch'
import '../style.less'
import '../reset.css'
const { Header, Footer, Sider, Content } = Layout;

class Admin extends Component {
    state = {
        collapsed: false,
    };

    componentWillMount = () => {
        const token = localStorage.getItem('Btoken');
        if (token) {
            this.props.setTokenStatus();
            this.props.getUserInfo();
        } else {
            this.props.setTokenStatus(false);
        }
        this.getTallyType()

    }

    getTallyType = async () => {
        const response = await axiosRest('get', api.getParentType);
        if (response && response.data.status === 1) {
            this.props.setTallyType(response.data.data)
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        const { collapsed } = this.state;
        const { location, userInfo, isHasToken, isLoading, children, isGetUserInfo } = this.props;
        return (
            <Fragment>
                {
                    isLoading 
                    ?
                    console.log("It is loading.")
                    :
                    !isHasToken
                        ?
                        <Redirect to={{ pathname: '/user/login' }} />
                        :
                        <Fragment>
                            {
                                !isGetUserInfo
                                    ?
                                    console.log("It is request userInfo.")
                                    :
                                    <LayoutUI
                                        location={location}
                                        userInfo={userInfo}
                                        collapsed={collapsed}
                                        toggle={this.toggle}
                                        children={children}
                                    />
                            }
                        </Fragment>
                }
            </Fragment>

        )
    }
}

function mapStateToProps(state) {
    return {
        userInfo: state.login.userInfo,
        isHasToken: state.globalState.isHasToken,
        isLoading: state.globalState.isLoading,
        isGetUserInfo: state.login.isGetUserInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserInfo: bindActionCreators(LoginActions.getUserInfo, dispatch),
        setTokenStatus: bindActionCreators(IndexActions.setTokenStatus, dispatch),
        setTallyType: bindActionCreators(IndexActions.setTallyType, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Admin))

class LayoutUI extends Component {
    render() {
        const { location, userInfo, collapsed, toggle, children } = this.props;
        return (
            < Layout >
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
                                onClick={toggle}
                            />
                            <HeaderTop userInfo={userInfo} />
                        </div>
                    </Header>
                    <Content className="content">
                        <div className="container">
                            {children}
                        </div>
                    </Content>
                    <Footer>
                        <FooterBottom />
                    </Footer>
                </Layout>
            </Layout >
        )
    }
}