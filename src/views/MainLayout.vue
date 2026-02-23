<template>
  <a-layout class="main-layout">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      theme="dark"
      width="200"
      :breakpoint="'lg'"
      @collapse="handleCollapse"
      @expand="handleExpand"
    >
      <div class="logo">
        <h2 v-if="!collapsed" style="color: white; margin: 0; text-align: center; font-size: 18px;">小咪楂</h2>
        <h2 v-else style="color: white; margin: 0; text-align: center; font-size: 18px;">X</h2>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        theme="dark"
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
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined
            v-else
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
        </div>
        <div class="header-right">
          <a-dropdown>
            <a class="user-info" @click.prevent>
              <UserOutlined />
              <span style="margin-left: 8px">{{ userStore.userInfo?.username || '用户' }}</span>
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item @click="handleLogout">
                  <LogoutOutlined />
                  退出登录
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        小咪楂后台管理系统 ©{{ new Date().getFullYear() }} Created by Ant Design Vue
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, computed, watch, h } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  UserOutlined as UserIcon,
  TeamOutlined,
  AppstoreOutlined
} from '@ant-design/icons-vue'
import { useUserStore } from '@/stores/user'
import type { MenuProps } from 'ant-design-vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const collapsed = ref(false)
const selectedKeys = ref<string[]>([])
const openKeys = ref<string[]>([])

// 菜单项
const menuItems = computed(() => [
  {
    key: '/dashboard',
    icon: () => h(DashboardOutlined),
    label: '仪表盘',
    title: '仪表盘'
  },
  {
    key: '/system',
    icon: () => h(AppstoreOutlined),
    label: '系统管理',
    title: '系统管理',
    children: [
      {
        key: '/users',
        icon: () => h(UserIcon),
        label: '用户管理',
        title: '用户管理'
      },
      {
        key: '/roles',
        icon: () => h(TeamOutlined),
        label: '角色管理',
        title: '角色管理'
      },
      {
        key: '/resources',
        icon: () => h(AppstoreOutlined),
        label: '资源管理',
        title: '资源管理'
      }
    ]
  }
])

// 监听路由变化，更新选中的菜单项
watch(
  () => route.path,
  (newPath) => {
    selectedKeys.value = [newPath]
    // 更新打开的菜单项
    if (newPath.startsWith('/users') || newPath.startsWith('/roles') || newPath.startsWith('/resources')) {
      openKeys.value = ['/system']
    } else {
      openKeys.value = []
    }
  },
  { immediate: true }
)

// 菜单点击处理
const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
  router.push(key as string)
}

// 退出登录
const handleLogout = async () => {
  await userStore.logout()
  message.success('已退出登录')
  router.push('/login')
}

// 处理菜单展开/收起
const handleOpenChange = (keys: string[]) => {
  openKeys.value = keys
}

// 处理侧边栏折叠
const handleCollapse = () => {
  console.log('Sidebar collapsed')
}

// 处理侧边栏展开
const handleExpand = () => {
  console.log('Sidebar expanded')
}
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
}

.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: #001529;
}

.header {
  background: #fff;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 64px;
}

.header-left {
  display: flex;
  align-items: center;
}

.trigger {
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s;
  margin-right: 16px;
}

.trigger:hover {
  color: #1890ff;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.3s;
}

.user-info:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.content {
  margin: 24px;
  padding: 24px;
  background: #fff;
  min-height: calc(100vh - 192px);
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.footer {
  text-align: center;
  padding: 16px 0;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  background: #fff;
  border-top: 1px solid #f0f0f0;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .content {
    margin: 16px;
    padding: 16px;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 0 16px;
  }
  
  .content {
    margin: 8px;
    padding: 16px;
    min-height: calc(100vh - 176px);
  }
}
</style>
