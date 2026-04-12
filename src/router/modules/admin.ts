import type {RouteRecordRaw} from 'vue-router'

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
                path: 'system',
                name: 'SystemManagement',
                meta: {
                    title: '系统管理',
                    icon: 'SettingOutlined'
                },
                children: [
                    {
                        path: 'users',
                        name: 'Users',
                        component: () => import('@/views/admin/system/UserManagement.vue'),
                        meta: {
                            title: '用户管理',
                            icon: 'UserOutlined'
                        }
                    },
                    {
                        path: 'user-assign',
                        name: 'UserAssign',
                        component: () => import('@/views/admin/system/UserAssignManagement.vue'),
                        meta: {
                            title: '用户分配',
                            icon: 'UserSwitchOutlined'
                        }
                    },
                    {
                        path: 'profiles',
                        name: 'Profiles',
                        component: () => import('@/views/admin/system/ProfilesManagement.vue'),
                        meta: {
                            title: '用户资料管理',
                            icon: 'IdcardOutlined'
                        }
                    },
                    {
                        path: 'user-details',
                        name: 'UserDetails',
                        component: () => import('@/views/admin/system/UserDetailManagement.vue'),
                        meta: {
                            title: '用户详情管理',
                            icon: 'UserOutlined'
                        }
                    },
                    {
                        path: 'roles',
                        name: 'Roles',
                        component: () => import('@/views/admin/system/RoleManagement.vue'),
                        meta: {
                            title: '角色管理',
                            icon: 'TeamOutlined'
                        }
                    },
                    {
                        path: 'resources',
                        name: 'Resources',
                        component: () => import('@/views/admin/system/ResourceManagement.vue'),
                        meta: {
                            title: '资源管理',
                            icon: 'AppstoreOutlined'
                        }
                    },
                    {
                        path: 'names',
                        name: 'UserNames',
                        component: () => import('@/views/admin/system/UserNamesManagement.vue'),
                        meta: {
                            title: '用户名信息',
                            icon: 'EditOutlined'
                        }
                    },
                    {
                        path: 'name-history',
                        name: 'UserNameHistory',
                        component: () => import('@/views/admin/system/UserNameHistoryManagement.vue'),
                        meta: {
                            title: '用户名历史',
                            icon: 'HistoryOutlined'
                        }
                    },
                    {
                        path: 'vip-level-config',
                        name: 'VipLevelConfig',
                        component: () => import('@/views/admin/system/VipLevelConfigManagement.vue'),
                        meta: {
                            title: 'VIP等级配置',
                            icon: 'CrownOutlined'
                        }
                    },
                    {
                        path: 'configs',
                        name: 'SystemConfigs',
                        component: () => import('@/views/admin/system/SystemConfigsManagement.vue'),
                        meta: {
                            title: '系统配置',
                            icon: 'SettingOutlined'
                        }
                    },
                    {
                        path: 'feedback',
                        name: 'UserFeedback',
                        component: () => import('@/views/admin/system/UserFeedbackManagement.vue'),
                        meta: {
                            title: '用户反馈',
                            icon: 'MessageOutlined'
                        }
                    },
                    {
                        path: 'licenses',
                        name: 'Licenses',
                        component: () => import('@/views/admin/system/LicensesManagement.vue'),
                        meta: {
                            title: '许可证管理',
                            icon: 'KeyOutlined'
                        }
                    }
                ]
            },
            {
                path: 'profile',
                name: 'ProfileManagement',
                meta: {
                    title: '个人管理',
                    icon: 'UserOutlined'
                },
                children: [
                    {
                        path: 'center',
                        name: 'PersonalCenter',
                        component: () => import('@/views/admin/profile/PersonalCenter.vue'),
                        meta: {
                            title: '个人中心',
                            icon: 'UserOutlined'
                        }
                    },
                    {
                        path: 'settings',
                        name: 'PersonalSettings',
                        component: () => import('@/views/admin/profile/PersonalSettings.vue'),
                        meta: {
                            title: '个人设置',
                            icon: 'SettingOutlined'
                        }
                    },
                    {
                        path: 'security',
                        name: 'PersonalSecurity',
                        component: () => import('@/views/admin/profile/PersonalSecurity.vue'),
                        meta: {
                            title: '账户安全',
                            icon: 'SafetyCertificateOutlined'
                        }
                    }
                ]
            },
            {
                path: 'sign-in',
                name: 'SignInManagement',
                meta: {
                    title: '签到管理',
                    icon: 'CalendarOutlined'
                },
                children: [
                    {
                        path: 'center',
                        name: 'SignInCenter',
                        component: () => import('@/views/admin/signin/SignInCenter.vue'),
                        meta: {
                            title: '签到中心',
                            icon: 'UserOutlined'
                        }
                    },
                    {
                        path: 'users',
                        name: 'SignInUserManagement',
                        component: () => import('@/views/admin/signin/SignInUserManagement.vue'),
                        meta: {
                            title: '用户管理',
                            icon: 'TeamOutlined'
                        }
                    },
                    {
                        path: 'repair-cards',
                        name: 'RepairCardManagement',
                        component: () => import('@/views/admin/signin/RepairCardManagement.vue'),
                        meta: {
                            title: '补签卡管理',
                            icon: 'GiftOutlined'
                        }
                    }
                ]
            },
            {
                path: 'license',
                name: 'LicenseManagement',
                meta: {
                    title: '许可证管理',
                    icon: 'KeyOutlined'
                },
                children: [
                    {
                        path: 'personal',
                        name: 'PersonalLicenseManagement',
                        component: () => import('@/views/admin/license/PersonalLicenseManagement.vue'),
                        meta: {
                            title: '个人许可证',
                            icon: 'IdcardOutlined'
                        }
                    },
                    {
                        path: 'users',
                        name: 'LicenseUserManagement',
                        component: () => import('@/views/admin/license/LicenseUserManagement.vue'),
                        meta: {
                            title: '所有用户许可证',
                            icon: 'TeamOutlined'
                        }
                    }
                ]
            }
        ]
    }
]

export default adminRoutes