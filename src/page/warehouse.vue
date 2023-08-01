<template>
    <div style='width: 84%;margin-left: 8%;'>
        <!--顶部-->
        <div style='display: block'>
            <!--标题路径-->
            <div style='display: flex;position: relative'>
                <div style='display: flex;margin-top: 60px'>
                    <i class='el-icon-c-scale-to-original' style='font-size: 35px'></i>
                    <el-breadcrumb separator="/" style='margin-top:5px;margin-left: 10px;font-size: 23px'>
                        <el-breadcrumb-item :to="{ path: '/' }">李星仪</el-breadcrumb-item>
                        <el-breadcrumb-item><a href="/">共享惠开源代码托管平台</a></el-breadcrumb-item>
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
                    <el-button type="plain" icon="el-icon-share">Star  {{fork_count}}</el-button>
                </div>
            </div>
        </div>
        <el-container>
            <el-main  style='position: relative'>
                <!--分页-->
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <!--Issue-->
                    <el-tab-pane label="Issue" name="first">
                        <h3 style='margin-top: 10px'>新建Issue</h3>
                        <el-input v-model="inputTitle" placeholder="标题" style='margin-top: 10px'></el-input>
                        <!--输入内容部分-->
                        <div style='margin-top: 20px'>
                            <div style='display: block;width: 100%'>
                                <el-card class="box-card" >
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
                                    <el-input type="textarea" :rows="10" placeholder=" " v-model="issueErea"
                                              style='margin-top: 10px'>
                                    </el-input>
                                </el-card>
                                <div style='display: flex;margin-top: 20px;'>
                                    <el-button type="warning" style='margin-left: 10px'>创建</el-button>
                                    <el-button type="info" style='margin-left: 10px'>创建并继续</el-button>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <!--详情 页面-->
                    <el-tab-pane label="详情" name="second">
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
                                <div style='font-size: 10px'>李星仪    创建于2023-05-25  14：40</div>
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
                    </el-tab-pane>
                </el-tabs>
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
    </div>
</template>


<script>
export default {
    data() {
        return {
            value1:'',
            activeName:'first',
            issueErea:'',
            inputTitle: '',
            startTime: '',
            endTime: '',
            zan_count:0,
            cha_count:0,
            activities: [{
                content: '李星仪创建了任务',
                timestamp: '2小时前',
                size: 'large',
                type: 'warning',
                icon: 'el-icon-more'
            }]

        }
    }
}
</script>


<style>

</style>