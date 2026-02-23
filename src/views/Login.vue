<template>
  <div class="login-container">
    <div class="login-bg">
      <div class="bg-content">
        <h2>欢迎使用</h2>
        <h1>小咪楂后台管理系统</h1>
        <p>高效、安全、智能的管理平台</p>
      </div>
    </div>

    <div class="login-form-container">
      <div class="login-box">
        <div class="login-header">
          <h1>登录</h1>
          <p>请输入您的账号和密码</p>
        </div>
        <a-form
          :model="loginForm"
          :rules="rules"
          @finish="handleLogin"
          class="login-form"
        >
          <a-form-item name="username">
            <a-input
              v-model:value="loginForm.username"
              size="large"
              placeholder="请输入用户名"
            >
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="password">
            <a-input-password
              v-model:value="loginForm.password"
              size="large"
              placeholder="请输入密码"
              @pressEnter="handleLogin"
            >
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              size="large"
              :loading="loading"
              block
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </div>
      
      <div class="login-footer">
        <p>© 2020-{{ currentYear }} 小咪楂管理系统. 保留所有权利.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const loginForm = reactive({
  username: '',
  password: ''
})

const currentYear = computed(() => {
  return new Date().getFullYear()
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  loading.value = true
  try {
    const success = await userStore.login(loginForm.username, loginForm.password)
    if (success) {
      message.success('登录成功')
      router.push('/')
    } else {
      message.error('用户名或密码错误')
    }
  } catch (error) {
    message.error('登录失败，请稍后重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background: #f5f5f5;
}

.login-bg {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("") #fff no-repeat center / cover;
}

.login-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, .5);
}

.bg-content {
  position: relative;
  z-index: 1;
  color: #333;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}

.bg-content h2 {
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 16px;
  opacity: 0.9;
}

.bg-content h1 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.2;
  color: #333;
}

.bg-content p {
  font-size: 18px;
  opacity: 0.8;
  max-width: 400px;
  margin: 0 auto;
}

.login-form-container {
  width: 45%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 50px;
}

.login-box {
  width: 400px;
}

.login-header {
  margin-bottom: 40px;
}

.login-header h1 {
  font-size: 32px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 600;
}

.login-header p {
  font-size: 16px;
  color: #666;
  margin: 0;
}

.login-form {
  width: 100%;
}

.login-form :deep(.ant-form-item) {
  margin-bottom: 24px;
}

.login-form :deep(.ant-input-large) {
  height: 48px;
  font-size: 16px;
}

.login-form :deep(.ant-btn-primary) {
  height: 48px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  border: none;
  transition: all 0.3s ease;
}

.login-form :deep(.ant-btn-primary:hover) {
  //transform: translateY(-2px);
  //box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.login-footer {
  margin-top: auto;
  padding-top: 40px;
  text-align: center;
}

.login-footer p {
  font-size: 14px;
  color: #999;
  margin: 0;
}

@media (max-width: 768px) {
  .login-bg {
    display: none;
  }
  
  .login-form-container {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    box-shadow: none;
  }

  .login-box {
    width: 100%;
  }
}
</style>
