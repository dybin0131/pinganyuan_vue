<template>
    <div class="pullProcess">
        <div class="topBox">
            <el-breadcrumb class="topBreadcrumb" separator="/" >
                <el-breadcrumb-item :to="{ path: '/' }" style='font-size: 18px'>工作台</el-breadcrumb-item>
                <el-breadcrumb-item style='font-size: 15px;margin-top:1px'><a href="/">Pull Request</a></el-breadcrumb-item>
            </el-breadcrumb>
            <!--右侧辅助工具栏-->
            <div style='position: absolute;right: 0;display: flex;;margin-right: 30px'>
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
        <div class="topTitle">！ 312</div>
        <div class="ContentBox">
            <div class="conLeftBox">
                <div class="leftTopNav">
                    <div :class="index==indexs?'topNavBoxColor':'topNavBox'"
                    v-for="(item,index) in leftList" :key="index" @click="topNavBtn(index)">
                        {{item}}
                        <i class="el-icon-close"></i>
                    </div>
                </div>
                <div class="userBox">
                    <div class="userLeft">
                        <img src="../../../assets/img/img.jpg" alt="">
                        <div class="userContent">
                            <div class="conName">吕晓彤</div>
                            <div class="conItem">创建于 2023-05-26  21:56</div>
                        </div>
                    </div>
                    <div class="userRight">
                        <div class="rightColor1"><i class="el-icon-edit-outline"></i> 编辑</div>
                        <div class="rightColor2"><i class="el-icon-refresh-left"></i> 回退</div>
                        <div class="rightColor3">克隆/下载<i class="el-icon-arrow-down"></i></div>
                    </div>
                </div>
                <div class="personnelBox">
                    <div class="topBox">
                        <div class="topTitle">12（此内容用于测试）</div>
                        <div class="topText"><i class="el-icon-plus"></i>添加评论</div>
                    </div>
                    <div class="answerWrong">
                        <div class="answer"><i class="el-icon-check"></i> 10</div>
                        <div class="wrong"><i class="el-icon-close"></i> 10</div>
                    </div>
                    <el-table :data="tableData" style="width: 100%;margin-top:20px">
                        <el-table-column
                            prop="date"
                            label="类型"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="指派人员"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            align="center"
                            label="状态">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="personnelBox">
                    <div class="topBox">
                        <div class="topTitle">需要您进行当前的Pull Requests的一些审核工作</div>
                        <div class="iconBox">
                            <div class="topText">审查 <i class="el-icon-arrow-down"></i></div>
                            <div class="topText">测试 <i class="el-icon-arrow-down"></i></div>
                        </div>
                    </div>
                    <div class="personnelContent">
                        <div class="conTop">12 13</div>
                        <div class="conBtm">
                            <el-input
                            type="textarea"
                            :rows="6"
                            placeholder="请输入内容"
                            v-model="textarea">
                            </el-input>
                        </div>
                    </div>
                    <div class="btnBox">
                        <el-button type="primary" plain>取消</el-button>
                        <el-button type="primary">接收Pull Requests</el-button>
                    </div>
                </div>
                <!-- 第二种审核通过样式 -->
                <!-- <div class="personnelBox">
                    <div class="topBox">
                        <div class="topTitle">需要您进行当前的Pull Requests的一些审核工作</div>
                        <div class="iconBox">
                            <div class="topText"><i class="el-icon-circle-check"></i> 审查测试完成</div>
                            <el-button type="primary" plain>取消审查</el-button>
                            <el-button type="primary" plain>取消测试</el-button>
                        </div>
                    </div>
                    <div class="personnelGreen">
                        <div class="greenText">源分支与目标分支没有冲突  可自动合并</div>
                        <div class="greenIcon">合并分支 <i class="el-icon-arrow-down"></i></div>
                    </div>
                </div> -->
                <div class="personnelBox">
                    <div class="personnelNav">
                        <div @click="navPerdonnel(i)" 
                        :class="navindex==i?'navTextcolor':'navText'"
                        v-for="(val,i) in personnelNav" :key="i">{{val}}
                            <div class="navXian"></div>
                        </div>
                    </div>
                    <div class="topBox">
                        <div class="topTitle">王明 指派了审查人 李萌 <span class="text">5分钟前</span></div>
                        <div class="iconBox">
                            <div class="topText">展开全部操作日志 <i class="el-icon-arrow-down"></i></div>
                        </div>
                    </div>
                    <div class="personnelContent">
                        <div class="conTop">12 13</div>
                        <div class="conBtm">
                            <el-input
                            type="textarea"
                            :rows="6"
                            placeholder="请输入内容"
                            v-model="textarea">
                            </el-input>
                        </div>
                    </div>
                    <div class="btnBox">
                        <el-button type="primary" plain>评论 <i class="el-icon-arrow-down"></i></el-button>
                        <el-button type="primary">重新打开Pull Requests</el-button>
                    </div>
                </div>
            </div>
            <div class="conRightBox">
                <div class="rightTitle">审查</div>
                <div class="rightcContent">
                    <div class="RConTitle">审查人员</div>
                    <div class="RConBox">
                        <div class="RCOImg">
                            <img src="../../../assets/img/img.jpg" alt="">
                            <img src="../../../assets/img/img.jpg" alt="">
                            <img src="../../../assets/img/img.jpg" alt="">
                        </div>
                        <div class="RCOText">最少一人</div>
                    </div>
                </div>
                <div class="rightTitle">测试</div>
                <div class="rightcContent">
                    <div class="RConTitle">测试人员</div>
                    <div class="RConBox">
                        <div class="RCOImg">
                            <img src="../../../assets/img/img.jpg" alt="">
                            <img src="../../../assets/img/img.jpg" alt="">
                            <img src="../../../assets/img/img.jpg" alt="">
                        </div>
                        <div class="RCOText">最少一人</div>
                    </div>
                </div>
                <div class="rightTitles">
                    <div class="text">优先级</div>
                    <div class="icon">
                        <i class="el-icon-edit-outline"></i>编辑
                    </div>
                </div>
                <div class="rightcContent">
                    <div class="RConIcon"><i class="el-icon-warning-outline"></i> 严重</div>
                </div>
                <div class="rightTitles">
                    <div class="text">标签</div>
                    <div class="icon">
                        <i class="el-icon-edit-outline"></i>编辑
                    </div>
                </div>
                <div class="rightcContent">
                    <div class="RConTitle">未设置</div>
                </div>
                <div class="rightTitles">
                    <div class="text">关联lssue</div>
                    <div class="icon">
                        <i class="el-icon-edit-outline"></i>编辑
                    </div>
                </div>
                <div class="rightcContent">
                    <div class="RConTitle">未关联</div>
                </div>
                <div class="rightTitles">
                    <div class="text">里程碑</div>
                    <div class="icon">
                        <i class="el-icon-edit-outline"></i>编辑
                    </div>
                </div>
                <div class="rightcContent">
                    <div class="RConTitle">未关联</div>
                    <div class="RConIcon"><i class="el-icon-warning-outline"></i> Pull Request合并后将关闭上诉关联lssue</div>
                </div>
                <div class="rightTitles">
                    <el-badge :value="12" class="item">
                        <div class="text">参与者</div>
                    </el-badge>
                    <div class="icon">
                        <i class="el-icon-menu"></i>全部
                    </div>
                </div>
                <div class="rightcContent">
                    <div class="RConBox">
                        <div class="RCOImg">
                            <img src="../../../assets/img/img.jpg" alt="">
                            <img src="../../../assets/img/img.jpg" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    data() {
        return {
            personnelNav: ['评论','提交','文件'],
            leftList: ['开启的','user1 testpr','user1 testpr'],
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value: '',
            indexs: 0,
            navindex: 0,
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }]
        };
    },
    methods: {
        topNavBtn(index){
            this.indexs = index
        },
        navPerdonnel(i){
            this.navindex = i
        }
    }
};
</script>

