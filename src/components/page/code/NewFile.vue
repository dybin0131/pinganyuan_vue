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
<!--            <el-form-item label="您的私钥" prop="privateKey" style='margin-top: 10px'>-->
<!--                <el-input v-model="ruleForm.privateKey" placeholder="请输入您的私钥"></el-input>-->
<!--            </el-form-item>-->
            <el-form-item class="btnBox">
                <el-button type="primary" @click="submitForm('ruleForm')" style='color: #f0f0f0'>
                    提交
                </el-button>
            </el-form-item>
        </el-form>

        <!-- 第一次弹窗显示是否身份认证成功(合法用户) -->
        <el-dialog
            title="提示"
            :visible.sync="dialog1Visible"
            width="40%"
            center
        >
            <div class="textBtn" style='display: grid;' >
                <div style=''>身份认证成功，已提交</div>
            </div>
            <span slot="footer" class="dialog-footer" style='margin-top: 20px'>
                <el-button type="primary" @click="applicationYes" style='color: #f0f0f0'>确 定</el-button>
            </span>
        </el-dialog>
        <!-- 第一次弹窗显示是否身份认证成功（非法用户）-->
        <el-dialog
            title="提示"
            :visible.sync="dialog2Visible"
            width="40%"
            center
        >
            <div class="textBtn" style='display: grid;' >
                <div style=''>身份认证失败，请重新输入私钥</div>
            </div>
            <span slot="footer" class="dialog-footer" style='margin-top: 20px'>
                <el-button type="primary" @click="applicationYes2" style='color: #f0f0f0'>确 定</el-button>
            </span>
        </el-dialog>

        <!-- 第二次弹窗 输入私钥（非法用户）-->
        <el-dialog
            title="提示"
            :visible.sync="dialog3Visible"
            width="40%"
            center
        >
            <div class="textBtn" style='display: grid;' >
                <div style=''>身份认证失败，请重新输入证明您身份的私钥</div>
                <el-input v-model="this.PrivateKey" placeholder='请填写证明您身份的私钥'></el-input>
            </div>
            <span slot="footer" class="dialog-footer" style='margin-top: 20px'>
                <el-button type="primary" @click="applicationYes2" style='color: #f0f0f0'>确 定</el-button>
            </span>
        </el-dialog>

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
            dialog1Visible:false,
            dialog2Visible:false,
            dialog3Visible:false,
            PrivateKey:'',
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
                name:'',
                submitInfo: '',
                extendInfo:'',
                //privateKey:'',
                content:'',
                targetBrunch:'',
                // name: 'SM2.c',
                // submitInfo: 'test SM2.c',
                // extendInfo: 'test SM2.c',
                 privateKey:'v5IPPgM3ysOkrYQ5+rIFvVOvk6PVLeILnGnXtjw61',
                // content: '# 导入所需的库from cryptography.hazmat.primitives.asymmetric import ec\n' +
                //     'from cryptography.hazmat.primitives.asymmetric.utils import decode_dss_signature, encode_dss_signature\n' +
                //     'from cryptography.hazmat.primitives.hashes import Hash, SHA256\n' +
                //     ' \n' +
                //     '# 创建SM2曲线\n' +
                //     'curve = ec.SECP256R1()\n' +
                //     ' \n' +
                //     '# 生成公钥和私钥\n' +
                //     'private_key = ec.generate_private_key(curve, default_backend())\n' +
                //     'public_key = private_key.public_key()\n' +
                //     ' \n' +
                //     '# 加密数据\n' +
                //     'data = b"This is a message to be encrypted"\n' +
                //     'ciphertext = public_key.encrypt(\n' +
                //     '    data,\n' +
                //     '    ec.ECDH()\n' +
                //     ')\n' +
                //     ' \n' +
                //     '# 解密数据\n' +
                //     'plaintext = private_key.decrypt(\n' +
                //     '    ciphertext,\n' +
                //     '    ec.ECDH()\n' +
                //     ')\n' +
                //     ' \n' +
                //     '# 输出原始数据和解密后的数据\n' +
                //     'print(f"Original message: {data}")\n' +
                //     'print(f"Decrypted message: {plaintext}")',
                // targetBrunch: 'master',
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
        //合法用户（李华、韩梅梅）确认提交成功
        applicationYes(){
            this.dialog1Visible=false;
            this.$router.push({
                path: '/pullrequestsdetail',
                query: {
                    isCredible: this.isCredible, source: '', aim: '',
                    username: this.$route.query.username, warehouseName: this.$route.query.warehouseName,
                    title: this.ruleForm.name, describe: this.ruleForm.submitInfo,owner:this.owner,
                },
            });
        },
        //非法用户 确认提交失败
        applicationYes2(){
            this.dialog2Visible=false;
            this.dialog3Visible=true;
        },
        //合法用户
        submitForm(formName) {
            if (this.$route.query.username ==='韩梅梅') {
                this.dialog1Visible = true;
            }else{
                this.dialog2Visible = true;
            }
            // if (this.$route.query.username ==='李华') {
            //     this.$router.push({
            //         path: '/pullrequestsdetail',
            //         query: {
            //             isCredible: this.isCredible, source: '', aim: '',owner:this.owner,
            //             username: this.$route.query.username, warehouseName: this.$route.query.warehouseName,
            //             title: this.ruleForm.name, describe: this.ruleForm.submitInfo,isMember:true,isCheckPr:false
            //         },
            //     });
            //     this.$alert('身份认证成功，已提交', '提示', {
            //         confirmButtonText: '确定',
            //         callback: action => {
            //             this.$message({
            //                 type: 'info',
            //                 message: `action: ${action}`
            //             });
            //         }
            //     });
            // } else if (this.$route.query.username==='韩梅梅') {
            //     this.$router.push({
            //         path: '/pullrequestsdetail',
            //         query: {
            //             isCredible: this.isCredible, source: '', aim: '',
            //             username: this.$route.query.username, warehouseName: this.$route.query.warehouseName,
            //             title: this.ruleForm.name, describe: this.ruleForm.submitInfo,owner:'韩梅梅'
            //         },
            //     });
            //     this.$alert('身份认证成功，已提交', '提示', {
            //         confirmButtonText: '确定',
            //         callback: action => {
            //             this.$message({
            //                 type: 'info',
            //                 message: `action: ${action}`
            //             });
            //         }
            //     });
            // }
            // else {
            //     this.$alert('身份认证失败，无法提交', '提示', {
            //         confirmButtonText: '确定',
            //         callback: action => {
            //             this.$message({
            //                 type: 'info',
            //                 message: `action: ${action}`
            //             });
            //         }
            //     });
            // }
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