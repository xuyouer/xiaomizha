<script setup lang="ts">
import {ref, onMounted, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useI18n} from 'vue-i18n'
import {message} from 'ant-design-vue'
import {
  KeyOutlined,
  ReloadOutlined,
  PlusOutlined
} from '@ant-design/icons-vue'
import humps from 'humps'
import {getLicensesByUserId, getLicenseByLicenseKey, generateTrialLicense} from '@/api'
import type {LicenseInfo, PageResult} from '@/types'
import {useUserStore} from '@/stores/user'
import {formatDateTime, getLicenseStatusMeta, getLicenseTypeMeta} from '@/utils'

const {t} = useI18n()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const licenses = ref<LicenseInfo[]>([])
const currentLicense = ref<LicenseInfo | null>(null)

const hasLicenseKeyInQuery = () => {
  return typeof route.query.licenseKey === 'string' && route.query.licenseKey.length > 0
}

const loadByLicenseKey = async (licenseKey: string) => {
  loading.value = true
  try {
    const {data} = await getLicenseByLicenseKey(licenseKey)
    if (data.code === 200 && data.data) {
      currentLicense.value = humps.camelizeKeys(data.data) as LicenseInfo
    } else {
      currentLicense.value = null
      message.error(t('licenses.messages.notFound'))
    }
  } catch (error) {
    console.error('获取许可证详情失败:', error)
    currentLicense.value = null
    message.error(t('licenses.messages.loadFailed'))
  } finally {
    loading.value = false
  }
}

const loadByCurrentUser = async () => {
  const userId = userStore.currentUserId
  if (!userId) {
    message.error(t('auth.pleaseLogin'))
    return
  }

  loading.value = true
  try {
    const {data} = await getLicensesByUserId(userId, {current: 1, pageSize: 20})
    if (data.code === 200 && data.data) {
      const page = humps.camelizeKeys(data) as PageResult<LicenseInfo>
      licenses.value = page.data || []
    } else {
      licenses.value = []
    }
  } catch (error) {
    console.error('加载个人许可证失败:', error)
    licenses.value = []
    message.error(t('licenses.messages.loadFailed'))
  } finally {
    loading.value = false
  }
}

const loadData = async () => {
  const licenseKey = route.query.licenseKey as string | undefined
  if (licenseKey) {
    await loadByLicenseKey(licenseKey)
  } else {
    await loadByCurrentUser()
  }
}

const handleApplyTrial = async () => {
  const userId = userStore.currentUserId
  const username = userStore.currentUsername
  if (!userId || !username) {
    message.error(t('auth.pleaseLogin'))
    return
  }
  try {
    const {data} = await generateTrialLicense({userId, userName: username})
    if (data.code === 200) {
      message.success(t('licenses.personal.applyTrialSuccess'))
      await loadData()
    } else {
      message.error(t('licenses.personal.applyTrialFailed'))
    }
  } catch (error) {
    console.error('申请试用许可证失败:', error)
    message.error(t('licenses.personal.applyTrialFailed'))
  }
}

const handleCreateLicense = () => {
  message.info(t('userDropdown.comingSoon'))
}

const handleBack = () => {
  router.push({path: '/admin/license/users'})
}

const handleRefresh = () => {
  loadData()
}

onMounted(() => {
  loadData()
})

watch(
    () => route.query.licenseKey,
    () => {
      loadData()
    }
)
</script>

