<template>
    <div style='margin-left: 20px;'>
        <!--顶部-->
        <div style='display: block'>
            <!--标题路径-->
            <div style='display: flex;position: relative'>
                <div style='display: flex;margin-top: 20px'>
                    <el-tag v-if="this.$route.query.isCredible>=60" type='success'
                            style='width: 55px;height: 24px;background: rgba(0,171,164,0.1);border: 1px solid #00ABA4;
                             border-radius: 4px;margin-top: 4px'>可信</el-tag>
                    <el-tag  v-else-if='this.$route.query.isCredible<60' type='danger'
                             style='width: 55px;height: 24px;background: rgba(237,64,64,0.1);border: 1px solid #ED4040;
                         border-radius: 4px;margin-top: 4px'>不可信</el-tag>
                    <el-breadcrumb separator="/" style='margin-top:5px;margin-left: 10px;font-size: 23px'>
                        <el-breadcrumb-item :to="{ path: '/' }">{{this.$route.query.username}}</el-breadcrumb-item>
                        <el-breadcrumb-item><a href="/">{{this.$route.query.warehouseName}}</a></el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <!--右侧辅助工具栏-->
                <div style='position: absolute;right: 0;display: flex;margin-top: 20px'>
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
    <el-tabs v-model="activeName"   style='margin-top: 10px;'>
        <!--Issue-->
        <el-tab-pane label="Issue" name="first" style='margin-top: 10px'>
            <el-container>
                <div style='width: 67%;background: rgba(255,255,255,0.6);border: 1px solid;border-image: linear-gradient(0deg, #FFFFFF, #FFFFFF) 1 1;
                    box-shadow: 0 5px 20px 0 rgba(183,183,195,0.07);border-radius: 10px;'>
                    <el-form ref="form" :model="form" style='margin-left: 15px;margin-right: 20px'>
                        <div style='margin-top: 18px;font-size: 17px;font-family: Source Han Sans CN;font-weight: bold;color: #353D61;'>
                            新建Issue</div>
                        <el-form-item   style='margin-top: 10px;width: 760px;'>
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <div style='width: 760px;background: #FFFFFF;border: 1px solid;border-image: linear-gradient(0deg, #FFFFFF, #FFFFFF) 1 1;
                    box-shadow: 0 5px 20px 0 rgba(183,183,195,0.07);border-radius: 10px;padding-right: 15px;padding-top: 10px'>
                            <el-form-item >
                                <div  style='grid-row: 1;font-size: 18px;background-color: #e9e9eb;border-radius: 8px;height: 30px;
                                        margin-left: 15px;margin-top: 5px'>
                                    <div style='display: flex;color: black;padding-top: 5px;padding-left: 5px'>
                                        <i class='el-icon-setting' style='margin-right: 13px'></i>
                                        <i class='el-icon-picture-outline-round' style='margin-right: 13px'></i>
                                        <img src='../../assets/img/help.png' style='margin-right: 13px;width: 18px;height: 18px'/>
                                        <img src='../../assets/img/share.png' style='margin-right: 13px;width: 18px;height: 18px'/>
                                        <i class='el-icon-view' style='margin-right: 13px'></i>
                                        <i class='el-icon-link' style='margin-right: 13px'></i>
                                        <i class='el-icon-user' style='margin-right: 13px'></i>
                                        <i class='el-icon-full-screen' style='margin-right: 13px'></i>
                                    </div>
                                </div>
                            </el-form-item >
                            <el-form-item style='padding-right: 15px'>
                                <el-input type="textarea" :rows='10' v-model="form.desc" style='margin-left: 15px;margin-top: 5px;margin-right: 5px'></el-input>
                            </el-form-item>
                        </div>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit" style='margin-left: 5px;margin-top: 10px;'>创建</el-button>
                            </el-form-item>

                    </el-form>
                    </div>

                    <el-aside width="31%" style='margin-left:10px;margin-right:10px;background: rgba(255,255,255,0.8);border: 1px solid;border-image: linear-gradient(0deg, #FFFFFF, #FFFFFF) 1 1;
                    box-shadow: 0 5px 20px 0 rgba(183,183,195,0.07);border-radius: 10px;'>
                        <el-form ref="form" :model="form"  style='margin-top: 20px;margin-left: 16px'>
                            <!--负责人-->
                            <el-form-item style='display: block;'>
                                <div style='display: flex;margin-top: 5px;position: relative;width: 100%'>
                                    <div style='font-size: 17px;font-family: Source Han Sans CN;font-weight: bold;color: #353D61;' >
                                        负责人</div>
                                    <el-button type='text' style='font-size: 14px;color: #4092ED;position: absolute;right:14px'
                                               @click='changeDisable1'>
                                        <i class='el-icon-edit-outline' ></i>编辑
                                    </el-button>
                                </div>
                                <div style='display: flex;margin-top: 10px'>
                                    <el-input placeholder="未设置" v-model="form.manager" :disabled="isDisabled1" style='width: 350px'>
                                    </el-input>
                                </div>
                            </el-form-item>

                            <!--标签-->
                            <el-form-item style='display: block;'>
                                <div style='display: flex;margin-top: 20px;position: relative;width: 100%'>
                                    <div style='font-size: 17px;font-family: Source Han Sans CN;font-weight: bold;color: #353D61;' >
                                        标签</div>
                                    <el-button type='text' style='font-size: 14px;color: #4092ED;position: absolute;right:14px'
                                               @click='changeDisable2'>
                                        <i class='el-icon-edit-outline' ></i>编辑
                                    </el-button>
                                </div>
                                <div style='display: flex;margin-top: 10px'>
                                    <el-input placeholder="未设置" v-model="form.label" :disabled="isDisabled2" style='width: 350px'>
                                    </el-input>
                                </div>
                            </el-form-item>

                            <!--开始日期-截止日期-->
                            <el-form-item style='display: block;'>
                                <div style='display: flex;margin-top: 20px;position: relative;width: 100%'>
                                    <div style='font-size: 17px;font-family: Source Han Sans CN;font-weight: bold;color: #353D61;' >
                                        开始日期-截止日期</div>
                                </div>
                                <div style='display: flex;margin-top: 10px'>
                                    <div class="block">
                                        <el-date-picker
                                            v-model="form.StartEndDate"
                                            type="daterange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                                        </el-date-picker>
                                    </div>
                                </div>
                            </el-form-item>
                        </el-form>
                    </el-aside>

