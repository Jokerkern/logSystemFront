<template>
  <el-menu
      class="header-menu"
      :default-active="activeIndex"
      :router="true"
      mode="horizontal"
  >
    <el-menu-item index="Home" :route="{ name: 'Home' }">首页</el-menu-item>
    <el-menu-item
        class="login"
        index="Login"
        :route="{ name: 'Login' }"
        v-show="!isLogin"
    >登录</el-menu-item
    >
    <el-menu-item
        class="register"
        index="Register"
        :route="{ name: 'Register' }"
        v-show="!isLogin"
    >注册</el-menu-item
    >
    <!-- 为了和其他菜单样式保持一致，请一定要添加类名 el-menu-item -->
    <div class="el-menu-item exit" @click="exitButton()" v-show="isLogin">
      退出
    </div>
    <!-- 为了和其他菜单样式保持一致，请一定要添加类名 el-menu-item -->
    <div class="el-menu-item username" v-show="isLogin">
      <!-- 图标来自于Element UI官方图标库 -->
      <i class="el-icon-user-solid"></i>{{ username }}
    </div>
  </el-menu>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  name: 'Header',
  data() {
    return {}
  },
  computed: {
    // 当前激活菜单的 index
    activeIndex() {
      return this.$route.name //  获取当前路由名称
    },
    // 登录状态
    isLogin() {
      return this.$store.getters.isLogin
    },
    // 用户名
    username() {
      return this.$store.getters.username
    }
  },
  methods: {
    // 退出登录
    exitButton() {
      Cookies.set('token', '')
      this.$router.push({ path: '/login' }) //  退出登录后跳转到登录页面
      this.$message.success('退出登录成功！')
    }
  }
}
</script>

<style lang="stylus" scoped>
.header-menu {
  padding: 0 24px;

  .login, .register, .username, .exit {
    float: right;
  }
}
</style>