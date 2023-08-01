<template>

    <div>
        <CounterCom  :warehouse="this.warehouse"></CounterCom>
        <!--顶部-->
        <div style='display: block'>
            <!--标题路径-->
            <div style='display: flex;position: relative'>
                <div style='display: flex;margin-top: 15px;margin-left: 10px'>
                    <el-tag  v-if="isCredible>=60" type='success'
                             style='
                             width: 55px;
                             height: 24px;
                             background: rgba(0,171,164,0.1);
                             border: 1px solid #00ABA4;
                             border-radius: 4px;'
                             >可信</el-tag>
                    <el-tag  v-else-if='isCredible<60' type='danger'
                             style='width: 55px;height: 24px;background: rgba(237,64,64,0.1);border: 1px solid #ED4040;border-radius: 4px;'
                    >不可信</el-tag>

                    <div style='margin-left: 20px;font-size: 23px;display: flex'>
                        <div style='width: 63px;height: 19px;font-size: 24px;font-family: Source Han Sans CN;
                        font-weight: bold;color: #353D61;line-height: 28px;margin-top: 0;'>{{this.$route.query.username}}</div>
                        <div style='width: 32px;height: 14px;font-size: 18px;font-family: Source Han Sans CN;font-weight: 400;
                        color: #353D61;line-height: 28px;opacity: 0.8;margin-left: 12px'> / {{this.$route.query.warehouseName}} </div>
                    </div>
                </div>

                <!--审核是否为可信依赖库-->
                <el-button type="primary" style='width: auto;height: 40px;margin-top: 10px;margin-left: 10px'
                           @click="acknowledge" v-if='this.visitor!==this.owner' :disabled='isAuditCompleted'>
                    颁发可信依赖库证明</el-button>
                <el-button type="primary" style='width: auto;height: 40px;margin-top: 10px;margin-left: 10px'
                           @click="deny" v-if='this.visitor!==this.owner' :disabled='isAuditCompleted'>
                    不颁发可信依赖库证明</el-button>

                <!--未申请时/申请失败-->
                <el-button  style=' width: 130px;height: 30px;margin-top: 17px;background: #4092ED;border: 1px solid #4092ED;border-radius: 4px;margin-left: 20px'
                @click="application" :disabled='isDisabled' v-if='this.owner===this.visitor '>
                    <div style='font-size: 14px;font-family: Source Han Sans CN;font-weight: 400;color: #FFFFFF;'>
                        {{ applicationStatus }}
                    </div>
                </el-button>

                <!--右侧辅助工具栏-->
                <div style='position: absolute;right: 0;display: flex;margin-top: 15px'>
                    <el-dropdown size="small" split-button type="plain" style='font-family: San Francisco Display;font-weight: 400;color: #353D61;'>
                        <i class='el-icon-view'></i>
                        Watching   {{watching_count}}
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>不关注</el-dropdown-item>
                            <el-dropdown-item>关注所有动态</el-dropdown-item>
                            <el-dropdown-item>仅关注版本发行动态</el-dropdown-item>
                            <el-dropdown-item>关注但不提醒动态</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-button type="plain" icon="el-icon-star-off" style='margin-left: 12px;font-family: San Francisco Display;font-weight: 400;color: #353D61;'>
                        Star  {{star_count}} </el-button>
                    <el-button type="plain" icon="el-icon-share" style='font-family: San Francisco Display;font-weight: 400;color: #353D61;'>
                        Fork  {{fork_count}}</el-button>
                </div>

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
            </div>
        </div>
        <!--主体-->
        <div style='display: flex;margin-top: 10px;margin-left: 2px'>
            <!--左侧主体部分-->
            <div style='width: 68%;position: relative;background: rgba(255,255,255,0.8);border: 1px solid;border-image: linear-gradient(0deg, #FFFFFF, #FFFFFF) 1 1;
                box-shadow: 0 5px 20px 0 rgba(183,183,195,0.07);border-radius: 10px;'>
                <div style='margin-left: 2%;margin-right: 2%'>
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
                    <div style='display: flex;margin-top:5px;margin-bottom: 15px'>
                            <div style='display: flex;margin-top: 14px'>
                                <div>
                                    <el-select v-model="branchName" placeholder="选择分支"  @change='choiceBranch(branchName)'>
                                    <el-option
                                        v-for="item in branchOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                    </el-select>
                                </div>
                                <img src='../../assets/img/branch.png' style='margin-top: 9px;width: 13px;height: 13px;margin-left: 16px'>
                                <div style='font-size: 14px;margin-top: 7px;margin-left: 6px;font-family: Source Han Sans CN;font-weight: bold;color: #353D61;'>
                                    分支 {{this.branchOptions.length}} </div>
                                <div style='font-size: 12px;margin-top: 10px;margin-left: 16px;font-family: Source Han Sans CN;font-weight: 500;color: #353D61;'>
                                    标签 1</div>
                            </div>
                            <!--标签行 右侧栏目内容-->
                          <div style='display: flex;position: absolute;right: 18px;'>
                                <el-button type='text'><i class="el-icon-more-outline" style='font-family: Source Han Sans CN;font-weight: bolder;color: #4092ED;margin-left: 10px;font-size: 14px'></i>
                                    <router-link :to="{path:'/manage',query:{username:username,warehouseName:this.warehouse,starCount:this.star_count,watchCount:this.watching_count,forkCount:this.watching_count}}"
                                                 style='font-family: Source Han Sans CN;font-weight: 400;color: #4092ED;font-size: 14px'>
                                        管理</router-link>
                                </el-button>
                                <el-button type='text'><i class="el-icon-top" style='font-family: Source Han Sans CN;font-weight: bolder;color: #4092ED;margin-left: 10px;font-size: 14px'></i>
                                    <router-link :to="{path:'/statistics',query:{username:username,warehouseName:this.$route.query.warehouseName,isCredible:this.isCredible }}"
                                                 style='font-family: Source Han Sans CN;font-weight: 400;color: #4092ED;font-size: 14px'>
                                        统计</router-link>
                                </el-button>
                                <el-button type='text'><i class="el-icon-plus" style='font-family: Source Han Sans CN;font-weight: bolder;color: #4092ED;margin-left: 10px;font-size: 14px'></i>
                                    <router-link :to="{path:'/pullrequests',query:{username:username,warehouseName:this.$route.query.warehouseName,isCredible:this.isCredible }}"
                                                 style='font-family: Source Han Sans CN;font-weight: 400;color: #4092ED;font-size: 14px'>
                                        Pull Request</router-link>
                                </el-button>
                                <el-button type='text' style='font-size: 16px;font-family: Source Han Sans CN;font-weight: 400;color: #4092ED;margin-left: 10px;font-size: 14px;
                                line-height: 46px;'><i class="el-icon-plus" style='font-weight: bolder;color: #4092ED'></i>
                                    <router-link :to="{path:'/issue',query:{username:username,warehouseName:this.$route.query.warehouseName ,isCredible:this.isCredible}}"
                                                 style='font-family: Source Han Sans CN;font-weight: 400;color: #4092ED;font-size: 14px'>
                                        Issue</router-link>
                                </el-button>
                                <div style='margin-left: 10px'>
                                    <el-dropdown>
                                        <el-button type="text" style='margin-left: 6px;font-size: 14px;font-family: Source Han Sans CN;font-weight: 400;
                                        color: #00ABA4;line-height: 46px;'>文件</el-button>
                                        <img src='../../assets/img/arrow-down-green.png' style='width: 10px;height: 5px;margin-left: 5px'>
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
                                </div>
                                <div style='margin-left: 10px' >
                                    <el-dropdown>
                                        <el-button type="text" style='margin-left: 6px;font-size: 14px;font-family: Source Han Sans CN;font-weight: 400;
                                        color: #F6833B;line-height: 46px;'>克隆/下载</el-button>
                                        <img src='../../assets/img/arrow-down-orange.png' style='width: 10px;height: 5px;margin-left: 5px'>
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
                </div>
                <!--左侧标签行下面内容  表格数据-->
                <div>
                <!--表格信息_===表格数据根据用户从 选择器 里面的选择 来确定，一个分支对应一个表格-->
                    <el-table :data = "displayData"  style="width: 100%;margin-top:8px;font-size: 16px;font-family: Source Han Sans CN;
                    font-weight: 500;color: #353D61;">
                        <el-table-column prop="file" width="260px "  label='File name' align="center"> </el-table-column>
                        <el-table-column prop="prop"  width="260px " label="Submit information" align="center"></el-table-column>
                        <el-table-column prop="time"  width='260px' label="Creation time" align="center"></el-table-column>
