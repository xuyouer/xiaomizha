<script setup lang="ts">
import {computed} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useI18n} from 'vue-i18n'
import {message} from 'ant-design-vue'
import {
  LogoutOutlined,
  SettingOutlined,
  ProfileOutlined,
  SafetyCertificateOutlined,
  QuestionCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons-vue'
import {useUserStore} from '@/stores/user'

const {t} = useI18n()
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const displayName = computed(() => {
  return userStore.currentDisplayName || userStore.currentUsername || t('admin.user')
})

const userInitial = computed(() => {
  const name = displayName.value
  return name ? name.charAt(0).toUpperCase() : 'U'
})

const menuItems = computed(() => [
  {
    key: 'profile',
    icon: ProfileOutlined,
    label: t('admin.personalCenter'),
    path: '/admin/profile/center'
  },
  {
    key: 'settings',
    icon: SettingOutlined,
    label: t('admin.personalSettings'),
    path: '/admin/profile/settings'
  },
  {
    key: 'divider-1',
    type: 'divider'
  },
  {
    key: 'security',
    icon: SafetyCertificateOutlined,
    label: t('userDropdown.security'),
    path: '/admin/profile/security'
  },
  {
    key: 'help',
    icon: QuestionCircleOutlined,
    label: t('userDropdown.helpCenter')
  },
  {
    key: 'about',
    icon: InfoCircleOutlined,
    label: t('userDropdown.about')
  },
  {
    key: 'divider-2',
    type: 'divider'
  },
  {
    key: 'logout',
    icon: LogoutOutlined,
    label: t('nav.logout'),
    danger: true
  }
])

const handleMenuClick = async ({key}: { key: string }) => {
  const item = menuItems.value.find(m => m.key === key)
  if (!item) return

  if (key === 'logout') {
    await handleLogout()
  } else if ('path' in item && item.path) {
    await router.push(item.path)
  } else if (key === 'help') {
    message.info(t('userDropdown.comingSoon'))
  } else if (key === 'about') {
    message.info(t('userDropdown.comingSoon'))
  }
}

const handleLogout = async (): Promise<void> => {
  await userStore.logout()
  message.success(t('auth.logoutSuccess'))
  await router.push(`/login?redirect=${encodeURIComponent(route.fullPath)}`)
}
</script>

<template>
  <a-dropdown
      overlay-class-name="user-dropdown-overlay"
      :trigger="['hover']"
      placement="bottomRight"
  >
    <a-button type="link" class="user-dropdown-trigger" @click.prevent>
      <a-avatar
          shape="square"
          :size="20"
          class="user-avatar"
      >
        {{ userInitial }}
      </a-avatar>
      <a-typography-text class="username">{{ displayName }}</a-typography-text>
    </a-button>
    <template #overlay>
      <a-menu
          class="user-dropdown-menu"
          @click="handleMenuClick"
      >
        <div class="user-info-header">
          <a-avatar shape="square" :size="48" class="user-avatar-large">
            {{ userInitial }}
          </a-avatar>
          <div class="user-details">
            <a-typography-text class="user-name">{{ displayName }}</a-typography-text>
            <a-typography-text class="user-role">{{ userStore.currentUsername }}</a-typography-text>
          </div>
        </div>
        <a-menu-divider/>

        <template v-for="item in menuItems" :key="item.key">
          <a-menu-divider v-if="item.type === 'divider'"/>
          <a-menu-item
              v-else
              :key="item.key"
              :class="{'danger-item': 'danger' in item && item.danger}"
          >
            <component :is="item.icon"/>
            <span>{{ item.label }}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<style scoped lang="scss">

</style>