<!--                        <el-form-item label="负责人">-->
<!--                            <el-select v-model="form.manager" placeholder="请选择活动区域">-->
<!--                                <el-option label="1" value="shanghai"></el-option>-->
<!--                                <el-option label="2" value="beijing"></el-option>-->
<!--                            </el-select>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="标签">-->
<!--                            <el-input v-model="form.label"></el-input>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="时间">-->
<!--                            <el-col :span="11">-->
<!--                                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>-->
<!--                            </el-col>-->
<!--                            <el-col class="line" :span="2">-</el-col>-->
<!--                            <el-col :span="11">-->
<!--                                <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>-->
<!--                            </el-col>-->
<!--                        </el-form-item>-->
<!--                        -->


            </el-container>
        </el-tab-pane>



        <!--详情-->
        <el-tab-pane label="详情" name="second">
            <el-container>
                <el-main>
                    <h2>测试1</h2>

                    <div style='display: flex'>
                        <div style='display: flex'>
                            <el-alert style='font-weight: bolder;font-size: 30px;margin-top: 30px;width:130px;height: 30px' type="success" >
                                <div style='display: flex'>
                                    <i class='el-icon-finished' style='height: 15px;width: 13px' ></i>
                                    <h5>已完成</h5>
                                </div>
                            </el-alert>
                            <el-alert style='font-weight: bolder;font-size: 30px;margin-top: 30px;width:100px;height: 30px' type="info" title='i789VY'>  </el-alert>
                        </div>
                        <div style='display: flex;margin-top: 40px'>
                            <i class='el-icon-user'></i>
                            <div style='font-size: 10px'>user1    创建于2023-05-25  14：40</div>
                        </div>
                        <div style='display: flex;position: absolute;right: 20px;margin-top: 30px'>
                            <el-button icon="el-icon-edit">编辑</el-button>
                            <el-button  icon="el-icon-d-arrow-left">回退</el-button>
                        </div>
                    </div>
                    <div style='font-size: 14px;margin-top: 30px'>  测试1  </div>
                    <div style='display: flex;margin-top: 20px'>
                        <div style='display: flex'>
                            <el-button round  icon="el-icon-success" style='background-color:transparent;font-size: 23px;color: darkseagreen'></el-button>
                            <div style='display: block;margin-top: 20px;margin-left: 10px;'>
                                <div style='font-size: 14px;text-align: center'>{{zan_count}}</div>
                            </div>
                        </div>
                        <div style='display: flex'>
                            <el-button round  icon="el-icon-error" style='background-color:transparent;font-size: 23px;color: #dd6161'></el-button>
                            <div style='display: block;margin-top: 20px;margin-left: 10px;'>
                                <div style='font-size: 14px;text-align: center'>{{cha_count}}</div>
                            </div>
                        </div>
                        <div style='position: absolute;right:20px'>
                            <el-button  icon="el-icon-plus">添加评论</el-button>
                        </div>
                    </div>
                    <!--评论  功能选择栏-->
                    <div style='display: flex;margin-top: 30px'>
                        <div >
                            <div class="block" style='margin-left: 20px'>
                                <el-timeline>
                                    <el-timeline-item
                                        v-for="(activity, index) in activities"
                                        :key="index"
                                        :icon="activity.icon"
                                        :type="activity.type"
                                        :color="activity.color"
                                        :size="activity.size"
                                        :timestamp="activity.timestamp">
                                        {{activity.content}}
                                    </el-timeline-item>
                                </el-timeline>
                            </div>
                        </div>
                        <div style='position: absolute;right: 20px'>
                            <el-dropdown>
                                <span class="el-dropdown-link">展开全部操作日志<i class="el-icon-arrow-down el-icon--right"></i></span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>1</el-dropdown-item>
                                    <el-dropdown-item>2</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>
                    <!--评论功能区域-->
                    <div style='display: flex;'>
                        <img src='../../assets/img/lxy.png' style='width: 35px;height:35px'>
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
                                <el-input readonly type="textarea" :rows="4" placeholder="当前仓库“已完成”“已拒绝”状态的Issue不允许评论" v-model="reviewErea"
                                          style='margin-top: 10px'>
                                </el-input>
                            </el-card>
                        </div>
                    </div>
                </el-main>
                <el-aside width="30%" style='position: relative;'>
                    <!--状态-->
                    <div style='display: block;'>
                        <div style='display: flex;margin-top: 10px;position: relative;width: 100%'>
                            <h4 >状态</h4>
                            <div style='margin-top: 5px;font-size: 15px;color: #72767b;position: absolute;right:10px' >
                                <i class='el-icon-edit-outline' ></i>
                            </div>
                        </div>
                        <div style='display: flex;margin-top: 10px'>
                            <i class='el-icon-check' style='color: #a4da89'></i>
                            <div style='font-size: 13px'> 已完成</div>
                        </div>
                    </div>

                    <!--负责人-->
                    <div style='display: block;'>
                        <div style='display: flex;margin-top: 20px;position: relative;width: 100%'>
                            <h4 >负责人</h4>
                            <div style='margin-top: 5px;font-size: 15px;color: #72767b;position: absolute;right:10px' >
                                <i class='el-icon-edit-outline' ></i>
                            </div>
                        </div>
                        <div style='display: flex;margin-top: 10px'>
                            <div style='font-size: 13px'> 未设置</div>
                        </div>
                    </div>

                    <!--标签-->
                    <div style='display: block;'>
                        <div style='display: flex;margin-top: 20px;position: relative;width: 100%'>
                            <h4 >标签</h4>
                            <div style='margin-top: 5px;font-size: 15px;color: #72767b;position: absolute;right:10px' >
                                <i class='el-icon-edit-outline' ></i>
                            </div>
                        </div>
                        <div style='display: flex;margin-top: 10px'>
                            <div style='font-size: 13px'> 未设置</div>
                        </div>
                    </div>

                    <!--里程碑-->
                    <div style='display: block;'>
                        <div style='display: flex;margin-top: 20px;position: relative;width: 100%'>
                            <h4 >里程碑</h4>
                            <div style='margin-top: 5px;font-size: 15px;color: #72767b;position: absolute;right:10px' >
                                <i class='el-icon-edit-outline' ></i>
                            </div>
                        </div>
                        <div style='display: flex;margin-top: 10px'>
                            <div style='font-size: 13px'> 未关联</div>
                        </div>
                    </div>

                    <!--Pull Requests-->
                    <div style='display: block;'>
                        <div style='display: flex;margin-top: 20px;position: relative;width: 100%'>
                            <h4 >Pull Requests</h4>
                            <div style='margin-top: 5px;font-size: 15px;color: #72767b;position: absolute;right:10px' >
                                <i class='el-icon-edit-outline' ></i>
                            </div>
                        </div>
                        <div style='display: flex;margin-top: 20px'>
                            <div style='font-size: 13px'> 关联的Pull Requests被合并后可能会关闭此issue</div>
                        </div>
                    </div>

                    <!--分支-->
                    <div style='display: block;'>
                        <div style='display: flex;margin-top: 20px;position: relative;width: 100%'>
                            <h4 >分支</h4>
                            <div style='margin-top: 5px;font-size: 15px;color: #72767b;position: absolute;right:10px' >
                                <i class='el-icon-edit-outline' ></i>
                            </div>
                        </div>
                        <div style='display: flex;margin-top: 10px'>
                            <div style='font-size: 13px'> 未关联</div>
                        </div>
                    </div>

                    <!--开始日期-截止日期-->
                    <div style='display: block;'>
                        <div style='display: flex;margin-top: 20px;position: relative;width: 100%'>
                            <h4 >开始日期-截止日期</h4>
                            <div style='margin-top: 5px;font-size: 15px;color: #72767b;position: absolute;right:10px' >
                                <i class='el-icon-edit-outline' ></i>
                            </div>
                        </div>
                        <div style='display: flex;margin-top: 10px'>
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
                    </div>
                    <!--优先级-->
                    <div style='display: block;'>
                        <div style='display: flex;margin-top: 20px;position: relative;width: 100%'>
                            <h4 >优先级</h4>
                            <div style='margin-top: 5px;font-size: 15px;color: #72767b;position: absolute;right:10px' >
                                <i class='el-icon-edit-outline' ></i>
                            </div>
                        </div>
                        <div style='display: flex;margin-top: 20px'>
                            <i class='el-icon-eleme' style='color: #777777;margin-top: 5px'></i>
                            <div style='font-size: 13px'> 不指定</div>
                        </div>
                    </div>

                    <!--置顶选项-->
                    <div style='display: block;'>
                        <div style='display: flex;margin-top: 20px;position: relative;width: 100%'>
                            <h4 >置顶选项</h4>
                            <div style='margin-top: 5px;font-size: 15px;color: #72767b;position: absolute;right:10px' >
                                <i class='el-icon-edit-outline' ></i>
                            </div>
                        </div>
                        <div style='display: flex;margin-top: 20px'>
                            <i class='el-icon-warning' style='color: #dd6161;margin-top: 5px'></i>
                            <div style='font-size: 13px'> 不置顶</div>
                        </div>
                    </div>
                </el-aside>
            </el-container>
        </el-tab-pane>

        <!--查看Issue列表-->
        <el-tab-pane label="查看Issue列表" name="third" >

            <div style='display: flex;width: 100%;position:relative;'>
                <!--搜索区域-->
                <div style="margin-top: 15px;">
                    <el-input placeholder="搜索Issue" v-model="search" class="input-with-select" style='width:600px'>
                        <el-select v-model="select" slot="prepend" placeholder="全部">
                            <el-option label="全部" value="1"></el-option>
                            <el-option label="与我相关" value="2"></el-option>
                            <el-option label="我负责的" value="3"></el-option>
                            <el-option label="我创建的" value="4"></el-option>
                            <el-option label="我创作的" value="5"></el-option>
                        </el-select>
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
                <!--右侧辅助功能-->
                <div style='position:absolute;right: 0'>
                    <el-button  style='height: 32px;margin-top: 15px'>  <i class='el-icon-s-marketing'></i> 看板</el-button>
                    <el-button  style='height: 32px;margin-top: 15px'>  <i class='el-icon-s-flag'></i> 里程碑</el-button>
                    <el-dropdown size="small" split-button type="warning" style='margin-left: 12px'>新建Issue
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>新建Issue</el-dropdown-item>
                            <el-dropdown-item>新建悬赏</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>

            <!--主要内容-->
            <el-tabs type="border-card"  style='margin-top: 20px'>
                <el-tab-pane label="全部" >
                    <div style='display: flex'>
                        <el-dropdown>
                            <span class="el-dropdown-link">创建者<i class="el-icon-arrow-down el-icon--right"></i></span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>lxy</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-dropdown style='margin-left: 15px'>
                            <span class="el-dropdown-link">负责人<i class="el-icon-arrow-down el-icon--right"></i></span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>lxy</el-dropdown-item>
                                <el-dropdown-item>dyb</el-dropdown-item>
                                <el-dropdown-item>wzy</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-dropdown style='margin-left: 15px'>
                            <span class="el-dropdown-link">标签<i class="el-icon-arrow-down el-icon--right"></i></span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>wontifix</el-dropdown-item>
                                <el-dropdown-item>question</el-dropdown-item>
                                <el-dropdown-item>invalid</el-dropdown-item>
                                <el-dropdown-item >duplicate</el-dropdown-item>
                                <el-dropdown-item >feature</el-dropdown-item>
                                <el-dropdown-item >enhancement</el-dropdown-item>
                                <el-dropdown-item >bug</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <!--列表-->
                    <div style='display: block;width: 100%;margin-top: 20px'>
                            <h3 style='margin-top: 40px'>测试1</h3>

                            <!--右侧辅助功能-->
                            <div style='display: flex;margin-right:50px;margin-top: 20px;margin-bottom: 200px'>
                                <i class='el-icon-circle-check' style='color: #00a854;margin-top: 10px'></i>
                                <el-alert style='font-weight: bolder;font-size: 30px;width:100px;height: 26px' type="info" title='i789VY'>  </el-alert>
                                <div style='display: flex;'>
                                    <i class='el-icon-user' style='margin-top: 10px'></i>
                                    <div style='font-size: 10px;margin-top: 10px'>user1</div>
                                </div>
                                <div style='font-size: 10px;position: absolute;right: 20px;margin-top: 10px'>三天前</div>
                            </div>
                        </div>
                </el-tab-pane>
                <el-tab-pane label="开启的">开启的</el-tab-pane>
                <el-tab-pane label="进行中">角色管理</el-tab-pane>
                <el-tab-pane label="已完成">定时任务补偿</el-tab-pane>
                <el-tab-pane label="已拒绝">定时任务补偿</el-tab-pane>
            </el-tabs>
        </el-tab-pane>


      </el-tabs>
    </div>
</template>


<script>
export default {
    data() {
        return {
            value1:'',
            isDisabled1:true,
            isDisabled2:true,
            activeName:'first',
            issueErea:'',
            inputTitle: '',
            startTime: '',
            endTime: '',
            zan_count:0,
            cha_count:0,
            watching_count:1,
            star_count:0,
            fork_count:0,
            activities: [{
                content: 'user1创建了任务',
                timestamp: '2小时前',
                size: 'large',
                type: 'warning',
                icon: 'el-icon-more'
            }],
            search: '',
            select: '全部',

            numberList: ["admin","user1","user2","user3"],
            form: {
                name: '',
                manager: '',
                date1: '',
                date2: '',
                desc: '',
                StartEndDate:'',
            }



        }
    },
    methods:{
        changeDisable1(){
            this.isDisabled1=!this.isDisabled1;
        },
        changeDisable2(){
            this.isDisabled2=!this.isDisabled2;
        },
        createIss() {
            this.$router.push({path: '/codedetails'});
            console.log('creat successfully!');
        },
        createAndGo(){
            console.log('creat successfully!');
        },
        onSubmit() {
            console.log('submit!');
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