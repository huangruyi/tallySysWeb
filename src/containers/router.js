import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'
import Admin from './admin'
import Login from './login'
import Home from './admin/home'
import Income from './admin/incomeManage'
import Spending from './admin/spendingManage'
import StorageManage from './admin/storageManage'
import User from './admin/userCenter'
import NotFound from '../components/NotFound'

class IRouter extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path='/login' component={Login} />
                        <Route path='/' render={() =>
                            <Admin>
                                <Switch>
                                    <Route path='/home' exact component={Home} />
                                    <Route path='/incomeManage' exact component={Income} />
                                    <Route path='/userCenter' exact component={User} />
                                    <Route path='/spendingManage' exact component={Spending} />
                                    <Route path='/storageManage' exact component={StorageManage} />
                                    <Route path='/' exact component={Home} />
                                    {/* <Route component={NotFound} /> */}
                                </Switch>
                            </Admin>
                        } />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default IRouter;