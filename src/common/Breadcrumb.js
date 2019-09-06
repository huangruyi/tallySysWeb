import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'
import modoleList from './moduleConfig'

class Breadcrumb extends Component {
    state = {
        breadCrumbArr: []
    }
    componentDidMount() {
        const routerUrl = this.props.routerUrl;
        // const moduleList = this.props.moduleList;
        let breadCrumbArr = this.getCurrentModelInfo(moduleList, routerUrl);
        this.setState({ breadCrumbArr: breadCrumbArr })
    }

    getCurrentModelInfo = (moduleList, routerUrl) => {

    }
    render() {
        let breadCurmbChildren = [];
        let breadCrumbArr = this.state.breadCrumbArr;
        if (breadCrumbArr.length > 0) {
            for (let i = 0; i < breadCrumbArr.length - 1; i++) {
                if (breadCrumbArr[i].sLinkurl != "") {
                    breadCurmbChildren.push(<Breadcrumb.Item key={breadCrumbArr[i].sLinkurl}><Link to={breadCrumbArr[i].sLinkurl}>{breadCrumbArr[i].sName}</Link></Breadcrumb.Item>);
                } else {
                    breadCurmbChildren.push(<Breadcrumb.Item key={breadCrumbArr[i].sLinkurl}>{breadCrumbArr[i].sName}</Breadcrumb.Item>);
                }

            }
            breadCurmbChildren.push(<Breadcrumb.Item key={breadCrumbArr[breadCrumbArr.length - 1].sLinkurl}>{breadCrumbArr[breadCrumbArr.length - 1].sName}</Breadcrumb.Item>);
        }
        return (
            <Breadcrumb style={{ paddingBottom: '10px' }} >
                {breadCurmbChildren}
            </Breadcrumb>
        )
    }
}

export default Breadcrumb