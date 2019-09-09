import React, { Component, Fragment } from 'react'
import { Card, Button, Table, Row, Col, Modal, Form, Input, message } from 'antd'
import api from '../../../fetch/api'
import { axiosRest } from '../../../fetch/fetch'
import Common from '../../../common/common'
const FormItem = Form.Item;
class Type extends Component {

    state = {
        parentTypeInfo: [],
        childTypeInfo: [],
        tableLoading: true,
        childTableLoading: false,
    }

    componentWillMount() {
        this.getParentTypeInfo()
    }

    getParentTypeInfo = async () => {
        const response = await axiosRest('get', api.getParentType);
        if (response && response.data.status === 1) {
            this.setState({
                parentTypeInfo: response.data.data,
                tableLoading: false
            })
        }
    }

    getChildTypeInfo = async typeId => {
        const response = await axiosRest('get', api.getTypeByTypeId, { typeId });
        if (response && response.data.status === 1) {
            this.setState({
                childTypeInfo: response.data.data,
                childTableLoading: false
            })
        }
    }

    handleOperator = (type, operator) => {
        if (type === 'parent') {
            this.setState({
                curStatus: 'parent'
            })
            if (operator === 'create') {
                this.setState({
                    title: '新增类型',
                    isVisible: true,
                    operator: 'create',
                    selectedParentInfo: {}
                })
            } else if (operator === 'edit') {
                if (!this.state.selectedParentItem) {
                    message.info('请选择一条数据！');
                    return;
                }
                this.setState({
                    title: '编辑类型',
                    isVisible: true,
                    operator: 'edit',
                    selectedParentInfo: this.state.selectedParentItem
                })
            } else if (operator === 'delete') {
                if (!this.state.selectedParentItem) {
                    message.info('请选择一条数据！');
                    return;
                }
                this.deleteType({ id: this.state.selectedParentItem.id })
            }
        } else if (type === 'child') {
            this.setState({
                curStatus: 'child'
            })
            if (operator === 'create') {
                if (!this.state.selectedParentItem) {
                    message.info('请选择父级类型！');
                    return;
                }
                this.setState({
                    title: '新增类型',
                    isVisible: true,
                    operator: 'create',
                    selectedChildInfo: {}
                })
            } else if (operator === 'edit') {
                if (!this.state.selectedParentItem) {
                    message.info('请选择父级类型！');
                    return;
                }
                if (!this.state.selectedChildItem) {
                    message.info('请选择一条数据！');
                    return;
                }
                this.setState({
                    title: '编辑类型',
                    isVisible: true,
                    operator: 'edit',
                    selectedChildInfo: this.state.selectedChildItem
                })
            } else if (operator === 'delete') {
                if (!this.state.selectedChildItem) {
                    message.info('请选择一条数据！');
                    return;
                }
                this.deleteType({ id: this.state.selectedChildItem.id })
            }
        }
    }

    setSelectedRowKey = record => {
        if (record.sTypeid === '-1') { // 父类型
            this.setState({
                selectedParentItem: record,
                childTableLoading: true
            })
            this.getChildTypeInfo(record.id)
        } else { // 子类型
            this.setState({
                selectedChildItem: record,
            })
        }
    }

    handleSubmit = form => {
        form.props.form.validateFields((err, values) => {
            if (!err) {
                form.props.form.resetFields();//表单重置
                this.setState({ btnLoading: true })
                if (this.state.curStatus === 'parent') {
                    if (this.state.operator == 'create') {
                        const data = {
                            sName: values.sName,
                            sCode: values.sCode,
                            sTypeid: '-1',
                            sDesc: values.sDesc,
                        }
                        this.createType(data)
                    } else {
                        const data = {
                            id: this.state.selectedParentItem.id,
                            sName: values.sName,
                            sCode: values.sCode,
                            sTypeid: '-1',
                            sDesc: values.sDesc,
                        }
                        this.editType(data)
                    }
                } else {
                    if (this.state.operator == 'create') {
                        const data = {
                            sName: values.sName,
                            sCode: values.sCode,
                            sTypeid: this.state.selectedParentItem.id,
                            sDesc: values.sDesc,
                        }
                        this.createType(data)
                    } else {
                        const data = {
                            id: this.state.selectedChildItem.id,
                            sName: values.sName,
                            sCode: values.sCode,
                            sTypeid: this.state.selectedParentItem.id,
                            sDesc: values.sDesc,
                        }
                        this.editType(data)
                    }
                }

            }
        });
    }

    createType = async data => {
        const response = await axiosRest('post', api.tallyType, data);
        if (response && response.data.status === 1) {
            console.log(response.data)
            this.setState({
                btnLoading: false,
                isVisible: false
            })
        } else {
            console.log(response)
        }
    }

