<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">平安源</div>
        <div class="header-right">
            <div class="header-user-con">
                <!--搜索框-->
                <!--
                <el-input
                    style='width: 300px'
                    placeholder="搜开源"
                    v-model="search">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                -->
                <el-select v-model="searchProject" filterable placeholder="搜开源" style='width: 300px'>
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <!---“通信开销”+“吞吐量”+“延迟”--->
                <div style='font-size: 10px;display: grid;margin-left: 15px;'>
                    <div>通信开销=23.6</div>   <div>吞吐量=233.1</div>  <div>延迟=2-100</div>
                </div>
                <!-- 全屏显示 -->
                <!---
                <div class="btn-fullscreen" @click="handleFullScreen" style='margin-left: 23px;padding-top: 5px'>
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                --->
                <!-- 消息中心 -->
                <div class="btn-bell"  style='padding-top: 5px;padding-left: 7px'>
                    <el-tooltip
                        effect="dark"
                        :content="message?`有${message}条未读消息`:`消息中心`"
                        placement="bottom"
                    >
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
                <!-- 用户操作 -->
                <el-dropdown  style='margin-left:6px'  >
                      <span class="el-dropdown-link">
                        <!--<i class="el-icon-arrow-down el-icon--right"></i>-->
                          <i class="el-icon-plus" style='margin-left: 10px;color: white;font-weight: bolder;font-size: large'></i>
                      </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided >
                            <router-link to="/newdepot">新建仓库</router-link>
                        </el-dropdown-item>
                        <el-dropdown-item divided>发布代码片段</el-dropdown-item>
                        <el-dropdown-item divided>创建组织</el-dropdown-item>
                        <el-dropdown-item divided>开通企业版</el-dropdown-item>
                        <el-dropdown-item divided>---</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <!-- 用户头像 -->
                <div class="user-avator">
                <!--
                    <img src="../../assets/img/img.jpg" />
                -->
                    <img src="../../assets/img/img.jpg" />
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link" style='display: flex'>
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided>个人主页</el-dropdown-item>
                        <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">
                            <el-dropdown-item divided>项目仓库</el-dropdown-item>
                        </a>
                        <el-dropdown-item divided commond="set">设置</el-dropdown-item>
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            searchProject:'',
            collapse: false,
            fullscreen: false,
            name: 'linxin',
            message: 2,
            input4: '',
            search:'',
            form:'',
            options:'',
        };
    },
    options: [{
        value: '选项1',
        label: '黄金糕'
    }, {
        value: '选项2',
        label: '双皮奶'
    }, {
        value: '选项3',
        label: '蚵仔煎'
    }, {
        value: '选项4',
        label: '龙须面'
    }, {
        value: '选项5',
        label: '北京烤鸭'
    }],
    value: '',
    computed: {
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },
    methods: {
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command === 'loginout') {
                localStorage.removeItem('ms_username');
                this.$router.push('/login');
            }
            else if(command === 'set') {
                localStorage.removeItem('ms_username');
                this.$router.push('/set');
            }
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        }
    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    }
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}
.el-icon-arrow-down {
    font-size: 12px;
}
</style>
