<template>
  <div class="register-container">
    <div class="register-bg">
      <div class="bg-content">
        <h2>{{ t('app.welcome') }}</h2>
        <h1>{{ t('app.slogan') }}</h1>
        <p>{{ t('app.subtitle') }}</p>
      </div>
    </div>

    <div class="register-form-container">
      <div class="register-box">
        <div class="register-header">
          <div class="header-left">
            <h1>{{ t('auth.createdAccount') }}</h1>
            <p>{{ t('auth.pleaseFillRegInfo') }}</p>
          </div>
          <div class="header-right">
            <!-- <a-button type="link" @click="router.push('/login')">前往登录</a-button> -->
            <!-- <a-button type="link" @click="router.push({ path: '/login', query: route.query.redirect ? { redirect: route.query.redirect } : {} })">前往登录</a-button> -->
            <a-button type="link"
                      @click="router.push({ path: '/login', query: redirectPath !== '/' ? { redirect: redirectPath } : {} })">
              {{ t('auth.goLogin') }}
            </a-button>
          </div>
        </div>
        <a-form
            :model="registerForm"
            :rules="rules"
            @finish="handleRegister"
            class="register-form"
        >
          <a-form-item name="username">
            <a-input
                v-model:value="registerForm.username"
                size="large"
                :placeholder="t('auth.pleaseEnterUsername')"
            >
              <template #prefix>
                <UserOutlined/>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="passwordHash">
            <a-input-password
                v-model:value="registerForm.passwordHash"
                size="large"
                :placeholder="t('auth.pleaseEnterPassword')"
            >
              <template #prefix>
                <LockOutlined/>
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item name="confirmPassword">
            <a-input-password
                v-model:value="registerForm.confirmPassword"
                size="large"
                :placeholder="t('auth.pleaseReEnterPassword')"
                @pressEnter="handleRegister"
            >
              <template #prefix>
                <LockOutlined/>
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item name="agreed" :wrapper-col="{ offset: 0 }">
            <a-checkbox v-model:checked="registerForm.agreed">
              {{ t('auth.readAgreed') }}
              <template v-for="(item, index) in agreementList" :key="item.path">
                <span v-if="index > 0">、</span>
                <a-button type="link" @click="router.push(item.path)" class="agreement-link">{{ item.label }}</a-button>
              </template>
            </a-checkbox>
          </a-form-item>
          <a-form-item>
            <a-button
                type="primary"
                html-type="submit"
                size="large"
                :loading="loading"
                block
            >
              {{ t('auth.register') }}
            </a-button>
          </a-form-item>
        </a-form>
      </div>

      <div class="register-footer">
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
import {UserOutlined, LockOutlined} from '@ant-design/icons-vue'
import {registerUser} from '@/api'
import type {User} from '@/types'

const {t} = useI18n()
const router = useRouter()
const route = useRoute()

/** 从 query 读取返回路径，注册成功后跳转登录时携带，登录后再跳转；无则用默认路径 */
const redirectPath = computed(() => (route.query.redirect as string) || '/')

const agreementList = [
  {label: t('app.userAgreement'), path: '/agreement/user?redirect=/register'},
  {label: t('app.privacyPolicy'), path: '/agreement/privacy?redirect=/register'},
  {label: t('app.serviceAgreement'), path: '/agreement/service?redirect=/register'}
]

const loading = ref(false)
const registerForm = reactive({
  username: '',
  passwordHash: '',
  confirmPassword: '',
  agreed: false
})

const currentYear = computed(() => new Date().getFullYear())

const validateConfirmPassword = (_rule: unknown, value: string) => {
  if (value !== registerForm.passwordHash) {
    return Promise.reject(t('register.passwordNotMatch'))
  }
  return Promise.resolve()
}

const validateAgreed = (_rule: unknown, value: boolean) => {
  if (!value) {
    return Promise.reject(t('register.pleaseAgree'))
  }
  return Promise.resolve()
}

const rules = {
  username: [
    {required: true, message: t('register.pleaseEnterUsername'), trigger: 'blur'},
    {min: 2, max: 32, message: t('register.usernameLength'), trigger: 'blur'}
  ],
  passwordHash: [
    {required: true, message: t('register.pleaseEnterPassword'), trigger: 'blur'},
    {min: 6, message: t('register.passwordMinLength'), trigger: 'blur'}
  ],
  confirmPassword: [
    {required: true, message: t('register.pleaseReEnterPassword'), trigger: 'blur'},
    {validator: validateConfirmPassword, trigger: 'blur'}
  ],
  agreed: [
    {validator: validateAgreed, trigger: 'change'}
  ]
}

const handleRegister = async () => {
  loading.value = true
  try {
    const data: User = {
      username: registerForm.username,
      passwordHash: registerForm.passwordHash
    }
    const res = await registerUser(data)
    const {code, message: msg} = res.data
    if (code === 200) {
      message.success(msg ?? t('register.registerSuccess'))
      // await router.push('/login')
      await router.push({
        path: '/login',
        // query: route.query.redirect ? { redirect: route.query.redirect } : {}
        query: redirectPath.value !== '/' ? {redirect: redirectPath.value} : {}
      })
    } else {
      message.error(t('register.usernameExists'))
    }
  } catch (error: unknown) {
    message.error(t('register.registerFailed'))
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">

</style>
