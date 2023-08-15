import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode:'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/homePage'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' ,roles: ['user', 'admin','user1','user2','user3'],},
            children: [
                //主页面
                {
                    path: '/homePage',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/HomePage.vue'),
                    meta: { title: '首页' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                //用户
                {
                    path: '/set',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/user/Set.vue'),
                    meta: { title: '设置个人信息',roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    //消息通知
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/user/Tabs.vue'),
                    meta: { title: 'tab选项卡',roles: ['user', 'admin','user1','user2','user3'], }
                },
                //工作台
                {
                    path: '/workbenchDep',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/workbench/workbenchDep.vue'),
                    meta: { title: '工作台-仓库',roles: ['user', 'admin','user1','user2','user3'], }
                },
                {
                    path: '/workbenchPr',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/workbench/workbenchPr.vue'),
                    meta: { title: '工作台-PR',roles: ['user', 'admin','user1','user2','user3'], }
                },
                {
                    path: '/workbenchIssue',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/workbench/workbenchIssue.vue'),
                    meta: { title: '工作台-Issue',roles: ['user', 'admin','user1','user2','user3'], }
                },
                //仓库
                {
                    path: '/newdepot',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/depot/newDepot.vue'),
                    meta: { title: '新建仓库',roles: ['user', 'admin','user1','user2','user3'], }
                },
                {
                    path: '/manage',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/depot/Manage.vue'),
                    meta: { title: '管理成员' ,roles: ['user', 'admin'],}
                },
                {
                    path: '/addMember',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/depot/AddMember.vue'),
                    meta: { title: '邀请成员',roles: ['user', 'admin'], }
                },
                {
                    //仓库列表，与工作台仓库共用页面
                    path: '/depot',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/workbench/workbenchDep.vue'),
                    meta: { title: 'depot' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    //**************查找页面，建议集成在首页**************
                    path: '/search',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/depot/search.vue'),
                    meta: { title: 'search' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                //pr类
                {
                    // 申请Pull Requests
                    path: '/pullWarehouse',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/pr/pullWarehouse.vue'),
                    meta: { title: '申请Pull Requests' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    // 审核Pull Requests
                    path: '/pullProcess',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/pr/pullProcess.vue'),
                    meta: { title: '审核Pull Requests' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    path: '/pullrequests',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/pr/PullRequest.vue'),
                    meta: { title: 'Pull Request',roles: ['user', 'admin','user1','user2','user3'], }
                },

                {
                    path: '/issue',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/pr/Issue.vue'),
                    meta: { title: 'Issue',roles: ['user', 'admin','user1','user2','user3'], }
                },
                //代码
                {
                    path: '/code',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/code/Code_upload.vue'),
                    meta: { title: '上传文件' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    // ********图片上传组件,建议直接在这个页面做上传********
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/code/Upload.vue'),
                    meta: { title: '文件上传' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    path: '/codeview',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/code/Code_view.vue'),
                    meta: {
                        title: '查看文件',
                        roles: ['user', 'admin','user1','user2','user3'], //当前菜单哪些角色可以看到
                    }
                },              
                {
                    //********建议和上传页面功能合并********
                    path: '/downloadupload',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/code/DownloadUpload.vue'),
                    meta: { title: 'IPFS上传下载' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    //审核仓库页面
                    path: '/codedetails',
                    name: 'codedetails',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/code/Code_details2.vue'),
                    meta: { title: '仓库界面' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    path: '/newFile',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/code/NewFile.vue'),
                    meta: { title: '新建/编辑文件',roles: ['user', 'admin'], }
                },

                
                //区块链
                {
                    // 区块链滚动
                    path: '/pullMerge',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/pr/pullMerge.vue'),
                    meta: { title: '区块链滚动' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                //图表类
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/dashboard/Dashboard.vue'),
                    meta: { title: '系统首页' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    path: '/statistics',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/dashboard/Statistics.vue'),
                    meta: { title: '统计',roles: ['user', 'admin','user1','user2','user3'], },
                    children:[{
                        path: '/statisticssubmit',
                        component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/dashboard/StatisticsSubmit.vue'),
                        meta: { title: '提交',roles: ['user', 'admin','user1','user2','user3'], },
                        }]
                },
                //系统
                {
                    //问题反馈
                    path: '/feedback',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/system/feedback.vue'),
                    meta: { title: 'feedback' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/system/404.vue'),
                    meta: { title: '没有权限' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/system/403.vue'),
                    meta: { title: '403' ,roles: ['user', 'admin','user1','user2','user3'],}
                },

                //评估后可废弃页面
                {
                    //审核pr页面
                    path: '/pullrequestsdetail/:owner/:visitor',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/pr/PullRequestDetail.vue'),
                    meta: { title: '合并Pull Request' ,roles: ['user', 'admin','user1','user2','user3'],}
                },

                //参考组件
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/demo/Markdown.vue'),
                    meta: { title: 'markdown编辑器' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/demo/Permission.vue'),
                    meta: { title: '权限测试', permission: true ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/demo/Icon.vue'),
                    meta: { title: '自定义图标' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/demo/Donate.vue'),
                    meta: { title: '支持作者' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    path: '/ganache',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/demo/ganache.vue'),
                    meta: { title: 'ganache' ,roles: ['user', 'admin','user1','user2','user3'],}
                },{
                    //基础表格参考
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/depot/BaseTable.vue'),
                    meta: { title: '基础表格' ,roles: ['user', 'admin','user1','user2','user3'],}
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/user/Login.vue'),
            meta: { title: '登录',isRegister:false ,roles: ['user', 'admin','user1','user2','user3'], },
        },
        {
            path: '/register',
            component: () => import(/* webpackChunkName: "donate" */ '../components/page/user/Register.vue'),
            meta: { title: 'Register',isRegister:true,roles: ['user', 'admin','user1','user2','user3'], }
        },
        {
            path: '/resetpsd',
            component: () => import(/* webpackChunkName: "donate" */ '../components/page/user/ResetPsd.vue'),
            meta: { title: 'ResetPsd',roles: ['user', 'admin','user1','user2','user3'],}
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
