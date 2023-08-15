import request from '@/utils/request'


// 搜索全部仓库
export function findAllDepot(params) {
    return request({
        url: '/repo/findall',
        method: 'get',
        params
    })
}

// 搜索我拥有的仓库
export function findMyDepot(params) {
    return request({
        url: '/workbench/ownerrepo',
        method: 'get',
        params
    })
}

// 搜索我参与的仓库
export function findMemberDepot(params) {
    return request({
        url: '/workbench/someonerepo',
        method: 'get',
        params
    })
}

// 搜索仓库详情
export function searchDetail(data) {
    return request({
        url: '/repo/searchDetail',
        method: 'post',
        data
    })
}