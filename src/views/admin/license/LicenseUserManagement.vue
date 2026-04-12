<script setup lang="ts">
import {ref, reactive, computed, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {useI18n} from 'vue-i18n'
import {message, Modal} from 'ant-design-vue'
import {
  TeamOutlined,
  SearchOutlined,
  ReloadOutlined,
  PlusOutlined
} from '@ant-design/icons-vue'
import type {ColumnsType} from 'ant-design-vue/es/table'
import type {TablePaginationConfig} from 'ant-design-vue/es/table'
import humps from 'humps'
import {getUserList, getLicensesByUserId, deleteRelationByLicenseKeyAndUserId} from '@/api'
import type {User, LicenseInfo, PageResult} from '@/types'
import {formatDateTime, getLicenseStatusMeta, getLicenseTypeMeta, usePaginationConfig} from '@/utils'

const {t} = useI18n()
const router = useRouter()

const searchParams = reactive({
  keyword: ''
})

const loading = ref(false)
const pagination = reactive(usePaginationConfig('licenses.userManagement.pagination.total').value)

interface UserWithLicenses extends User {
  licenses?: LicenseInfo[]
  licenseCount?: number
  loadingLicenses?: boolean
  expanded?: boolean
}

const userList = ref<UserWithLicenses[]>([])

const columns = computed<ColumnsType>(() => [
  {
    title: t('licensesUserManagement.columns.userId'),
    dataIndex: 'userId',
    key: 'userId',
    width: 100
  },
  {
    title: t('licensesUserManagement.columns.username'),
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: t('licensesUserManagement.columns.accountStatus'),
    key: 'accountStatus',
    width: 100,
    align: 'center'
  },
  {
    title: t('licensesUserManagement.columns.licenseCount'),
    key: 'licenseCount',
    width: 120,
    align: 'center'
  },
  {
    title: t('licenses.columns.action'),
    key: 'action',
    width: 150,
    fixed: 'right',
    align: 'center'
  }
])

const licenseColumns = computed<ColumnsType>(() => [
  {
    title: t('licenses.columns.licenseKey'),
    dataIndex: 'licenseKey',
    key: 'licenseKey',
    width: 260,
    ellipsis: true
  },
  {
    title: t('licenses.columns.licenseType'),
    dataIndex: 'licenseType',
    key: 'licenseType',
    width: 120,
    align: 'center'
  },
  {
    title: t('licenses.columns.status'),
    dataIndex: 'status',
    key: 'status',
    width: 100,
    align: 'center'
  },
  {
    title: t('licenses.columns.startTime'),
    dataIndex: 'startTime',
    key: 'startTime',
    width: 160
  },
  {
    title: t('licenses.columns.endTime'),
    dataIndex: 'endTime',
    key: 'endTime',
    width: 160
  },
  {
    title: t('licenses.columns.action'),
    key: 'action',
    width: 150,
    fixed: 'right',
    align: 'center'
  }
])

const loadData = async () => {
  loading.value = true
  try {
    const params: {
      current: number
      pageSize: number
      keyword?: string
    } = {
      current: pagination.current,
      pageSize: pagination.pageSize
    }

    if (searchParams.keyword) {
      params.keyword = searchParams.keyword
    }

    const response = await getUserList(params)
    let {data} = response
    if (data.code === 200 && data.data) {
      data = humps.camelizeKeys(data) as PageResult<User>
      userList.value = (data.data || []).map(user => ({
        ...user,
        licenses: [],
        licenseCount: 0,
        loadingLicenses: false,
        expanded: false
      }))
      pagination.total = data.total || 0
      pagination.current = data.current || 1
      pagination.pageSize = data.pageSize || 10
    }
  } catch (error) {
    console.error('加载用户数据失败:', error)
    message.error(t('licensesUserManagement.messages.loadFailed'))
  } finally {
    loading.value = false
  }
}

const loadUserLicenses = async (userId: number) => {
  const userIndex = userList.value.findIndex(u => u.userId === userId)
  if (userIndex === -1) return

  const user = userList.value[userIndex]
  if (!user) return

  user.loadingLicenses = true
  try {
    const response = await getLicensesByUserId(userId, {current: 1, pageSize: 100})
    let {data} = response
    if (data.code === 200 && data.data) {
      data = humps.camelizeKeys(data) as PageResult<LicenseInfo>
      user.licenses = data.data || []
      user.licenseCount = data.total || 0
    }
  } catch (error) {
    console.error('加载用户许可证失败:', error)
    user.licenses = []
    user.licenseCount = 0
  } finally {
    user.loadingLicenses = false
  }
}

const handleExpand = (expanded: boolean, record: UserWithLicenses) => {
  const userIndex = userList.value.findIndex(u => u.userId === record.userId)
  if (userIndex === -1) return

  const user = userList.value[userIndex]
  if (!user) return

  user.expanded = expanded
  if (expanded && (!user.licenses || user.licenses.length === 0)) {
    loadUserLicenses(record.userId!)
  }
}

const handleSearch = () => {
  pagination.current = 1
  loadData()
}

const resetSearch = () => {
  searchParams.keyword = ''
  handleSearch()
}

const handleTableChange = (pag: TablePaginationConfig) => {
  pagination.current = pag.current || 1
  pagination.pageSize = pag.pageSize || 10
  loadData()
}

const goToLicenseDetail = (licenseKey: string) => {
  router.push({
    path: '/admin/license/personal',
    query: {licenseKey}
  })
}

const goToUserAssign = (userId: number) => {
  router.push({
    path: '/admin/system/user-assign',
    query: {userId: String(userId), openDrawer: 'true'}
  })
}

const handleRemoveLicense = (record: UserWithLicenses, license: LicenseInfo) => {
  if (!record.userId || !license.licenseKey) return

  Modal.confirm({
    title: t('licensesUserManagement.confirm.remove.title'),
    content: t('licensesUserManagement.confirm.remove.content', {
      username: record.username,
      licenseKey: license.licenseKey
    }),
    okType: 'danger',
    onOk: async () => {
      try {
        const {data} = await deleteRelationByLicenseKeyAndUserId(license.licenseKey as string, record.userId!)
        if (data.code === 200) {
          message.success(t('licensesUserManagement.messages.removeSuccess'))
          await loadUserLicenses(record.userId!)
        } else {
          message.error(t('licensesUserManagement.messages.removeFailed'))
        }
      } catch (error) {
        console.error('移除许可证失败:', error)
        message.error(t('licensesUserManagement.messages.removeFailed'))
      }
    }
  })
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="license-user-management">
    <a-card class="management-card">
      <template #title>
        <div class="card-title">
          <TeamOutlined/>
          {{ t('licensesUserManagement.title') }}
        </div>
      </template>

      <template #extra>
        <a-space>
          <a-button type="primary" @click="() => router.push('/admin/system/user-assign')">
            <PlusOutlined/>
            {{ t('licensesUserManagement.action.assignLicense') }}
          </a-button>
        </a-space>
      </template>

      <div class="search-bar">
        <a-row :gutter="[16, 16]">
          <a-col :xs="24" :sm="12" :md="8">
            <a-input
                v-model:value="searchParams.keyword"
                :placeholder="t('licensesUserManagement.search.keywordPlaceholder')"
                allow-clear
            >
              <template #prefix>
                <SearchOutlined class="search-icon"/>
              </template>
            </a-input>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8">
            <a-space>
              <a-button type="primary" @click="handleSearch">
                <SearchOutlined/>
                {{ t('common.search') }}
              </a-button>
              <a-button @click="resetSearch">
                <ReloadOutlined/>
                {{ t('common.reset') }}
              </a-button>
            </a-space>
          </a-col>
        </a-row>
      </div>

      <a-table
          :columns="columns"
          :data-source="userList"
          :pagination="pagination"
          :loading="loading"
          row-key="userId"
          :scroll="{ x: 900 }"
          @change="handleTableChange"
          @expand="handleExpand"
      >
        <template #expandedRowRender="{ record }">
          <a-spin :spinning="record.loadingLicenses">
            <a-empty v-if="!record.licenses?.length" :description="t('licensesUserManagement.noLicenses')"/>
            <a-table
                v-else
                :columns="licenseColumns"
                :data-source="record.licenses"
                :pagination="false"
                row-key="licenseKey"
                size="small"
                :scroll="{ x: 900 }"
            >
              <template #bodyCell="{ column, record: license }">
                <template v-if="column.key === 'licenseKey'">
                  <a-typography-text :copyable="{ text: license.licenseKey }">
                    {{ license.licenseKey }}
                  </a-typography-text>
                </template>
                <template v-else-if="column.key === 'licenseType'">
                  <a-tag :color="getLicenseTypeMeta(license.licenseType).color">
                    {{ t(getLicenseTypeMeta(license.licenseType).i18nKey) }}
                  </a-tag>
                </template>
                <template v-else-if="column.key === 'status'">
                  <a-tag :color="getLicenseStatusMeta(license.status).color">
                    {{ t(getLicenseStatusMeta(license.status).i18nKey) }}
                  </a-tag>
                </template>
                <template v-else-if="column.key === 'startTime'">
                  <span>{{ formatDateTime(license.startTime) }}</span>
                </template>
                <template v-else-if="column.key === 'endTime'">
                  <span>{{ formatDateTime(license.endTime) }}</span>
                </template>
                <template v-else-if="column.key === 'action'">
                  <a-space>
                    <a-button type="link" size="small" @click="goToLicenseDetail(license.licenseKey!)">
                      {{ t('licenses.userManagement.action.detail') }}
                    </a-button>
                    <a-button type="link" size="small" danger @click="handleRemoveLicense(record, license)">
                      {{ t('licensesUserManagement.action.remove') }}
                    </a-button>
                  </a-space>
                </template>
              </template>
            </a-table>
          </a-spin>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'userId'">
            <a-tag>
              {{ record.userId }}
            </a-tag>
          </template>
          <template v-if="column.key === 'username'">
            <a-tag>
              {{ record.username }}
            </a-tag>
          </template>
          <template v-if="column.key === 'accountStatus'">
            <a-tag :color="record.accountStatus === 1 ? 'green' : 'red'">
              {{ record.accountStatus === 1 ? t('userManagement.status.normal') : t('userManagement.status.disabled') }}
            </a-tag>
          </template>
          <template v-if="column.key === 'licenseCount'">
            <a-tag :color="record.licenseCount && record.licenseCount > 0 ? 'blue' : 'default'">
              {{ record.licenseCount || 0 }}
            </a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="goToUserAssign(record.userId!)">
                {{ t('licensesUserManagement.action.addLicense') }}
              </a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<style scoped lang="scss">

</style>
