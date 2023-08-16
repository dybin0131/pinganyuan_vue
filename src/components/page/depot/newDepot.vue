<template>
    <div style='height: auto;background: rgba(255,255,255,0.6);border: 1px solid;border-image: linear-gradient(0deg, #FFFFFF, #FFFFFF) 1 1;
box-shadow: 0 5px 20px 0 rgba(183,183,195,0.07);border-radius: 10px;margin-top: 20px'>
        <div style="display: flex;height: 100%">
            <div style=' font-size: 22px;font-family: Source Han Sans CN;font-weight: bold;color: #353D61;line-height: 40px;
        margin-left:30px;margin-top:30px;width: 60%'>新建仓库
        <el-form ref="form" :model="form" :rules='rules' label-width="80px" style='width: 60%;margin-top: 25px' label-position='top'>
            <el-form-item label="仓库名称" prop="rName"
            style='font-size: 18px;font-family: Source Han Sans CN;font-weight: bold;color: #353D61;'>
                <el-input v-model="form.rName" placeholder="请输入仓库名称"  style='width: 456px;height: 21px;'></el-input>
            </el-form-item>
            <el-form-item label="归属" prop="rUser" style='margin-top: 10px'>
                <el-input
                    placeholder="请输入内容"
                    v-model="form.rUser"
                    :disabled="true">
                </el-input>
            </el-form-item>
            <div style='display: flex'></div>
            <el-form-item label="开发语言" prop="repo_language" style='margin-top: 10px'>
                <el-input v-model="form.repo_language" placeholder="请输入开发语言"></el-input>
            </el-form-item>
            <el-form-item label="关键词" prop="repo_label" style='margin-top: 10px'>
                <el-input v-model="form.repo_label" placeholder="请输入仓库关键词"></el-input>
            </el-form-item>
            <el-form-item label="仓库介绍" prop="desc" style='margin-top: 10px'>
                <el-input
                    style='width: 1200px'
                    type="textarea"
                    :rows="2"
                    placeholder="用简短的语言来描述一下吧"
                    v-model="form.desc"
                >
                </el-input>
            </el-form-item>

                    <el-form-item label="特殊资源"  prop="source" >
                        <div style='display: flex;'>
                            <el-form-item>
                                <div >
                                    <el-tooltip class="item" effect="dark" content="默认创建私有仓库，可通过「邀请成员」添加仓库成员。如需创建公开仓库，请在创建仓库后通过「仓库设置」修改为公开" placement="top">
                                        <el-button style='background-color: transparent' type='text'>
                                            <img src='../../../assets/img/question-orange.png' style='width: 15px;height: 15px'/>
                                        </el-button>
                                    </el-tooltip>
                                </div>
                            </el-form-item>
                            <el-form-item>
                                <el-radio label="开源（所有人可见）" v-model='form.openSource' disabled style='margin-left: 20px'></el-radio>
                            </el-form-item>
                            <el-form-item>
                                <el-radio label="私有（仅仓库成员可见）" v-model='form.privateSourse'  style='margin-left: 20px'></el-radio>
                            </el-form-item>
                        </div>
                    </el-form-item>

                    <el-form-item>
                        <el-radio label="1" v-model='form.privateSourse' disabled  style='margin-left: 20px'>开源（所有人可见）</el-radio>
                    </el-form-item>
                    <el-form-item>
                        <el-radio label="2" v-model='form.privateSourse' style='margin-left: 20px'>私有（仅仓库成员可见）</el-radio>
                    </el-form-item>
                </div>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit()">
                    <div style='color: #f0f0f0'>立即创建</div>
                </el-button>
            </el-form-item>
        </el-form></div>
    </div>
    </div>
</template>

<script>
    import { addDepo } from '../../../api/depot';
    export default {
        data() {
            return {
                value:'',
                form: {
                    rName: '',
                    rUser: '',
                    repo_label: '',
                    repo_language:'',
                    desc:'',
                    privateSourse:'2'
                },
                rules: {
                    rName: [
                        { required: true, message:'请输入仓库名称'}
                    ],
                    rUser: [
                        { required: true, message:'请输入所属用户'}
                    ],
                    repo_label: [
                        { required: true,  message:'请输入关键词'}
                    ],
                    repo_language: [
                        { required: true,  message:'请输入开发语言'}
                    ],
                    desc: [
                        { required: true,  message:'请输入仓库介绍'}
                    ]
                }
            };
        },
        mounted(){
            this.getUsername();
        },
        methods: {
            onSubmit() {
                this.$refs['form'].validate((valid) => {
                if (valid) {
                    addDepo(this.form).then((res) => {
                        this.$message({ type: 'success', message: "创建成功！" })
                        this.$router.push({
                            path: "./codedetails",
                            query: { 
                                repoId: res.data,
                                activeName:'owner',
                                branchId:0,
                            },
                        });
                    });
                } else {
                    console.log('提交失败，未通过验证!!');
                    return false;
                }
                });
                
            },
            getUsername() {
                let username = localStorage.getItem('ms_username');
                this.form.rUser = username;
            }
        },
        chooseOwner(){
            console.log('choose owner');
            this.options.push({
                value: this.username,
                label: this.username,
            })
        }
    },
}
</script>
