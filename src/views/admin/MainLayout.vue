<template>
  <a-layout class="main-layout">
    <a-layout-sider
        v-model:collapsed="collapsed"
        :trigger="null"
        collapsible
        width="300"
        :breakpoint="'lg'"
        @collapse="handleCollapse"
        @expand="handleExpand"
    >
      <div class="logo">
        <h2 v-if="!collapsed" class="logo-title">{{ t('app.name') }}</h2>
        <h2 v-else class="logo-collapsed">
          <img :src="Base64Utils.get('xiaomizha')" alt="Logo" class="logo-img">
        </h2>
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
          <LocaleSwitcher/>
          <ThemeSwitcher/>
          <UserDropdown/>
        </div>
      </a-layout-header>
      <a-tabs
          v-model:activeKey="activeTab"
          type="editable-card"
          hide-add
          class="page-tabs"
          @edit="onEditTab"
          @change="onChangeTab"
      >
        <a-tab-pane v-for="tab in tabPanes" :key="tab.key" :closable="tab.key !== '/admin/dashboard'">
          <template #tab>
            <span>
              <component :is="tab.icon" v-if="tab.icon"/>
              {{ tab.title }}
            </span>
          </template>
        </a-tab-pane>
      </a-tabs>
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
              <component :is="item.icon" v-if="item.icon"/>
              <span>{{ item.label }}</span>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component"/>
          </transition>
        </router-view>
      </a-layout-content>
      <a-layout-footer class="footer">
        <Footer/>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import {ref, computed, watch, h, nextTick} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useI18n} from 'vue-i18n'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  DashboardOutlined,
  UserOutlined as UserIcon,
  TeamOutlined,
  AppstoreOutlined,
  SettingOutlined,
  EditOutlined,
  HistoryOutlined,
  CrownOutlined,
  MessageOutlined,
  CalendarOutlined,
  IdcardOutlined,
  KeyOutlined,
  SafetyCertificateOutlined,
  UserSwitchOutlined,
  GiftOutlined
} from '@ant-design/icons-vue'
import type {MenuProps} from 'ant-design-vue'
import {Base64Utils, localStorageCache} from "@/utils"
import {CACHE_EXPIRY, CACHE_KEYS} from "@/constants"

const {t} = useI18n()
const router = useRouter()
const route = useRoute()

const collapsed = ref(false)
const selectedKeys = ref<string[]>([])
const openKeys = ref<string[]>([])

const savedActiveTab = localStorageCache.get(CACHE_KEYS.adminActiveTab) as string | null
const activeTab = ref(savedActiveTab || '/admin/dashboard')
const savedTabs = localStorageCache.get(CACHE_KEYS.adminTabs) as string[] | null
const tabPaths = ref<string[]>(savedTabs || ['/admin/dashboard'])

const getRouteInfo = (path: string): { title: string; icon: any } => {
  const allRoutes = [
    {path: '/admin/dashboard', label: t('admin.dashboard'), icon: DashboardOutlined},
    ...adminRoutes.value.children,
    ...profileRoutes.value.children,
    ...signInRoutes.value.children,
    ...licenseRoutes.value.children
  ]
  const found = allRoutes.find(r => r.path === path)
  return {
    title: found?.label || path,
    icon: found?.icon || UserIcon
  }
}

const tabPanes = computed(() => {
  return tabPaths.value.map(path => {
    const info = getRouteInfo(path)
    return {
      key: path,
      title: info.title,
      icon: info.icon
    }
  })
})

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
        key: '/admin/system/user-assign',
        icon: () => h(UserSwitchOutlined),
        label: t('admin.userAssign'),
        title: t('admin.userAssign')
      },
      {
        key: '/admin/system/profiles',
        icon: () => h(IdcardOutlined),
        label: t('admin.profilesManage'),
        title: t('admin.profilesManage')
      },
      {
        key: '/admin/system/user-details',
        icon: () => h(UserIcon),
        label: t('admin.userDetailManage'),
        title: t('admin.userDetailManage')
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
      },
      {
        key: '/admin/system/licenses',
        icon: () => h(KeyOutlined),
        label: t('admin.licensesManage'),
        title: t('admin.licensesManage')
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
      },
      {
        key: '/admin/profile/security',
        icon: () => h(SafetyCertificateOutlined),
        label: t('admin.personalSecurity'),
        title: t('admin.personalSecurity')
      }
    ]
  },
  {
    key: '/admin/sign-in',
    icon: () => h(CalendarOutlined),
    label: t('admin.signInManage'),
    title: t('admin.signInManage'),
    children: [
      {
        key: '/admin/sign-in/center',
        icon: () => h(UserIcon),
        label: t('admin.signInCenter'),
        title: t('admin.signInCenter'),
      },
      {
        key: '/admin/sign-in/users',
        icon: () => h(TeamOutlined),
        label: t('admin.userManage'),
        title: t('admin.userManage'),
      },
      {
        key: '/admin/sign-in/repair-cards',
        icon: () => h(GiftOutlined),
        label: t('admin.repairCardManage'),
        title: t('admin.repairCardManage'),
      }
    ]
  },
  {
    key: '/admin/license',
    icon: () => h(KeyOutlined),
    label: t('admin.licenseManage'),
    title: t('admin.licenseManage'),
    children: [
      {
        key: '/admin/license/personal',
        icon: () => h(IdcardOutlined),
        label: t('admin.personalLicense'),
        title: t('admin.personalLicense'),
      },
      {
        key: '/admin/license/users',
        icon: () => h(TeamOutlined),
        label: t('admin.allUsersLicenses'),
        title: t('admin.allUsersLicenses'),
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
    {path: '/admin/system/users', label: t('admin.userManage'), icon: UserIcon},
    {path: '/admin/system/user-assign', label: t('admin.userAssign'), icon: UserSwitchOutlined},
    {path: '/admin/system/profiles', label: t('admin.profilesManage'), icon: IdcardOutlined},
    {path: '/admin/system/user-details', label: t('admin.userDetailManage'), icon: UserIcon},
    {path: '/admin/system/roles', label: t('admin.roleManage'), icon: TeamOutlined},
    {path: '/admin/system/resources', label: t('admin.resourceManage'), icon: AppstoreOutlined},
    {path: '/admin/system/names', label: t('admin.userNames'), icon: EditOutlined},
    {path: '/admin/system/name-history', label: t('admin.userNameHistory'), icon: HistoryOutlined},
    {path: '/admin/system/vip-level-config', label: t('admin.vipLevelConfig'), icon: CrownOutlined},
    {path: '/admin/system/configs', label: t('admin.systemConfigs'), icon: SettingOutlined},
    {path: '/admin/system/feedback', label: t('admin.userFeedback'), icon: MessageOutlined},
    {path: '/admin/system/licenses', label: t('admin.licensesManage'), icon: KeyOutlined}
  ]
}))

