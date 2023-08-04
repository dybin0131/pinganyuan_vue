<template>
    <div class="container">
        <!--表单-->
        <el-form :label-position='labelPosition' :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="" prop="name">
                <div style='display: flex'>
                    <el-input v-model="ruleForm.name" placeholder='填写文件名称/路径' >
                        <template slot="prepend">
                            <div class="httpBox">
                                <el-button type="text" style='font-size: 14px;margin-left: 10px;margin-right: 10px'> {{this.$route.query.owner}} /
                                    {{ this.$route.query.warehouseName }}</el-button>

                            </div>
                        </template>
                        <el-button slot="append" icon="el-icon-document-add"></el-button>
                    </el-input>
                </div>
            </el-form-item>
            <el-form-item label="" prop="content">
                <el-input type='textarea' :rows='12' v-model="ruleForm.content" placeholder="请输入文件内容">
                </el-input>
            </el-form-item>
            <el-form-item label="提交信息" prop="submitInfo">
                <el-input  v-model="ruleForm.submitInfo" placeholder="描述主要类型和修改内容">
                </el-input>
            </el-form-item>
            <el-form-item label="扩展信息" prop="extendInfo">
                <el-input type='textarea' :rows="5" v-model="ruleForm.extendInfo" placeholder="此处可填写为什么修改，做了什么修改，以及开发的思路等更加详细的提交信息，（相当于Git Commit message的body）">
                </el-input>
            </el-form-item>
            <el-form-item label="目标分支" prop="targetBrunch">
                <el-input v-model="ruleForm.targetBrunch" placeholder='填写目标分支'></el-input>
            </el-form-item>
            <el-form-item class="btnBox">
                <el-button type="primary" @click="submitForm('ruleForm')" style='color: #f0f0f0'>
                    提交
                </el-button>

            </el-form-item>
        </el-form>

        <!---
        <div style='display: flex'>
                <i class="el-icon-document-add" style='margin-top: 10px'></i>
                <el-button type="text" style='font-size: 14px;margin-left: 10px'> {{this.$route.query.username}} /
                    {{ this.$route.query.warehouseName }}</el-button>
                <div style='margin-top: 10px;margin-left: 5px'> / </div>
                <el-input v-model="input"  value='true' placeholder="文件名称或文件路径" style='margin-left: 10px '></el-input>
        </div>
        <el-input
            type="textarea"
            :rows="16"
            style='min-height: 120px;margin-top: 10px'
            placeholder="请输入文件内容"
            v-model="ExtendInfo1"
            >
        </el-input>
        <div style='font-size: 22px;font-family: "KaiTi";font-weight: bold;margin-top: 10px'>提交信息</div>
        <el-input v-model="input"  value='true' placeholder="描述主要类型和修改内容"></el-input>
        <div style='font-size: 22px;font-family: "KaiTi";font-weight: bold;margin-top: 10px'>扩展信息</div>
        <el-input
            type="textarea"
            :rows="4"
            style='min-height: 120px'
            placeholder="此处可填写为什么修改，做了什么修改，以及开发的思路等更加详细的提交信息，（相当于Git Commit message的body）"
            v-model="ExtendInfo">
        </el-input>
        <div style='font-size: 22px;font-family: "KaiTi";font-weight: bold;margin-top: 10px'>目标分支</div>
        <el-input v-model="input"  placeholder="请输入目标分支"></el-input>
        <div style='display: flex;margin-top: 20px'>
            <el-button type="warning" >提交</el-button>
            <el-button type="text">取消</el-button>
        </div>
--->


    </div>
</template>

<script>
export default {
    name: 'NewFile',
    data: function() {
        return {
            owner:this.$route.query.owner,
            isCredible: this.$route.query.isCredible,
            name: localStorage.getItem('ms_username'),
            fileList: [],
            input: '',
            imgSrc: '',
            cropImg: '',
            dialogVisible: false,
            ExtendInfo: '',
            isSign: true,
            ExtendInfo1: '',

            labelPosition: 'top',
            ruleForm: {
                name: '',
                content: '',
                submitInfo: '',
                extendInfo: '',
                targetBrunch: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入文件名称', trigger: 'blur' },
                ],
                content: [
                    { required: true, message: '请输入文件内容', trigger: 'blur' },
                ],
                submitInfo: [
                    { required: true, message: '请输入提交信息', trigger: 'blur' }
                ],
                extendInfo: [
                    { required: true, message: '请输入扩展信息', trigger: 'blur' }
                ],
                targetBrunch: [
                    { required: true, message: '请输入目标分支', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            if (this.$route.query.username ==='小好') {
                this.$router.push({
                    path: '/pullrequestsdetail',
                    query: {
                        isCredible: this.isCredible, source: '', aim: '',owner:this.owner,
                        username: this.$route.query.username, warehouseName: this.$route.query.warehouseName,
                        title: this.ruleForm.name, describe: this.ruleForm.submitInfo,isMember:true,isCheckPr:false
                    },
                });
                this.$alert('身份认证成功，提交', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: `action: ${action}`
                        });
                    }
                });
            } else if (this.$route.query.username==='admin') {
                this.$router.push({
                    path: '/pullrequestsdetail',
                    query: {
                        isCredible: this.isCredible, source: '', aim: '',
                        username: this.$route.query.username, warehouseName: this.$route.query.warehouseName,
                        title: this.ruleForm.name, describe: this.ruleForm.submitInfo
                    },
                });
                this.$alert('身份认证成功，提交', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: `action: ${action}`
                        });
                    }
                });
            }
            else {
                this.$alert('身份认证失败，无法提交', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: `action: ${action}`
                        });
                    }
                });
            }
        }
    }
}
</script>

<style lang="less" scoped>
.container{
    background: rgba(255, 255, 255, 0.342);
    .demo-ruleForm{
        font-size: 22px;
        font-weight: bold;
        margin-top: 10px;
        .httpBox{
            display: flex;
        }
    }
    ::v-deep{
        .el-input-group__append, .el-input-group__prepend{
            background: #fff;
        }
        .el-button--small{
            color: #4092ED;
            font-size: 18px;
        }
        .btnBox .el-button{
            width: 100px;
        }
        .el-button--primary a{
            color: #fff;
            font-size: 14px;
        }
        .is-plain span{
            color: #4092ED;
            font-size: 14px;
        }
    }
}
</style>