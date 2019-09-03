import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    IndexRedirect
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
                    <Route path='/login' component={Login} />
                    <Route path='/' render={() =>
                        <Admin>
                            <Switch>
                                <Route path='/home' component={Home} />
                                <Route path='/incomeManage' component={Income} />
                                <Route path='/userCenter' component={User} />
                                <Route path='/spendingManage' component={Spending} />
                                <Route path='/storageManage' component={StorageManage} />
                                <Route component={NotFound}/>   
                            </Switch>
                        </Admin>
                    } />
                </div>
            </Router>
        )
    }
}

export default IRouter;