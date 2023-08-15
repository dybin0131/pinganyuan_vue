<template>
    <div class="login-wrap">
        <div class="ms-login">
            <img class="logLeft" src="../../../assets/img/logLeft.png" alt="">
            <div class="logRight">
                <div class="ms-title">注    册</div>
                <el-form  :model="form" :rules="rules" ref="register" label-width="0px" class="ms-content">
                    <el-form-item>
                        <el-input v-model="form.username" placeholder="用户名" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="form.phone" placeholder="手机号" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="form.email" placeholder="邮箱" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="form.password" placeholder="请输入密码" autocomplete="off" show-password ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="password2" placeholder="请再次输入密码" autocomplete="off" show-password ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="address" placeholder="请输入钱包地址（选填）" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-checkbox v-model="checked">我已阅读并同意使用条款</el-checkbox>
                    <el-form-item style="margin: 10px 0; text-align: right">
                        <div style='display: flex'>
                            <el-button type="text"  @click="toLogin">已有账号？点此登陆</el-button>
                        </div>
                        <div class="login-btn">
                            <el-button type="primary" @click="register()">立即注册</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { registers } from '@/api/index';
export default {
    name:"register",
    data: function() {
        return {
            form: {
                username: '',
                email: '',
                password: '',
                phone: '',
            },
            checked: false,
            address: '',
            password2: '',
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    mounted() {
    },
    methods: {
        register() {
            this.$refs.register.validate(valid => {
                if (valid) {
                    registers(this.form).then(res=>{
                        if (res==1) {
                            this.$message.success('注册成功');
                            localStorage.setItem('ms_username', this.form.username);
                            this.$router.push('/login');
                        }else{
                            this.$message.error('注册失败');
                        }
                    })
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
        width: 66%;
        border-radius: 10px;
        background: #fff;
        overflow: hidden;
        display: flex;
        align-items: center;
        padding: 20px;
        .logLeft{
            width: 58%;
            height: 100%;
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
// .login-wrap {
//     position: relative;
//     width: 100%;
//     height: 100%;
//     background-image: url(../../assets/img/login-bg.jpg);
//     background-size: 100%;
// }
// .ms-title {
//     width: 100%;
//     line-height: 50px;
//     text-align: center;
//     font-size: 20px;
//     color: #fff;
//     border-bottom: 1px solid #ddd;
// }
// .ms-login {
//     position: absolute;
//     left: 50%;
//     top: 50%;
//     width: 350px;
//     margin: -190px 0 0 -175px;
//     border-radius: 5px;
//     background: rgba(255, 255, 255, 0.3);
//     overflow: hidden;
// }
// .ms-content {
//     padding: 30px 30px;
// }
// .login-btn {
//     text-align: center;
// }
// .login-btn button {
//     width: 100%;
//     height: 36px;
//     margin-bottom: 10px;
// }
// .login-tips {
//     font-size: 12px;
//     line-height: 30px;
//     color: #fff;
// }
</style>