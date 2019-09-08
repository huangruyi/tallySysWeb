import { fork } from 'redux-saga/effects'
import { login, getUserInfo } from './login'
import {  } from './income'
export default function* rootSaga() {
    yield fork(login)
    yield fork(getUserInfo)
}