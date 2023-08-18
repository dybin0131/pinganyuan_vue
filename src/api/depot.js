import request from '@/utils/request'


// 搜索全部仓库
export function findAllDepot(params) {
    return request({
        url: '/repo/findall',
        method: 'get',
        params
    })
}

// 新增仓库
export function addDepo(data) {
    return request({
        url: '/workbench/addDepo',
        method: 'post',
        data
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

// 搜索所有仓库
export function searchRepo(data) {
    return request({
        url: '/repo/search',
        method: 'post',
        data
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

// 搜索仓库的分支列表
export function selectBranchList(params) {
    return request({
        url: '/workbench/selectBranchList',
        method: 'get',
        params
    })
}

// 获取仓库的评分情况
export function getRepoAuditScore(params) {
    return request({
        url: '/workbench/getRepoAuditScore',
        method: 'get',
        params
    })
}

// 获取仓库的评分情况
export function applyForAudit(params) {
    return request({
        url: '/workbench/applyForAudit',
        method: 'get',
        params
    })
}


// 新增分支
export function addBranch(data) {
    return request({
        url: '/workbench/addBranch',
        method: 'post',
        data
    })
}


// 修改文件的备注信息
export function updateFileInfo(data) {
    return request({
        url: '/file/updateFileInfo',
        method: 'post',
        data
    })
}

// 查询未审核的文件信息
export function searchUnauditedFile(data) {
    return request({
        url: '/file/searchUnauditedFile',
        method: 'post',
        data
    })
}

 