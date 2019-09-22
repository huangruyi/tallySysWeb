import React, { Component, Fragment } from 'react'
import Common from '../../../common/common'
import api from '../../../fetch/api'
import { axiosRest } from '../../../fetch/fetch'
import { connect } from 'react-redux'
import { bindActionCreator } from 'redux'
import { actions as IndexActions } from '../../../reducers'
import IncomeManageUI from './IncomeManageUI'
import { message } from 'antd'
const { CREATE, EDIT, DEL } = Common.opera
const { income } = Common.code
const { GET, POST, PUT, DELETE } = Common.action
const { CREATE_TIP, EDIT_TIP, DELETE_TIP } = Common.tip
class Income extends Component {

    state = {
        btnLoading: false,
        isVisible: false,
        isGetType: false,
        dataSource: [],
        tableLoading: true,
    }

    componentWillMount() {
        this.getIncomeDetail()
    }

    getIncomeDetail = async () => {
        const response = await axiosRest('get', api.incomeDetail);
        if (response && response.data.status === 1) {
            this.setState({
                dataSource: response.data.data,
                tableLoading: false
            })
        } else {
            console.log(response)
        }
    }


    getIncomeTypeId = () => {
        const { tallyType } = this.props;
        const result = tallyType.filter(item => {
            return item.sCode === income;
        })
        const typeId = result[0].id
        this.getIncomeType(typeId)
    }

    getIncomeType = async typeId => {
        const response = await axiosRest(GET, api.getTypeByTypeId, {
            typeId
        });
        if (response && response.data.status === 1) {
            this.setState({
                incomeType: response.data.data,
                isGetType: true
            })
        }
    }

    handleOperator = operator => {
        const { selectedItem } = this.state;
        this.setState({
            incomeDate: undefined
        })
        if (operator === CREATE) {
            this.setState({
                title: '新增收入',
                isVisible: true,
                operator: CREATE,
                selectedItemInfo: null
            })
        } else if (operator === EDIT) {
            if (!selectedItem) {
                message.info('请选择一条数据');
                return;
            }
            this.setState({
                title: '编辑收入',
                isVisible: true,
                operator: EDIT,
                selectedItemInfo: selectedItem
            })

        } else if (operator === DEL) {
            if (!selectedItem) {
                message.info('请选择一条数据');
                return;
            }
            this.setState({
                tableLoading: true
            })
            this.deleteIncome({
                id: selectedItem.id
            })
        }
    }

    handleSubmit = form => {
        const { operator, selectedItem, incomeDate } = this.state;
        form.props.form.validateFields((err, values) => {
            if (!err) {
                form.props.form.resetFields();//表单重置
                this.setState({ btnLoading: true })
                if(incomeDate !== undefined) {
                    values.dTime = incomeDate;
                } else {
                    values.dTime = values.dTime._i;
                }             
                if (operator === CREATE) {
                    this.createIncome(values)
                } else if (operator === EDIT) {
                    values.id = selectedItem.id
                    this.editIncome(values)
                }
            }
        });
    }

    createIncome = async data => {
        const { dataSource } = this.state;
        const response = await axiosRest(POST, api.incomeDetail, data);
        if (response && response.data.status === 1) {
            message.success(CREATE_TIP);
            this.setState({
                btnLoading: false,
                isVisible: false,
                dataSource: [...dataSource, response.data.data]
            })
        } else {
            message.error(response.data.detail);
        }
    }

    editIncome = async data => {
        const { dataSource } = this.state;
        const response = await axiosRest(PUT, api.incomeDetail, data);
        if (response && response.data.status === 1) {
            const result = response.data.data;
            message.success(EDIT_TIP);
            dataSource.map(item => {
                if (item.id === result.id) {
                    item.fRmb = result.fRmb;
                    item.dTime = result.dTime;
                    item.sCodeName = result.sCodeName;
                    item.sCode = result.sCode;
                    item.sDesc = result.sDesc;
                }
            })
            this.setState({
                btnLoading: false,
                isVisible: false,
                dataSource
            })
        } else {
            message.error(response.data.detail);
        }
    }

    deleteIncome = async data => {
        const { dataSource } = this.state;
        const response = await axiosRest(DELETE, api.incomeDetail, data);
        if (response && response.data.status === 1) {
            message.success(DELETE_TIP);
            this.setState({
                dataSource: dataSource.filter(item => {
                    return item.id !== response.data.data.id;
                }),
                selectedItem: null,
                tableLoading: false
            })
        } else {
            message.error(response.data.detail);
        }
    }

    setSelectedRowKey = record => {
        this.setState({
            selectedItem: record
        })
    }

    onChange = (date, dateString) => {
        this.setState({
            incomeDate: dateString
        })
    }
    render() {
        const { title, isVisible, btnLoading, incomeType, isGetType, dataSource, tableLoading, selectedItemInfo } = this.state;
        const { tallyType } = this.props;
        return (
            <Fragment>
                {
                    !isGetType && tallyType.length !== 0 && this.getIncomeTypeId()
                }
                <IncomeManageUI
                    handleOperator={this.handleOperator}
                    title={title}
                    isVisible={isVisible}
                    btnLoading={btnLoading}
                    setVisible={flag => {
                        this.setState({
                            isVisible: flag
                        })
                    }}
                    incomeType={incomeType}
                    handleSubmit={this.handleSubmit}
                    dataSource={dataSource}
                    tableLoading={tableLoading}
                    setSelectedRowKey={this.setSelectedRowKey}
                    selectedItemInfo={selectedItemInfo}
                    onChange={this.onChange}
                />
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        tallyType: state.globalState.tallyType,
    }
}

export default connect(
    mapStateToProps,
    null
)(Income);


