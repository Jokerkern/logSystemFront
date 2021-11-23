<template>
  <div class="bread-crumb-wrapper">
    <div class="current-path">当前位置：</div>
    <!-- 按类型查看文件时 -->
    <el-breadcrumb class="bread-crumb" v-if="fileType" separator="/">
      <el-breadcrumb-item>{{ fileTypeMap[fileType] }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 按路径查看文件时 -->
    <el-breadcrumb class="bread-crumb" v-else separator="/">
      <!-- 当点击面包屑导航栏中的某一级时，改变路由 -->
      <el-breadcrumb-item
          v-for="(item, index) in breadCrumbList"
          :key="index"
          :to="{ query: { fileType: 0, filePath: item.path } }"
      >{{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumb',
  props: {
    fileType: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      fileTypeMap: {
        1: 'DEBUG',
        2: 'INFO',
        3: 'WARING',
        4: 'ERROR',
        5: 'CRITICAL'
      },
      // 依据路径查看时 先模拟路径数据
      breadCrumbList: [
        { name: '全部文件', path: '/' },
        { name: '实验楼', path: '/实验楼/' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.bread-crumb-wrapper {
  height: 32px;
  line-height: 32px;
  display: flex;
  align-items: center;
}
</style>