<style lang="less" scoped>
.pullProcess{
    .topBox{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .topBreadcrumb{
            margin-top: 10px;
        }
    }
    .topTitle{
        font-size: 20px;
        font-weight: bold;
        margin-top: 20px;
        color: #353D61;
    }
    .ContentBox{
        display: flex;
        margin-top: 20px;
        justify-content: space-between;
        .conLeftBox{
            width: 62%;
            height: 100%;
            border-radius: 10px;
            padding: 20px;
            background: #fff;
            .leftTopNav{
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                .topNavBox{
                    height: 20px;
                    padding: 0px 6px;
                    line-height: 20px;
                    margin-right: 10px;
                    border-radius: 4px;
                    font-size: 12px;
                    color: #999;
                    width: fit-content;
                    background: rgba(204, 204, 204, 0.281);
                    border: 1px solid rgba(204, 204, 204, 0.281);
                    cursor: pointer;
                }
                .topNavBoxColor{
                    height: 20px;
                    padding: 0px 6px;
                    line-height: 20px;
                    margin-right: 10px;
                    border-radius: 4px;
                    font-size: 12px;
                    color: #00ABA4;
                    width: fit-content;
                    background: #00aba536;
                    border: 1px solid #00ABA4;
                    cursor: pointer;
                }
            }
            .userBox{
                display: flex;
                align-items: center;
                margin-top: 20px;
                justify-content: space-between;
                .userLeft{
                    display: flex;
                    align-items: center;
                    img{
                        width: 58px;
                        height: 58px;
                        border-radius: 50%;
                        margin-right: 18px;
                    }
                    .userContent{
                        .conName{
                            font-weight: bold;
                        }
                        .conItem{
                            font-size: 12px;
                            color: #999;
                            margin-top: 4px;
                        }
                    }
                }
                .userRight{
                    display: flex;
                    align-items: center;
                    font-size: 12px;
                    .rightColor1{
                        color: #4092ED;
                        margin-right: 10px;
                        cursor: pointer;
                    }
                    .rightColor2{
                        color: #00ABA4;
                        margin-right: 10px;
                        cursor: pointer;
                    }
                    .rightColor3{
                        color: #F6833B;
                        cursor: pointer;
                    }
                }
            }
            .personnelBox{
                .personnelNav{
                    display: flex;
                    align-items: center;
                    .navText{
                        height: 28px;
                        color: #353D61;
                        font-size: 14px;
                        margin-right: 20px;
                        font-weight: bold;
                    }
                    .navTextcolor{
                        height: 28px;
                        color: #4092ED;
                        font-size: 14px;
                        margin-right: 20px;
                        font-weight: bold;
                        border-radius: 4px;
                        .navXian{
                            width: 100%;
                            height: 6px;
                            border-radius: 2px;
                            background-color: #4092ED;
                        }
                    }
                }
                .topBox{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .topTitle{
                        color: #353D61;
                        font-weight: bold;
                        font-size: 14px;
                        .text{
                            font-size: 12px;
                            color: #999999;
                        }
                    }
                    .topText{
                        color: #4092ED;
                        font-size: 12px;
                        cursor: pointer;
                    }
                    .iconBox{
                        display: flex;
                        align-items: center;
                        .topText{
                            color: #4092ED;
                            font-size: 12px;
                            cursor: pointer;
                            margin-right: 16px;
                        }
                    }
                }
                .personnelGreen{
                    width: 96%;
                    padding: 20px;
                    display: flex;
                    margin: 20px 0;
                    align-items: center;
                    font-size: 12px;
                    justify-content: space-between;
                    border-radius: 10px;
                    background: #00aba536;
                    .greenText{
                        color: #666;
                    }
                    .greenIcon{
                        color: #00ABA4;
                    }
                }
                .personnelContent{
                    width: 100%;
                    height: 100%;
                    margin: auto;
                    border-radius: 4px;
                    background: #fff;
                    margin-top: 10px;
                    box-shadow: #ccc 0px 0px 4px;
                    .conTop{
                        padding: 10px;
                        color: #999;
                    }
                }
                .btnBox{
                    width: 100%;
                    text-align: right;
                    margin: 20px 0;
                }
                .answerWrong{
                    display: flex;
                    align-items: center;
                    margin-top: 10px;
                    .answer{
                        padding: 4px 8px;
                        color: #00ABA4;
                        border-radius: 6px;
                        font-weight: bold;
                        margin-right: 10px;
                        font-size: 14px;
                        background: #00aba543;
                    }
                    .wrong{
                        padding: 4px 8px;
                        color: #DF4040;
                        border-radius: 6px;
                        margin-right: 10px;
                        font-size: 14px;
                        font-weight: bold;
                        background: #df404069;
                    }
                }
            }
        }
        .conRightBox{
            width: 30%;
            height: 100%;
            padding: 20px;
            border-radius: 10px;
            background: #fff;
            .rightTitle{
                font-weight: bold;
                color: #353D61;
                margin-top: 20px;
            }
            .rightTitles{
                display: flex;
                align-items: center;
                margin-top: 20px;
                justify-content: space-between;
                .text{
                    font-weight: bold;
                    color: #353D61;
                }
                .icon{
                    color: #4092ED;
                    font-size: 12px;
                }
            }
            .RConIcon{
                color: #DF4040;
                font-size: 14px;
                margin-top: 10px;
            }
            .rightcContent{
                margin-top: 20px;
                .RConTitle{
                    font-size: 14px;
                    color: #999;
                }
                .RConBox{
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .RCOImg{
                        display: flex;
                        align-items: center;
                        img{
                            width: 38px;
                            height: 38px;
                            border-radius: 50%;
                            margin-right: 10px;
                        }
                    }
                    .RCOText{
                        font-size: 14px;
                        color: #999;
                    }
                }
            }
        }
    }
}
</style>