<template>
  <div>
    <div>Edit user {{ $route.params.uid }}</div>
    <el-form
      ref="editUserFormRef"
      :model="editUserForm"
      :rules="editUserFormRules"
      label-width="80px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="editUserForm.username" clearable />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="editUserForm.password" show-password type="password" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="isSubmitting" @click="onSubmit">更新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Edit',
  data() {
    return {
      editUserForm: {
        username: '',
        password: ''
      },

      isSubmitting: false,
      editUserFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],

        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  created() {
    this.getUserInfo()
  },

  methods: {
    async getUserInfo() {
      const { id } = this.$route.params
      const { data: res } = await this.$http.get(`/user/${id}`)
      this.editUserForm.username = res.data.userName
    },

    onSubmit() {
      const { id } = this.$route.params
      this.$refs.editUserFormRef.validate(valid => {
        if (!valid) return this.$message.warning('表单填写不完整')
        this.isSubmitting = true
        this.$http
          .put(`/user/${id}`, this.editUserForm)
          .then(() => {
            this.$message.success('更新成功')
          })
          .finally(() => {
            this.isSubmitting = false
          })
      })
    }
  }
}
</script>

<route lang="yaml">
meta:
  layout: empty
</route>
