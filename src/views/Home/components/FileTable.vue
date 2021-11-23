<template>
  <el-table :data="tableData" style="width: 100%" v-loading="loading">
    <el-table-column prop="fileName" label="文件名"> </el-table-column>
    <el-table-column prop="extendName" label="类型" width="100"> </el-table-column>
    <el-table-column prop="fileSize" label="大小" width="60"> </el-table-column>
    <el-table-column prop="uploadTime" label="修改日期" width="180"> </el-table-column>

    <!-- 表格操作列 -->
    <el-table-column label="操作" width="260">
      <template slot-scope="scope">
        <!-- 操作列收缩状态下的按钮 -->
        <el-dropdown trigger="click">
          <el-button size="mini">
            操作
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleClickDelete(scope.row)"
            >删除</el-dropdown-item
            >
            <el-dropdown-item @click.native="handleClickMove(scope.row)"
            >移动</el-dropdown-item
            >
            <el-dropdown-item @click.native="handleClickRename(scope.row)"
            >重命名</el-dropdown-item
            >
            <el-dropdown-item>
              <a target="_blank" style="display: block; color: inherit">下载</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'FileTable',
  props: {
    // 表格数据，同时需要删除原本在 data( return { } ) 中的 tableData，否则会报错
    tableData: {
      type: Array,
      required: true
    },
    // 表格加载状态
    loading: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      operaColumnIsFold: sessionStorage.getItem('operaColumnIsFold') || false //  表格操作列-是否收缩
    }
  },
  methods: {
    // 删除按钮 - 点击事件
    handleClickDelete(row) {
      console.log('删除', row.fileName)
    },
    // 移动按钮 - 点击事件
    handleClickMove(row) {
      console.log('移动', row.fileName)
    },
    // 重命名按钮 - 点击事件
    handleClickRename(row) {
      console.log('重命名', row.fileName)
    }
  }
}
</script>