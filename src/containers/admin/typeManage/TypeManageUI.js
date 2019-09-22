import React, { Component, Fragment } from 'react'
import { Card, Button, Table, Row, Col, Modal, Form, Input } from 'antd'
import Common from '../../../common/common'
const { CREATE, EDIT, DEL } = Common.opera
const { PARENT, CHILD } = Common.type
const FormItem = Form.Item;
class TypeManageUI extends Component {

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
        const { parentTypeInfo, childTypeInfo, tableLoading, childTableLoading, title, isVisible, btnLoading, 
            selectedParentInfo, selectedChildInfo, curStatus, handleOperator, handleSubmit, setSelectedRowKey, 
            setStateVisible } = this.props;
        const rowSelection = {
            type: 'radio',
            onSelect: setSelectedRowKey
        }
        return (
            <Fragment>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card size='small' bordered={false}>
                            <Button type="primary" icon="plus" className="btn" onClick={() => { handleOperator(PARENT, CREATE) }}>新增</Button>
                            <Button icon="edit" className="btn" onClick={() => { handleOperator(PARENT, EDIT) }}>编辑</Button>
                            <Button type="danger" icon="delete" className="btn" onClick={() => { handleOperator(PARENT, DEL) }}>删除</Button>
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
                            <Button type="primary" icon="plus" className="btn" onClick={() => { handleOperator(CHILD, CREATE) }}>新增</Button>
                            <Button icon="edit" className="btn" onClick={() => { handleOperator(CHILD, EDIT) }}>编辑</Button>
                            <Button type="danger" icon="delete" className="btn" onClick={() => { handleOperator(CHILD, DEL) }}>删除</Button>
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
                    okText='确定'
                    cancelText='取消'
                    onOk={() => handleSubmit(this.typeForm)}
                    onCancel={() => {
                        this.typeForm.props.form.resetFields();
                        setStateVisible(false)
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

export default TypeManageUI;

class TypeForm extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const selectedParentInfo = this.props.selectedParentInfo || {};
        const selectedChildInfo = this.props.selectedChildInfo || {};
        const { curStatus } = this.props;
        const selectedInfo = curStatus === PARENT ? selectedParentInfo : selectedChildInfo;
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