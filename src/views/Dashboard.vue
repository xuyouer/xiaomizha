<template>
  <div class="dashboard">
    <a-row :gutter="16" style="margin-bottom: 24px">
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="总用户数"
            :value="1128"
            :value-style="{ color: '#3f8600' }"
          >
            <template #prefix>
              <UserOutlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="总角色数"
            :value="12"
            :value-style="{ color: '#1890ff' }"
          >
            <template #prefix>
              <TeamOutlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="总资源数"
            :value="48"
            :value-style="{ color: '#cf1322' }"
          >
            <template #prefix>
              <AppstoreOutlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="在线用户"
            :value="89"
            :value-style="{ color: '#722ed1' }"
          >
            <template #prefix>
              <CheckCircleOutlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="16">
      <a-col :span="12">
        <a-card title="系统信息">
          <a-descriptions :column="1" bordered>
            <a-descriptions-item label="系统名称">小咪楂后台管理系统</a-descriptions-item>
            <a-descriptions-item label="版本号">v1.0.0</a-descriptions-item>
            <a-descriptions-item label="当前用户">{{ userStore.userInfo?.username || '-' }}</a-descriptions-item>
            <a-descriptions-item label="登录时间">{{ new Date().toLocaleString() }}</a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="快速操作">
          <a-space direction="vertical" style="width: 100%">
            <a-button type="primary" block @click="$router.push('/users')">
              <UserOutlined /> 用户管理
            </a-button>
            <a-button block @click="$router.push('/roles')">
              <TeamOutlined /> 角色管理
            </a-button>
            <a-button block @click="$router.push('/resources')">
              <AppstoreOutlined /> 资源管理
            </a-button>
          </a-space>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import {
  UserOutlined,
  TeamOutlined,
  AppstoreOutlined,
  CheckCircleOutlined
} from '@ant-design/icons-vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<style scoped>
.dashboard {
  padding: 0;
}
</style>
