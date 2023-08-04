<template>
    <div class="login-wrap">
        <div class="ms-login">
            <img class="logLeft" src="../../assets/img/logLeft.png" alt="">
            <div class="logRight">
                <div class="ms-title">账号登陆</div>
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
                    <div class="btnBox">
                        <el-button type="text" @click="resetPsd">忘记密码 ?</el-button>
                    </div>
                    <!--按钮-->
                    <div class="login-btn">
                        <el-button type="primary" @click="submitForm()">登录</el-button>
                    </div>
                    <div class="registerBtn">
                        没有账号？<span @click="goToRegister()">去注册！</span>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { login } from '@/api/index';
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
                    login(this.param).then(res=>{
                        if (res==1) {
                            this.$message.success('登录成功');
                            localStorage.setItem('ms_username', this.param.username);
                            this.$router.push('/');
                            console.log(123);
                        }else{
                            this.$message.error('登录失败');
                        }
                    })
                    
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

<style lang="less" scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background: url('../../assets/img/logImg.png') no-repeat;
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
                line-height: 50px;
                text-align: center;
                color: #353D61;
                font-weight: bold;
                font-size: 28px;
            }
            .ms-content {
                padding: 30px 30px;
            }
            .btnBox{
                text-align: right;
            }
            .login-btn {
                text-align: center;
                button {
                    width: 100%;
                    height: 40px;
                    margin: 6px 0;
                    font-size: 16px;
                }
            }
            .registerBtn{
                text-align: center;
                font-size: 14px;
                margin-top: 10px;
                span{
                    color: #4092ED;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>