

<template>
  <div class="registerWrapper" id="registerBackground">
    <div class="formWrapper">
      <h1 class="registerTitle" ><strong>注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</strong></h1>
      <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          hide-required-asterisk
      >
        <el-form-item prop="username">
          <el-input
              prefix-icon="el-icon-user"
              v-model="ruleForm.username"
              placeholder="请输入昵称"
          >
            <template slot="prepend">用&nbsp;&nbsp;户&nbsp;&nbsp;名</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="telephone">
          <el-input
              prefix-icon="el-icon-mobile-phone"
              v-model="ruleForm.telephone"
              placeholder="请输入手机号"
          >
            <template slot="prepend">手&nbsp;&nbsp;机&nbsp;&nbsp;号</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              prefix-icon="el-icon-lock"
              v-model="ruleForm.password"
              placeholder="请输入密码"
              show-password
          >
            <template slot="prepend">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
              prefix-icon="el-icon-lock"
              v-model="ruleForm.repassword"
              placeholder="再次输入密码"
              show-password
          >
            <template slot="prepend">确认密码</template>
          </el-input>
        </el-form-item>
        <el-form-item class="registerButtonWrapper">
          <el-button
              round
              class="registerButton"
              type="primary"
              @click="submitForm('ruleForm')"
          >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { addUser } from '@/request/user.js'

export default {
  name: "Register",
  data() {
    return {
      ruleForm: {
        username: '',
        telephone: '',
        password: '',
        repassword:''
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "长度在 5 到 20 个字符",
            trigger: "blur",
          },
        ],
        repassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          {
            validator:(rule,value,callback)=>{
            if(value===''){
            callback(new Error('请再次输入密码'))
            }else if(value!==this.ruleForm.password){
            callback(new Error('两次输入密码不一致'))
            }else{
            callback( )}
            },
            trigger:'blur'
            }
        ],
        telephone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入11位手机号", trigger: "blur" },
        ],
      },
    };
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
    //  注册按钮-点击事件
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        //    校验表单
        if (valid) {
          //  各项校验通过-调用注册接口，传参用户名、手机号和密码
          addUser(this.ruleForm).then((res) => {
            if (res.success) {
              this.$notify({
                title: '成功',
                message: '注册成功！已跳转到登录页面',
                type: 'success'
              })
              this.$refs[formName].resetFields() // 注册成功之后清空表单
              this.$router.replace({path: '/login'}) // 注册成功之后跳转到登录页面
            } else {
              this.$message.error(res.message) //  显示接口返回的错误信息
            }
          })
        } else {
          // 表单校验没通过
          this.$message.error('请完善信息！')
          return false
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.registerWrapper {
  height: 749px !important;
  min-height: 749px !important;
  width: 100% !important;
  padding-top: 50px;
  background-image: url(../assets/bg.jpeg);

  .formWrapper {
    width: 375px;
    margin: 0 auto;
    text-align: center;
    position: absolute;
    top: 40%;
    left: 47%;
    transform: translate(-40%,-45%);

    .registerTitle {
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
        border-radius: 2px;
      }

      .registerButtonWrapper {
        .registerButton {
          width: 100%;
        }

        &>>> .el-button {
          padding: 10px 90px;
          font-size: 16px;
          color: rgb(57, 110, 119);
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