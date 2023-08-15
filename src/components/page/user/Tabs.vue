<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> tab选项卡</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`未读消息(${unread.length})`" name="first">
                    <el-table :data="unread" :show-header="false" style="width: 100%">
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.title}}</span>
                                <el-button type='text'  @click='toExamin(scope.$index)'  v-if='scope.row.isExamine>=1'> ——→前往审核仓库 </el-button>
                                <el-button type='text'  @click='toExaminPR(scope.$index)'  v-if='scope.row.isExamine<=-1'> ——→前往审核PR </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="date" width="180"></el-table-column>
                        <el-table-column width="120">
                            <template slot-scope="scope">
                                <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="handle-row">
                        <el-button type="primary">全部标为已读</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="`已读消息(${read.length})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="read" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger">删除全部</el-button>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`回收站(${recycle.length})`" name="third">
                    <template v-if="message === 'third'">
                        <el-table :data="recycle" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button @click="handleRestore(scope.$index)">还原</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger">清空回收站</el-button>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tabs',
        data() {
            return {
                message: 'first',
                showHeader: false,
                unread: [{
                    date: '2018-04-19 20:00:00',
                    title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    url: '',
                    isExamine: 0,
                }, {
                    date: '2018-04-19 21:00:00',
                    title: '今晚12点整发大红包，先到先得',
                    url: '',
                    isExamine: 0,
                }, {
                    date: '2023-07-19 21:00:00',
                    title: '【新的审核】请审核是否为该用户颁发可信依赖库证明',
                    //url: 'http://localhost:8080/codedetails?username=user1&warehouseName=11&introduce=11&warehouseKeywords=11',
                    isExamine: 1,
                    username: 'user1',
                    warehouseName: '11',
                    introduce: '11',
                    warehouseKeywords: '11'
                },{
                    date: '2023-07-23 21:00:00',
                    title: '【新的审核】请审核该PR是否通过',
                    //url: 'http://localhost:8080/pullrequestsdetail/:owner/:visitor?isCredible=0&source=test&aim=master&username=user1&warehouseName=11&title=11&describe=11',
                    isExamine: -1,
                    isCredible:0,
                    source:"test",
                    aim:"master",
                    username: 'user1',
                    warehouseName: '11',
                    prTitle: '11',
                    describe: '11'
                }],
                read: [{
                    date: '2018-04-19 20:00:00',
                    title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    url: '',
                    isExamine: 0,
                }],
                recycle: [{
                    date: '2018-04-19 20:00:00',
                    title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    url: '',
                    isExamine: 0,
                }]
            }
        },
        methods: {
            handleRead(index) {
                const item = this.unread.splice(index, 1);
                console.log(item);
                this.read = item.concat(this.read);
            },
            handleDel(index) {
                const item = this.read.splice(index, 1);
                this.recycle = item.concat(this.recycle);
            },
            handleRestore(index) {
                const item = this.recycle.splice(index, 1);
                this.read = item.concat(this.read);
            },
            getRepoLink(url) {
                //return url; // 生成仓库链接，可根据实际情况进行修改
            },
            toExamin(index) {
                console.log("TOEXAMIN");
                console.log(index);

                this.$router.push({
                    name: 'codedetails',
                    params: { owner: this.unread[index].username, visitor: this.identity },
                    query: {
                        username: this.unread[index].username,
                        warehouseName: this.unread[index].warehouseName,
                        introduce: this.unread[index].introduce,
                        warehouseKeywords: this.unread[index].warehouseKeywords,
                    }
                });
            },
            toExaminPR(index){
                this.$router.push({
                    path: '/pullrequestsdetail/:owner/:visitor',
                    query:{isCredible:this.isCredible, source:this.unread[index].source, aim:this.unread[index].aim,
                        username:this.unread[index].username, warehouseName:this.unread[index].warehouseName,
                        title:this.unread[index].prTitle, describe:this.unread[index].describe },
                    params:{owner:this.unread[index].username, visitor:this.identity}});
            }
        },
        computed: {
            unreadNum() {
                return this.unread.length;
            },
            identity() {
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            },
        }
    }

</script>

<style>
.message-title{
    cursor: pointer;
}
.handle-row{
    margin-top: 30px;
}
</style>

