import React, { Component, Fragment } from 'react'
import { Card, Button, Table, Row, Col } from 'antd'

class Type extends Component {
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
                title: '所属',
                dataIndex: 'sType',
            },
            {
                title: '描述',
                dataIndex: 'sDesc',
            }
        ];
        const dataSource = [
            // {
            //     key: 0,
            //     id: 0,
            //     date: '2018-02-11',
            //     rmb: 120,
            //     code: 'income',
            //     desc: 'transfer',
            // },
            // {
            //     key: 1,
            //     id: 1,
            //     date: '2018-03-11',
            //     rmb: 243,
            //     code: 'income',
            //     desc: 'transfer',
            // },
            // {
            //     key: 2,
            //     id: 2,
            //     date: '2018-04-11',
            //     rmb: 98,
            //     code: 'income',
            //     desc: 'transfer',
            // },
        ]
        return (
            <Fragment>
                <Card size='small' bordered={false}>
                    <Button type="primary" icon="plus" className="btn">新增</Button>
                    <Button icon="edit" className="btn">编辑</Button>
                    <Button type="danger" icon="delete" className="btn">删除</Button>
                </Card>
                <Row gutter={16}>
                    <Col span={12}>
                        <Table
                            dataSource={dataSource}
                            columns={columns}
                            bordered
                            size='small'
                        />
                    </Col>
                    <Col span={12}>
                        <Table
                            dataSource={dataSource}
                            columns={columns}
                            bordered
                            size='small'
                        />
                    </Col>
                </Row>
            </Fragment>

        )
    }
}

export default Type;