<template>
  <div class="home-container">
    <Header :selected-keys="selectedKeys"/>

    <div class="main-content">
      <div class="content-container">
        <div class="left-section">
          <div class="illustration">
            <div class="img-container">
              <img :src="Base64Utils.get('grassland')"
                   :alt="imageAlt"
                   @error="handleImageError"
                   ref="illustrationImg"
              />
              <div v-if="imageError" class="img-mask">
                <!-- {{ imageAlt.charAt(0) }} -->
                {{ imageAlt }}
              </div>
            </div>
          </div>
          <div class="slogan">
            <h2>{{ t('home.modernFrontend') }}</h2>
            <p>{{ t('home.frontendSolution') }}</p>
          </div>
        </div>

        <div class="right-section">
          <div class="user-card">
            <div v-if="isLoggedIn" class="user-info">
              <div class="avatar">
                <a-avatar shape="square" :size="{ xs: 64, sm: 64, md: 64, lg: 64, xl: 80, xxl: 95 }" :src="userAvatar"
                          :alt="username">
                  {{ username.charAt(0) }}
                </a-avatar>
              </div>
              <div class="user-details">
                <h3>{{ username }}</h3>
                <a-tag class="user-role">{{ userRole }}</a-tag>
                <p class="user-email">{{ userEmail }}</p>
              </div>
              <div class="user-actions">
                <a-button type="default" class="action-button" @click="goToAdmin">
                  {{ t('home.enterAdmin') }}
                </a-button>
                <a-button type="text" danger class="action-button" @click="handleLogout">
                  {{ t('home.logout') }}
                </a-button>
              </div>
            </div>
            <div v-else class="login-prompt">
              <div class="prompt-content">
                <h3>{{ t('home.welcome') }}</h3>
                <p>{{ t('home.loginToUse') }}</p>
                <a-button type="primary" class="login-button" @click="goToLogin">
                  {{ t('home.login') }}
                </a-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer/>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {useI18n} from 'vue-i18n'
import {message} from 'ant-design-vue'
import {useUserStore} from "@/stores/user"
import type {UserDetailDTO} from "@/types/api"
import {Base64Utils, localStorageCache, ObjectUtils, sessionStorageCache} from "@/utils"

const {t} = useI18n()

const selectedKeys = ref<string[]>(['1'])

const router = useRouter()

const imageError = ref(false)
const imageAlt = t('home.illustration')

const userStore = useUserStore()
const isLoggedIn = ref(false)
const username = ref(t('home.guestUser'))
const userRole = ref(t('home.normalUser'))
const userEmail = ref('example@example.com')
const userAvatar = ref('')

const handleImageError = () => {
  imageError.value = true
}

const goToLogin = () => {
  router.push('/login?redirect=/')
}

const goToAdmin = () => {
  router.push('/admin')
}

const handleLogout = async () => {
  await userStore.logout()
  isLoggedIn.value = false
  message.success(t('home.logoutSuccess'))
}

onMounted(() => {
  const token = localStorageCache.get('token') || sessionStorageCache.get('token')
  const userInfo = localStorageCache.get('userInfo') || sessionStorageCache.get('userInfo')
  if (token) {
    isLoggedIn.value = true
    if (userInfo != null) {
      const {user, userProfile, userRoles} = userInfo as UserDetailDTO
      userAvatar.value = userProfile?.avatarUrl ?? ''
      username.value = user?.username ?? t('home.guestUser')
      // 后端获取角色列表时关联is_primary=1, 返回主角色排第一位
      userRole.value = ObjectUtils.extractValues(userRoles, 'roleName')[0] ?? t('home.normalUser')
      userEmail.value = userProfile?.email ?? 'example@example.com'
    }
  }
})
</script>

<style scoped lang="scss">

</style>
