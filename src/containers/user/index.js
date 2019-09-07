import React, { Component } from 'react'
import { withRouter } from 'react-router'
import Login from './login'
import Forget from './forget'
import Register from './register'
import '../style.less'
import '../reset.css'

class User extends Component {


    render() {
        return <Login />
    }

}

export default withRouter(User);