<template>
  <div class="personal-license-management">
    <a-card class="license-card" :loading="loading">
      <template #title>
        <div class="card-title">
          <KeyOutlined/>
          {{ t('licenses.personal.title') }}
        </div>
      </template>

      <template #extra>
        <a-space>
          <a-button type="primary" @click="handleApplyTrial">
            {{ t('licenses.personal.applyTrial') }}
          </a-button>
          <a-button @click="handleCreateLicense">
            <PlusOutlined/>
            {{ t('common.add') }}
          </a-button>
          <a-button v-if="hasLicenseKeyInQuery()" @click="handleBack">
            {{ t('licenses.personal.backToList') }}
          </a-button>
          <a-button @click="handleRefresh">
            <ReloadOutlined/>
            {{ t('common.refresh') }}
          </a-button>
        </a-space>
      </template>

      <div v-if="hasLicenseKeyInQuery()">
        <a-empty v-if="!currentLicense" :description="t('licenses.personal.noData')"/>
        <a-descriptions
            v-else
            bordered
            :column="1"
            size="middle"
        >
          <a-descriptions-item :label="t('licenses.columns.licenseKey')">
            <a-typography-text copyable>{{ currentLicense.licenseKey }}</a-typography-text>
          </a-descriptions-item>
          <a-descriptions-item :label="t('licenses.columns.userName')">
            <a-tag>{{ currentLicense.userName || '-' }}</a-tag>
          </a-descriptions-item>
          <a-descriptions-item :label="t('licenses.columns.companyName')">
            <a-tag>{{ currentLicense.companyName || '-' }}</a-tag>
          </a-descriptions-item>
          <a-descriptions-item :label="t('licenses.columns.contactEmail')">
            <a-tag>{{ currentLicense.contactEmail || '-' }}</a-tag>
          </a-descriptions-item>
          <a-descriptions-item :label="t('licenses.columns.licenseType')">
            <a-tag :color="getLicenseTypeMeta(currentLicense.licenseType).color">
              {{ t(getLicenseTypeMeta(currentLicense.licenseType).i18nKey) }}
            </a-tag>
          </a-descriptions-item>
          <a-descriptions-item :label="t('licenses.columns.status')">
            <a-tag :color="getLicenseStatusMeta(currentLicense.status).color">
              {{ t(getLicenseStatusMeta(currentLicense.status).i18nKey) }}
            </a-tag>
          </a-descriptions-item>
          <a-descriptions-item :label="t('licenses.columns.startTime')">
            {{ formatDateTime(currentLicense.startTime) }}
          </a-descriptions-item>
          <a-descriptions-item :label="t('licenses.columns.endTime')">
            {{ formatDateTime(currentLicense.endTime) }}
          </a-descriptions-item>
          <a-descriptions-item :label="t('licenses.columns.productVersion')">
            <a-tag>{{ currentLicense.productVersion || '-' }}</a-tag>
          </a-descriptions-item>
          <a-descriptions-item :label="t('licenses.columns.maxConcurrentUsers')">
            {{ currentLicense.maxConcurrentUsers ?? '-' }}
          </a-descriptions-item>
          <a-descriptions-item :label="t('licenses.columns.features')">
            {{ currentLicense.features || '-' }}
          </a-descriptions-item>
          <a-descriptions-item :label="t('licenses.columns.remarks')">
            {{ currentLicense.remarks || '-' }}
          </a-descriptions-item>
        </a-descriptions>
      </div>

      <div v-else>
        <a-empty
            v-if="!licenses.length"
            :description="t('licenses.personal.noData')"
        />
        <a-table
            v-else
            :data-source="licenses"
            row-key="licenseKey"
        >
          <a-table-column
              :title="t('licenses.columns.licenseKey')"
              data-index="licenseKey"
              key="licenseKey"
              :width="260"
          >
            <template #default="{ text }">
              <a-typography-text :copyable="{ text }">
                {{ text }}
              </a-typography-text>
            </template>
          </a-table-column>
          <a-table-column
              :title="t('licenses.columns.licenseType')"
              data-index="licenseType"
              key="licenseType"
          >
            <template #default="{ text }">
              <a-tag :color="getLicenseTypeMeta(text).color">
                {{ t(getLicenseTypeMeta(text).i18nKey) }}
              </a-tag>
            </template>
          </a-table-column>
          <a-table-column
              :title="t('licenses.columns.status')"
              data-index="status"
              key="status"
          >
            <template #default="{ text }">
              <a-tag :color="getLicenseStatusMeta(text).color">
                {{ t(getLicenseStatusMeta(text).i18nKey) }}
              </a-tag>
            </template>
          </a-table-column>
          <a-table-column
              :title="t('licenses.columns.startTime')"
              data-index="startTime"
              key="startTime"
          >
            <template #default="{ text }">
              {{ formatDateTime(text) }}
            </template>
          </a-table-column>
          <a-table-column
              :title="t('licenses.columns.endTime')"
              data-index="endTime"
              key="endTime"
          >
            <template #default="{ text }">
              {{ formatDateTime(text) }}
            </template>
          </a-table-column>
        </a-table>
      </div>
    </a-card>
  </div>
</template>

<style scoped lang="scss">

</style>
