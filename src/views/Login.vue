<template>
  <div class="loginWrapper" id="loginBackground">
    <div><div class="formWrapper">
      <h1 class="loginTitle"><strong>登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</strong></h1>
      <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          hide-required-asterisk
      >

        <el-form-item prop="telephone">
          <el-input
              prefix-icon="el-icon-mobile-phone"
              v-model="ruleForm.telephone"
              placeholder="请输入手机号"
          >
            <template slot="prepend">账&nbsp;&nbsp;号</template>
          </el-input>
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input
              prefix-icon="el-icon-lock"
              v-model="ruleForm.password"
              placeholder="请输入密码"
              show-password
          >
            <template slot="prepend">密&nbsp;&nbsp;码</template>
          </el-input>
        </el-form-item>
        
        <el-form-item class="loginButtonWrapper">
          <el-button
              round
              class="loginButton"
              type="primary"
              @click="submitForm('ruleForm')"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    </div>
    
  </div>
</template>

<script>
import { login } from '@/request/user.js'    //    引入登录接口
import Cookies from 'js-cookie'

export default {
  name: 'Login',
  data() {
    return {
      ruleForm: {
        telephone: '',
        password: ''
      },
      rules: {
        telephone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (this.$store.getters.isLogin) {
      // 用户若已登录，自动跳转到首页
      this.$notify({
        title: '成功',
        message: '您已登录！已跳转到首页',
        type: 'success'
      })
      this.$router.replace({ name: 'Home' })
    }
  },
  methods: {
    //  登录按钮-点击事件
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 各项校验通过-调用登录接口
          login(this.ruleForm, true).then((res) => {
            if (res.success) {
              Cookies.set('token', res.data.token) //    在cookies中添加token
              this.$message.success('登录成功！')
              this.$refs[formName].resetFields() //    清空表单项
              this.$router.replace({ name: 'Home' }) // 跳转到首页
            } else {
              this.$message.error('手机号或密码错误！')
            }
          })
        } else {
          this.$message.error('请完善信息！')
          return false
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

.loginWrapper {
  height: 749px !important;
  min-height: 749px !important;
  padding-top: 50px;
  background-image: url(../assets/bg.jpeg);
  line-height: 60px;
 

  .formWrapper {
    width: 375px;
    margin: 0 auto;
    text-align: center;
    position: absolute;
    top: 35%;
    left: 45%;
    transform: translate(-35%,-45%);
    


    .loginTitle {
      margin-bottom: 10px;
      font-weight: 300;
      font-size: 30px;
      color:  rgb(57, 110, 119);
      
      
    }

    .demo-ruleForm {
      width: 100%;
      margin-top: 20px;
      

      >>> .el-form-item__content {
        margin-left: 0 !important;
      }

      &>>> .el-input__inner {
        font-size: 16px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        border-radius: 2px;
      }

      .forgetPassword {
        text-align: right;
        margin: -22px 0 0 0;
      }

      .loginButtonWrapper {
        .loginButton {
          width: 100%;
        }

        &>>> .el-button {
          padding: 10px 90px;
          font-size: 16px;
          color:  rgb(74, 76, 77);
        }
      }
    }

    .tip {
      width: 70%;
      margin-left: 86px;
    }
  }
}
</style>