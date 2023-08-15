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
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/set',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Set.vue'),
                    meta: { title: '设置个人信息'}
                },
                {
                    path: '/code',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Code_upload.vue'),
                    meta: { title: '上传文件' }
                },
                {
                    path: '/homePage',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/HomePage.vue'),
                    meta: { title: '首页'}
                },
                {
                    path: '/codedetails',
                    name: 'codedetails',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Code_details2.vue'),
                    meta: { title: '仓库界面' }
                },
                {
                    path: '/codedetails_admin',
                    name: 'codedetails_admin',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Code_details2_admin.vue'),
                    meta: { title: '仓库管理员界面' }
                },
                {
                    path: '/codedetails1',
                    name: 'codedetails1',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Code_details2_active1.vue'),
                    meta: { title: '我活跃的仓库1' }
                },
                {
                    path: '/codedetails2',
                    name: 'codedetails2',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Code_details2_active2.vue'),
                    meta: { title: '我活跃的仓库2' }
                },
                {
                    path: '/codedetails3',
                    name: 'codedetails3',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Code_details2_success.vue'),
                    meta: { title: '仓库界面' }
                },
                {
                    path: '/codedetails4',
                    name: 'codedetails4',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Code_details2_fail.vue'),
                    meta: { title: '仓库界面' }
                },
                {
                    path: '/codedetails5',
                    name: 'codedetails5',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Code_details2_fail_btn.vue'),
                    meta: { title: '仓库界面' }
                },
                //新的空白仓库页面
                {
                    path: '/codedetails6',
                    name: 'codedetails6',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Code_details_newDep.vue'),
                    meta: { title: '仓库界面' }
                },
                //删库
                {
                    path: '/codedetails7',
                    name: 'codedetails7',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Code_details_delete.vue'),
                    meta: { title: '仓库界面' }
                },
                //找回仓库
                {
                    path: '/codedetails8',
                    name: 'codedetails8',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Code_details2_lianxi.vue'),
                    meta: { title: '仓库界面' }
                },
                {
                    path: '/codeview',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Code_view.vue'),
                    meta: {
                        title: '查看文件',
                    }
                },
                {
                    path: '/codeview_file',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Code_view_file.vue'),
                    meta: {
                        title: '查看文件',
                    }
                },
                {
                    path: '/codeview_file_lihua',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Code_view_lihua_main.vue'),
                    meta: {
                        title: '查看文件',
                    }
                },
                {
                    path: '/newFile',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/NewFile.vue'),
                    meta: { title: '新建/编辑文件', }
                },
                {
                    path: '/statistics',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Statistics.vue'),
                    meta: { title: '统计' },
                    children:[{
                        path: '/statisticssubmit',
                        component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/StatisticsSubmit.vue'),
                        meta: { title: '提交' },
                    }]
                },
                {
                    path: '/pullrequests',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/PullRequest.vue'),
                    meta: { title: 'Pull Request' }
                },
                {
                    path: '/pullrequestsdetail',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/PullRequestDetail.vue'),
                    meta: { title: '合并Pull Request' }
                },
                {
                    path: '/pullrequestsdetail_admin',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/PullRequestDetail_admin.vue'),
                    meta: { title: '合并Pull Request' }
                },
                {
                    path: '/issue',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Issue.vue'),
                    meta: { title: 'Issue' }
                },
                {
                    path: '/workbenchDep',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/workbenchDep.vue'),
                    meta: { title: '工作台-仓库' }
                },
                {
                    path: '/workbenchDep2',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/workbenchDep2.vue'),
                    meta: { title: '工作台-仓库' }
                },
                {
                    path: '/workbenchPr',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/workbenchPr.vue'),
                    meta: { title: '工作台-PR' }
                },
                {
                    path: '/workbenchIssue',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/workbenchIssue.vue'),
                    meta: { title: '工作台-Issue' }
                },
                {
                    path: '/newdepot',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/newDepot.vue'),
                    meta: { title: '新建仓库'}
                },
                {
                    path: '/retrieveDepot',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/retrieveDepot.vue'),
                    meta: { title: '找回仓库'}
                },
                {
                    path: '/manage',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Manage.vue'),
                    meta: { title: '管理成员' }
                },
                {
                    path: '/manage2',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Manage2.vue'),
                    meta: { title: '管理成员' }
                },
                {
                    path: '/addMember',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/AddMember.vue'),
                    meta: { title: '邀请成员' }
                },

                {
                    path: '/depot',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/workbenchDep.vue'),
                    meta: { title: 'depot' }
                },
                {
                    path: '/feedback',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/feedback.vue'),
                    meta: { title: 'feedback'}
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器'}
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传'}
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化'}
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '没有权限' }
                },
                {
                    // 申请Pull Requests
                    path: '/pullWarehouse',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/pullRequests/pullWarehouse.vue'),
                    meta: { title: '申请Pull Requests'}
                },
                {
                    // 区块链滚动
                    path: '/pullMerge',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/pullRequests/pullMerge.vue'),
                    meta: { title: '区块链滚动' }
                },
                {
                    // 审核Pull Requests
                    path: '/pullProcess',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/pullRequests/pullProcess.vue'),
                    meta: { title: '审核Pull Requests' }
                },
                {
                    path: '/search',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/search.vue'),
                    meta: { title: 'search' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403'}
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                },
                {
                    path: '/downloadupload',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/DownloadUpload.vue'),
                    meta: { title: 'IPFS上传下载' }
                },
                {
                    path: '/ganache',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/ganache.vue'),
                    meta: { title: 'ganache' }
                }
            ]
        },
        {
            path: '/first',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/First.vue'),
            meta: { title: '首页封面测试' },
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Login.vue'),
            meta: { title: '登录',isRegister:false  },
        },
        {
            path: '/register',
            component: () => import(/* webpackChunkName: "donate" */ '../components/page/Register.vue'),
            meta: { title: 'Register',isRegister:true }
        },
        {
            path: '/resetpsd',
            component: () => import(/* webpackChunkName: "donate" */ '../components/page/ResetPsd.vue'),
            meta: { title: 'ResetPsd'}
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});