import React, { Component } from 'react'
import defaultImg from '../../../public/default.png'
import { Avatar, Menu, Dropdown } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions as IndexActions } from '../../reducers'
import './style.less'

class Header extends Component {

    logout = () => {
        localStorage.clear();
        this.props.setTokenStatus(false);
    }

    render() {
        const { userInfo } = this.props;
        const menu = (
            <Menu>
                <Menu.Item onClick={this.logout}>
                    退出登录
                </Menu.Item>
            </Menu>
        );
        return (
            <div className="userInfo">
                <span>你好--{userInfo.sName}</span>
                <Dropdown overlay={menu} placement="bottomRight">
                    <Avatar src={defaultImg} />
                </Dropdown>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setTokenStatus: bindActionCreators(IndexActions.setTokenStatus, dispatch)
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Header);