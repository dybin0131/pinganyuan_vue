<template>
    <div style='width: 84%;margin-left: 8%;'>
        <!--顶部-->
        <div style='display: block'>
            <!--标题路径-->
            <div style='display: flex;position: relative'>
                <div style='display: flex;margin-top: 60px'>
                    <el-tag  v-if="this.$route.query.isCredible>=60" type='success'>可信</el-tag>
                    <el-tag  v-else-if='this.$route.query.isCredible<60' type='danger'>不可信</el-tag>
                    <el-breadcrumb separator="/" style='margin-top:5px;margin-left: 10px;font-size: 23px'>
                        <el-breadcrumb-item :to="{ path: '/' }">{{ this.$route.query.username }}</el-breadcrumb-item>
                        <el-breadcrumb-item><a href="/">{{ this.$route.query.warehouseName }}</a></el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <!--右侧辅助工具栏-->
                <div style='position: absolute;right: 0;display: flex;margin-top: 60px'>
                    <el-dropdown size="small" split-button type="plain" v-on:click="watching_count++" >
                        <i class='el-icon-view'></i>
                        Watching   {{watching_count}}
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>不关注</el-dropdown-item>
                            <el-dropdown-item>关注所有动态</el-dropdown-item>
                            <el-dropdown-item>仅关注版本发行动态</el-dropdown-item>
                            <el-dropdown-item>关注但不提醒动态</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-button type="plain" icon="el-icon-star-on" style='margin-left: 12px'  v-on:click="star_count++">Star  {{star_count}}</el-button>
                    <el-button type="plain" icon="el-icon-share"  v-on:click="fork_count++">Fork  {{fork_count}}</el-button>
                </div>
            </div>
            <div style='margin-top: 20px'>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">Pull Requests</el-breadcrumb-item>
                    <el-breadcrumb-item style='font-weight: bolder'><a href="/">详情</a></el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
            <!--主体部分-->
        <div>
            <el-container>
                <el-main  style='position: relative'>
                    <h2>{{this.$route.query.title}}</h2>
                    <div style='display: flex'>
                        <el-alert style='font-weight: bolder;font-size: 30px;margin-top: 30px;width:130px;height: 30px' type="success" >

                            <div v-if="(isExaminationPassed===true)&&(isTestPassed===true)">
                                <div style='display: flex'>
                                    <i class='el-icon-info' style='height: 15px;width: 13px' ></i>
                                    <h5>已合并</h5>
                                </div>
                            </div>
                            <div v-else>
                                <div style='display: flex'>
                                    <i class='el-icon-finished' style='height: 15px;width: 13px' ></i>
                                    <h5>开启的</h5>
                                </div>
                            </div>
                        </el-alert>
                        <el-alert style='font-weight: bolder;font-size: 30px;margin-top: 30px;width:130px;height: 30px' type="info" title=''>
                            {{this.user}}  /  {{this.source}}</el-alert>
                        <i class='el-icon-caret-right' style='margin-top: 40px;margin-left: 10px;margin-right: 10px'></i>
                        <el-alert style='font-weight: bolder;font-size: 30px;margin-top: 30px;width:130px;height: 30px' type="info" title=''>
                            {{this.user}}  /  {{this.aim}}</el-alert>
                    </div>
                    <div style='display: flex'>
                        <div style='display: flex;margin-top:14px'>
                            <div style='margin-top: 7px;margin-left:5px;font-size: 13px;color: #72767b;display: flex' >
                                <div style='margin-top: 0'>
                                <el-avatar :style="`background:${extractColorByName(this.user)},width:30px,height:30px`">{{this.user}}</el-avatar>
                                </div>
                                <div style='margin-top: 13px;margin-left: 7px'>  {{this.user}} 创建于 {{PRCreationTime}}  </div>
                            </div>
                        </div>

                        <!--此部分不做演示，暂时未做功能-->
                        <div style='display: flex;position: absolute;right: 20px;margin-top: 9px'>
                            <el-button icon="el-icon-edit">编辑</el-button>
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
                    <div style='font-size: 14px;margin-top: 30px'>{{ this.$route.query.describe }}</div>
                    <div style='display: flex;margin-top: 20px'>
                        <div style='display: flex'>
                            <el-button round  icon="el-icon-success"  v-on:click="zan_count++" style='background-color:transparent;font-size: 23px;color: darkseagreen'></el-button>
                            <div style='display: block;margin-top: 20px;margin-left: 10px;'>
                                <div style='font-size: 14px;text-align: center'>{{zan_count}}</div>
                            </div>
                        </div>
                        <div style='display: flex'>
                            <el-button round  icon="el-icon-error"  v-on:click='cha_count++' style='background-color:transparent;font-size: 23px;color: #dd6161'></el-button>
                            <div style='display: block;margin-top: 20px;margin-left: 10px;'>
                                <div style='font-size: 14px;text-align: center'>{{cha_count}}</div>
                            </div>
                        </div>
                    </div>
                    <el-table
                        :data="tableData"
                        style="width: 100%;margin-top: 20px">
                        <el-table-column prop="category" label="类型" width="260"></el-table-column>
                        <el-table-column prop='worker' label="指派人员" width="260">
                            <!--
                            <template slot-scope="scope">
                                <div v-if="scope.$index === 0">
                                    <div v-for="user in selectedExaminers" >
                                        <div style='width: 30px; height: 30px;display: grid;margin-right: 20px'>
                                            <el-avatar  :style="`background:${extractColorByName(user)}`" :size='"small"'> {{user}} </el-avatar>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="scope.$index === 1">
                                    <div  v-for="user in selectedTesters" >
                                        <div style='width: 30px; height: 30px;display: grid;margin-right: 20px'>
                                            <el-avatar  :style="`background:${extractColorByName(user)}`" :size='"small"'> {{user}} </el-avatar>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            -->
                        </el-table-column>
                        <el-table-column prop="status" label="状态">
                            <template slot-scope="scope">
                                <i class='el-icon-circle-check' style='color: green'></i>
                                已完成（{{this.selectedTesters.length}}/1）
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--未通过时的界面------ 审核者  -->
                    <div v-if='this.visitor!==this.owner'>
                        <div style='display: flex;margin-top: 10px;margin-left: 10px'>
                            <h4 style='margin-top: 3px' >需要您进行当前 Pull Request 的一些审核工作</h4>
                            <div style='display: flex;position: absolute;right: 20px;'>
                                <div v-if="(isExaminationPassed===true)&&(isTestPassed===true)">
                                    <el-button type="text" @click="open" style='height: 5px;color: #00a854;margin-right: 20px'>审核测试完成</el-button>
                                </div>
                                <el-button v-if='isExaminationPassed===true' type="warning" @click="PassExamination">取消审查</el-button>
                                <el-button v-if='isExaminationPassed===false' type="warning" @click="PassExamination">审查通过</el-button>
                                <el-button v-if='isTestPassed===true'  type="warning" @click="PassTest">取消测试</el-button>
                                <el-button v-if='isTestPassed===false'  type="warning" @click="PassTest">测试通过</el-button>
                            </div>
                        </div>
                        <!---合并分支--->
                        <div v-if="(isExaminationPassed===true)&&(isTestPassed===true)">
                        <el-tag  style='font-size: 13px;height: 35px;width:100%;margin-top:20px;background-color: #a4da89;color: #303133'>
                            源分支与目标分支没有冲突 可自动合并
                            <el-dropdown split-button type='success' @click="handleMergeClick" style='position: absolute;right: 20px;' >
                                合并分支
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>1</el-dropdown-item>
                                    <el-dropdown-item>2</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-tag>
                        </div>

                        <!--接受Pull Request-->
                        <!---
                        <div style='display: block;margin-top: 20px'>
                            <el-input v-model="pullTitle" placeholder="!3  12"></el-input>
                            <el-input type="textarea" :rows="3" placeholder="Merge pull request !3 from dyb/testpr" v-model="textarea">
                            </el-input>
                        </div>
                        <div style='display: flex;position: absolute;right: 20px;margin-top: 10px'>
                            <el-button type="text" @click='denyPR'>取消</el-button>
                            <el-button v-if='isPRAuditCompleted===false'  type="warning" @click='acceptPR'>接受Pull Request</el-button>
                            <el-button v-if='isPRAuditCompleted===true'  type="warning" @click='denyPR'>取消接受</el-button>
                        </div>
                        -->
                    </div>

                    <!--通过时的界面  -->
