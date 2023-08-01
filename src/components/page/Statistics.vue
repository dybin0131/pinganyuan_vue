<template>
    <el-container  style='margin-left: 50px;margin-right: 50px'>
                <!--统计  页面 内部导航-->
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="user"
                label="成员"
                width="150">
            </el-table-column>
            <el-table-column
                prop="fileName"
                label="文件名称"
                width="120">
            </el-table-column>
            <el-table-column
                prop="address"
                label="时间"
                width="100">
            </el-table-column>
            <el-table-column
                prop="hashCode"
                label="hash"
                width="100">
            </el-table-column>
            <el-table-column
                label="option"
              >
            </el-table-column>
        </el-table>
        <el-main style='position:relative;' >
                <!--标签行-->
                <div style='display: flex;'>
                    <!--标签行 左侧栏目内容-->
                    <!--仓库  分支-->
                    <el-dropdown >
                        <el-button type="plain" style='font-size: 13px'>
                            master<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>master</el-dropdown-item>
                            <el-dropdown-item>branch</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <!--选择贡献者-->
                    <el-select v-model="value" placeholder="全部贡献者" style='margin-left: 18px'>
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <!--选择开始日期-->
                    <div class="block" style='margin-left: 10px'>
                        <span class="demonstration"></span>
                        <el-date-picker
                            v-model="value1"
                            type="date"
                            placeholder="开始日期">
                        </el-date-picker>
                    </div>
                    <!--结束日期-->
                    <div class="block" style='margin-left: 10px'>
                        <span class="demonstration"></span>
                        <el-date-picker
                            v-model="value1"
                            type="date"
                            placeholder="结束日期">
                        </el-date-picker>
                    </div>
                    <!--搜索按钮-->
                    <el-button type="warning" style='margin-left: 10px'>搜索</el-button>
                    <!--标签行 右侧栏目内容-->
                    <div style='display: flex;right: 20px;position: absolute;margin-top: 7px'>
                        <div style='color: #72767b;font-size: 14px'>排序方式：</div>
                        <!--查看 方式-->
                        <el-dropdown>
                            <span class="el-dropdown-link" style='margin-left: 10px'>按提交时间<i class="el-icon-arrow-down el-icon--right"></i></span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>按提交时间</el-dropdown-item>
                                <el-dropdown-item>按作者修订时间</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>

                <!--详细提交信息-->
                <el-card class="box-card" shadow="always" style='margin-top: 20px'>
                    <div slot="header" class="clearfix">
                        <span>2023-05-26 (4)</span>
                    </div>
                    <div style='display: block;width: 100%'>
                        <!--信息1-->
                        <div style='display: flex;margin-bottom: 32px'>
                            <img src='../../assets/img/lxy.png' style='width: 38px;height: 38px;margin-top: 10px' >
                            <!--文件名称+贡献者-->
                            <div style='display: block;margin-left: 18px'>
                                <el-button type="text" style='font-size: 14px'>add user1.</el-button>
                                <div style='display: flex;width: 400px'>
                                    <div style='color: #72767b;font-size: 14px;width: 140px'>user1 提交于 1天前 </div>
                                    <el-tag type="success" style='margin-left: 0'>已验证</el-tag>
                                </div>
                            </div>
                            <!--右侧辅助功能-->
                            <div style='display: flex;margin-right:50px'>
                                <div style='display: flex;margin-top: 15px;'>
                                    <el-input type="text" readonly :value="hash1" ref="textInput" style='width: 82px'></el-input>
                                    <el-button @click="handleCopyClick" style='width: 50px;height: 32px'>复制</el-button>
                                </div>
                                <el-button type="text" style='margin-left: 20px;font-size: 16px;color: cadetblue;font-weight: bolder' >浏览文件</el-button>
                            </div>
                        </div>

                        <!--信息2-->
                        <div style='display: flex;margin-bottom: 32px'>
                            <img src='../../assets/img/dyb.png' style='width: 38px;height: 38px;margin-top: 10px' >
                            <!--文件名称+贡献者-->
                            <div style='display: block;margin-left: 18px'>
                                <el-button type="text" style='font-size: 14px'>add user2.</el-button>
                                <div style='display: flex;width: 400px'>
                                    <div style='color: #72767b;font-size: 14px;width: 140px'>user2 提交于 1天前 </div>
                                    <el-tag type="success" style='margin-left: 0'>已验证</el-tag>
                                </div>
                            </div>
                            <!--右侧辅助功能-->
                            <div style='display: flex;margin-right:50px'>
                                <div style='display: flex;margin-top: 15px;'>
                                    <el-input type="text" readonly :value="hash2" ref="textInput" style='width: 82px'></el-input>
                                    <el-button @click="handleCopyClick" style='width: 50px;height: 32px'>复制</el-button>
                                </div>
                                <el-button type="text" style='margin-left: 20px;font-size: 16px;color: cadetblue;font-weight: bolder' >浏览文件</el-button>
                            </div>
                        </div>

                        <!--信息3-->
                        <div style='display: flex;margin-bottom: 32px'>
                            <img src='../../assets/img/wzy.png' style='width: 38px;height: 38px;margin-top: 10px' >
                            <!--文件名称+贡献者-->
                            <div style='display: block;margin-left: 18px'>
                                <el-button type="text" style='font-size: 14px'>add user3.</el-button>
                                <div style='display: flex;width: 400px'>
                                    <div style='color: #72767b;font-size: 14px;width: 140px'>user3 提交于 1天前 </div>
                                    <el-tag type="success" style='margin-left: 0'>已验证</el-tag>
                                </div>
                            </div>
                            <!--右侧辅助功能-->
                            <div style='display: flex;margin-right:50px'>
                                <div style='display: flex;margin-top: 15px;'>
                                    <el-input type="text" readonly :value="hash3" ref="textInput" style='width: 82px'></el-input>
                                    <el-button @click="handleCopyClick" style='width: 50px;height: 32px'>复制</el-button>
                                </div>
                                <el-button type="text" style='margin-left: 20px;font-size: 16px;color: cadetblue;font-weight: bolder' >浏览文件</el-button>
                            </div>
                        </div>

                        <!--信息4-->
                        <div style='display: flex;margin-bottom: 32px'>
                            <img src='../../assets/img/lxy.png' style='width: 38px;height: 38px;margin-top: 10px' >
                            <!--文件名称+贡献者-->
                            <div style='display: block;margin-left: 18px'>
                                <el-button type="text" style='font-size: 14px'> p r.</el-button>
                                <div style='display: flex;width: 400px'>
                                    <div style='color: #72767b;font-size: 14px;width: 140px'>user1 提交于 10天前 </div>
                                    <el-tag type="success" style='margin-left: 0'>已验证</el-tag>
                                </div>
                            </div>
                            <!--右侧辅助功能-->
                            <div style='display: flex;margin-right:50px'>
                                <div style='display: flex;margin-top: 15px;'>
                                    <el-input type="text" readonly :value="hash4" ref="textInput" style='width: 82px'></el-input>
                                    <el-button @click="handleCopyClick" style='width: 50px;height: 32px'>复制</el-button>
                                </div>
                                <el-button type="text" style='margin-left: 20px;font-size: 16px;color: cadetblue;font-weight: bolder' >浏览文件</el-button>
                            </div>
                        </div>

                    </div>
                </el-card>
        </el-main>
    </el-container>
