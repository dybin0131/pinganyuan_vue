<template>
    <div class="manageBox">
        <!--顶部-->
        <div class="topBox">
            <!--标题路径-->
            <div class="topLeft">
                <el-tag  v-if="isCredible>=60" type='success'
                         style='width: 55px;height: 24px;background: rgba(0,171,164,0.1);border: 1px solid #00ABA4;padding-left: 14px;
                             border-radius: 4px;'>可信</el-tag>
                <el-tag  v-else-if='isCredible<60' type='danger'
                         style='width: 55px;height: 24px;background: rgba(237,64,64,0.1);border: 1px solid #ED4040;border-radius: 4px;'
                >不可信</el-tag>
                <el-breadcrumb separator="/" style='margin-top:5px;margin-left: 10px;font-size: 23px'>
                    <el-breadcrumb-item :to="{ path: '/' }">{{ username }}</el-breadcrumb-item>
                    <el-breadcrumb-item><a href='/public'>{{this.$route.query.warehouseName}}</a></el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!--右侧辅助工具栏-->
            <div class="topRight">
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
        <div class="contentBox">
<!--            <div class="contentNav">-->
<!--                <div @click="contentNavBtn(index)" :class="index==indexs?'conNavColor':'conNavBox'" v-for="(item,index) in conList" :key="index">-->
<!--                    {{item}}-->
<!--                    <div class="contentXian"></div>-->
<!--                </div>-->
<!--            </div>-->
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="成员管理" name="first">

                    <div class="contentTable">
                        <div class="contentTile">
                            <div class="title">仓库管理成员</div>
                            <div class="btnBox">
                                <el-button type="primary" @click="()=>{$router.push('./addMember');}">
                                    <i class="el-icon-plus"></i> 添加成员
                                </el-button>
                                <el-button type="danger" plain><i class="el-icon-delete"></i> 移除成员</el-button>
                            </div>
                        </div>
                        <div class="tableContent">
                            <el-badge :value="2" class="item">
                                <div class="tableTitle">管理员</div>
                            </el-badge>
                            <div class="tableBox">
                                <div class="tableLeft">
                                    <div class="tImg">
                                        <img src='../../../assets/img/user-woman.png' alt="">
                                    </div>
                                    <div>
                                        <div class="tUser">
                                            <div class="nameBox"><i class="el-icon-user"></i> 韩梅梅</div>
                                            <div class="haveBox">仓库拥有者</div>
                                        </div>
                                        <!--                                <div class="tlBtm">user1（12060665+user1@user.com）</div>-->
                                    </div>
                                </div>
                                <div class="tableRight">
                                    <img src='../../../assets/img/cheng.png' alt="" srcset="">
                                    <div class="Rtext">创建者 <i class="el-icon-arrow-down"></i></div>
                                </div>
                            </div>

                            <div class="tableBox">
                                <div class="tableLeft">
                                    <div class="tImg">
                                        <img src='../../../assets/img/user-woman.png' alt="">
                                    </div>
                                    <div>
                                        <div class="tUser">
                                            <div class="nameBox"><i class="el-icon-user"></i> 李华</div>

                                        </div>
                                        <!--                                <div class="tlBtm">user1（12060665+user1@user.com）</div>-->
                                    </div>
                                </div>
                                <div class="tableRight">
                                    <img src='../../../assets/img/cheng.png' alt="" srcset="">
                                    <div class="Rtext">管理者 <i class="el-icon-arrow-down"></i></div>
                                </div>
                            </div>
                            <div class="page">
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page.sync="currentPage1"
                                    :page-size="100"
                                    layout="total, prev, pager, next"
                                    :total="1">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="删除仓库" name="second">
                    <div style='margin-left: 40px'>
                        <div class="contentTile" >
                             <div class="title" style='font-weight: bolder'>删除仓库</div>
                        </div>
                        <div style='display: grid'>
                        <el-tag   type='danger'
                                 style='width: 850px;height: 40px;background: rgba(237,64,64,0.1);border: 1px solid #ED4040;border-radius: 4px;font-weight: bolder;
                            font-size: 16px;padding-top: 8px;padding-left: 25px;margin-top: 30px'
                        >此操作无法恢复！请慎重操作！</el-tag>

                        <el-tag   type='danger'
                                  style='width: 850px;height: 40px;background: rgba(237,64,64,0.1);border: 1px solid #ED4040;border-radius: 4px;
                            font-size: 16px;padding-top: 8px;padding-left: 25px;margin-top: 30px'
                        >删除仓库将会连同其相关的所有数据(包括 ssues、Pull Reguests等在内)一起删除，同时取消仓库的协作者关联</el-tag>
                            <el-button type='danger' style='width: 100px;margin-top: 40px'  @click='deleteBtn'> 删除仓库 </el-button>
                        </div>
                    </div>


                    <!-- 第一次弹窗确认删除仓库 -->
                    <el-dialog
                        title="删除仓库"
                        :visible.sync="dialog1Visible"
                        width="50%"
                        center
                   >
                        <div class="textBtn" style='display: grid;' >
                            <el-tag type='danger' style='font-weight: bolder;font-size: 14px'>警告: 仓库删除无法撤消!请慎重操作!该操作将永久删除仓库的数据，同时取消仓库的协作者关联</el-tag>
                            <el-tag type='danger' style='margin-top: 10px;font-weight: bolder;font-size: 14px'> 为防止意外，确认继续操作请输入以下内容: </el-tag>
                            <el-tag  type='danger' style='margin-top: 10px;font-weight: bolder;font-size: 14px'>  小好/小好的测试仓库 </el-tag>

                            <el-input style='margin-top: 10px' v-model="deleteWarehouse" placeholder="请输入您的仓库名称"></el-input>
                        </div>
                        <span slot="footer" class="dialog-footer" style='margin-top: 20px'>
                            <el-button  @click="applicationNO">取 消</el-button>
                            <el-button type="primary" @click="applicationYes">确 定</el-button>
                        </span>
                    </el-dialog>

                    <!-- 第二次弹窗确认删除仓库 -->
                    <el-dialog
                        title="删除仓库"
                        :visible.sync="dialog2Visible"
                        width="50%"
                        center
                    >
                        <div class="textBtn" style='display: grid;' >
                            <div>你正在操作删除仓库 小好的测试仓库 (小好/小好的测试仓库)，该操作需要验证你的用户身份。</div>
                            <el-tag type='warning' style='margin-top: 20px;margin-bottom: 20px;font-weight: bolder;font-size: 14px'>
                                验证通过后，仓库 小好的测试仓库 (小好/小好的测试仓库) 的所有数据将被删除，此操作无法恢复!
                            </el-tag>
                            <div style='font-weight: bolder;margin-top: 5px;color: #e6a23c'>密码验证</div>
                            <el-input style='margin-top: 10px' v-model="deletePassword" placeholder="请输入您的密码"></el-input>
                        </div>
                        <span slot="footer" class="dialog-footer" style='margin-top: 50px'>
                            <el-button  @click="applicationNO2">取 消</el-button>
                            <el-button type="primary" @click="applicationYes2">确 定</el-button>
                        </span>
                    </el-dialog>
                </el-tab-pane>
            </el-tabs>

        </div>
        <!-- 分页 -->
        <!-- <el-tabs v-model="activeName" @tab-click="handleClick" > -->
        <!--详情-->
        <!-- <el-tab-pane label="仓库成员管理" name="second">
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
                        </div> -->

        <!----表格--->
        <!-- <template>
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