<!---
                    <div style='display: flex;margin-top: 10px;margin-left: 10px'>
                        <h4 style='margin-top: 3px' >需要您进行当前 Pull Request 的一些审核工作</h4>
                        <div style='display: flex;position: absolute;right: 20px;'>
                            <el-button type="text" @click="open" style='height: 5px;color: #00a854;margin-right: 20px'>审核测试完成</el-button>
                            <el-button>取消审查</el-button><el-button>取消测试</el-button>
                        </div>
                    </div>
                    <el-tag  style='font-size: 13px;height: 35px;width:100%;margin-top:20px;background-color: #a4da89;color: #303133'>
                        源分支与目标分支没有冲突 可自动合并
                        <el-dropdown split-button type='success' @click="handleClick" style='position: absolute;right: 20px;' >
                            合并分支
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>1</el-dropdown-item>
                                <el-dropdown-item>2</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-tag>
--->

                    <!--评论  功能选择栏-->
                    <el-tabs v-model="activeName" @tab-click="handleClick" style='margin-top: 48px'>
                        <el-tab-pane label="评论" name="first">
                            <div style='display: flex'>
                                <div>user2  指派了 审查人 user1 5分钟前</div>
                            </div>
                            <!--评论功能区域-->
                            <div style='display: flex;margin-top: 20px'>
                                <el-avatar  :style="`background:${extractColorByName(user)}`" :size='"small"'> {{user}} </el-avatar>
                                <div style='display: block;width: 94%;'>
                                    <el-card class="box-card" style='margin-left: 10px'>
                                        <div style='display: flex;grid-row: 1;font-size: 18px'>
                                            <i class='el-icon-s-tools' style='margin-right: 13px'></i>
                                            <i class='el-icon-picture-outline-round' style='margin-right: 13px'></i>
                                            <i class='el-icon-question' style='margin-right: 13px'></i>
                                            <i class='el-icon-share' style='margin-right: 13px'></i>
                                            <i class='el-icon-view' style='margin-right: 13px'></i>
                                            <i class='el-icon-link' style='margin-right: 13px'></i>
                                            <i class='el-icon-user-solid' style='margin-right: 13px'></i>
                                            <i class='el-icon-full-screen' style='margin-right: 13px'></i>
                                        </div>
                                        <el-input type="textarea" :rows="3" placeholder="请输入评论" v-model="reviewErea"
                                                  style='margin-top: 10px'>
                                        </el-input>
                                    </el-card>
                                    <div style='display: flex;margin-top: 10px;margin-left: 10px'>
                                        <el-dropdown split-button type="primary" @click="handleClickReview">
                                            评论
                                            <el-dropdown-menu slot="dropdown">
                                                <el-dropdown-item>1</el-dropdown-item>
                                                <el-dropdown-item>2</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </el-main>
                <el-aside width="30%" style='margin-top: 20px;position: relative'>
                    <!--审查-->
                    <div>
                        <h4 style='margin-top: 10px'>审查</h4>
                        <div style='font-size: 12px;color: #777777;margin-top:20px '>审查人员</div>
                        <div style='margin-top: 10px;display: flex'>
                            <div>
                                <el-select v-model="selectedExaminer" style='height:20px;width: 120px'>
                                    <el-option disabled value="">请选择</el-option>
                                    <el-option v-for="user in members"  :value="user">
                                        {{ user }}
                                    </el-option>
                                </el-select>
                                <el-button @click="addSelectedExaminer" type='text'>选择</el-button>
                                <div style='display: flex;margin-top: 10px'>
                                    <div v-for="user in selectedExaminers" >
                                        <div style='width: 30px; height: 30px;display: grid;margin-right: 20px'>
                                            <el-avatar  :style="`background:${extractColorByName(user)}`" :size='"medium"'> {{user}} </el-avatar>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style='margin-top: 5px;font-size: 15px;color: #72767b;position: absolute;right:10px' >最少1人</div>
                        </div>
                    </div>

                    <!--测试-->
                    <div>
                        <h4 style='margin-top: 30px'>测试</h4>
                        <div style='font-size: 12px;color: #777777;margin-top:20px '>测试人员</div>
                        <div style='margin-top: 10px;display: flex'>
                            <div>
                                <el-select v-model="selectedTester" style='height:20px;width: 120px'>
                                    <el-option disabled value="">请选择</el-option>
                                    <el-option v-for="user in members"  :value="user">
                                        {{ user }}
                                    </el-option>
                                </el-select>
                                <el-button @click="addSelectedTester" type='text'>选择</el-button>
                                <div style='display: flex;margin-top: 10px'>
                                    <div v-for="user in selectedTesters" >
                                        <div style='width: 30px; height: 30px;display: grid;margin-right: 20px'>
                                            <el-avatar  :style="`background:${extractColorByName(user)}`" :size='"medium"'> {{user}} </el-avatar>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style='margin-top: 5px;font-size: 15px;color: #72767b;position: absolute;right:10px' >最少1人</div>
                        </div>
                    </div>

                    <!--优先级-->
                    <div style='display: block;'>
                        <div style='display: flex;margin-top: 40px;position: relative;width: 100%'>
                            <h4 >优先级</h4>
                            <div style='margin-top: 5px;font-size: 15px;color: #72767b;position: absolute;right:10px' >
                                <i class='el-icon-edit-outline' ></i>
                            </div>

                        </div>
                        <!--
                        <div style='display: flex;margin-top: 20px'>
                           <i class='el-icon-warning' style='color: #dd6161;margin-top: 5px'></i>
                            <div> 严重</div>
                        </div>
                        -->
                        <el-select v-model="priority" placeholder="请选择" style='margin-top: 10px;height:20px;width: 120px'>
                            <el-option
                                v-for="item in priorityOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>

                    <!--标签-->
                    <div style='display: block;'>
                        <div style='display: flex;margin-top: 40px;position: relative;width: 100%'>
                            <h4 >标签</h4>
                            <div style='margin-top: 5px;font-size: 15px;color: #72767b;position: absolute;right:10px' >
                                <i class='el-icon-edit-outline' ></i>
                            </div>
                        </div>
                        <div style='display: flex;margin-top: 20px'>
                            <el-input v-model="inputLabel" placeholder="请输入标签" style='height:20px;width: 120px'></el-input>
                        </div>
                    </div>

                    <!--关联Issue-->
                    <div style='display: block;'>
                        <div style='display: flex;margin-top: 40px;position: relative;width: 100%'>
                            <h4 >关联Issue</h4>
                            <div style='margin-top: 5px;font-size: 15px;color: #72767b;position: absolute;right:10px' >
                                <i class='el-icon-edit-outline' ></i>
                            </div>
                        </div>
                        <div style='display: flex;margin-top: 20px'>
                            <div> 未关联</div>
                        </div>
                    </div>

                    <!--里程碑-->
                    <!---
                    <div style='display: block;'>
                        <div style='display: flex;margin-top: 40px;position: relative;width: 100%'>
                            <h4 >里程碑</h4>
                            <div style='margin-top: 5px;font-size: 15px;color: #72767b;position: absolute;right:10px' >
                                <i class='el-icon-edit-outline' ></i>
                            </div>
                        </div>
                        <div style='display: flex;margin-top: 20px'>
                            <div> 未关联</div>
                        </div>
                        <div style='display: flex;margin-top: 6px;font-size: 13px'>
                            <i class='el-icon-warning' style='margin-top: 5px'></i>
                            <div>  Pull Request 合并后将关闭上述关联 Issue</div>
                        </div>
                    </div>
                    -->

                    <!--参与者-->
                    <div style='display: block;position: relative;'>
                        <div style='display: flex'>
                            <h4 style='margin-top: 40px'>参与者</h4>
                            <el-button type="text" style='margin-top: 34px;font-size: 15px;color: #72767b'>({{participant}})</el-button>
                            <el-button type="text" style='margin-top: 30px;font-size: 15px;color: #72767b;position:absolute;right: 0'>全部</el-button>
                        </div>
                        <div style='display: flex;margin-top: 20px'>
                            <el-avatar  :style="`background:${extractColorByName(this.user)}`" :size='"medium"'> {{this.user}} </el-avatar>
                        </div>
                    </div>
                </el-aside>
            </el-container>
        </div>
    </div>
