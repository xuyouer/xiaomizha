<template>
  <a-layout class="main-layout">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      width="200"
      :breakpoint="'lg'"
      @collapse="handleCollapse"
      @expand="handleExpand"
    >
      <div class="logo">
        <h2 v-if="!collapsed" class="logo-title">{{ t('app.name') }}</h2>
        <h2 v-else class="logo-collapsed">X</h2>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
        :items="menuItems"
        @click="handleMenuClick"
        :inline-collapsed="collapsed"
        @open-change="handleOpenChange"
      />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <div class="header-left">
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="toggleCollapsed"
          />
          <menu-fold-outlined
            v-else
            class="trigger"
            @click="toggleCollapsed"
          />
        </div>
        <div class="header-right">
          <LocaleSwitcher />
          <ThemeSwitcher />
          <a-dropdown overlay-class-name="user-dropdown-overlay">
            <a-button type="link" class="user-info" @click.prevent>
              <UserOutlined />
              <span class="username">{{ userStore.currentUsername || t('admin.user') }}</span>
            </a-button>
            <template #overlay>
              <a-menu>
                <a-menu-item @click="handleLogout">
                  <LogoutOutlined />
                  {{ t('nav.logout') }}
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content class="content">
        <div class="breadcrumb-container">
          <a-breadcrumb>
            <template #separator>
              <span class="breadcrumb-separator">></span>
            </template>
            <a-breadcrumb-item
                v-for="(item, index) in breadcrumbItems"
                :key="index"
                :href="item.path"
                @click.stop="handleBreadcrumbClick(item.path)"
            >
              <component :is="item.icon" v-if="item.icon" />
              <span>{{ item.label }}</span>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </a-layout-content>
      <a-layout-footer class="footer">
        <Footer />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, computed, watch, h } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  UserOutlined as UserIcon,
  TeamOutlined,
  AppstoreOutlined,
  SettingOutlined,
  EditOutlined,
  HistoryOutlined,
  CrownOutlined,
  MessageOutlined
} from '@ant-design/icons-vue'
import { useUserStore } from '@/stores/user'
import type { MenuProps } from 'ant-design-vue'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const collapsed = ref(false)
const selectedKeys = ref<string[]>([])
const openKeys = ref<string[]>([])

const toggleCollapsed = (): void => {
  collapsed.value = !collapsed.value
}

const menuItems = computed(() => [
  {
    key: '/admin/dashboard',
    icon: () => h(DashboardOutlined),
    label: t('admin.dashboard'),
    title: t('admin.dashboard')
  },
  {
    key: '/admin/system',
    icon: () => h(AppstoreOutlined),
    label: t('admin.system'),
    title: t('admin.system'),
    children: [
      {
        key: '/admin/system/users',
        icon: () => h(UserIcon),
        label: t('admin.userManage'),
        title: t('admin.userManage')
      },
      {
        key: '/admin/system/roles',
        icon: () => h(TeamOutlined),
        label: t('admin.roleManage'),
        title: t('admin.roleManage')
      },
      {
        key: '/admin/system/resources',
        icon: () => h(AppstoreOutlined),
        label: t('admin.resourceManage'),
        title: t('admin.resourceManage')
      },
      {
        key: '/admin/system/names',
        icon: () => h(EditOutlined),
        label: t('admin.userNames'),
        title: t('admin.userNames')
      },
      {
        key: '/admin/system/name-history',
        icon: () => h(HistoryOutlined),
        label: t('admin.userNameHistory'),
        title: t('admin.userNameHistory')
      },
      {
        key: '/admin/system/vip-level-config',
        icon: () => h(CrownOutlined),
        label: t('admin.vipLevelConfig'),
        title: t('admin.vipLevelConfig')
      },
      {
        key: '/admin/system/configs',
        icon: () => h(SettingOutlined),
        label: t('admin.systemConfigs'),
        title: t('admin.systemConfigs')
      },
      {
        key: '/admin/system/feedback',
        icon: () => h(MessageOutlined),
        label: t('admin.userFeedback'),
        title: t('admin.userFeedback')
      }
    ]
  },
  {
    key: '/admin/profile',
    icon: () => h(UserOutlined),
    label: t('admin.profile'),
    title: t('admin.profile'),
    children: [
      {
        key: '/admin/profile/center',
        icon: () => h(UserIcon),
        label: t('admin.personalCenter'),
        title: t('admin.personalCenter')
      },
      {
        key: '/admin/profile/settings',
        icon: () => h(SettingOutlined),
        label: t('admin.personalSettings'),
        title: t('admin.personalSettings')
      }
    ]
  }
])

