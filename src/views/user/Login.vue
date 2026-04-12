<template>
  <div class="login-container">
    <div class="login-bg">
      <div class="bg-content">
        <h2>{{ t('app.welcome') }}</h2>
        <h1>{{ t('app.slogan') }}</h1>
        <p>{{ t('app.subtitle') }}</p>
      </div>
    </div>

    <div class="login-form-container">
      <div class="login-box">
        <div class="login-header">
          <div class="header-left">
            <h1>{{ t('auth.welcomeBack') }}</h1>
            <p>{{ t('auth.pleaseLoginAccount') }}</p>
          </div>
          <div class="header-right">
            <!-- <a-button type="link" @click="router.push('/register')">前往注册</a-button> -->
            <a-button type="link"
                      @click="router.push({ path: '/register', query: route.query.redirect ? { redirect: route.query.redirect } : {} })">
              {{ t('auth.goRegister') }}
            </a-button>
          </div>
        </div>
        <a-form
            :model="loginForm"
            :rules="rules"
            @finish="handleLogin"
            class="login-form"
        >
          <a-form-item name="username">
            <a-input v-model:value="loginForm.username"
                     size="large" :placeholder="t('auth.pleaseEnterUsername')"
            >
              <template #prefix>
                <UserOutlined/>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="passwordHash">
            <a-input-password v-model:value="loginForm.passwordHash"
                              size="large" :placeholder="t('auth.pleaseEnterPassword')"
                              @pressEnter="handleLogin"
            >
              <template #prefix>
                <LockOutlined/>
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <div class="form-options">
              <a-checkbox v-model:checked="loginForm.autoLogin">{{ t('auth.autoLogin') }}</a-checkbox>
              <a-button type="link" class="forgot-password">{{ t('auth.forgotPassword') }}</a-button>
            </div>
          </a-form-item>
          <a-form-item>
            <a-button
                type="primary"
                html-type="submit"
                size="large"
                :loading="loading"
                block
            >
              {{ t('auth.login') }}
            </a-button>
          </a-form-item>
          <div class="other-options">
            <div class="divider">
              <span>{{ t('auth.otherLoginWays') }}</span>
            </div>
            <div class="social-login">
              <a-button
                  v-for="login in socialLogins"
                  :key="login.key"
                  :disabled="login.disabled"
                  :title="login.tooltip"
                  size="large"
                  block
              >
                <template #icon>
                  <component :is="login.icon"/>
                </template>
              </a-button>
            </div>
          </div>
        </a-form>
      </div>

      <div class="login-footer">
        <p>© 2020-{{ currentYear }} {{ t('app.copyright') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useI18n} from 'vue-i18n'
import {message} from 'ant-design-vue'
import {
  UserOutlined,
  LockOutlined,
  GithubFilled,
  GoogleOutlined,
  WechatFilled,
  QqOutlined
} from '@ant-design/icons-vue'
import {useUserStore} from '@/stores/user'

const {t} = useI18n()
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

/** 从 query 读取返回路径，登录/注册成功后跳转；无则用默认路径 */
const redirectPath = computed(() => (route.query.redirect as string) || '/')

const loading = ref(false)
const loginForm = reactive({
  username: '',
  passwordHash: '',
  autoLogin: false
})

const currentYear = computed(() => new Date().getFullYear())

const socialLogins = [
  {
    key: 'github',
    icon: GithubFilled,
    disabled: true,
    tooltip: t('login.githubLogin')
  },
  {
    key: 'google',
    icon: GoogleOutlined,
    disabled: true,
    tooltip: t('login.googleLogin')
  },
  {
    key: 'qq',
    icon: QqOutlined,
    disabled: false,
    tooltip: t('login.qqLogin')
  },
  {
    key: 'wechat',
    icon: WechatFilled,
    disabled: true,
    tooltip: t('login.wechatLogin')
  },
  // {
  //   key: 'webcatx',
  //   icon: () => h('img', {
  //     src: Base64Utils.get('webcatx'),
  //     style: {width: '25px', height: '25px', objectFit: 'cover', marginBottom: '2px'}
  //   }),
  //   disabled: true,
  //   tooltip: t('login.webcatxLogin')
  // }
]

const rules = {
  username: [
    {required: true, message: t('login.pleaseEnterUsername'), trigger: 'blur'}
  ],
  passwordHash: [
    {required: true, message: t('login.pleaseEnterPassword'), trigger: 'blur'},
    {min: 6, message: t('login.passwordMinLength'), trigger: 'blur'}
  ]
}

const handleLogin = async () => {
  loading.value = true
  try {
    const success = await userStore.login(loginForm, loginForm.autoLogin)
    if (success) {
      // 如果勾选了自动登录，token已经在userStore中存储到localStorage
      // 如果未勾选自动登录，清空localStorage中的token
      if (!loginForm.autoLogin) {
        // 会话结束时清除token
      }
      message.success(t('login.loginSuccess'))
      // await router.push('/')
      await router.push(redirectPath.value)
    } else {
      message.error(t('login.usernamePasswordError'))
    }
  } catch (error) {
    message.error(t('login.loginFailed'))
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">

</style>