</template>


<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            hash1: '1ecc563',
            hash2: '2a3b7b6',
            hash3: '032a495',
            hash4: '71564ae',
            value1: '',
            value2: '',
            collapse: false,
            options: [{
                value: '选项1',
                label: '全部贡献者'
            }, {
                value: '选项2',
                label: 'lxy'
            }, {
                value: '选项3',
                label: 'dyb'
            }, {
                value: '选项4',
                label: 'wzy'
            }],
            value: '',
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'statisticssubmit',
                    title: '仓库数据统计',
                },
                {
                    icon: 'el-icon-lx-home',
                    index: 'statisticssubmit',
                    title: '仓库网络图',
                },
                {
                    icon: 'el-icon-lx-home',
                    index: 'statisticssubmit',
                    title: '发行版',
                },
                {
                    icon: 'el-icon-lx-home',
                    index: 'statisticssubmit',
                    title: '标签',
                },
                {
                    icon: 'el-icon-lx-home',
                    index: 'statisticssubmit',
                    title: '提交',
                },
                {
                    icon: 'el-icon-lx-home',
                    index: 'statisticssubmit',
                    title: '附件',
                },
            ],
            tableData: [{
                date: '2016-05-02',
                fileName: 'add admin',
                user: 'admin',
                hashCode: '1ecc563',
                time: '10天前',
            }, {
                date: '2016-05-04',
                fileName: 'add user1',
                user: 'user1',
                hashCode: '2a3b7b6',
                time: '10天前',
            }, {
                date: '2016-05-01',
                fileName: 'add user2',
                user: 'user2',
                hashCode: '032a495',
                time: '10天前',
            }, {
                date: '2016-05-03',
                fileName: 'add user3',
                user: 'user3',
                hashCode: '71564ae',
                time: '10天前',
            }]
        }
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    },
    methods:{
        handleCopyClick(){
            // 复制文本到剪切板
            this.$refs.textInput.select();
            document.execCommand('copy');
        }
    }
}
</script>


<style>
.my-nav-item.is-active,
.my-nav-item:hover {
    background-color: skyblue;
}

</style>
