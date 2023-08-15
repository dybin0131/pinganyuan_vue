<template>
    <div style='width: 84%;margin-left: 8%'>
        <!--标题路径-->
        <div style='display: flex;position: relative'>
            <div style='display: flex;margin-top: 60px'>
                <el-tag  v-if="this.$route.query.isCredible>=60" type='success'>可信</el-tag>
                <el-tag  v-else-if='this.$route.query.isCredible<60' type='danger'>不可信</el-tag>

                <el-breadcrumb separator="/" style='margin-top:5px;margin-left: 10px;font-size: 23px'>
                    <el-breadcrumb-item :to="{ path: '/' }">{{this.$route.query.username}}</el-breadcrumb-item>
                    <el-breadcrumb-item><a href="/">{{this.$route.query.warehouseName}}</a></el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!--右侧辅助工具栏-->
            <div style='position: absolute;right: 12px;display: flex;margin-top: 15px'>
                <el-dropdown size="small" split-button type="plain" style='font-family: San Francisco Display;font-weight: 400;color: #353D61;'
                             v-on:click='watching_count++'>
                    <i class='el-icon-view'></i>
                    浏览量   {{watching_count}}
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>不关注</el-dropdown-item>
                        <el-dropdown-item>关注所有动态</el-dropdown-item>
                        <el-dropdown-item>仅关注版本发行动态</el-dropdown-item>
                        <el-dropdown-item>关注但不提醒动态</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-button type="plain" icon="el-icon-star-off" style='margin-left: 12px;font-family: San Francisco Display;font-weight: 400;color: #353D61;'
                           v-on:click='star_count++'>点赞  {{star_count}} </el-button>
                <el-button type="plain" icon="el-icon-share" style='font-family: San Francisco Display;font-weight: 400;color: #353D61;'
                           v-on:click='fork_count++'>下载  {{fork_count}}</el-button>
            </div>
        </div>
        <!--tip-->
        <el-alert style='font-weight: bolder;font-size: 30px;margin-top: 30px' type="warning">
            <div style='display: flex'>
                <h3>Web 提交 拉取请求 很麻烦？一行命令自动创建 拉取请求。</h3>
                <el-link type="primary">点此查看</el-link>
            </div>
        </el-alert>

        <div style='margin-top: 60px;font-size: 21px;font-weight: bolder;margin-left: 8px'>创建 拉取请求</div>
        <!---需要后端传入各个分支名单-->
        <el-form ref="form" :model="prForm" label-width="80px"  style='margin-top: 20px'>
            <div style='display: flex'>
                <el-form-item label="源分支">
                    <el-select v-model="prForm.source" placeholder="请选择源分支">
                        <el-option v-for='item in prOptions' :label='item.label' :value="item.value"></el-option>
                    </el-select>
                </el-form-item>

                <div style='width: 10%'>
                    <i class='el-icon-right' style='margin-top: 0;font-size: 25px;margin-left: 200px'></i>
                </div>
                <el-form-item label="目的分支" style='margin-left: 36%'>
                    <el-select v-model="prForm.aim" placeholder="请选择目的分支">
                        <el-option v-for='item in prOptions' :label='item.label' :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <el-form-item label="标题">
                <el-input type="text" v-model="prForm.title"></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input type="textarea" :rows='6' v-model="prForm.describe"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="warning" @click="onSubmit"> 创建 Pull Request</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            owner:this.$route.query.owner,
            visitor:this.$route.query.visitor,
            watching_count:9,
            star_count:4,
            fork_count:2,
            textarea: '',
            isCredible:this.$route.query.isCredible,
            options_yuan: [{
                value: '选项1',
                label: 'testpr'
            }, {
                value: '选项2',
                label: 'master'
            }],
            options_mubiao: [{
                value: '选项1',
                label: 'testpr'
            }, {
                value: '选项2',
                label: 'master'
            }],
            options_xiangmu: [{
                value: '选项1',
                label: 'user_user1/pinganyuan-system'
            }],
            value1: '',
            value2: '',
            value3: '',

            prOptions: [{
                value: 'master',
                label: 'master'
            }, {
                value: 'test',
                label: 'test'
            }],
            prForm: {
                source: '',
                aim: '',
                describe: '',
                title:'',
            }
        }
    },
    computed:{
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        },
    },
    methods:{
        submitPR(){
            this.$router.push({path: '/codedetails'});
            console.log('submit!');
        },
        onSubmit() {
            this.$router.push({
                path: '/pullrequestsdetail',
                query:{isCredible:this.isCredible, source:this.prForm.source, aim:this.prForm.aim,
                    username:this.$route.query.username, warehouseName:this.$route.query.warehouseName,
                    title:this.prForm.title, describe:this.prForm.describe },
               });
            console.log('submit!');
        }
    }
}
</script>

<style>

</style>