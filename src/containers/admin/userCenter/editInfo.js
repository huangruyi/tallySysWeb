import React, { Component } from 'react'
import { Form, Input, Modal, Upload, Icon, message, Button } from 'antd'
import Common from '../../../common/common'
import defaultAvatar from '../../../../public/default.png'
const FormItem = Form.Item;
const TextArea = Input.TextArea;
class EditInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: '-1',
                name: 'logo.png',
                status: 'done',
                thumbUrl: this.props.userInfo.sLogo === null ? defaultAvatar : this.props.userInfo.sLogo,
            }]
        }
    }

    render() {
        const { userInfo } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { previewVisible, previewImage, fileList } = this.state
        return (
            <div>
                <Form layout="horizontal" onSubmit={this.handleSubmit}>
                    <FormItem label="昵称" {...Common.layout.modalFormItemLayout}>
                        {getFieldDecorator('sName', {
                            initialValue: userInfo.sName
                        })(
                            <Input placeholder='请输入昵称' />
                        )}
                    </FormItem>
                    <FormItem label="头像" {...Common.layout.modalFormItemLayout}>
                        {getFieldDecorator('sLogo', {
                        })(
                            <Upload
                                listType="picture-card"
                                beforeUpload={this.beforeUpload}
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                            >
                                {fileList.length >= 1 ? null : <Icon type='plus' />}
                            </Upload>
                        )}

                    </FormItem>
                    <FormItem label="邮箱" {...Common.layout.modalFormItemLayout}>
                        {getFieldDecorator('sEmail', {
                            initialValue: userInfo.sEmail,
                            rules: [{
                                message: '请输入正确的邮箱地址！',
                                pattern: /^[a-z0-9](\w|\.|-)*@([a-z0-9]+-?[a-z0-9]+\.){1,3}[a-z]{2,4}$/i
                            }],
                        })(
                            <Input placeholder='请输入邮箱地址' />
                        )}
                    </FormItem>
                    <FormItem label="联系方式" {...Common.layout.modalFormItemLayout}>
                        {getFieldDecorator('sPhone', {
                            initialValue: userInfo.sPhone,
                            rules: [{
                                message: '请输入正确的手机号码！',
                                pattern: /^1\d{10}$/
                            }],
                        })(
                            <Input placeholder='请输入手机号码' />
                        )}
                    </FormItem>
                    <FormItem label="个人简介" {...Common.layout.modalFormItemLayout}>
                        {getFieldDecorator('sDescription', {
                            initialValue: userInfo.sDesc,
                            rules: [{
                                message: '您最多可以输入100个字！',
                                max: 100
                            }],
                        })(
                            <TextArea
                                placeholder='您最多可以输入100个字'
                                autosize={Common.layout.rowObject}
                            />
                        )}
                    </FormItem>
                </Form>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="logo" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )
    }

    beforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('你只能选择JPG文件');
        }
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isLt1M) {
            message.error('图片必须小于1MB!');
        }
        return isJPG && isLt1M;
    }
    handleChange = (info) => {
        if (info.file.status != undefined) {
            this.setState({ fileList: info.fileList })
        }
    }
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    handleCancel = () => this.setState({ previewVisible: false })
}

const EditInfoForm = Form.create()(EditInfo)

export default EditInfoForm