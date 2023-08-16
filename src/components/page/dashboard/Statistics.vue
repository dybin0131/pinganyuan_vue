<template>
    <el-container  style='margin-left: 5px;margin-right: 5px'>
                <!--统计  页面 内部导航-->

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
                    <el-select v-model="value" placeholder="全部贡献者" style='margin-left: 18px;width: 120px'>
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <!--选择日期-->
                    <div class="block" style='margin-left: 10px'>
                        <div class="block">
                            <el-date-picker
                                v-model="value1"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                    </div>

                    <!--搜索按钮-->
                    <el-button type="primary" style='margin-left: 10px;width: 60px;height: 28px;margin-top: 2px'>搜索</el-button>
                    <!--标签行 右侧栏目内容-->
                    <div style='display: flex;right: 23px;position: absolute;margin-top: 7px'>
                        <!--查看 方式-->
                        <el-dropdown>
                            <span class="el-dropdown-link" style='margin-left: 10px'>按提交时间排序<i class="el-icon-arrow-down el-icon--right"></i></span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>按提交时间排序</el-dropdown-item>
                                <el-dropdown-item>按作者修订时间排序</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>

                <!--详细提交信息-->
                <div  style='margin-top: 20px;background: rgba(255,255,255,0.8);border: 1px solid;border-image: linear-gradient(0deg, #FFFFFF, #FFFFFF) 1 1;
                box-shadow: 0 5px 20px 0 rgba(183,183,195,0.07);border-radius: 10px;'>
                    <div slot="header" class="clearfix" style='display: flex;margin-top: 20px'>
                        <div style='margin-top: 10px;margin-left:20px;font-size: 20px;font-family: Source Han Sans CN;font-weight: bold;color: #353D61;'>
                            2023-07-29</div>
                        <div style='background-color: #E13131;width: 25px;height: 15px;'>
                            <div style='margin-left: 7px;color: #f0f0f0;font-size: 13px'>
                                {{this.issueData.length}}
                            </div>
                        </div>
                    </div>
                    <div style='display: block;width: 100%;margin-top: 20px'>
                        <div v-for="(item) in issueData"  style='display: flex;margin-bottom: 20px'>
                            <div style='display: flex;margin-bottom: 32px;'>
                                <img src='../../../assets/img/user-woman.png' style='width: 38px;height: 38px;margin-top: 10px;margin-left: 20px' >
                                <!--文件名称+贡献者-->
                                <div style='display: block;margin-left: 18px'>
                                    <div style='display: flex'>
                                        <el-button type="text" style='font-size: 16px'>{{item.fileName}}</el-button>
                                        <el-tag  type='success' style='width: 55px;height: 24px;background: rgba(0,171,164,0.1);
                                            border: 1px solid #00ABA4;border-radius: 4px;color: #00ABA4;margin-left: 10px;margin-top: 7px'>已验证</el-tag>
                                    </div>
                                    <div style='display: flex;width: 400px'>
                                        <div style='font-size: 14px;width: 140px;color: #353D61;'>{{item.user}} 提交于 {{item.time}} </div>
                                    </div>
                                </div>
                                <!--右侧辅助功能-->
                                <div style='display: flex;position: absolute;right: 100px;'>
                                    <div style='display: flex;margin-top: 15px;'>
                                       <el-button @click="handleCopyClick" style='font-size: 16px;font-family: Source Han Sans CN;font-weight: 400;color: #4092ED;' type='text'>
                                        <el-icon class='el-icon-copy-document' style='width: 22px;height: 22px;color: #4092ED;'></el-icon>
                                            {{item.hashCode}}
                                        </el-button>
                                    </div>
                                    <div style='display: flex;margin-top: 15px;'>
                                        <el-button type="text" style='margin-left: 20px;font-size: 16px;font-family: Source Han Sans CN;font-weight: 500;color: #00ABA4;' >
                                            <el-icon class='el-icon-view' style='color: #00ABA4;width: 25px;height: 19px;opacity: 0.8;'></el-icon>
                                            浏览文件
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--分页-->
                    <div class="block" style='margin-bottom: 20px;margin-left: 300px'>
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-size="100"
                            layout="prev, pager, next, jumper"
                            :total="1000">
                        </el-pagination>
                    </div>
                </div>
        </el-main>
    </el-container>
</template>


<script>
import bus from '../../common/bus';
import Icon from '@/components/page/Icon.vue';
export default {
    components: { Icon },
    data() {
        return {
            hash1: '1ecc563',
            hash2: '2a3b7b6',
            hash3: '032a495',
            hash4: '71564ae',
            value1: '',
            value2: '',
            collapse: false,
            currentPage: 1,
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
            issueData: [{
                date: '2023-07-24',
                fileName: 'add RSA.c',
                user: '李华',
                hashCode: '1ecc563',
                time: '5天前',
            }, {
                date: '2023-07-24',
                fileName: 'add DES.c',
                user: '韩梅梅',
                hashCode: '2a3b7b6',
                time: '7天前',
            }, {
                date: '2023-07-24',
                fileName: 'add 3DES.c',
                user: '李华',
                hashCode: '032a495',
                time: '7天前',
            }, {
                date: '2023-07-24',
                fileName: 'README.md',
                user: '韩梅梅',
                hashCode: '71564ae',
                time: '8天前',
            }],
            tableData:[{
                date: '2016-05-02',
                issueName: 'add admin',
                user: 'admin',
                hashCode: '1ecc563',
                time: '10天前',
            }, {
                date: '2016-05-04',
                issueName: 'add user1',
                user: 'user1',
                hashCode: '2a3b7b6',
                time: '10天前',
            }, {
                date: '2016-05-01',
                issueName: 'add user2',
                user: 'user2',
                hashCode: '032a495',
                time: '10天前',
            }, {
                date: '2016-05-03',
                issueName: 'add user3',
                user: 'user3',
                hashCode: '71564ae',
                time: '10天前',
            }],
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
        },
          handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
    }
}
</script>


<style>
.my-nav-item.is-active,
.my-nav-item:hover {
    background-color: skyblue;
}

</style>
