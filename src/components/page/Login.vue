<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">DecentHub</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <!--用户名-->
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <!--密码-->
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <!--按钮-->
                <div>
                    <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                    </div>
                    <div class="login-btn">
                        <el-button type="warning" @click="goToRegister()">注册</el-button>
                    </div>
                </div>
                <div style='display: flex'>
                    <p class="login-tips">还没有账号？注册一个吧</p>
                    <el-button type="text" @click="resetPsd" style='margin-left: 30px;color: darkcyan'>已有账号，忘记密码？</el-button>
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
                username: 'admin',
                password: '123123',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    this.$message.success('登录成功');
                    localStorage.setItem('ms_username', this.param.username);
                    this.$router.push('/');
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        goToRegister(){
            this.$router.push('/register');
        },
        resetPsd(){
            this.$router.push('/resetpsd');
        }
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