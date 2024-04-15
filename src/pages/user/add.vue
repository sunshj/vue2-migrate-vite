<template>
  <div>
    <div>Add user</div>
    <el-form ref="addUserFormRef" :model="addUserForm" :rules="addUserFormRules" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addUserForm.username" clearable />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="addUserForm.password" show-password type="password" clearable />
      </el-form-item>
      <el-form-item>
        <el-button :disabled="isSubmitting" type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addUserForm: {
        username: '',
        password: ''
      },

      isSubmitting: false,

      addUserFormRules: {
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

  methods: {
    onSubmit() {
      this.$refs.addUserFormRef.validate(async valid => {
        if (!valid) return this.$message.warning('请正确填写表单')
        this.isSubmitting = true
        const { username: userName, password } = this.addUserForm
        const { data: res } = await this.$http
          .post('/user', {
            userName,
            password
          })
          .finally(() => {
            this.isSubmitting = false
          })
        if (res.code !== 200) {
          return this.$message.error(res.data)
        }
        this.$message.success('添加用户成功')
        setTimeout(() => {
          this.$router.push('/user')
        }, 1500)
      })
    },

    onReset() {
      this.$refs.addUserFormRef.resetFields()
    }
  }
}
</script>

<route lang="yaml">
meta:
  layout: empty
</route>
