import { put, take, call } from 'redux-saga/effects'
import { get, axiosRest } from '../fetch/fetch'
import { actionsTypes as LoginActions } from '../reducers/login'
import { actionsTypes as IndexActions } from '../reducers'
import api from '../fetch/api'

export function* login() {
    while (true) {
        let request = yield take(LoginActions.USER_LOGIN);
        let response = yield call(get, api.JWTToken + '?username=' + request.username + "&password=" + request.password)
        if (response && response.data.status == 1) {
            const data = response.data.data;
            let Btoken = data["token_type"] + " " + data.token;
            let refreshTokenTime = new Date(data.timeStamp);
            localStorage.setItem('Btoken', Btoken);
            localStorage.setItem('refreshTokenTime', refreshTokenTime);
            yield put({
                type: IndexActions.SET_TOKEN_STATUS,
                status: true
            });
        } else {
            console.log("用户名或者密码错误")
            yield put({
                type: IndexActions.SET_TOKEN_STATUS,
                status: false
            });
        }
    }
}

export function* getUserInfo() {
    while (true) {
        yield take(LoginActions.GET_USER_INFO);
        let response = yield call(axiosRest, 'get', api.user);
        if (response && response.data.status == 1) {
            const data = response.data.data;
            yield put({
                type: LoginActions.SAVE_USER_INFO,
                userInfo: data,
                isGetUserInfo: true
            });
        } else {

        }
    }
}

