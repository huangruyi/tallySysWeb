import axios from 'axios'
import api from './api'
import qs from 'qs' // 查询字符串解析和字符串化库，增加了一些安全性。
import { actions as IndexActions } from '../reducers'
import store from '../index'

//token是否有效
async function isValidToken() {
    const date = new Date();
    let refreshTokenTime = localStorage.getItem('refreshTokenTime');
    let timeEquation = date - new Date(refreshTokenTime);
    if (timeEquation > 0) {
        let Btoken = localStorage.getItem("Btoken");
        if (Btoken != null) {
            let token = Btoken.split(" ")[1];
            axios.defaults.headers.common['Authorization'] = Btoken;
            const response = await get(api.refreshToken + "?token=" + token);
            if (response && response.status == "1") {
                let newBtoken = response.data["token_type"] + " " + response.data.token;
                let newRefreshTokenTime = new Date(response.data.timeStamp);
                localStorage.setItem('Btoken', newBtoken);
                localStorage.setItem('refreshTokenTime', newRefreshTokenTime);
                return true;
            }
        }
    }
    return true;
}



export function axiosRest(method, url, params) {
    const baseURL = '/api/api';
    var url = baseURL + url;
    var params = params;
    return isValidToken().then((res) => {
        if (res) {
            let Btoken = localStorage.getItem('Btoken');
            axios.defaults.headers.common['Authorization'] = Btoken;
            if (method == "get" || method == "delete") {
                return axios[method](url, {
                    params: params,
                    paramsSerializer: params => {
                        return qs.stringify(params, { indices: false }) //将对象序列化成URL的形式，以&进行拼接
                    }
                })
            } else if ((method == "post" || method == "put")) {
                return axios[method](url, qs.stringify(params, { indices: false }))
            }
        }
    })
}

export function get(url) {
    const baseURL = '/api/api';
    var url = baseURL + url;
    return axios.get(url)
}