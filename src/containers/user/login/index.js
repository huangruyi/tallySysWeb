import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Card, Form, Icon, Input, Button, Checkbox } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions as LoginActions } from '../../../reducers/login'

import './style.less'
class Login extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values.username, values.password)
            }
        });
    }

    render() {
        const { isHasToken } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card style={{ top: 100, width: 400, margin: 'auto' }}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>记住我</Checkbox>)}
                            <Link className="login-form-forgot" to="/user/forget">忘记密码</Link>
                            <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                            或者 <Link to="/user/register">现在注册!</Link>
                        </Form.Item>
                    </Form>
                </Card>
                {
                    isHasToken && <Redirect to={{ pathname: '/home' }} />
                }
            </div>
        );
    }
}
const LoginForm = Form.create()(Login);

function mapStateToProps(state) {
    return {
        isHasToken: state.globalState.isHasToken
    }
}
function mapDispatchToProps(dispatch) {
    return {
        login: bindActionCreators(LoginActions.userLogin, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm)