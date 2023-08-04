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
export function login(params) {
    return request({
        url: '/user/login',
        method: 'get',
        params
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
// 查询所有仓库的所有成员的信息
export function repomemFindall(params) {
    return request({
        url: '/repomem/findall',
        method: 'get',
        params
    })
}
// 为某个仓库添加成员
export function repomemAddmem(data) {
    return request({
        url: '/repomem/addmem',
        method: 'post',
        data
    })
}
// 为某个仓库删除成员
export function repomemDeletemem(params) {
    return request({
        url: '/repomem/deletemem',
        method: 'get',
        params
    })
}