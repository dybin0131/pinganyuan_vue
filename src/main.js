import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import store from './store/store.js'
import CodeEditor from 'bin-code-editor';
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)

//import axios from 'axios';

//axios.defaults.baseURL = '/api'
Vue.config.productionTip = false;
Vue.use(CodeEditor);
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
import less from 'less'
Vue.use(less)
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

// 使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//     document.title = `${to.meta.title} | vue-manage-system`;
//     const role = localStorage.getItem('ms_username');
//     if (to.path === '/register' || to.path === '/resetpsd' || to.path === '/login') {   // 注册页面不需要权限验证，直接放行
//         next();
//     } 
    // else if (!role && to.path !== '/login') {   //login最初
    //     next('/login');
    //     console.log('login');
    // } 
    // else if (to.meta.permission) {
    //     // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    //     role === 'admin' ? next() : next('/403');
    // } 
    // else {
    //     // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    //     if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
    //         Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
    //             confirmButtonText: '确定'
    //         });
    //     } else {//进入下一个界面
    //         if(to.path === '/login')
    //             next();
    //         for (let i = 0; i < to.meta.roles.length; i++) {
    //             if (role === to.meta.roles[i]) {
    //                 next()       //角色匹配已登录，正常进入to.meta.roles[i]的页面
    //                 break
    //             } else if (i === to.meta.roles.length - 1) {
    //                 next({ path: '/Error' }) } }
    //         //next();
    //     }
    // }
// });

new Vue({
    router,
    i18n,
    render: h => h(App),
    store
}).$mount('#app');