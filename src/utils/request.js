// import axios from 'axios';

// const service = axios.create({
//     // process.env.NODE_ENV === 'development' 来判断是否开发环境
//     // easy-mock服务挂了，暂时不使用了
//     // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
//     baseURL:'/api',
//     timeout: 5000
// });

// service.interceptors.request.use(
//     config => {
//         return config;
//     },
//     error => {
//         console.log(error);
//         return Promise.reject();
//     }
// );

// service.interceptors.response.use(
//     response => {
//         if (response.status === 200) {
//             return response.data;
//         } else {
//             Promise.reject();
//         }
//     },
//     error => {
//         console.log(error);
//         return Promise.reject();
//     }
// );

// export default service;
import axios from 'axios'
import { Message } from 'element-ui'

import router from "../router";
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,

})
service.interceptors.request.use(
    config => {
        if (localStorage.getItem("user")) {
            config.headers['Authorization'] = "Bearer " + JSON.parse(localStorage.getItem("user")).token
        }
        return config
    },
    error => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
)
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code == 1 || res.code == 10001) {
            if (res.msg == "身份认证信息失效"  || res.msg =="重新登录" || res.msg == "没有登录" || res.msg == "登录信息或已过期，请重新登录" || res.msg == "登录失效，请重新登录") {
                window.localStorage.clear();
                localStorage.setItem("tian", 1);
                router.push({ path: '/' });
            } else {
                Message({
                    message: res.msg,
                    type: 'error',
                    duration: 2000
                })
            }
        }
        else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export default service
