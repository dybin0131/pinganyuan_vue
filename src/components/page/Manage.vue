<template>
    <div style='width: 84%;margin-left: 8%;margin-top: 0px'>
        <!--顶部-->
        <div style='display: block'>
            <!--标题路径-->
            <div style='display: flex;position: relative'>
                <div style='display: flex;margin-top: 60px'>
                    <el-tag  v-if="isCredible>=60" type='success'>可信</el-tag>
                    <el-tag  v-else-if='isCredible<60' type='danger'>不可信</el-tag>
                    <el-breadcrumb separator="/" style='margin-top:5px;margin-left: 10px;font-size: 23px'>
                        <el-breadcrumb-item :to="{ path: '/' }">{{ username }}</el-breadcrumb-item>
                        <el-breadcrumb-item><a href="/">{{this.$route.query.warehouseName}}</a></el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <!--右侧辅助工具栏-->
                <div style='position: absolute;right: 0;display: flex;margin-top: 60px'>
                    <el-dropdown size="small" split-button type="plain">
                        <i class='el-icon-view'></i>
                        Watching   {{watching_count}}
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>不关注</el-dropdown-item>
                            <el-dropdown-item>关注所有动态</el-dropdown-item>
                            <el-dropdown-item>仅关注版本发行动态</el-dropdown-item>
                            <el-dropdown-item>关注但不提醒动态</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-button type="plain" icon="el-icon-star-on" style='margin-left: 12px'>Star  {{star_count}}</el-button>
                    <el-button type="plain" icon="el-icon-share">Fork  {{fork_count}}</el-button>
                </div>
            </div>
        </div>

        <!--分页-->
        <el-tabs v-model="activeName" @tab-click="handleClick" >
            <!--详情-->
            <el-tab-pane label="仓库成员管理" name="second">
                <el-container>
                    <el-main>
                        <div style='display: flex;position:relative;'>
                            <h2>仓库成员管理</h2>
                            <div style='position:absolute;right: 0'>
                                <el-button type="warning">
                                    <router-link to="/addMember">添加仓库成员</router-link>
                                </el-button>
                            </div>
                        </div>
                        <el-card class="box-card" shadow="always" style='margin-top: 20px'>
                            <div slot="header" class="clearfix">
                                <span>仓库成员 （ {{this.userTable.length }} ） </span>
                            </div>

                            <!----表格--->
                            <template>
                                <el-table
                                    :data="userTable"
                                    style="width: 100%">
                                    <el-table-column
                                        label="用户名"
                                        width="540">
                                        <template slot-scope="scope">
                                            <el-avatar :style="`background:${extractColorByName( scope.row.name)}`"> {{ scope.row.name}} </el-avatar>
                                            <span style="margin-left: 10px;vertical-align: middle;font-size: 14px">{{ scope.row.name }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="标签"
                                        width="180">
                                        <template slot-scope="scope">
                                            <el-popover trigger="hover" placement="top">
                                                <div slot="reference" class="name-wrapper">
                                                    <el-tag v-if='scope.row.isOwner>=1' size="medium">仓库拥有者</el-tag>
                                                </div>
                                            </el-popover>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作">
                                        <template slot-scope="scope">
                                            <el-button
                                                size="mini"
                                                @click="handleEdit(scope.$index, scope.row)">开发者</el-button>
                                            <el-button
                                                size="mini"
                                                type="info"
                                                @click="handleDelete(scope.$index, scope.row)">移除此成员</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </template>

                        </el-card>

                    </el-main>
                </el-container>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>


<script>
import { messages } from '@/components/common/i18n';

export default {
    name:'ManageComponent',
    props:{
        message: String
    },
    data() {
        return {
            isCredible:0,
            identity:'开发者',
            identityOptions: [{
                value: '开发者',
                label: '开发者'
            }, {
                value: '管理员',
                label: '管理员'
            }],
            value1:'',
            activeName:'second',
            issueErea:'',
            inputTitle: '',
            startTime: '',
            endTime: '',
            zan_count:0,
            cha_count:0,
            watching_count:this.$route.query.watchCount,
            star_count:this.$route.query.starCount,
            fork_count:this.$route.query.forkCount,
            activities: [{
                content: 'user1创建了任务',

                timestamp: '2小时前',
                size: 'large',
                type: 'warning',
                icon: 'el-icon-more'
            }],
            search: '',
            select: '全部',

            userTable: [{
                isOwner: 1,
                name: 'admin',
                isManager: 1
            }, {
                isOwner: 0,
                name: 'user1',
                isManager: 0
            }, {
                isOwner:0,
                name: 'user2',
                isManager: 0
            }, {
                isOwner: 0,
                name: 'user3',
                isManager: 0
            }]
        }
    },
    computed: {
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },
    methods:{
        extractColorByName(name) {
            // 根据用户姓名随机生成用户头像颜色——————
            // 由于是按照名字第一个元素设定颜色，导致有不同用户颜色不一样，把用户名都换成中文可行，由于前面roles还是英文，暂时未改
            //  let temp = [];
            //  temp.push("#");
            //  for (let index = 0; index < name.length; index++) {
            //      temp.push(parseInt(name[index].charCodeAt(0), 10).toString(16));
            //  }
            // return temp.slice(0, 5).join('').slice(0, 4);
            let str = '';
            for (let i = 0; i < name.length; i++) {
                str += parseInt(name[i].charCodeAt(0), 10).toString(16)
            }
            return '#0c' + str.slice(1, 2)
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        }

    }
}
</script>


<style>
.el-select .el-input {
    width: 130px;
}
.input-with-select .el-input-group__prepend {
    background-color: #fff;
}
</style>