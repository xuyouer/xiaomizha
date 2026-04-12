<template>
  <div class="dashboard">
    <a-row :gutter="[16, 16]" class="statistic-row">
      <a-col :xs="12" :sm="12" :md="6">
        <a-card class="statistic-card">
          <a-statistic :title="t('dashboard.totalUsers')" :value="statistics.userCount">
            <template #prefix>
              <UserOutlined class="stat-icon user-icon"/>
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :xs="12" :sm="12" :md="6">
        <a-card class="statistic-card">
          <a-statistic :title="t('dashboard.totalRoles')" :value="statistics.roleCount">
            <template #prefix>
              <TeamOutlined class="stat-icon role-icon"/>
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :xs="12" :sm="12" :md="6">
        <a-card class="statistic-card">
          <a-statistic :title="t('dashboard.totalResources')" :value="statistics.resourceCount">
            <template #prefix>
              <AppstoreOutlined class="stat-icon resource-icon"/>
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :xs="12" :sm="12" :md="6">
        <a-card class="statistic-card">
          <a-statistic :title="t('dashboard.onlineUsers')" :value="statistics.onlineCount">
            <template #prefix>
              <CheckCircleOutlined class="stat-icon online-icon"/>
            </template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[16, 16]" class="content-row">
      <a-col :xs="24" :lg="12">
        <a-card :title="t('dashboard.systemInfo')" class="info-card">
          <template #extra>
            <a-tag color="blue">v1.0.0</a-tag>
          </template>
          <a-descriptions :column="1" bordered size="small">
            <a-descriptions-item :label="t('dashboard.systemName')">
              <a-typography-text strong>{{ t('app.title') }}</a-typography-text>
            </a-descriptions-item>
            <a-descriptions-item :label="t('dashboard.currentUser')">
              <a-space>
                <a-avatar shape="square" size="small" style="background: var('--primary-color')">
                  {{ userStore.currentUsername?.charAt(0).toUpperCase() }}
                </a-avatar>
                <a-typography-text>{{ userStore.currentUsername || '-' }}</a-typography-text>
              </a-space>
            </a-descriptions-item>
            <a-descriptions-item :label="t('dashboard.loginTime')">
              {{ formatDate(new Date().toISOString()) }}
            </a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-col>

      <a-col :xs="24" :lg="12">
        <a-card :title="t('dashboard.quickActions')" class="action-card">
          <template #extra>
            <a-typography-link>
              {{ t('dashboard.viewAll') }}
            </a-typography-link>
          </template>
          <a-row :gutter="[12, 12]">
            <a-col :span="12">
              <a-button type="primary" block @click="handleNavigate('/admin/system/users')">
                <template #icon>
                  <UserOutlined/>
                </template>
                {{ t('dashboard.userManagement') }}
              </a-button>
            </a-col>
            <a-col :span="12">
              <a-button block @click="handleNavigate('/admin/system/roles')">
                <template #icon>
                  <TeamOutlined/>
                </template>
                {{ t('dashboard.roleManagement') }}
              </a-button>
            </a-col>
            <a-col :span="12">
              <a-button block @click="handleNavigate('/admin/system/resources')">
                <template #icon>
                  <AppstoreOutlined/>
                </template>
                {{ t('dashboard.resourceManagement') }}
              </a-button>
            </a-col>
            <a-col :span="12">
              <a-button block @click="handleNavigate('/admin/sign-in/center')">
                <template #icon>
                  <CalendarOutlined/>
                </template>
                {{ t('dashboard.signInCenter') }}
              </a-button>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import {reactive, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {useI18n} from 'vue-i18n'
import {
  UserOutlined,
  TeamOutlined,
  AppstoreOutlined,
  CheckCircleOutlined,
  CalendarOutlined
} from '@ant-design/icons-vue'
import {message} from 'ant-design-vue'
import {useUserStore} from "@/stores/user"
import {getResourceList, getRoleList, getUserList} from "@/api"

const {t} = useI18n()

interface Statistics {
  userCount: number
  roleCount: number
  resourceCount: number
  onlineCount: number
}

const router = useRouter()
const userStore = useUserStore()

const statistics = reactive<Statistics>({
  userCount: 0,
  roleCount: 0,
  resourceCount: 0,
  onlineCount: 0
})

const formatDate = (date: string | undefined): string => {
  if (!date) return new Date().toLocaleString()
  return new Date(date).toLocaleString()
}

const handleNavigate = (path: string): void => {
  router.push(path)
}

const loadStatistics = async (): Promise<void> => {
  try {
    const [userResponse, roleResponse, resourceResponse] = await Promise.all([
      getUserList({current: 1, pageSize: 1}),
      getRoleList({current: 1, pageSize: 1}),
      getResourceList({current: 1, pageSize: 1})
    ])

    if (userResponse.data.code === 200) {
      statistics.userCount = userResponse.data.total || 0
    }
    if (roleResponse.data.code === 200) {
      statistics.roleCount = roleResponse.data.total || 0
    }
    if (resourceResponse.data.code === 200) {
      statistics.resourceCount = resourceResponse.data.total || 0
    }
    statistics.onlineCount = Math.floor(Math.random() * 50) + 50
  } catch {
    message.error(t('dashboard.loadStatsFailed'))
  }
}

onMounted(() => {
  loadStatistics()
})
</script>

<style lang="scss" scoped>

</style>