    editType = async data => {
        const response = await axiosRest('put', api.tallyType, data);
        if (response && response.data.status === 1) {
            this.setState({
                btnLoading: false,
                isVisible: false
            })
        } else {
            console.log(response)
        }
    }

    deleteType = async data => {
        const response = await axiosRest('delete', api.tallyType, data);
        if (response && response.data.status === 1) {
            message.info('删除成功！');
        } else {
            console.log(response)
        }
    }



    render() {
        const columns = [
            {
                title: '名称',
                dataIndex: 'sName',
            },
            {
                title: '编码',
                dataIndex: 'sCode',
            },
            {
                title: '描述',
                dataIndex: 'sDesc',
            }
        ];
        const { parentTypeInfo, childTypeInfo, tableLoading, childTableLoading, title, isVisible, btnLoading, selectedParentInfo, selectedChildInfo, curStatus } = this.state;
        const rowSelection = {
            type: 'radio',
            onSelect: this.setSelectedRowKey
        }
        return (
            <Fragment>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card size='small' bordered={false}>
                            <Button type="primary" icon="plus" className="btn" onClick={() => { this.handleOperator('parent', 'create') }}>新增</Button>
                            <Button icon="edit" className="btn" onClick={() => { this.handleOperator('parent', 'edit') }}>编辑</Button>
                            <Button type="danger" icon="delete" className="btn" onClick={() => { this.handleOperator('parent', 'delete') }}>删除</Button>
                        </Card>
                        <Table
                            loading={tableLoading}
                            dataSource={parentTypeInfo}
                            columns={columns}
                            rowKey={record => record.id}
                            rowSelection={rowSelection}
                            bordered
                            size='small'
                        />
                    </Col>
                    <Col span={12}>
                        <Card size='small' bordered={false}>
                            <Button type="primary" icon="plus" className="btn" onClick={() => { this.handleOperator('child', 'create') }}>新增</Button>
                            <Button icon="edit" className="btn" onClick={() => { this.handleOperator('child', 'edit') }}>编辑</Button>
                            <Button type="danger" icon="delete" className="btn" onClick={() => { this.handleOperator('child', 'delete') }}>删除</Button>
                        </Card>
                        <Table
                            loading={childTableLoading}
                            dataSource={childTypeInfo}
                            columns={columns}
                            rowKey={record => record.id}
                            rowSelection={rowSelection}
                            bordered
                            size='small'
                        />
                    </Col>
                </Row>
                <Modal
                    title={title}
                    visible={isVisible}
                    confirmLoading={btnLoading}
                    maskClosable={false}
                    okText='继续'
                    cancelText='取消'
                    onOk={() => this.handleSubmit(this.typeForm)}
                    onCancel={() => {
                        this.typeForm.props.form.resetFields();
                        this.setState({
                            isVisible: false

                        })
                    }}
                >
                    <TypeForm
                        wrappedComponentRef={(inst) => this.typeForm = inst}
                        selectedParentInfo={selectedParentInfo}
                        selectedChildInfo={selectedChildInfo}
                        curStatus={curStatus}
                    />
                </Modal>
            </Fragment>

        )
    }
}

export default Type;

class TypeForm extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const selectedParentInfo = this.props.selectedParentInfo || {};
        const selectedChildInfo = this.props.selectedChildInfo || {};
        const { curStatus } = this.props;
        const selectedInfo = curStatus === 'parent' ? selectedParentInfo : selectedChildInfo;
        return (
            <div>
                <Form layout="horizontal">
                    <FormItem label="类型名称" {...Common.layout.modalFormItemLayout}>
                        {
                            getFieldDecorator('sName', {
                                initialValue: selectedInfo.sName,
                                rules: [{ required: true, message: '请输入类型名称!' }],
                            })(
                                <Input placeholder="请输入类型名称" />
                            )
                        }
                    </FormItem>
                    <FormItem label="类型编码" {...Common.layout.modalFormItemLayout}>
                        {
                            getFieldDecorator('sCode', {
                                initialValue: selectedInfo.sCode,
                                rules: [{ required: true, message: '请输入类型编码!' }],

                            })(
                                <Input placeholder="请输入类型编码" />
                            )
                        }
                    </FormItem>
                    <FormItem label="类型描述" {...Common.layout.modalFormItemLayout}>
                        {getFieldDecorator('sDesc', {
                            initialValue: selectedInfo.sDesc,
                        })(
                            <Input.TextArea
                                autosize={Common.layout.rowObject}
                            />
                        )}
                    </FormItem>
                </Form>
            </div>
        )
    }
}
TypeForm = Form.create()(TypeForm)