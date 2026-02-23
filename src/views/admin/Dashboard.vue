<template>
  <div class="dashboard">
    <a-row :gutter="16" class="statistic-row">
      <a-col :xs="24" :sm="12" :md="6">
        <a-card class="statistic-card">
          <a-statistic
              title="总用户数"
              :value="statistics.userCount"
              :value-style="{ color: '#3f8600' }"
          >
            <template #prefix>
              <UserOutlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <a-card class="statistic-card">
          <a-statistic
              title="总角色数"
              :value="statistics.roleCount"
              :value-style="{ color: '#1890ff' }"
          >
            <template #prefix>
              <TeamOutlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <a-card class="statistic-card">
          <a-statistic
              title="总资源数"
              :value="statistics.resourceCount"
              :value-style="{ color: '#cf1322' }"
          >
            <template #prefix>
              <AppstoreOutlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <a-card class="statistic-card">
          <a-statistic
              title="在线用户"
              :value="statistics.onlineCount"
              :value-style="{ color: '#722ed1' }"
          >
            <template #prefix>
              <CheckCircleOutlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="16" class="info-row">
      <a-col :xs="24" :md="12">
        <a-card title="系统信息" class="info-card">
          <a-descriptions :column="1" bordered>
            <a-descriptions-item label="系统名称">小咪楂后台管理系统</a-descriptions-item>
            <a-descriptions-item label="版本号">v1.0.0</a-descriptions-item>
            <a-descriptions-item label="当前用户">{{ userStore.currentUsername || '-' }}</a-descriptions-item>
            <a-descriptions-item label="登录时间">{{ formatDate(new Date().toISOString()) }}</a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-col>
      <a-col :xs="24" :md="12">
        <a-card title="快速操作" class="action-card">
          <a-space direction="vertical" style="width: 100%">
            <a-button type="primary" block @click="handleNavigate('/admin/system/users')">
              <UserOutlined /> 用户管理
            </a-button>
            <a-button block @click="handleNavigate('/admin/system/roles')">
              <TeamOutlined /> 角色管理
            </a-button>
            <a-button block @click="handleNavigate('/admin/system/resources')">
              <AppstoreOutlined /> 资源管理
            </a-button>
          </a-space>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  UserOutlined,
  TeamOutlined,
  AppstoreOutlined,
  CheckCircleOutlined
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/stores/user'
import { getUserList } from '@/api/user'
import { getRoleList } from '@/api/role'
import { getResourceList } from '@/api/resource'

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
      getUserList({ current: 1, pageSize: 1 }),
      getRoleList({ current: 1, pageSize: 1 }),
      getResourceList({ current: 1, pageSize: 1 })
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
    message.error('加载统计数据失败')
  }
}

onMounted(() => {
  loadStatistics()
})
</script>

<style lang="scss" scoped>

</style>
