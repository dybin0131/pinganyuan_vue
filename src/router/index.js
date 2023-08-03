import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode:'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            //redirect: '/code'
            redirect: '/homePage'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' ,roles: ['user', 'admin','user1','user2','user3'],},
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    path: '/set',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Set.vue'),
                    meta: { title: '设置个人信息',roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    path: '/code',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Code_upload.vue'),
                    meta: { title: '上传文件' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    path: '/homePage',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/HomePage.vue'),
                    meta: { title: '首页' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    path: '/codedetails/:owner/:visitor',
                    name: 'codedetails',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Code_details2.vue'),
                    meta: { title: '仓库界面' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    path: '/codeview',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Code_view_a.vue'),
                    meta: {
                        title: '查看文件',
                        roles: ['user', 'admin','user1','user2','user3'], //当前菜单哪些角色可以看到
                    }
                },
                {
                    path: '/newFile',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/NewFile.vue'),
                    meta: { title: '新建/编辑文件',roles: ['user', 'admin'], }
                },
                {
                    path: '/statistics',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Statistics.vue'),
                    meta: { title: '统计',roles: ['user', 'admin','user1','user2','user3'], },
                    children:[{
                        path: '/statisticssubmit',
                        component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/StatisticsSubmit.vue'),
                        meta: { title: '提交',roles: ['user', 'admin','user1','user2','user3'], },
                        }]
                },
                {
                    path: '/pullrequests',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/PullRequest.vue'),
                    meta: { title: 'Pull Request',roles: ['user', 'admin','user1','user2','user3'], }
                },
                {
                    path: '/pullrequestsdetail/:owner/:visitor',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/PullRequestDetail.vue'),
                    meta: { title: '合并Pull Request' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    path: '/issue',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Issue.vue'),
                    meta: { title: 'Issue',roles: ['user', 'admin','user1','user2','user3'], }
                },
                {
                    path: '/workbenchDep',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/workbenchDep.vue'),
                    meta: { title: '工作台-仓库',roles: ['user', 'admin','user1','user2','user3'], }
                },
                {
                    path: '/workbenchPr',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/workbenchPr.vue'),
                    meta: { title: '工作台-PR',roles: ['user', 'admin','user1','user2','user3'], }
                },
                {
                    path: '/workbenchIssue',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/workbenchIssue.vue'),
                    meta: { title: '工作台-Issue',roles: ['user', 'admin','user1','user2','user3'], }
                },
                {
                    path: '/newdepot',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/newDepot.vue'),
                    meta: { title: '新建仓库',roles: ['user', 'admin','user1','user2','user3'], }
                },
                {
                    path: '/manage',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Manage.vue'),
                    meta: { title: '管理成员' ,roles: ['user', 'admin'],}
                },
                {
                    path: '/addMember',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/AddMember.vue'),
                    meta: { title: '邀请成员',roles: ['user', 'admin'], }
                },
                {
                    path: '/depot',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/workbenchDep.vue'),
                    meta: { title: 'depot' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    path: '/feedback',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/feedback.vue'),
                    meta: { title: 'feedback' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡',roles: ['user', 'admin','user1','user2','user3'], }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '没有权限' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    // 申请Pull Requests
                    path: '/pullWarehouse',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/pullRequests/pullWarehouse.vue'),
                    meta: { title: '申请Pull Requests' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    // 合并Pull Requests
                    path: '/pullMerge',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/pullRequests/pullMerge.vue'),
                    meta: { title: '合并Pull Requests' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    // 审核Pull Requests
                    path: '/pullProcess',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/pullRequests/pullProcess.vue'),
                    meta: { title: '审核Pull Requests' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    path: '/search',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/search.vue'),
                    meta: { title: 'search' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    path: '/downloadupload',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/DownloadUpload.vue'),
                    meta: { title: 'IPFS上传下载' ,roles: ['user', 'admin','user1','user2','user3'],}
                },
                {
                    path: '/ganache',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/ganache.vue'),
                    meta: { title: 'ganache' ,roles: ['user', 'admin','user1','user2','user3'],}
                }
            ]
        },
        {
            path: '/first',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/First.vue'),
            meta: { title: '首页封面测试' ,roles: ['user', 'admin','user1','user2','user3'],},
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Login.vue'),
            meta: { title: '登录',isRegister:false ,roles: ['user', 'admin','user1','user2','user3'], },
        },
        {
            path: '/register',
            component: () => import(/* webpackChunkName: "donate" */ '../components/page/Register.vue'),
            meta: { title: 'Register',isRegister:true,roles: ['user', 'admin','user1','user2','user3'], }
        },
        {
            path: '/resetpsd',
            component: () => import(/* webpackChunkName: "donate" */ '../components/page/ResetPsd.vue'),
            meta: { title: 'ResetPsd',roles: ['user', 'admin','user1','user2','user3'],}
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
