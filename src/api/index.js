import request from '@/utils/request'

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};
// 注册
export function registers(data) {
    return request({
        url: '/user/register',
        method: 'post',
        data
    })
}
// 登录
export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}
// 查询所以用户信息
export function findall(params) {
    return request({
        url: '/user/findall',
        method: 'get',
        params
    })
}