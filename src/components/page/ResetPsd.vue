<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">重置密码</div>
            <el-form :model="param" :rules="rules" ref="resetPsd" label-width="0px" class="ms-content">
                <p style='color: #777777;font-size: small'>请通过输入共享惠用户名/绑定邮箱重置你的共享惠帐号密码</p>
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
                <div>
                    <el-button style='background-color: #dd6161;width: 290px;color: #f0f0f0' @click="verification()">重置密码</el-button>
                </div>
            </el-form>
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

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>