</el-tabs> -->
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
            conList: ['仓库成员管理','删除仓库'],
            deleteWarehouse:'',
            deletePassword:'',
            isCredible:60,
            dialog1Visible:false,
            dialog2Visible:false,
            identity:'开发者',
            identityOptions: [{
                value: '开发者',
                label: '开发者'
            }, {
                value: '管理员',
                label: '管理员'
            }],
            value1:'',
            activeName:'first',
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
                name: '韩梅梅',
                isManager: 1
            }, {
                isOwner: 0,
                name: '李华',
                isManager: 0
            }, {
                isOwner:0,
                name: '李雷',
                isManager: 0
            }, {
                isOwner: 0,
                name: '赵伟',
                isManager: 0
            }],
            indexs: 0
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
        },
        contentNavBtn(i){
            this.indexs = i
        },
        deleteBtn(){
            this.dialog1Visible=! this.dialog1Visible;

        },
        //输入仓库名确认
        applicationYes(){
            this.dialog1Visible=false;
           this.dialog2Visible=!this.dialog2Visible;
        },
        applicationNO(){
            this.dialog1Visible=false;
        },
        //输入密码确认
        applicationYes2(){
            this.dialog2Visible=false;
           this.$store.commit('updateSharedData', 1);
            this.$router.push({path: '/workbenchDep'});
            this.$message({
                type: 'info',
                iconClass:'../../assets/img/payAttention.png',
                message: '删除成功'
            });
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
    }
}
</script>

<style lang="less">
.manageBox{
    .topBox{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .topLeft{
            display: flex;
            align-items: center;
        }
        .topRight{
            display: flex;
            align-items: center;
        }
    }
    .contentBox{
        .contentNav{
            display: flex;
            align-items: center;
            margin-top: 20px;
            .conNavBox{
                height: 50px;
                margin-right: 20px;
                font-size: 14px;
                font-weight: bold;
                color: #353D61;
                cursor: pointer;
            }
            .conNavColor{
                height: 50px;
                margin-right: 20px;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
                color: #4092ED;
                .contentXian{
                    width: 20px;
                    margin: 6px auto;
                    border-radius: 2px;
                    border-bottom: 6px solid #4092ED;
                }
            }
        }
        .contentTable{
            .contentTile{
                display: flex;
                align-items: center;
                justify-content: space-between;
                .title{
                    font-weight: bold;
                    font-size: 16px;
                    color: #353D61;
                }
            }
            .tableContent{
                width: 100%;
                height: 100%;
                padding: 20px;
                margin-top: 20px;
                box-sizing: border-box;
                border-radius: 10px;
                background-color: #fff;
                .tableTitle{
                    font-size: 14px;
                    font-weight: bold;
                }
                .tableBox{
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid #ccc;
                    .tableLeft{
                        display: flex;
                        align-items: center;
                        .tImg img{
                            width: 48px;
                            height: 48px;
                            border-radius: 50%;
                        }
                        .tUser{
                            display: flex;
                            align-items: center;
                            .nameBox{
                                color: #4092ED;
                                font-weight: bold;
                                margin-right: 10px;
                                i {
                                    font-weight: bold;
                                    margin-left: 10px;
                                }
                            }
                            .haveBox{
                                padding: 2px 3px;
                                font-size: 12px;
                                border-radius: 4px;
                                border: 1px solid #F6833B;
                                color: #F6833B;
                                background: #f6833b3b;
                            }
                        }
                        .tlBtm{
                            font-size: 12px;
                            color: #999;
                            margin-left: 10px;
                        }
                    }
                    .tableRight{
                        display: flex;
                        align-items: center;
                        img{
                            margin-right: 10px;
                        }
                        .Rtext{
                            color: #666;
                            font-size: 14px;
                        }
                    }
                }
                .page{
                    text-align: center;
                    margin-top: 20px;
                }
            }
        }
    }
}
.el-select .el-input {
    width: 130px;
}
.input-with-select .el-input-group__prepend {
    background-color: #fff;
}
</style>