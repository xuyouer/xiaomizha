import type { RouteRecordRaw } from 'vue-router'

const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: () => import('@/views/admin/MainLayout.vue'),
    redirect: '/admin/dashboard',
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/admin/Dashboard.vue'),
        meta: {
          title: '仪表盘',
          icon: 'DashboardOutlined'
        }
      },
      {
        path: 'system/users',
        name: 'Users',
        component: () => import('@/views/admin/system/UserManagement.vue'),
        meta: {
          title: '用户管理',
          icon: 'UserOutlined'
        }
      },
      {
        path: 'system/roles',
        name: 'Roles',
        component: () => import('@/views/admin/system/RoleManagement.vue'),
        meta: {
          title: '角色管理',
          icon: 'TeamOutlined'
        }
      },
      {
        path: 'system/resources',
        name: 'Resources',
        component: () => import('@/views/admin/system/ResourceManagement.vue'),
        meta: {
          title: '资源管理',
          icon: 'AppstoreOutlined'
        }
      },
      {
        path: 'system/names',
        name: 'UserNames',
        component: () => import('@/views/admin/system/UserNamesManagement.vue'),
        meta: {
          title: '用户名信息',
          icon: 'EditOutlined'
        }
      },
      {
        path: 'system/name-history',
        name: 'UserNameHistory',
        component: () => import('@/views/admin/system/UserNameHistoryManagement.vue'),
        meta: {
          title: '用户名历史',
          icon: 'HistoryOutlined'
        }
      },
      {
        path: 'system/vip-level-config',
        name: 'VipLevelConfig',
        component: () => import('@/views/admin/system/VipLevelConfigManagement.vue'),
        meta: {
          title: 'VIP等级配置',
          icon: 'CrownOutlined'
        }
      },
      {
        path: 'system/configs',
        name: 'SystemConfigs',
        component: () => import('@/views/admin/system/SystemConfigsManagement.vue'),
        meta: {
          title: '系统配置',
          icon: 'SettingOutlined'
        }
      },
      {
        path: 'system/feedback',
        name: 'UserFeedback',
        component: () => import('@/views/admin/system/UserFeedbackManagement.vue'),
        meta: {
          title: '用户反馈',
          icon: 'MessageOutlined'
        }
      },
      {
        path: 'profile/center',
        name: 'PersonalCenter',
        component: () => import('@/views/admin/profile/PersonalCenter.vue'),
        meta: {
          title: '个人中心',
          icon: 'UserOutlined'
        }
      },
      {
        path: 'profile/settings',
        name: 'PersonalSettings',
        component: () => import('@/views/admin/profile/PersonalSettings.vue'),
        meta: {
          title: '个人设置',
          icon: 'SettingOutlined'
        }
      }
    ]
  }
]

export default adminRoutes