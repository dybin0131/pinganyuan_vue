<template>
    <div class="pullWarehouse">
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
        <div class="remindBox">
            <i class="el-icon-warning-outline"></i> 必须选择不同分支
        </div>
        <div class="contentBox">
            <div class="conTitle">创建pull Requests</div>
            <div class="conBox">
                <div class="conBoxTitle">
                    <div class="originalBox">
                        <div class="originalTitle">源分支</div>
                        <div class="originalContent">
                            <div class="OCtext">user_user1/pinganyuan-system-test</div>
                            <el-select v-model="data.member_name" placeholder="请选择">
                                <el-option
                                v-for="item in source"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="iconBox"><i class="el-icon-arrow-right"></i></div>
                    <div class="originalBox">
                        <div class="originalTitle">目标分支</div>
                        <div class="originalContent">
                            <el-select v-model="data.repo_name" placeholder="请选择">
                                <el-option
                                v-for="item in target1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <el-select v-model="data.notes" placeholder="请选择">
                                <el-option
                                v-for="item in target1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="textareaBox">
                    <el-input
                    type="textarea"
                    :rows="10"
                    placeholder="请输入内容"
                    v-model="data.apply_describe">
                    </el-input>
                </div>
                <div class="bottomBtn">
                    <el-button @click="repomemAddmem" type="primary">创建pull Requests</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { repomemAddmem } from '@/api/index';
export default {
    name: 'HomePage',
    data() {
        return {
            source: [{
                value: 'master',
                label: 'master'
            }, {
                value: 'masters',
                label: 'masters'
            }],
            target1: [{
                value: 'master',
                label: 'master'
            }, {
                value: 'masterd',
                label: 'masterd'
            }],
            target2: [{
                value: 'master',
                label: 'master'
            }],
            data: {
                member_name: '',
                repo_name: '',
                notes: '',
                apply_describe: '',
            },
            watching_count:this.$route.query.watchCount,
            star_count:this.$route.query.starCount,
            fork_count:this.$route.query.forkCount,
        };
    },
    mounted(){},
    methods: {
        repomemAddmem(){
            repomemAddmem(this.data).then(res=>{
                this.$message.success('创建pull Requests成功！')
            })
        },
    }
};
</script>

<style lang="less" scoped>
.pullWarehouse{
    .topBox{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .topBreadcrumb{
            margin-top: 10px;
        }
    }
    .remindBox{
        width: 100%;
        height: 59px;
        margin-top: 20px;
        box-sizing: border-box;
        border-radius: 10px;
        color: #DF4040;
        font-size: 14px;
        padding: 20px;
        background: #df40400b;
    }
    .contentBox{
        margin-top: 20px;
        .conTitle{
            font-size: 16px;
            font-weight: bold;
            color: #353D61;
        }
        .conBox{
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 20px;
            border-radius: 10px;
            background: #fff;
            margin-top: 20px;
            .conBoxTitle{
                display: flex;
                .originalBox{
                    .originalTitle{
                        font-weight: bold;
                        color: #353D61;
                        margin-bottom: 10px;
                    }
                    .originalContent{
                        display: flex;
                        align-items: center;
                        .OCtext{
                            padding: 10px;
                            font-size: 14px;
                            color: #999999;
                            border-radius: 6px;
                            margin-right: 10px;
                            background: rgba(232, 229, 229, 0.514);
                        }
                        :deep{
                            .el-input--small .el-input__inner{
                                width: 100px;
                                background: #4091ed2b;
                                margin-right: 10px;
                                border: 1px solid #4091ed2b;
                                color: #4092ED;
                            }
                            .el-select .el-input .el-select__caret{
                                color: #4092ED;
                            }
                            .el-input__inner::placeholder{
                                color: #4092ED;
                            }
                        }
                    }
                }
                .iconBox{
                    display: flex;
                    align-items: flex-end;
                    margin: 0px 40px;
                    i{
                        font-weight: bold;
                        font-size: 20px;
                        margin-bottom: 8px;
                    }
                }
            }
            .textareaBox{
                margin-top: 10px;
            }
            .bottomBtn{
                margin-top: 20px;
            }
        }
    }
}
</style>