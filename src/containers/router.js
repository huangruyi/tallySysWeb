import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'
import Admin from './admin'
import User from './user'
import Login from './user/login'
import Register from './user/register'
import Forget from './user/forget'
import Home from './admin/home'
import Income from './admin/incomeManage'
import Spending from './admin/spendingManage'
import StorageManage from './admin/storageManage'
import userCenter from './admin/userCenter'
import NotFound from '../components/NotFound'

class IRouter extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path='/user' render={() =>
                            <User>
                                <Switch>
                                    <Route path='/user/login' component={Login} />
                                    <Route path='/user/register' component={Register} />
                                    <Route path='/user/forget' component={Forget} />
                                </Switch>
                            </User>
                        } />
                        <Route path='/' render={() =>
                            <Admin>
                                <Switch>
                                    <Route path='/' exact component={Home} />
                                    <Route path='/incomeManage' component={Income} />
                                    <Route path='/userCenter' component={userCenter} />
                                    <Route path='/spendingManage' component={Spending} />
                                    <Route path='/storageManage' component={StorageManage} />
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