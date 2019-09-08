import React, { Component } from 'react'
import { Card, Col, Row, Button, Table, Form, Select } from 'antd'
const { Option } = Select;
import './style.less'
class Income extends Component {
    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '元',
                dataIndex: 'rmb',
                key: 'rmb',
            },
            {
                title: '类型',
                dataIndex: 'code',
                key: 'code',
            },
            {
                title: '日期',
                dataIndex: 'date',
                key: 'date',
            },
            {
                title: '描述',
                dataIndex: 'desc',
                key: 'desc',
            },
        ];
        const dataSource = [
            {
                key: 0,
                id: 0,
                date: '2018-02-11',
                rmb: 120,
                code: 'income',
                desc: 'transfer',
            },
            {
                key: 1,
                id: 1,
                date: '2018-03-11',
                rmb: 243,
                code: 'income',
                desc: 'transfer',
            },
            {
                key: 2,
                id: 2,
                date: '2018-04-11',
                rmb: 98,
                code: 'income',
                desc: 'transfer',
            },
        ]
        return (
            <div>
                <Card size='small' bordered={false}>
                    <Button type="primary" icon="plus" className="btn">新增</Button>
                    <Button icon="edit" className="btn">编辑</Button>
                    <Button type="danger" icon="delete" className="btn">删除</Button>
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
            </div>
        )
    }
}

export default Income;

class SearchForm extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
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
