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
            meta: { title: '自述文件' },
            children: [
                //主页面
                {
                    path: '/homePage',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/HomePage.vue'),
                    meta: { title: '首页'}
                },
                //用户
                {
                    path: '/set',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/user/Set.vue'),
                    meta: { title: '设置个人信息'}
                },
                {
                    //消息通知
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/user/Tabs.vue'),
                    meta: { title: 'tab选项卡'}
                },
                //工作台
                {
                    path: '/workbenchDep',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/workbench/workbenchDep.vue'),
                    meta: { title: '工作台-仓库' }
                },
                {
                    path: '/workbenchPr',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/workbench/workbenchPr.vue'),
                    meta: { title: '工作台-PR'}
                },
                {
                    path: '/workbenchIssue',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/workbench/workbenchIssue.vue'),
                    meta: { title: '工作台-Issue' }
                },
                //仓库
                {
                    path: '/newdepot',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/depot/newDepot.vue'),
                    meta: { title: '新建仓库'}
                },
                {
                    path: '/manage',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/depot/Manage.vue'),
                    meta: { title: '管理成员'}
                },
                {
                    path: '/addMember',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/depot/AddMember.vue'),
                    meta: { title: '邀请成员'}
                },
                {
                    //仓库列表，与工作台仓库共用页面
                    path: '/depot',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/workbench/workbenchDep.vue'),
                    meta: { title: 'depot' }
                },
          //活跃的仓库
                {
                    path: '/codedetails1',
                    name: 'codedetails1',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/code/Code_details2_active1.vue'),
                    meta: { title: '我活跃的仓库1' }
                },
                {
                    path: '/codedetails2',
                    name: 'codedetails2',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/code/Code_details2_active2.vue'),
                    meta: { title: '我活跃的仓库2' }
                },
           //新增仓库页面——详细至个人
                {
                    path: '/codedetails3',
                    name: 'codedetails3',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/code/Code_details2_success.vue'),
                    meta: { title: '仓库界面' }
                },
                {
                    path: '/codedetails4',
                    name: 'codedetails4',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/code/Code_details2_fail.vue'),
                    meta: { title: '仓库界面' }
                },
                {
                    path: '/codedetails5',
                    name: 'codedetails5',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/code/Code_details2_fail_btn.vue'),
                    meta: { title: '仓库界面' }
                },
                //新的空白仓库页面
                {
                    path: '/codedetails6',
                    name: 'codedetails6',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/code/Code_details_newDep.vue'),
                    meta: { title: '仓库界面' }
                },
                //删库
                {
                    path: '/codedetails7',
                    name: 'codedetails7',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/code/Code_details_delete.vue'),
                    meta: { title: '仓库界面' }
                },
                //找回仓库
                {
                    path: '/codedetails8',
                    name: 'codedetails8',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/code/Code_details2_lianxi.vue'),
                    meta: { title: '仓库界面' }
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
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/code/NewFile.vue'),
                    meta: { title: '新建/编辑文件', }
                },
                {
                    //**************查找页面，建议集成在首页**************
                    path: '/search',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/depot/search.vue'),
                    meta: { title: 'search' }
                },
                //pr类
                {
                    // 申请Pull Requests
                    path: '/pullWarehouse',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/pr/pullWarehouse.vue'),
                    meta: { title: '申请Pull Requests'}
                },
                {
                    // 审核Pull Requests
                    path: '/pullProcess',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/pr/pullProcess.vue'),
                    meta: { title: '审核Pull Requests'}
                },
                {
                    path: '/pullrequests',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/pr/PullRequest.vue'),
                    meta: { title: 'Pull Request' }
                },

                {
                    path: '/pullrequestsdetail',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/pr/PullRequestDetail.vue'),
                    meta: { title: '合并Pull Request' }
                },
                {
                    path: '/pullrequestsdetail_admin',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/pr/PullRequestDetail_admin.vue'),
                    meta: { title: '合并Pull Request' }
                },

                {
                    path: '/issue',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/pr/Issue.vue'),
                    meta: { title: 'Issue'}
                },
                //代码

                {
                    // ********图片上传组件,建议直接在这个页面做上传********
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/code/Upload.vue'),
                    meta: { title: '文件上传'}
                },
                {
                    path: '/codeview',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/code/Code_view.vue'),
                    meta: {
                        title: '查看文件',
                    }
                },              
                {
                    //********建议和上传页面功能合并********
                    path: '/downloadupload',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/code/DownloadUpload.vue'),
                    meta: { title: 'IPFS上传下载'}
                },
                {
                    //审核仓库页面
                    path: '/codedetails',
                    name: 'codedetails',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/code/Code_details2.vue'),
                    meta: { title: '仓库界面' }
                },
                {
                    path: '/newFile',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/code/NewFile.vue'),
                    meta: { title: '新建/编辑文件' }
                },

                
                //区块链
                {
                    // 区块链滚动
                    path: '/pullMerge',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/pr/pullMerge.vue'),
                    meta: { title: '区块链滚动' }
                },
                //图表类
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/dashboard/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/statistics',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/dashboard/Statistics.vue'),
                    meta: { title: '统计'},
                    children:[{
                        path: '/statisticssubmit',
                        component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/dashboard/StatisticsSubmit.vue'),
                        meta: { title: '提交' },
                        }]
                },
                //系统
                {
                    //问题反馈
                    path: '/feedback',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/system/feedback.vue'),
                    meta: { title: 'feedback' }
                },
                
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/system/404.vue'),
                    meta: { title: '没有权限' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/system/403.vue'),
                    meta: { title: '403' }
                },

                //评估后可废弃页面
                {
                    //审核pr页面
                    path: '/pullrequestsdetail/:owner/:visitor',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/pr/PullRequestDetail.vue'),
                    meta: { title: '合并Pull Request'}
                },

                //参考组件
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/demo/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/demo/Permission.vue'),
                    meta: { title: '权限测试', permission: true ,}
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/demo/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/demo/Donate.vue'),
                    meta: { title: '支持作者' }
                },
                {
                    path: '/ganache',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/demo/ganache.vue'),
                    meta: { title: 'ganache' }
                },{
                    //基础表格参考
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/depot/BaseTable.vue'),
                    meta: { title: '基础表格'}
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/user/Login.vue'),
            meta: { title: '登录',isRegister:false  },
        },
        {
            path: '/register',
            component: () => import(/* webpackChunkName: "donate" */ '../components/page/user/Register.vue'),
            meta: { title: 'Register',isRegister:true }
        },
        {
            path: '/resetpsd',
            component: () => import(/* webpackChunkName: "donate" */ '../components/page/user/ResetPsd.vue'),
            meta: { title: 'ResetPsd'}
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
