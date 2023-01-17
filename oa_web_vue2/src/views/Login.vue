<template>
  <div class="login">
    <div class="left"></div>
    <div class="right">
      <div class="login_from">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
          <h4>MD-OA</h4>
          <mod-tabs v-model="activeName" @tabClick="tabClick" width="240px">
            <mod-tab-pane label="账号密码登录" name="accountLogin">
              <el-form-item label="" prop="account">
                <el-input v-model="ruleForm.account" autocomplete="off" placeholder="请输入账号">
                  <i slot="prefix" class="el-input__icon el-icon-user"></i>
                </el-input>
              </el-form-item>
              <el-form-item label="" prop="pwd">
                <el-input type="password" v-model="ruleForm.pwd" autocomplete="off" placeholder="请输入密码">
                  <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                </el-input>
              </el-form-item>
            </mod-tab-pane>
            <mod-tab-pane label="手机号登录" name="mobileLogin">
              <el-form-item label="" prop="mobile">
                <el-input v-model="ruleForm.mobile" placeholder="请输入手机号">
                  <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
                </el-input>
              </el-form-item>
              <el-form-item label="" prop="verificationCode">
                <el-input v-model.number="ruleForm.verificationCode" placeholder="请输入验证码" style="width: 65%;">
                  <i slot="prefix" class="el-input__icon el-icon-message"></i>
                </el-input>
                <el-button>发送验证码</el-button>
              </el-form-item>
            </mod-tab-pane>
          </mod-tabs>
          <el-form-item>
            <div class="auto">
              <el-checkbox v-model="autoCheck">自动登录</el-checkbox>
              <span class="forget">忘记密码</span>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" style="width: 100%;">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import ModTabPane from '../components/modComponents/loginTabs/ModTabPane.vue';
import ModTabs from '../components/modComponents/loginTabs/ModTabs.vue';

import { mobileReg, verificationCodeReg } from '@/common/Regular.js'
export default {
  components: { ModTabs, ModTabPane },
  name: 'Login',
  data() {
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入账号'));
      }
    };
    var checkPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }
    };
    var checkMobile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else {
        if (!mobileReg(value)) {
          callback(new Error('请输入正确的手机号'));
        }
      }
    };
    var checkVerificationCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      }
    };
    return {
      activeName: 'accountLogin',
      autoCheck: true,
      ruleForm: {
        account: '',
        pwd: '',
        mobile: '',
        verificationCode: null,
      },
      rules: {
        pass: [
          { validator: checkPwd, trigger: 'blur' }
        ],
        account: [
          { validator: checkAccount, trigger: 'blur' }
        ],
        mobile: [
          { validator: checkMobile, trigger: 'blur' }
        ],
        verificationCode: [
          { validator: checkVerificationCode, trigger: 'blur' }
        ]
      },
    };
  },
  methods: {
    tabClick() { },
    submitForm(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}

</script>

<style lang='less' scoped>
.login {
  display: flex;
  width: 100%;
  height: 100%;

  .left {
    width: 68%;
    background: url('@/assets/img/login.png') no-repeat 50%;
    background-size: cover;
  }

  .right {
    width: 32%;
    background-color: #fff;

    .login_from {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-top: 150px;

      h4 {
        padding: 20px;
        font-size: 24px;
        font-weight: 400;
        text-align: center;
      }

      .el-form {
        width: 100%;
        padding: 0 80px;

        .el-form-item__content {
          position: relative;

          .el-button--default {
            position: absolute;
            right: 0;
          }
        }

        .auto {
          display: flex;
          justify-content: space-between;

          .forget {
            color: var(--theme-color);
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
