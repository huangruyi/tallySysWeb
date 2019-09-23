import React, { Component } from 'react'
import {
    Redirect,
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
import UserCenter from './admin/userCenter'
import Type from './admin/typeManage'
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
                                    <Route path='/user/login' exact component={Login} />
                                    <Route path='/user/register' exact component={Register} />
                                    <Route path='/user/forget' exact component={Forget} />
                                </Switch>
                            </User>
                        } />
                        <Route path='/' render={() =>
                            <Admin>
                                <Switch>
                                    <Route path='/home' exact component={Home} />
                                    <Route path='/incomeManage' exact component={Income} />
                                    <Route path='/userCenter' exact component={UserCenter} />
                                    <Route path='/spendingManage' exact component={Spending} />
                                    <Route path='/storageManage' exact component={StorageManage} />
                                    <Route path='/typeManage' exact component={Type} />
                                    <Route path='/' exact component={Home} />
                                    {/* {
                                        //<Redirect from='/' to="/home" />
                                    } */}
                                    <Route component={NotFound} />
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