const profileRoutes = computed(() => ({
  parent: {
    path: '/admin/profile',
    label: t('admin.profile'),
    icon: UserOutlined
  },
  children: [
    {path: '/admin/profile/center', label: t('admin.personalCenter'), icon: UserIcon},
    {path: '/admin/profile/settings', label: t('admin.personalSettings'), icon: SettingOutlined},
    {path: '/admin/profile/security', label: t('admin.personalSecurity'), icon: SafetyCertificateOutlined}
  ]
}))

const signInRoutes = computed(() => ({
  parent: {
    path: '/admin/sign-in',
    label: t('admin.signInManage'),
    icon: CalendarOutlined
  },
  children: [
    {path: '/admin/sign-in/center', label: t('admin.signInCenter'), icon: UserIcon},
    {path: '/admin/sign-in/users', label: t('admin.userManage'), icon: TeamOutlined},
    {path: '/admin/sign-in/repair-cards', label: t('admin.repairCardManage'), icon: GiftOutlined}
  ]
}))

const licenseRoutes = computed(() => ({
  parent: {
    path: '/admin/license',
    label: t('admin.licenseManage'),
    icon: KeyOutlined
  },
  children: [
    {path: '/admin/license/personal', label: t('admin.personalLicense'), icon: IdcardOutlined},
    {path: '/admin/license/users', label: t('admin.allUsersLicenses'), icon: TeamOutlined}
  ]
}))

const saveTabsToStorage = () => {
  localStorageCache.set(CACHE_KEYS.adminTabs, tabPaths.value, CACHE_EXPIRY.long)
}

const saveActiveTabToStorage = () => {
  localStorageCache.set(CACHE_KEYS.adminActiveTab, activeTab.value, CACHE_EXPIRY.long)
}

const onEditTab = (targetKey: string, action: 'add' | 'remove') => {
  if (action === 'remove' && targetKey !== '/admin/dashboard') {
    const tabs = document.querySelectorAll('.ant-tabs-tab')
    const currentIndex = Array.from(tabs).findIndex(tab => tab.getAttribute('aria-controls')?.includes(targetKey))

    const newTabs = tabPaths.value.filter(path => path !== targetKey)
    tabPaths.value = newTabs
    saveTabsToStorage()

    if (activeTab.value === targetKey) {
      const newIndex = Math.min(currentIndex, newTabs.length - 1)
      activeTab.value = newTabs[newIndex] || '/admin/dashboard'
      saveActiveTabToStorage()
      router.push(activeTab.value)
    }
  }
}

const onChangeTab = (activeKey: string) => {
  activeTab.value = activeKey
  saveActiveTabToStorage()
  router.push(activeKey)
}

const addTab = (path: string) => {
  const key = path

  if (!tabPaths.value.includes(key)) {
    tabPaths.value.push(key)
    saveTabsToStorage()
  }

  nextTick(() => {
    activeTab.value = key
    saveActiveTabToStorage()
  })
}

const handleMenuClick: MenuProps['onClick'] = ({key}) => {
  addTab(key as string)
  router.push(key as string)
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
    const allRoutes = [
      adminRoutes.value,
      profileRoutes.value,
      signInRoutes.value,
      licenseRoutes.value,
    ]
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
    signInRoutes.value,
    licenseRoutes.value,
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

watch(
    () => route.path,
    (newPath) => {
      selectedKeys.value = [newPath]

      if (newPath === '/admin/dashboard') {
        activeTab.value = newPath
        saveActiveTabToStorage()
      } else if (!tabPaths.value.includes(newPath)) {
        addTab(newPath)
      } else {
        activeTab.value = newPath
        saveActiveTabToStorage()
      }

      if (adminRoutes.value.children.some(r => newPath.startsWith(r.path))) {
        openKeys.value = ['/admin/system']
      } else if (profileRoutes.value.children.some(r => newPath.startsWith(r.path))) {
        openKeys.value = ['/admin/profile']
      } else if (signInRoutes.value.children.some(r => newPath.startsWith(r.path))) {
        openKeys.value = ['/admin/sign-in']
      } else if (licenseRoutes.value.children.some(r => newPath.startsWith(r.path))) {
        openKeys.value = ['/admin/license']
      } else {
        openKeys.value = []
      }
    },
    {immediate: true}
)

defineExpose({
  addTab
})
</script>

<style lang="scss" scoped>

</style>
