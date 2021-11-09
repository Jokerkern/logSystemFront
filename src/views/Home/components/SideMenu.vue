<template>
  <el-menu
      class="side-menu"
      :default-active="activeIndex"
      :router="true"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
  >
    <div class="fold-wrapper">
      <!-- click事件 当点击时切换菜单的收缩状态 -->
      <i
          class="el-icon-s-unfold"
          v-if="isCollapse"
          title="展开"
          @click="isCollapse = false"
      ></i>
      <i
          class="el-icon-s-fold"
          v-else
          title="收缩"
          @click="isCollapse = true"
      ></i>
    </div>
    <el-menu-item index="0" :route="{ name: 'Home', query: { fileType: 0 } }">
      <i class="el-icon-menu"></i>
      <span slot="title">ALL</span>
    </el-menu-item>
    <el-menu-item index="1" :route="{ name: 'Home', query: { fileType: 1 } }">
      <i class="el-icon-remove"></i>
      <span slot="title">DEBUG</span>
    </el-menu-item>
    <el-menu-item index="2" :route="{ name: 'Home', query: { fileType: 2 } }">
      <i class="el-icon-success"></i>
      <span slot="title">INFO</span>
    </el-menu-item>
    <el-menu-item index="3" :route="{ name: 'Home', query: { fileType: 3 } }">
      <i class="el-icon-warning"></i>
      <span slot="title">WARNING</span>
    </el-menu-item>
    <el-menu-item index="4" :route="{ name: 'Home', query: { fileType: 4 } }">
      <i class="el-icon-error"></i>
      <span slot="title">ERROR</span>
    </el-menu-item>
    <el-menu-item index="5" :route="{ name: 'Home', query: { fileType: 5 } }">
      <i class="el-icon-question"></i>
      <span slot="title">CRITICAL</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'SideMenu',
  data() {
    return {
      isCollapse: false //  控制菜单收缩展开
    }
  },
  computed: {
    // 当前激活菜单的 index
    activeIndex() {
      return String(this.$route.query.fileType) //  获取当前路由参数中包含的文件类型
    }
  },
  watch: {
    // 监听收缩状态变化，存储在sessionStorage中，保证页面刷新时仍然保存设置的状态
    isCollapse(newValue) {
      sessionStorage.setItem('isCollapse', newValue)
    }
  },
  created() {
    this.isCollapse = sessionStorage.getItem('isCollapse') === 'true' //  读取保存的状态
    if (!this.$route.query.fileType) {
      this.$router.replace({ query: { fileType: 0 } })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/style/mixins.styl';

.side-menu {
  // 高度设置为屏幕高度减去顶部导航栏的高度
  height: calc(100vh - 61px);
  overflow: auto;
  // 调整滚动条样式
  setScrollbar(6px, #909399, #EBEEF5);

  // 折叠图标调整样式
  .fold-wrapper {
    height: 56px;
    line-height: 56px;
    padding: 0 20px;
    text-align: right;
    color: #fff;
    font-size: 24px;

    .el-icon-s-unfold, .el-icon-s-fold {
      cursor: pointer;

      &:hover {
        opacity: 0.5;
      }
    }
  }
}

// 对展开状态下的菜单设置宽度
.side-menu:not(.el-menu--collapse) {
  width: 200px;
}
</style>