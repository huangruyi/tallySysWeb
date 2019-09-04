import React, { Component } from 'react'
import { Card, Form, Button, Input, message } from 'antd'
import Common from '../../../common/common'
const FormItem = Form.Item;

class ModifyPwd extends Component {
    state = {
        loading: false
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form layout="horizontal" onSubmit={this.handleSubmit}>
                    <FormItem label="原密码" {...Common.layout.modalFormItemLayout}>
                        {getFieldDecorator('SPasswordOld', {
                            rules: [
                                { required: true, message: '请输入原密码!' }
                            ],
                        })(
                            <Input.Password type="password" placeholder="请输入原密码" />
                        )}
                    </FormItem>
                    <FormItem label="新密码" {...Common.layout.modalFormItemLayout}>
                        {getFieldDecorator('SPasswordNew', {
                            rules: [
                                {
                                    required: true,
                                    message: '密码只能以字母开头，包含字母、数字和下划线, 长度为5~10!',
                                    pattern: /^[a-zA-Z]\w{4,9}$/,
                                }
                            ],
                        })(
                            <Input.Password type="password" placeholder="请输入新密码" />
                        )}
                    </FormItem>
                    <FormItem label="确认新密码" {...Common.layout.modalFormItemLayout}>
                        {getFieldDecorator('resPassword', {
                            rules: [
                                {
                                    required: true, message: '请输入确认新密码!'
                                },
                                {
                                    validator: this.validFunction
                                }],
                        })(
                            <Input.Password type="password" placeholder="请输入确认新密码" />
                        )}
                    </FormItem>
                </Form>
            </div>
        )
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ loading: true })
                this.updataPassword(values.SPasswordOld, values.SPasswordNew)
            }
        });
    }

    updataPassword = async (SPasswordOld, SPasswordNew) => {

    }

    validFunction = (rule, value, callback) => {
        let newPassword = this.props.form.getFieldValue('SPasswordNew');
        if (value != newPassword) {
            callback('两次密码不一致！');
        } else {
            callback();//通过
        }
    }
}
const ModifyPwdForm = Form.create()(ModifyPwd)


export default ModifyPwdForm;