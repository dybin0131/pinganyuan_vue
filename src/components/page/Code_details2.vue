<template>

    <div>
        <CounterCom  :warehouse="this.warehouse"></CounterCom>
        <!--顶部-->
        <div style='display: block'>
            <!--标题路径-->
            <div style='display: flex;position: relative'>
                <!--未申请时/申请失败-->

                <div style='display: flex;margin-top: 15px;margin-left: 10px'>
                    <el-tag  v-if="isCredible>=60" type='success'>可信</el-tag>
                    <el-tag  v-else-if='isCredible<60' type='danger'>不可信</el-tag>

                    <el-breadcrumb separator="/" style='margin-top:5px;margin-left: 10px;font-size: 23px'>
                        <el-breadcrumb-item :to="{ path: '/' }">{{this.$route.query.username}}</el-breadcrumb-item>
                        <el-breadcrumb-item><a href="/"> {{this.$route.query.warehouseName}} </a></el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <el-button type="warning" style='width: auto;height: 40px;margin-top: 10px;margin-left: 10px'
                           @click="application" :disabled='isDisabled' v-if='this.owner===this.visitor '>
                    {{ applicationStatus }}</el-button>

                <!--审核是否为可信依赖库-->

                <el-button type="primary" style='width: auto;height: 40px;margin-top: 10px;margin-left: 10px'
                           @click="acknowledge" v-if='this.visitor!==this.owner' :disabled='isAuditCompleted'>
                    颁发可信依赖库证明</el-button>
                <el-button type="primary" style='width: auto;height: 40px;margin-top: 10px;margin-left: 10px'
                           @click="deny" v-if='this.visitor!==this.owner' :disabled='isAuditCompleted'>
                    不颁发可信依赖库证明</el-button>

                <!---申请成功--->
                <!---
                <div style='display: flex;margin-top: 15px;margin-left: 10px'>
                    <el-tag type="success" style='margin-top: 5px'>可信</el-tag>

                    <el-breadcrumb separator="/" style='margin-top:5px;margin-left: 10px;font-size: 23px'>
                        <el-breadcrumb-item :to="{ path: '/' }">{{username}}</el-breadcrumb-item>
                        <el-breadcrumb-item><a href="/">test</a></el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <el-button type="info" style='width: auto;height: 40px;margin-top: 10px;margin-left: 10px' @click="application">申请可信依赖库</el-button>
               --->

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
                    <el-button type="plain" icon="el-icon-star-on" style='margin-left: 12px'>Star  {{star_count}} </el-button>
                    <el-button type="plain" icon="el-icon-share">Fork  {{fork_count}}</el-button>
                </div>
            </div>
        </div>
        <!--主体-->
        <div style='display: flex;background-color: white;margin-top: 10px;margin-left: 2px'>
            <!--左侧主体部分-->
            <div style='width: 70%;position: relative'>
                <!--标签行-->
                <div style='display: flex;'>
                    <!--标签行 左侧栏目内容-->
                    <!--
                    <el-dropdown>
                        <el-button type="plain">
                            master<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>master</el-dropdown-item>
                            <el-dropdown-item>branch</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    -->

                    <!-- 选择用户要进行操作的分支 -->

                    <el-select v-model="branchName" placeholder="选择分支"  @change='choiceBranch(branchName)' style='width: 90px'>
                        <el-option
                            v-for="item in branchOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>

                    <i class="el-icon-share" style='margin-top: 7px;margin-left: 15px'></i>
                    <div style='font-size: 14px;margin-top: 5px;margin-left: 6px'>分支 {{this.branchOptions.length}} 个</div>

                    <!--标签行 右侧栏目内容-->
                    <div style='position: absolute;right:0'>
                        <div >
                            <el-button>
                                <router-link :to="{path:'/manage',query:{username:username,warehouseName:this.warehouse,starCount:this.star_count,watchCount:this.watching_count,forkCount:this.watching_count}}">
                                    管理</router-link>
                            </el-button>
                            <el-button>
                                <router-link :to="{path:'/statistics',query:{username:username,warehouseName:this.$route.query.warehouseName,isCredible:this.isCredible }}" >
                                    统计</router-link>
                            </el-button>
                            <el-button><i class="el-icon-plus" style='font-weight: bolder'></i>
                                <router-link :to="{path:'/pullrequests',query:{username:username,warehouseName:this.$route.query.warehouseName,isCredible:this.isCredible }}" >
                                    Pull Request</router-link>
                            </el-button>
                            <el-button><i class="el-icon-plus" style='font-weight: bolder'></i>
                                <router-link :to="{path:'/issue',query:{username:username,warehouseName:this.$route.query.warehouseName ,isCredible:this.isCredible}}" >
                                    Issue</router-link>
                            </el-button>
                            <el-dropdown>
                                <el-button type="plain" style='margin-left: 10px'>上传文件<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>
                                        <router-link :to="{path:'/newFile',query:{username:username,warehouseName:this.$route.query.warehouseName }}" >
                                            新建文件</router-link>
                                    </el-dropdown-item>
                                    <el-dropdown-item>新建Diagram文件</el-dropdown-item>
                                    <el-dropdown-item>新建文件夹</el-dropdown-item>
                                    <el-dropdown-item>新建子模块</el-dropdown-item>
                                    <el-dropdown-item>
                                        <router-link to="/code">上传文件</router-link>
                                    </el-dropdown-item>
                                    <el-dropdown-item>搜索文件</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <el-dropdown>
                                <el-button type="warning" style='margin-left: 10px'>克隆/下载<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item style='display: block'>HTTP
                                        <div style='display: flex'>
                                            <el-input type="text" readonly :value="http_text" ref="textInput"></el-input>
                                            <el-button @click="handleCopyClick">复制</el-button>
                                        </div>
                                    </el-dropdown-item>
                                    <el-dropdown-item>SSH</el-dropdown-item>
                                    <el-dropdown-item>SVN</el-dropdown-item>
                                    <el-dropdown-item>SSH+SVN</el-dropdown-item>
                                    <el-dropdown-item> <i class='el-icon-download'></i> 下载ZIP</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>
                </div>
                <!--左侧标签行下面内容-->
                <div>
                    <!--表格信息暂时去掉，直接用 文件上传预览的文件列表-->
                    <!--文件信息预览部分,暂时删除，如果后续有时间，尝试一下md文件的树形图结构-->
                    <!----文件预览功能测试 2--->

                    <!--
                    <div>
                        <el-upload
                            class="upload-demo"
                            action="/codedetails"
                            :on-preview="handlePreview"
                            :before-upload="handleBeforeUpload"
                            multiple
                            :limit="10"
                            :on-exceed="handleExceed"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            accept="accept"
                            :file-list="fileList"
                        >
                            <el-button size="small" type="primary" style='margin-top: 20px'>点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">请上传文件</div>
                        </el-upload>
                    </div>
                    --->
                <!--表格信息_===表格数据根据用户从 选择器 里面的选择 来确定，一个分支对应一个表格-->
                    <el-table :data = "displayData"  style="width: 100%;margin-top:8px">
                        <el-table-column width='25px'>
                            <template slot-scope="scope"> <i class='el-icon-document'></i> </template>
                        </el-table-column>
                        <el-table-column prop="file" width="200px "  label='File name'> </el-table-column>
                        <el-table-column prop="prop" label="Submit information"></el-table-column>
                        <el-table-column prop="time" align='right' width='100px' label="Creation time"></el-table-column>
                        <el-table-column prop="operation" align='right' width='100px' label="Operation">
                            <template slot-scope="scope" style='display: flex'>
                                <el-button
                                    type="text"
                                    icon="el-icon-view"
                                    @click="handleView(scope.$index, scope.row)"
                                >查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                <!---
                <el-table :data="tableData"  style="width: 100%;margin-top:8px">
                    <el-table-column width='25px'>
                        <template slot-scope="scope"> <i class='el-icon-document'></i> </template>
                    </el-table-column>
                    <el-table-column prop="file" width="200px "  label='File name'> </el-table-column>
                    <el-table-column prop="prop" label="Submit information"></el-table-column>
                    <el-table-column prop="time" align='right' width='100px' label="Creation time"></el-table-column>
                    <el-table-column prop="operation" align='right' width='100px' label="Operation">
                        <template slot-scope="scope" style='display: flex'>
                            <el-button
                                type="text"
                                icon="el-icon-view"
                                @click="handleView(scope.$index, scope.row)"
                            >查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                -->

                    <!--点赞打赏区域-->
                    <div style='display: flex;width: 50%;margin-left: 25%;margin-top: 18px'>
                        <!--star数量-->
                        <div style='display: flex;flex-grow: 1'>
                            <el-button round v-on:click="star_count++" icon="el-icon-star-on" style='background-color:transparent;font-size: 30px;color: #cf9236' ></el-button>
                            <div style='display: block;margin-top: 7px;margin-left: 10px;'>
                                <div style='font-size: 14px;text-align: center'>Star</div>
                                <div style='font-size: 14px;text-align: center'>{{star_count}}</div>
                            </div>
                        </div>
                        <!--fork数量-->
                        <div style='display: flex;flex-grow: 1'>
                            <el-button round v-on:click="fork_count++" icon="el-icon-share" style='background-color:transparent;font-size: 30px;color:cadetblue'></el-button>
                            <div style='display: block;margin-top: 7px;margin-left: 10px;'>
                                <div style='font-size: 14px;text-align: center'>Fork</div>
                                <div style='font-size: 14px;text-align: center'>{{fork_count}}</div>
                            </div>
                        </div>
                        <!--捐赠数量-->
                        <div style='display: flex;flex-grow: 1'>
                            <el-button round v-on:click="donate_count++" icon="el-icon-lollipop" style='background-color:transparent;font-size: 30px;color: #dd6161'></el-button>
                            <div style='display: block;margin-top: 7px;margin-left: 10px;'>
                                <div style='font-size: 14px;text-align: center'>捐赠</div>
                                <div style='font-size: 14px;text-align: center'>{{donate_count}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--右侧主体部分-->
            <div style='text-align: left;margin-left: 40px;margin-right: 30px;width: 30%;margin-top: 10px'>
                <!--简介-->
                <h4 style='margin-top: 10px'>简介</h4>
                <div style='margin-top: 15px;font-size: 15px;color: #72767b' >{{this.$route.query.introduce}}</div>
                <div style='margin-top: 15px;font-size: 15px;color: #72767b' >{{this.$route.query.warehouseKeywords}}</div>

                <!--近期动态-->
                <h4 style='margin-top: 40px'>近期动态</h4>
                <!--
                <div style='display: block'>
                    <div style='display: flex;margin-top:25px'>
                        <img src='../../assets/img/wzy.png' style='width: 30px;height: 30px'>
                        <div style='margin-top: 1px;margin-left:5px;font-size: 15px;color: #72767b' >3分钟前创建了新的 Pull Request</div>
                    </div>
                    <div style='display: flex;margin-top:25px'>
                        <img src='../../assets/img/lxy.png' style='width: 30px;height: 30px'>
                        <div style='margin-top: 1px;margin-left:5px;font-size: 15px;color: #72767b' >16小时前推送了新的提交到 master 分支，032a495...1ecc563</div>
                    </div>
                    <div style='display: flex;margin-top:25px'>
                        <img src='../../assets/img/lxy.png' style='width: 30px;height: 30px'>
                        <div style='margin-top: 1px;margin-left:5px;font-size: 15px;color: #72767b' >16小时前合并了 PR !3 12</div>
                    </div>
                </div>
                -->
                <div style='display: block'>
                    <div style='display: grid;margin-top:25px'>
                        <div v-for="(item) in recentTrends"  style='display: flex;margin-bottom: 20px'>
                            <div style='width: 30px; height: 30px;'>
                                <el-avatar :style="`background:${extractColorByName(item.name)}`" > {{item.name}} </el-avatar>
                            </div>
                            <div style='margin-top: 1px;margin-left:20px;font-size: 15px;color: #72767b'>{{item.trends}}</div>
                        </div>
                    </div>
                </div>
                <!--贡献者-->
                <div style='display: block;position: relative;'>
                    <div style='display: flex'>
                        <h4 style='margin-top: 40px'>管理者</h4>
                        <el-button type="text" style='margin-top: 34px;font-size: 15px;color: #72767b'>({{this.manager.length}})</el-button>
                        <el-button type="text" style='margin-top: 30px;font-size: 15px;color: #72767b;position:absolute;right: 0'>全部</el-button>
                    </div>

                    <div style='display: flex;margin-top: 20px'>
                        <div v-for="(item) in manager"  style='display: grid'>
                            <!--
                            <img :src="item.src" style='width: 38px;height: 38px;margin-left: 10px'>
                            -->
                            <div style='margin-right: 10px'>
                                <el-avatar :style="`background:${extractColorByName(item.name)}`"> {{item.name}} </el-avatar>
                            </div>
                        </div>
                    </div>
                    <div style='display: flex'>
                        <h4 style='margin-top: 40px'>贡献者</h4>
                        <el-button type="text" style='margin-top: 34px;font-size: 15px;color: #72767b'>({{this.contributor.length}})</el-button>
                        <el-button type="text" style='margin-top: 30px;font-size: 15px;color: #72767b;position:absolute;right: 0'>全部</el-button>
                    </div>
                    <div style='display: flex;margin-top: 20px'>
                        <div v-for="(item) in contributor"  style='display: grid'>
                            <div style='margin-right: 10px'>
                                <el-avatar :style="`background:${extractColorByName(item.name)}`"> {{item.name}} </el-avatar>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import ManageComponent from '@/components/page/Manage.vue';
import CounterCom from '@/components/page/CounterCom.vue'
import { messages } from '../common/i18n';
export default {
    name: "FilePreview",
    components: { CounterCom },

    props: {
        // 父组件传入文件格式类型例如 [1,2]
        accept: {
            type: Array,
            default: () => {
                return [".rar",".zip",".doc",".docx",".xls",".txt",".pdf",".jpg",".png",".jpeg",".vue",".c",".cpp",".xml",".yml"];
            },
        },
    },
    mounted() {
        this.owner = this.$route.params.owner;
        this.visitor = this.$route.params.visitor;
    },
    data() {
        return {
            visitor:'',
            owner:'',
            warehouse: this.$route.query.warehouseName,
            value:'',
            isCredible: 0,   //低于60不可信;;; 可以用 this.$route.query.isCredible 传参  or  从数据库读取
            isDisabled: false,  //对于申请按钮的展现
            isAuditCompleted:false, //审核员是否审核完成，已完成则不显示按钮
            applicationStatus: '申请可信依赖库',

            http_text: 'https://element.eleme.cn/#/zh-CN/component/input',
            isShowHeader: false,
            star_count: 2,
            fork_count: 1,
            watching_count: 3,
            donate_count: 11,

            //上传文件
            fileList: [{
                name: 'food.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }],

            //此仓库的【贡献者】——后端从数据库里传入数组
            contributor: [
                { name: 'admin', src: require('../../assets/img/img.jpg') },
                { name: 'user1', src: require('../../assets/img/lxy.png') },
                { name: 'user2', src: require('../../assets/img/dyb.png') },
                { name: 'user3', src: require('../../assets/img/wzy.png') },],
            //因为图片在assets里面，所以src引入的时候需要require一下。（此次未采用此方法引入头像）
            //此仓库的【管理者】——后端从数据库里传入数组
            manager: [{ name: 'admin', src: require('../../assets/img/img.jpg') }],
            //此仓库的【近期动态】——后端监测动态，传入前端？maybe，暂时写死数据
            recentTrends: [
                { name: 'user1', trends: '3分钟前创建了新的 Pull Request', },
                { name: 'user2', trends: '16小时前推送了新的提交到 master 分支，032a495...1ecc563', },
                { name: 'user3', trends: '16小时前合并了 PR !3 12', },
            ],

            //文件列表的展示——假数据_____从后端请求一个名字为“对应用户选择分支的分支名称”的表，将数据展示在前端
            branchOptions: [{
                value: 'master',
                label: 'master'
            }, {
                value: 'test',
                label: 'test'
            }],

            master: [{
                        file: 'test_user1',
                        prop: 'add test_user1',
                        time: '10小时前',
                    }, {
                        file: 'test_user2',
                        prop: 'add test_user2',
                        time: '1个月前',
                    },  {
                        file: 'README.md',
                        prop: 'Initial commit',
                        time: '2个月前',
                }],

            test: [{
                    file: 'test_user1',
                    prop: 'add test_user1',
                    time: '10小时前',
                }, {
                    file: 'test_user2',
                    prop: 'add test_user2',
                    time: '1个月前',
                }, {
                    file: 'test_user3',
                    prop: 'add test_user3',
                    time: '1小时前',
                }, {
                    file: 'README.md',
                    prop: 'Initial commit',
                    time: '2个月前',
                }],
            branchName: "master",      //下拉框绑定的model
            particularsDAta: {}, //展示的数据
            displayData:[{
                file: 'test_user1',
                prop: 'add test_user1',
                time: '10小时前',
            }, {
                file: 'test_user2',
                prop: 'add test_user2',
                time: '1个月前',
            },  {
                file: 'README.md',
                prop: 'Initial commit',
                time: '2个月前',
            }],
        }
    },
    created() {
        axios.get('http://localhost:8080/codedetails').then(function(resp){
            this.fileList = resp.data;
        })
    },
    methods: {
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

        handleNodeClick(data) {
            console.log(data);
        },
        handleCopyClick() {
            // 复制文本到剪切板
            this.$refs.textInput.select();
            document.execCommand('copy');
        },
        handleView(){ //点击文件名称跳转进入查看文件页面_   从后端获取一个什么参数，从数据库里面搜索显示在查看页面
            //
            console.log(this.warehouse);
            this.$router.push({path: '/codeview'}, {query:{warehouseName: this.warehouse, isCredible: this.isCredible}})
        },
        handleEdit(){ //点击文件名称跳转进入查看文件页面
            this.$router.push({path: '/newFile'});
        },
        //申请可信依赖库证明
        application() {
            this.$confirm('1. 你的可信依赖库申请将由平安源nber审核。\n' +
                '2. 凡是经过安全检验确保安全的依赖库，平台会为其颁发可信依赖库证明。\n' +
                '3.申请提交后，如一个工作日内未得到推荐，则默认表示被拒。', '申请可信依赖库', {
                distinguishCancelAndClose: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            })
                .then(() => {
                    this.$message({
                        type: 'info',
                        message: '申请已提交，请等待审核！'
                    });
                    this.isDisabled= !this.isDisabled;
                    this.applicationStatus="可信依赖库申请中";
                })
                .catch(action => {
                    this.$message({
                        type: 'info',
                        message: action === 'cancel'
                            ? '取消申请'
                            : '停留在当前页面'
                    })
                });
        },
        acknowledge() {
            this.$confirm('我承诺该依赖库确保安全，安全验证通过，颁发可信依赖库证明！', {
                distinguishCancelAndClose: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(() => {

                    this.$message({
                        type: 'info',
                        message: '已确认颁发可信依赖库证明'
                    });
                    this.isCredible = 80;
                })
                .catch(action => {
                    this.$message({
                        type: 'info',
                        message: action === 'cancel'
                            ? '取消承诺'
                            : '停留在当前页面'
                    })
                });
            //审核完成，不显示按钮
            this.isAuditCompleted=!this.isAuditCompleted;
        },
        deny() {
            this.$confirm('我承诺该依赖库不安全，安全验证未通过，不颁发可信依赖库证明！', {
                distinguishCancelAndClose: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(() => {
                    this.$message({
                        type: 'info',
                        message: '已确认不颁发可信依赖库证明！',
                    });
                })
                .catch(action => {
                    this.$message({
                        type: 'info',
                        message: action === 'cancel'
                            ? '取消承诺'
                            : '停留在当前页面'
                    })
                });
            //审核完成，不显示按钮
            this.isAuditCompleted=!this.isAuditCompleted;
        },
        //文件上传测试
        handlePreview(file){//文件预览
            //file.response是后端服务端返回的json, url未=为json里的url
            window.open(file.response.url);
            console.log(file);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        //测试上传文件(注意web的上下文)
        handleBeforeUpload(file){
            this.uploadUrl = 'http://localhost:8080/codedetails'
            console.log("开始上传，上传的文件为："+file.name)
            let formData = new FormData();
            formData.append("multipartFiles", file);
            this.fileList.value.push({
                name:file.name,
                url:file.url,
            })
            axios({
                method: 'post',
                url: 'http://localhost:8080/codedetails',
                data: formData,
                headers: {'Content-Type': 'multipart/form-data' }
            }).then((res) => {
                console.log("文件上传返回："+res)
            }).catch(error => {
                console.log("文件上传异常:"+error)
            })
            this.uploadUrl ='http://localhost:8080/codedetails'
        },
        //////文件列表 对应分支 渲染
        // change事件匹配对应数据
        choiceBranch(branch) {
                // let idx = "";
                // branch.map((item, index) => {
                //     if (item.name === value) {
                //         idx = index;
                //     }
                // });
                // this.particularsDAta = this.fileData.name[idx];
            console.log(branch);
            if(branch === "master"){
                this.displayData = this.master;}
            if(branch === "test"){
                this.displayData = this.test;}
        },
    },
    computed: {
        warehouse() {
            return messages
        },
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },

    //created()：在创造之前就执行的东西，拿到跨域json数据格式
    // created() {
    //     let that=this;
    //     axios.get('地址').then(function (resp) {
    //         that.XXX变量=resp.data;
    //     })
    // }

}
</script>


<style>
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
.box {
    width: 100%;
    height: 22px;
    display: flex;
    flex-direction: row;
}
.box > div {
    height: 50px;
    flex: 1;
}
#but {
    width: 100px;
    height: 40px;
    color: #fff;
    margin-top: 10px;
    margin-left: 10px
}

.but01 {
    background-color: orange;
}

.but02 {
    background-color: gray;
}

</style>