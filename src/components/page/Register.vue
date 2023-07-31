<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">注    册</div>
            <el-form  :model="form" :rules="rules" ref="register" label-width="0px" class="ms-content">
                <el-form-item>
                    <el-input v-model="form.username" placeholder="用户名" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.email" placeholder="邮箱" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.password" placeholder="请输入密码" autocomplete="off" show-password ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.password2" placeholder="请再次输入密码" autocomplete="off" show-password ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.address" placeholder="请输入钱包地址（选填）" autocomplete="off"></el-input>
                </el-form-item>
                <el-checkbox v-model="form.checked">我已阅读并同意使用条款</el-checkbox>
                <el-form-item style="margin: 10px 0; text-align: right">
                    <div style='display: flex'>
                        <el-button type="text"  @click="toLogin">已有账号？点此登陆</el-button>

                    </div>
                    <el-button type="warning" size="small"  autocomplete="off" @click="register()">立即注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name:"register",
    data: function() {
        return {
            form: {
                username: '',
                email: '',
                password: '',
                password2: '',
                address: '',
                form: ''
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        register() {
            this.$refs.register.validate(valid => {
                if (valid) {
                    this.$message.success('注册成功');
                    localStorage.setItem('ms_username', this.form.username);
                    this.$router.push('/login');
                } else {
                    this.$message.error('请重新输入用户名和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        toLogin(){
            this.$router.push('/login');
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