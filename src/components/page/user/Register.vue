<template>
  <div class="login-wrap">
    <div class="ms-login">
      <img class="logLeft" src="../../../assets/img/logLeft.png" alt="">
      <div class="logRight">
        <div class="ms-title">注 册</div>
        <el-form :model="form" :rules="rules" ref="register" label-width="0px" class="ms-content">
          <el-form-item prop="userName">
            <el-input v-model="form.userName" placeholder="用户名" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="userPassword">
            <el-input v-model="form.userPassword" placeholder="请输入密码" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item prop="checkPassword">
            <el-input v-model="form.checkPassword" placeholder="请再次输入密码" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item prop="userPhone">
            <el-input v-model="form.userPhone" placeholder="手机号（选填）" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="userEmail">
            <el-input v-model="form.userEmail" placeholder="邮箱（选填）" autocomplete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item>
            <el-input v-model="address" placeholder="请输入钱包地址（选填）" autocomplete="off"></el-input>
          </el-form-item> -->
          <!-- <el-checkbox v-model="checked">我已阅读并同意使用条款</el-checkbox> -->
          <el-form-item style="margin: 10px 0; text-align: right">
            <div style='display: flex'>
              <el-button type="text" @click="toLogin">已有账号？点此登陆</el-button>
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
  name: "register",
  data() {
    var validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.userPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      form: {
        userName: '',
        userEmail: '',
        userPassword: '',
        userPhone: '',
        checkPassword: ''
      },
      checked: false,
      address: '',
      rules: {
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        userPassword: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        checkPassword: [{ validator: validateCheckPass, trigger: 'blur' }],
      },
    };
  },
  mounted() {
  },
  methods: {
    register() {
      this.$refs.register.validate(valid => {
        if (valid) {
          registers(this.form).then(res => {
            if (res.code == 0) {
              var priKey = res.data;
              this.$copyText(priKey).then(() => {
                this.$prompt("已将区块链私钥复制到粘贴板，私钥代表您的区块链身份，本平台不负责保存，请您妥善保管！", "注册成功", {
                    inputValue: priKey,
                    confirmButtonText: "确定",
                    showCancelButton:false,
                    closeOnClickModal: false,
                    closeOnPressEscape: false,
                    closeOnHashChange: false,
                    inputType:"textarea"
                }).then(({ value }) => {
                    this.toLogin();
                }).catch(() => { });
              });
            } else {
              this.$message.error(res.msg);
            }
          })
        }
      });
    },
    toLogin() {
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
        .logLeft {
            width: 58%;
            height: 100%;
        }
        .logRight {
            flex: 1;
            .ms-title {
                width: 100%;
                text-align: center;
                color: #353d61;
                font-weight: bold;
                font-size: 28px;
            }
            .formText {
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