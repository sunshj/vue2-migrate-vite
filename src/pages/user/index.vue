<template>
  <div>
    <el-button type="primary" @click="handleAdd()">添加</el-button>

    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column label="姓名" width="180" prop="userName" />
      <el-table-column label="头像" width="180">
        <template #default="scopeProps">
          <el-avatar :src="scopeProps.row.userAvatar" />
        </template>
      </el-table-column>
      <el-table-column label="权限" width="180">
        <template #default="scopeProps">
          <el-tag :type="roleTag(scopeProps.row.userRole)"
            >{{ roleName(scopeProps.row.userRole) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template #default="scopeProps">{{ timeFormat(scopeProps.row.createdAt) }}</template>
      </el-table-column>
      <el-table-column label="更新时间">
        <template #default="scopeProps">{{ timeFormat(scopeProps.row.updatedAt) }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import datetimeMixin from '@/mixins/datetime'
export default {
  mixins: [datetimeMixin],
  data() {
    return {
      tableData: [],
      loading: false,
      currentPage: 1,
      pageSize: 5,
      total: 0
    }
  },

  async created() {
    await this.getUsersList()
  },

  methods: {
    async getUsersList() {
      this.loading = true
      const { data: res } = await this.$http
        .get(`/user?page=${this.currentPage}&size=${this.pageSize}`)
        .finally(() => {
          this.loading = false
        })
      this.tableData = res.data.result
      this.total = res.data.total
    },

    handleAdd() {
      this.$router.push({ name: 'user-add' })
    },

    handleEdit(row) {
      console.log(row)
      this.$router.push({ name: 'user-edit-id', params: { id: row.userId } })
    },

    handleDelete(row) {
      console.log(row)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    roleName(role) {
      return role === 1 ? 'ADMIN' : 'USER'
    },

    roleTag(role) {
      return role === 1 ? 'warning' : 'primary'
    },

    handleSizeChange(val) {
      this.pageSize = val
      this.getUsersList()
    },

    handleCurrentChange(val) {
      this.currentPage = val
      this.getUsersList()
    }
  }
}
</script>

<style></style>
