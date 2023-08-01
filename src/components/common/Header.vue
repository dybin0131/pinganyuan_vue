<template>
    <div class="header">
        <div class="leftBox">
            <!-- 折叠按钮 -->
            <img @click="collapseChage" src="../../assets/img/logNav.png" class="leftLogo" alt="" srcset="">
            <div class="leftText">平安源</div>
        </div>
        <!---“通信开销”+“吞吐量”+“延迟”--->
        <div class="headerRight">
            <div class="information">
                <div class="inText"><i class="el-icon-s-opportunity"></i> 通信开销=23.6</div>
                <div class="inText"><i class="el-icon-set-up"></i> 吞吐量=233.1</div>
                <div class="inText"><i class="el-icon-time"></i> 延迟=2-100</div>
            </div>
            <div class="headerUserCon">
                <!--搜索框-->
                <el-select v-model="searchProject" filterable placeholder="搜开源" style='width: 300px'>
                    <template #prefix>
                        <span class="selectIcon">
                            <i class="el-icon-search"></i>
                        </span>
                    </template>
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <!-- 全屏显示 -->
                <!---
                <div class="btn-fullscreen" @click="handleFullScreen" style='margin-left: 23px;padding-top: 5px'>
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                --->
                <!-- 用户操作 -->
                <el-dropdown class="userDropdown">
                    <span class="el-dropdown-link">
                        <i class="el-icon-circle-plus-outline"></i>
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
                <!-- 用户头像 -->
                <div class="user-avator">
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
<style lang="less" scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    height: 70px;
    font-size: 22px;
    color: #fff;
    .leftBox{
        width: 250px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: url('../../assets/img/topNav.png') no-repeat;
        background-size: 100% 100%;
        .leftText{
            font-size: 30px;
            font-weight: bold;
        }
        .leftLogo{
            width: 30%;
        }
    }
    .headerRight {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 50px;
        background: url('../../assets/img/imgNav.png') no-repeat;
        background-size: 100% 100%;
        .information{
            display: flex;
            align-items: center;
            font-size: 16px;
            .inText{
                margin-left: 20px;
            }
        }
        .headerUserCon {
            display: flex;
            height: 70px;
            align-items: center;
            .selectIcon i{
                font-size: 18px;
                margin-top: 6px;
                color: #4092ED;
                font-weight: bold;
            }
            .userDropdown{
                margin-left: 6px;
                .el-dropdown-link i {
                    font-size: 30px;
                    margin-left: 10px;
                    color: white;
                }
            }
            ::v-deep {
                .el-select__caret{
                    color: #4092ED;
                    font-size: 18px;
                    font-weight: bold;
                }
            }
            .btn-bell{
                position: relative;
                width: 30px;
                height: 30px;
                text-align: center;
                border-radius: 15px;
                cursor: pointer;
                .el-icon-bell {
                    color: #fff;
                    font-size: 26px;
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
            }
        }
    }
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
    color: #fff;
}
.el-icon-arrow-down {
    font-size: 12px;
}
</style>