const adminRoutes = computed(() => ({
  parent: {
    path: '/admin/system',
    label: t('admin.system'),
    icon: AppstoreOutlined
  },
  children: [
    { path: '/admin/system/users', label: t('admin.userManage'), icon: UserIcon },
    { path: '/admin/system/roles', label: t('admin.roleManage'), icon: TeamOutlined },
    { path: '/admin/system/resources', label: t('admin.resourceManage'), icon: AppstoreOutlined },
    { path: '/admin/system/names', label: t('admin.userNames'), icon: EditOutlined },
    { path: '/admin/system/name-history', label: t('admin.userNameHistory'), icon: HistoryOutlined },
    { path: '/admin/system/vip-level-config', label: t('admin.vipLevelConfig'), icon: CrownOutlined },
    { path: '/admin/system/configs', label: t('admin.systemConfigs'), icon: SettingOutlined },
    { path: '/admin/system/feedback', label: t('admin.userFeedback'), icon: MessageOutlined }
  ]
}))

const profileRoutes = computed(() => ({
  parent: {
    path: '/admin/profile',
    label: t('admin.profile'),
    icon: UserOutlined
  },
  children: [
    { path: '/admin/profile/center', label: t('admin.personalCenter'), icon: UserIcon },
    { path: '/admin/profile/settings', label: t('admin.personalSettings'), icon: SettingOutlined }
  ]
}))

watch(
  () => route.path,
  (newPath) => {
    selectedKeys.value = [newPath]
    if (adminRoutes.value.children.some(route => newPath.startsWith(route.path))) {
      openKeys.value = ['/admin/system']
    } else if (profileRoutes.value.children.some(route => newPath.startsWith(route.path))) {
      openKeys.value = ['/admin/profile']
    } else {
      openKeys.value = []
    }
  },
  { immediate: true }
)

const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
  router.push(key as string)
}

const handleLogout = async (): Promise<void> => {
  await userStore.logout()
  message.success(t('auth.logoutSuccess'))
  await router.push(`/login?redirect=${encodeURIComponent(route.fullPath)}`)
}

const handleOpenChange = (keys: string[]): void => {
  openKeys.value = keys
}

const handleCollapse = (): void => {
  console.log('Sidebar collapsed')
}

const handleExpand = (): void => {
  console.log('Sidebar expanded')
}

const handleBreadcrumbClick = (path: string): void => {
  if (path) {
    const allRoutes = [adminRoutes.value, profileRoutes.value]
    let targetPath = path

    for (const routeConfig of allRoutes) {
      if (path === routeConfig.parent.path) {
        if (routeConfig.children && routeConfig.children.length > 0 && routeConfig.children[0]) {
          targetPath = routeConfig.children[0].path
        }
        break
      }
    }

    router.push(targetPath)
  }
}

const breadcrumbItems = computed(() => {
  const items = []
  const currentPath = route.path

  // 首页
  items.push({
    label: t('admin.dashboard'),
    icon: DashboardOutlined,
    path: '/admin/dashboard'
  })

  const allRoutes = [
    adminRoutes.value,
    profileRoutes.value,
  ]
  for (const routeConfig of allRoutes) {
    const parentPathKey = routeConfig.parent.path.split('/').filter(Boolean).pop()
    if (parentPathKey && currentPath.includes(parentPathKey)) {
      items.push(routeConfig.parent)

      for (const childRoute of routeConfig.children) {
        const childPathKey = childRoute.path.split('/').filter(Boolean).pop()
        if (childPathKey && currentPath.includes(childPathKey)) {
          items.push(childRoute)
          break
        }
      }
      break
    }
  }

  return items
})
</script>

<style lang="scss" scoped>

</style>