</template>


<script>
import { mapState, mapActions } from 'vuex';
import { messages } from '@/components/common/i18n';
export default {
    data() {
        return {
            title:this.$route.query.title,
            describe:this.$route.query.describe,
            user:this.$route.query.username,
            warehouse:this.$route.query.warehouseName,
            source:this.$route.query.source,
            aim:this.$route.query.aim,
            isCredible:this.$route.query.isCredible,
            owner:this.$route.params.owner,
            visitor:this.$route.params.visitor,
            participant:1,
            reviewErea:'',
            textarea: '',
            pullTitle:'',
            zan_count:0,
            cha_count:0,
            watching_count: 9,
            star_count: 4,
            fork_count: 2,
            activeName: 'first',
            http_text:'',
            PRCreationTime:'2023-05-26 21:51',
            isPRAuditCompleted:false,
            isExaminationPassed:false,
            isTestPassed:false,
            isPRAccepted:false,
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
                label: 'li-xingyi28/gongxianghui-system'
            }],
            tableData: [{
                category: '审查',
                worker: '王小虎',
            }, {
                category: '测试',
                worker: '王小虎',
            }],
            selectedExaminer:'',
            selectedTester:'',
            selectedExaminers:[],
            selectedTesters:[],
            members:['admin','user','user1','user2','user3'],

            priorityOptions: [{
                value: '严重',
                label: '严重',
                icon:'el-icon-warning',
            }, {
                value: '主要',
                label: '主要',
                icon:'el-icon-warning',

            }, {
                value: '次要',
                label: '次要',
                icon:'el-icon-warning',
            }, {
                value: '不重要',
                label: '不重要',
                icon:'el-icon-warning',
            }, {
                value: '不指定',
                label: '不指定',
                icon:'el-icon-info',
            }],
            priority: '',
            inputLabel:'',

        }
    },
    computed: {
        ...mapState(['praisePR']),
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },
    methods: {
        ...mapActions(['PraisePRIncrement', 'PraisePRDecrement']),
        handleCopyClick() {
            // 复制文本到剪切板
            this.$refs.textInput.select();
            document.execCommand('copy');
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleMergeClick(tab, event) {
            console.log(tab, event);
        },
        handleClickReview() {
            alert('button click');
        },
        open() {
            this.$alert('审核完成，恭喜您获得 10 token 奖励', '奖励提醒', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$message({
                        type: 'info',
                        message: `action: ${ action }`
                    });
                }
            });
        },
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
            return '#0c' + str.slice(1, 2);
        },
        //选择审核人
        addSelectedExaminer() {
            if (this.selectedExaminer) {
                this.selectedExaminers.push(this.selectedExaminer);
                this.selectedExaminer = null; // 清空选择
            }

        },
        //选择测试人
        addSelectedTester(){
            if (this.selectedTester) {
                this.selectedTesters.push(this.selectedTester);
                this.selectedTester = null; // 清空选择
            }
        },
        PassExamination(){
            this.isExaminationPassed=!this.isExaminationPassed;
        },
        PassTest(){
            this.isTestPassed=!this.isTestPassed;
        },
        denyPR(){
            console.log("denyPR");
            this.isPRAccepted=false;
        },
        acceptPR(){
            console.log("acceptPR");
            this.isPRAccepted=true;
        },
        PRAuditComple(){
            return (this.isTestPassed === true) && (this.isExaminationPassed === true);
        }
    },
}
</script>


<style>
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}
.el-icon-arrow-down {
    font-size: 12px;
}
</style>