import { put, take, call } from 'redux-saga/effects'
import { get, axiosRest } from '../fetch/fetch'
import { actionsTypes as LoginActions } from '../reducers/login'
import api from '../fetch/api'

export function* login() {
    while (true) {
        let request = yield take(LoginActions.USER_LOGIN);
        let response = yield call(get, api.JWTToken + '?username=' + request.username + "&password=" + request.password)
        console.log(response)
        // if (response && response.status == 1) {
        //     let Btoken = response.data["token_type"] + " " + response.data.token;
        //     let refreshTokenTime = new Date(response.data.timeStamp);
        //     localStorage.setItem('Btoken', Btoken);
        //     localStorage.setItem('refreshTokenTime', refreshTokenTime);
           
        // } else {
            
        // }
    }
}