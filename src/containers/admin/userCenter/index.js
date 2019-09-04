import React, { Component } from 'react'
import Common from '../../../common/common'
import defaultAvatar from '../../../../public/default.png'
import { Card, Form, Button, Modal, Breadcrumb  } from 'antd'
import EditInfo from './editInfo'
import ModifyPwd from './modifyPwd'
import './style.less'
const FormItem = Form.Item;
class User extends Component {

    state = {
        isEditVisible: false,
        isModifyVisible: false,
        confirmLoading: false,
        userInfo: {
            sLogo: null,
            sUsername: 'Admin',
            sName: '管理员',
            sEmail: '1243916844@qq.com',
            sPhone: '12345678901',
            dLastlogin: '2019-09-03 14:54:46',
            sDesc: '这是管理员用户'
        }
    }

    editUserInfo = () => {
        this.setState({
            isEditVisible: true
        })
    }

    modifyPassword = () => {
        this.setState({
            isModifyVisible: true
        })
    }


    render() {
        const { userInfo, isEditVisible, confirmLoading, isModifyVisible } = this.state;
        return (

            <div>
                <Card title="查看个人信息">
                    <Form layout="horizontal">
                        <FormItem label="头像" {...Common.layout.formItemLayout}>
                            <img src={userInfo.sLogo == null ? defaultAvatar : userInfo.sLogo} style={{ width: 100 }} />
                        </FormItem>
                        <FormItem label="用户名" {...Common.layout.formItemLayout}>
                            {userInfo.sUsername}
                        </FormItem>
                        <FormItem label="昵称" {...Common.layout.formItemLayout}>
                            {userInfo.sName}
                        </FormItem>
                        <FormItem label="邮箱" {...Common.layout.formItemLayout}>
                            {userInfo.sEmail}
                        </FormItem>
                        <FormItem label="联系方式" {...Common.layout.formItemLayout}>
                            {userInfo.sPhone}
                        </FormItem>
                        <FormItem label="上次登录时间" {...Common.layout.formItemLayout}>
                            {userInfo.dLastlogin}
                        </FormItem>
                        <FormItem label="个人简介" {...Common.layout.formItemLayout}>
                            {userInfo.sDesc}
                        </FormItem>
                        <FormItem {...Common.layout.offsetLayout}>
                            <Button type="link" onClick={this.editUserInfo} className="btn">编辑资料</Button>
                            <Button type="link" onClick={this.modifyPassword} className="btn">修改密码</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Modal
                    title="编辑信息"
                    visible={isEditVisible}
                    okText="提交"
                    cancelText="取消"
                    maskClosable={false}
                    confirmLoading={confirmLoading}
                    onOk={() => this.handleEditSubmit(this.editForm)}
                    onCancel={() => {
                        this.editForm.props.form.resetFields();
                        this.setState({
                            isEditVisible: false
                        })
                    }}
                >
                    <EditInfo
                        wrappedComponentRef={(inst) => this.editForm = inst}
                        userInfo={userInfo}
                    />
                </Modal>
                <Modal
                    title="修改密码"
                    visible={isModifyVisible}
                    okText="提交"
                    cancelText="取消"
                    maskClosable={false}
                    confirmLoading={confirmLoading}
                    onOk={() => this.handleModifySubmit(this.modifyForm)}
                    onCancel={() => {
                        this.modifyForm.props.form.resetFields();
                        this.setState({
                            isModifyVisible: false
                        })
                    }}
                >
                    <ModifyPwd
                        wrappedComponentRef={(inst) => this.modifyForm = inst}
                    />
                </Modal>
            </div>
        )
    }
}

export default User;