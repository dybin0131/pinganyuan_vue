<template>
    <div class="login-wrap">
        <div class="ms-login">
            <img class="logLeft" src="../../../assets/img/logLeft.png" alt="">
            <div class="logRight">
                <div class="ms-title">重置密码</div>
                <el-form :model="param" :rules="rules" ref="resetPsd" label-width="0px" class="ms-content">
                    <div class="formText">请通过输入共享惠用户名/绑定邮箱重置你的共享惠帐号密码</div>
                    <!--注册的时候绑定的邮箱-->
                    <el-form-item prop="email">
                        <el-input v-model="param.email" placeholder="email">
                            <el-button slot="prepend" icon="el-icon-message"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="param.password" placeholder="请输入密码" autocomplete="off" show-password >
                            <el-button slot="prepend" icon="el-icon-key"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="param.password2" placeholder="请再次输入密码" autocomplete="off" show-password >
                            <el-button slot="prepend" icon="el-icon-key"></el-button>
                        </el-input>
                    </el-form-item>
                    <!--按钮重置密码-->
                    <div class="login-btn">
                        <el-button type="primary" @click="verification()">重置密码</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"login",
    data: function() {
        return {
            param: {
                email: '',
                password: '',
                password2: '',
            },
            rules: {
                email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                password2: [{ required: true, message: '请再次输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        verification(){
            this.$refs.resetPsd.validate(valid => {
                if (valid) {
                    this.$message.success('密码重置成功');
                    localStorage.setItem('ms_password', this.param.password);
                    this.$router.push('/login');
                } else {
                    this.$message.error('请重新输入邮箱和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
};
</script>

<style lang="less" scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background: url('../../../assets/img/logImg.png') no-repeat;
    background-size: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .ms-login {
        width: 60%;
        border-radius: 10px;
        background: #fff;
        overflow: hidden;
        display: flex;
        padding: 20px;
        .logLeft{
            width: 60%;
        }
        .logRight{
            flex: 1;
            .ms-title {
                width: 100%;
                text-align: center;
                color: #353D61;
                font-weight: bold;
                font-size: 28px;
            }
            .formText{
                color: #ccc;
                font-size: 12px;
                margin-bottom: 10px;
            }
            .ms-content {
                padding: 30px 30px;
            }
            .login-btn button {
                width: 100%;
                height: 36px;
                margin-bottom: 10px;
            }
        }
    }
}
</style>