<!--                        <el-table-column prop="operation" align='right' width='100px' label="Operation">-->
<!--                            <template slot-scope="scope" style='display: flex'>-->
<!--                                <el-button-->
<!--                                    type="text"-->
<!--                                    icon="el-icon-view"-->
<!--                                    @click="handleView(scope.$index, scope.row)"-->
<!--                                >查看</el-button>-->
<!--                            </template>-->
<!--                        </el-table-column>-->
                    </el-table>
                    <!--点赞打赏区域   已删除-->
                </div>
                </div>
            </div>
            <!--右侧主体部分-->
            <div style='text-align: left;margin-left: 10px;width: 30%;background: rgba(255,255,255,0.8);border: 1px solid;
            border-image: linear-gradient(0deg, #FFFFFF, #FFFFFF) 1 1;box-shadow: 0 5px 20px 0 rgba(183,183,195,0.07);border-radius: 10px;'>
                <div style='margin-right: 10px;margin-left: 10px;'>
                <!--简介-->
                <h4 style='margin-top: 27px;margin-left: 10px'>简介</h4>
                <div style='margin-top: 15px;font-size: 15px;color: #72767b;margin-left: 10px' >{{this.$route.query.introduce}}</div>
                <div style='margin-top: 15px;font-size: 15px;color: #72767b;margin-left: 10px' >{{this.$route.query.warehouseKeywords}}</div>

                <!--近期动态-->
                <h4 style='margin-top: 40px;margin-left: 10px'>近期动态</h4>
                <div style='display: block'>
                    <div style='display: grid;margin-top:25px'>
                        <div v-for="(item) in recentTrends"  style='display: flex;margin-bottom: 20px'>
                            <div style='width: 30px; height: 30px;'>
<!--                                <el-avatar :style="`background:${extractColorByName(item.name)}`" > {{item.name}} </el-avatar>-->
                                <img src='../../assets/img/user-man.png'>{{item.name}}
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
    // mounted() {
    //     // this.owner = this.$route.params.owner;
    //     // this.visitor = this.$route.params.visitor;
    // },
    data() {
        return {
            visitor:this.$route.params.visitor,
            owner:this.$route.params.owner,
            warehouse: this.$route.query.warehouseName,
            value:'',
            isCredible: 0,   //低于60不可信;;; 可以用 this.$route.query.isCredible 传参  or  从数据库读取
            //isCredible:this.$store.state.CredibleValue,
            isDisabled: false,  //对于申请按钮的展现
            isAuditCompleted:false, //审核员是否审核完成，已完成则不显示按钮,
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
        });
        // 在 created 钩子函数中将 CredibleValue 值设置为 0
        this.$store.dispatch('setCredibleValue', 0);
        // 在 created 钩子函数中监听 CredibleValue 的变化
        this.$store.watch(
            (state) => state.CredibleValue,
            (newCredibleValue) => {
                // 处理 CredibleValue 值变化的逻辑
                console.log('CredibleValue 变化为:', newCredibleValue);
            }
        );
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
            this.$router.push(
                {path: '/codeview',query:{warehouseName: this.warehouse,isCredible: this.isCredible} })
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
            console.log(this.owner);
            console.log(this.visitor);
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
                    //this.$store.dispatch('setCredibleValue', 80);
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
                    this.isDisabled=!this.isDisabled;
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
        // warehouse() {
        //     return messages
        // },
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
.select {
    &::v-deep {
        .el-select {
            margin-left: 9px;
            .el-input.el-input--suffix {
                .el-input__inner {
                    background: #4092ED;
                    opacity: 0.1;
                    border-radius: 4px;
                    font-size: 18px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #4092ED;
                    height: 25px;
                    width: 65px;

                }
                .el-input__suffix-inner {
                    position: absolute;
                    left: -65px;
                }
            }
            .el-select__caret.el-input__icon.el-icon-arrow-up {
                line-height: 30px;
            }
        }
    }
}

</style>