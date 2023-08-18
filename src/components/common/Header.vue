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
<!--                <div class="inText"><i class="el-icon-s-opportunity"></i> 通信开销=23.6</div>-->
<!--                <div class="inText"><i class="el-icon-set-up"></i> 吞吐量=233.1</div>-->
<!--                <div class="inText"><i class="el-icon-time"></i> 延迟=2-100</div>-->
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
                        <el-dropdown-item divided>
                            <el-button type='text' @click='retrieveDep'>找回仓库</el-button>
                        </el-dropdown-item>
                        <!--                        <el-dropdown-item divided>创建组织</el-dropdown-item>-->
                        <!--                        <el-dropdown-item divided>开通企业版</el-dropdown-item>-->
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
                    <!--                    <img src="../../assets/img/img.jpg" />-->
                    <img src="../../assets/img/user-woman.png" />
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

        <!-- 第一次弹窗确认找回仓库 -->
        <el-dialog
            title="找回仓库"
            :visible.sync="dialog1Visible"
            width="50%"
            center
        >
            <div class="textBtn" style='display: grid;' >
                <el-tag type='danger' style='font-weight: bolder;font-size: 14px'>提醒: 您将找回仓库及仓库内的全部信息</el-tag>
                <el-tag type='danger' style='margin-top: 10px;font-weight: bolder;font-size: 14px'> 为防止意外，确认继续操作请输入仓库名称，例如: </el-tag>
                <el-tag  type='danger' style='margin-top: 10px;font-weight: bolder;font-size: 14px'>  小A/小A的测试仓库 </el-tag>
                <el-input style='margin-top: 10px' v-model="retrieveWarehouse" placeholder="请输入您要找回的的仓库名称"></el-input>
            </div>
            <span slot="footer" class="dialog-footer" style='margin-top: 20px'>
                            <el-button  @click="applicationNO">取 消</el-button>
                            <el-button type="primary" @click="applicationYes">确 定</el-button>
                        </span>
        </el-dialog>
        <!-- 第二次弹窗确认删除仓库 -->
        <el-dialog
            title="找回仓库"
            :visible.sync="dialog2Visible"
            width="50%"
            center
        >
            <div class="textBtn" style='display: grid;' >
                <div>你正在找回仓库 [ {{this.retrieveWarehouse}} ]，该操作需要验证你的用户身份是否有权限。</div>
                <el-tag type='warning' style='margin-top: 10px;margin-bottom: 20px;font-weight: bolder;font-size: 14px;'>
                    验证通过后，仓库 [ {{this.retrieveWarehouse}} ] 的所有数据将被恢复!</el-tag>
                <el-tag type='warning' style='margin-top:1px;margin-bottom: 20px;font-weight: bolder;font-size: 14px;'>
                    区块链存储CID:QmXtQmNzGBG1DwF8iHccS9QZxpB6nQ7nLPSfpMCEHzvvzX</el-tag>
                <div style='font-weight: bolder;margin-top: 5px;color: #e6a23c'>私钥验证身份</div>
                <el-input style='margin-top: 10px' v-model="priKey" placeholder="请输入您的私钥"></el-input>
            </div>
            <span slot="footer" class="dialog-footer" style='margin-top: 50px'>
                            <el-button  @click="applicationNO2">取 消</el-button>
                            <el-button type="primary" @click="getBackDepo">确 定</el-button>
                        </span>
        </el-dialog>




    </div>
</template>
<script>
import bus from '../common/bus';
import retrieveDepot from '@/components/page/retrieveDepot.vue';
import { getBackDepo } from '../../api/depot';
export default {
    data() {
        return {
            dialog1Visible:false,
            dialog2Visible:false,
            retrievePassword:'v5IPPgM3ysOkrYQ5+rIFvVOvk6PVLeILnGnXtjw61',
            retrieveWarehouse:'',
            priKey:'',
            searchProject:'',
            isEntitled:true,
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
        retrieveDepot() {
            return retrieveDepot
        },
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },
    methods: {
        getBackDepo(){
            if (this.priKey.length != 64) {
                this.$alert("无效的私钥格式！", "提示", {
                    confirmButtonText: "确定",
                });
                return;
            }
            getBackDepo({     
                keyword: this.retrieveWarehouse,
                priKey:this.priKey
            }).then((res) => {
                if(res.code==0){
                    this.$message({
                        type: 'success',
                        message: '仓库找回成功!'
                    });
                    this.$router.push({path: '/workbenchDep'});
                    location.reload();
                }else{
                    this.$message({
                        type: 'error',
                        message: '仓库找回失败!请检查仓库名称!'
                    });
                    this.$router.push({path: '/workbenchDep'});
                    location.reload();
                }
            });
        },
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
        },
        retrieveDep(){
            this.dialog1Visible=!this.dialog1Visible;
        },
        //输入仓库名确认
        applicationYes(){
            this.dialog1Visible=false
            this.dialog2Visible=!this.dialog2Visible;
        },
        applicationNO(){
            this.dialog1Visible=false

        },
        //输入密码确认
        applicationYes2(){
            this.dialog2Visible=false;

            if(this.isEntitled===true){
                this.$store.commit('updateSharedData', 0);

                this.$router.push({path: '/workbenchDep'});
                this.$message({
                    type: 'info',
                    iconClass:'../../assets/img/payAttention.png',
                    message: '找回成功'
                });
            }
            else{
                let action;
                this.$message({
                    type: 'info',
                    message: action === 'cancel'
                        ? '找回失败'
                        : '停留在当前页面'
                })
            }
        },
        applicationNO2(){
            this.dialog2Visible=false
            let action;
            this.$message({
                type: 'info',
                message: action === 'cancel'
                    ? '取消删除'
                    : '停留在当前页面'
            })
        },
    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    },

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