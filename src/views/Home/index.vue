<template>
  <div class="home">
    <!-- 3. 使用组件 -->
    <SideMenu></SideMenu>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu.vue' //  1.引入左侧菜单组件

export default {
  name: 'Home',
  components: {
    SideMenu //  2. 注册组件
  },
  data() {
    return {}
  },
  methods: {}
}
</script>