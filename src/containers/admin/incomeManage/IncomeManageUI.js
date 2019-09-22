import React, { Component, Fragment } from 'react'
import { Card, Col, Row, Button, Table, Form, Select, Modal, DatePicker, Input, InputNumber  } from 'antd'
import Common from '../../../common/common'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const FormItem = Form.Item;
const { Option } = Select;
import './style.less'

class IncomeManageUI extends Component {
    render() {
        const columns = [
            {
                title: '元',
                dataIndex: 'fRmb',
                key: 'fRmb',
            },
            {
                title: '类型',
                dataIndex: 'sCodeName',
                key: 'sCodeName',
            },
            {
                title: '日期',
                dataIndex: 'dTime',
                key: 'dTime',
            },
            {
                title: '描述',
                dataIndex: 'sDesc',
                key: 'sDesc',
            },
        ];
        const { handleOperator, title, isVisible, btnLoading, setVisible, incomeType, handleSubmit, dataSource, 
            tableLoading, setSelectedRowKey, selectedItemInfo, onChange } = this.props;
        const rowSelection = {
            type: 'radio',
            onSelect: setSelectedRowKey
        }
        return (
            <Fragment>
                <Card size='small' bordered={false}>
                    <Button type="primary" icon="plus" className="btn" onClick={() => { handleOperator('create') }}>新增</Button>
                    <Button icon="edit" className="btn" onClick={() => { handleOperator('edit') }}>编辑</Button>
                    <Button type="danger" icon="delete" className="btn" onClick={() => { handleOperator('delete') }}>删除</Button>
                    <div className="search">
                        <SearchForm />
                    </div>
                </Card>
                <Row gutter={16}>
                    <Col span={14}>
                        <Card
                            title='收入详情'
                            size='small'
                        >
                            <Table
                                dataSource={dataSource}
                                columns={columns}
                                loading={tableLoading}
                                rowKey={record => record.id}
                                rowSelection={rowSelection}
                                bordered
                                size='small'
                            />
                        </Card>
                    </Col>
                    <Col span={10}>
                        <Card
                            title='图表展示'
                            size='small'
                        >
                            Card content
                        </Card>
                    </Col>
                </Row>
                <Modal
                    title={title}
                    visible={isVisible}
                    confirmLoading={btnLoading}
                    maskClosable={false}
                    okText='确定'
                    cancelText='取消'
                    onOk={() => handleSubmit(this.incomeForm)}
                    onCancel={() => {
                        this.incomeForm.props.form.resetFields();
                        setVisible(false)
                    }}
                >
                    <IncomwForm
                        wrappedComponentRef={(inst) => this.incomeForm = inst}
                        incomeType={incomeType}
                        selectedItemInfo={selectedItemInfo}
                        onChange={onChange}
                    />
                </Modal>
            </Fragment>
        )
    }
}

export default IncomeManageUI;

class SearchForm extends Component {
    render() {
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <Form.Item label="收入类型">
                    <Select
                        value='all'
                        style={{ width: 100 }}
                    >
                        <Option value="all">全部</Option>
                        <Option value="gz">工资</Option>
                        <Option value="sy">收益</Option>
                        <Option value="other">其他</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="年份">
                    <Select
                        value='2018'
                        style={{ width: 100 }}
                    >
                        <Option value="2018">2018</Option>
                        <Option value="2019">2019</Option>
                        <Option value="2020">2020</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" icon="search">查询</Button>
                </Form.Item>
            </Form>
        )
    }
}

SearchForm = Form.create()(SearchForm)

class IncomwForm extends Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        const { incomeType, selectedItemInfo, onChange } = this.props;
        const selectedInfo = selectedItemInfo || {};
        const dTime = selectedInfo.dTime === undefined ? null : moment(selectedInfo.dTime, 'YYYY-MM-DD');
        return (
            <div>
                <Form layout="horizontal">
                    <FormItem label="收入日期" {...Common.layout.modalFormItemLayout}>
                        {
                            getFieldDecorator('dTime', {
                                initialValue: dTime,
                                rules: [{ required: true, message: '请选择收入日期!' }],
                            })(
                                <DatePicker
                                    placeholder="请选择收入日期"
                                    onChange={onChange}
                                />
                            )
                        }
                    </FormItem>
                    <FormItem label="收入金额" {...Common.layout.modalFormItemLayout}>
                        {
                            getFieldDecorator('fRmb', {
                                initialValue: selectedInfo.fRmb,
                                rules: [{ required: true, message: '请输入收入金额!' }],

                            })(
                                <InputNumber step={0.1} placeholder="请输入收入金额"/>
                            )
                        }
                    </FormItem>
                    <FormItem label="收入类型" {...Common.layout.modalFormItemLayout}>
                        {
                            getFieldDecorator('sCode', {
                                initialValue: selectedInfo.sCode,
                                rules: [{ required: true, message: '请选择收入类型!' }],

                            })(
                                <Select
                                    placeholder="请选择收入类型"
                                >
                                    {
                                        incomeType && incomeType.map(item => {
                                            return <Option key={item.id} value={item.sCode}>{item.sName}</Option>
                                        })
                                    }
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label="收入描述" {...Common.layout.modalFormItemLayout}>
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
IncomwForm = Form.create()(IncomwForm)