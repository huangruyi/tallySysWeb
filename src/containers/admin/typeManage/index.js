import React, { Component } from 'react'
import { message } from 'antd'
import api from '../../../fetch/api'
import { axiosRest } from '../../../fetch/fetch'
import Common from '../../../common/common'
import TypeManageUI from './TypeManageUI'
const { GET, POST, PUT, DELETE } = Common.action
const { CREATE, EDIT, DEL } = Common.opera
const { CREATE_TIP, EDIT_TIP, DELETE_TIP } = Common.tip
const { PREANT, CHILD } = Common.type
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
        const response = await axiosRest(GET, api.getParentType);
        if (response && response.data.status === 1) {
            this.setState({
                parentTypeInfo: response.data.data,
                tableLoading: false
            })
        } else {
            message.error(response.data.detail)
        }
    }

    getChildTypeInfo = async typeId => {
        const response = await axiosRest(GET, api.getTypeByTypeId, { typeId });
        if (response && response.data.status === 1) {
            this.setState({
                childTypeInfo: response.data.data,
                childTableLoading: false
            })
        } else {
            message.error(response.data.detail)
        }
    }

    handleOperator = (type, operator) => {
        if (type === PARENT) {
            this.setState({
                curStatus: PARENT
            })
            if (operator === CREATE) {
                this.setState({
                    title: '新增类型',
                    isVisible: true,
                    operator: CREATE,
                    selectedParentInfo: {}
                })
            } else if (operator === EDIT) {
                if (!this.state.selectedParentItem) {
                    message.info('请选择一条数据！');
                    return;
                }
                this.setState({
                    title: '编辑类型',
                    isVisible: true,
                    operator: EDIT,
                    selectedParentInfo: this.state.selectedParentItem
                })
            } else if (operator === DEL) {
                if (!this.state.selectedParentItem) {
                    message.info('请选择一条数据！');
                    return;
                }
                this.deleteType({ id: this.state.selectedParentItem.id })
            }
        } else if (type === CHILD) {
            this.setState({
                curStatus: CHILD
            })
            if (operator === CREATE) {
                if (!this.state.selectedParentItem) {
                    message.info('请选择父级类型！');
                    return;
                }
                this.setState({
                    title: '新增类型',
                    isVisible: true,
                    operator: CREATE,
                    selectedChildInfo: {}
                })
            } else if (operator === EDIT) {
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
                    operator: EDIT,
                    selectedChildInfo: this.state.selectedChildItem
                })
            } else if (operator === EDIT) {
                if (!this.state.selectedChildItem) {
                    message.info('请选择一条数据！');
                    return;
                }
                this.deleteType({ id: this.state.selectedChildItem.id })
            }
        }
    }

    setSelectedRowKey = record => {
        if (record.sTypeid === Common.PARENT_CODE) { // 父类型
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
        const { curStatus } = this.state;
        form.props.form.validateFields((err, values) => {
            if (!err) {
                form.props.form.resetFields();//表单重置
                this.setState({
                    btnLoading: true
                })
                if (curStatus === PREANT) {
                    this.submitParentType(values)
                } else if (curStatus === CHILD) {
                    this.submitChildType(values)
                }
            }
        });
    }

    submitParentType = values => {
        const { operator, selectedParentItem } = this.state;
        if (operator === CREATE) {
            values.sTypeid = Common.PARENT_CODE
            this.createType(values)
        } else if (operator === EDIT) {
            values.id = selectedParentItem.id
            values.typeId = Common.PARENT_CODE
            this.editType(values)
        }
    }

    submitChildType = values => {
        const { operator, selectedParentItem, selectedChildItem } = this.state;
        if (operator == CREATE) {
            values.sTypeid = selectedParentItem.id
            this.createType(values)
        } else {
            values.id = selectedChildItem.id
            values.typeId = selectedParentItem.id
            this.editType(values)
        }
    }

    createType = async data => {
        const { parentTypeInfo } = this.state;
        const response = await axiosRest(POST, api.tallyType, data);
        if (response && response.data.status === 1) {
            message.success(CREATE_TIP);
            this.setState({
                btnLoading: false,
                isVisible: false,
                parentTypeInfo: [...parentTypeInfo, response.data.data]
            })
        } else {
            message.error(response.data.detail)
        }
    }

    editType = async data => {
        const { parentTypeInfo } = this.state;
        const response = await axiosRest(PUT, api.tallyType, data);
        if (response && response.data.status === 1) {
            message.success(EDIT_TIP);
            const result = response.data.data;
            parentTypeInfo.map(item => {
                if (item.id == result.id) {
                    item.sName = result.sName;
                    item.sCode = result.sCode;
                    item.sDesc = result.sDesc;
                }
            })
            this.setState({
                btnLoading: false,
                isVisible: false,
                parentTypeInfo,
            })
        } else {
            message.error(response.data.detail)
        }
    }

    deleteType = async data => {
        const { parentTypeInfo, curStatus } = this.state;
        const response = await axiosRest(DELETE, api.tallyType, data);
        if (response && response.data.status === 1) {
            message.success(DELETE_TIP);
            this.setState({
                parentTypeInfo: parentTypeInfo.filter(item => {
                    return item.id !== response.data.data.id;
                })
            })
        } else {
            message.error(response.data.detail)
        }
    }

    render() {
        const { parentTypeInfo, childTypeInfo, tableLoading, childTableLoading, title, isVisible, btnLoading, selectedParentInfo,
            selectedChildInfo, curStatus } = this.state;
        return (
            <TypeManageUI
                parentTypeInfo={parentTypeInfo}
                childTypeInfo={childTypeInfo}
                tableLoading={tableLoading}
                childTableLoading={childTableLoading}
                title={title}
                isVisible={isVisible}
                btnLoading={btnLoading}
                selectedParentInfo={selectedParentInfo}
                selectedChildInfo={selectedChildInfo}
                curStatus={curStatus}
                handleOperator={this.handleOperator}
                handleSubmit={this.handleSubmit}
                setSelectedRowKey={this.setSelectedRowKey}
                setStateVisible={flag => {
                    this.setState({
                        isVisible: flag
                    })
                }}
            />
        )
    }
}

export default Type;