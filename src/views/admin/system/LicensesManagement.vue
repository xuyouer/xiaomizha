<script setup lang="ts">
import {ref, reactive, computed, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {useI18n} from 'vue-i18n'
import {message, Modal} from 'ant-design-vue'
import {
  SafetyOutlined,
  SearchOutlined,
  ReloadOutlined,
  PlusOutlined,
  UserOutlined
} from '@ant-design/icons-vue'
import type {ColumnsType} from 'ant-design-vue/es/table'
import type {TablePaginationConfig} from 'ant-design-vue/es/table'
import type {Dayjs} from 'dayjs'
import humps from 'humps'
import {
  getLicenseList,
  disableLicense,
  enableLicense,
  getUsersByLicenseKey,
  deleteAllRelationsByLicenseKey
} from '@/api'
import type {LicenseInfo, LicenseUserRelation, PageResult} from '@/types'
import {
  formatDateTime,
  getLicenseStatusMeta,
  getLicenseTypeMeta,
  useLicenseTypeOptions,
  useLicenseStatusOptions,
  usePaginationConfig
} from '@/utils'
import FormDrawer from '@/components/FormDrawer.vue'

const {t} = useI18n()
const router = useRouter()

const searchParams = reactive({
  licenseKey: '',
  licenseType: '',
  status: ''
})

const loading = ref(false)
const pagination = reactive(usePaginationConfig('licenses.pagination.total').value)

const licenseList = ref<LicenseInfo[]>([])

const licenseTypeOptions = useLicenseTypeOptions()
const statusOptions = useLicenseStatusOptions()

const columns = computed<ColumnsType>(() => [
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
    title: t('licensesManagement.columns.assignedUsers'),
    key: 'assignedUsers',
    width: 100,
    align: 'center'
  },
  {
    title: t('licenses.columns.action'),
    key: 'action',
    width: 200,
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
      licenseKey?: string
      licenseType?: string
      status?: string
    } = {
      current: pagination.current,
      pageSize: pagination.pageSize
    }

    if (searchParams.licenseKey) {
      params.licenseKey = searchParams.licenseKey
    }
    if (searchParams.licenseType) {
      params.licenseType = searchParams.licenseType
    }
    if (searchParams.status) {
      params.status = searchParams.status
    }

    const response = await getLicenseList(params)
    let {data} = response
    if (data.code === 200 && data.data) {
      data = humps.camelizeKeys(data) as PageResult<LicenseInfo>
      licenseList.value = data.data || []
      pagination.total = data.total || 0
      pagination.current = data.current || 1
      pagination.pageSize = data.pageSize || 10
    }
  } catch (error) {
    console.error('加载许可证数据失败:', error)
    message.error(t('licenses.messages.loadFailed'))
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  pagination.current = 1
  loadData()
}

const resetSearch = () => {
  searchParams.licenseKey = ''
  searchParams.licenseType = ''
  searchParams.status = ''
  handleSearch()
}

const handleTableChange = (pag: TablePaginationConfig) => {
  pagination.current = pag.current || 1
  pagination.pageSize = pag.pageSize || 10
  loadData()
}

const goToDetail = (record: LicenseInfo) => {
  if (!record.licenseKey) return
  router.push({
    path: '/admin/license/personal',
    query: {licenseKey: record.licenseKey}
  })
}

const drawerVisible = ref(false)
const drawerRef = ref<InstanceType<typeof FormDrawer>>()
const submitLoading = ref(false)
const currentLicense = ref<LicenseInfo | null>(null)
const currentLicenseUsers = ref<LicenseUserRelation[]>([])
const loadingUsers = ref(false)

const formData = reactive({
  userName: '',
  companyName: '',
  productVersion: '',
  licenseType: '' as string,
  status: '' as string,
  startTime: undefined as Dayjs | undefined,
  endTime: undefined as Dayjs | undefined,
  contactEmail: '',
  maxConcurrentUsers: undefined as number | undefined,
  allowOffline: undefined as number | undefined,
  features: '',
  hardwareInfo: '',
  activationCode: '',
  remarks: '',
  createdBy: ''
})

const panels = computed(() => [
  {key: 'basic', header: t('licensesManagement.form.basicInfo')},
  {key: 'extended', header: t('licensesManagement.form.extendedInfo')},
  {key: 'users', header: t('licensesManagement.form.assignedUsers')}
])

const rules = computed(() => ({
  userName: [{required: true, message: t('licensesManagement.form.validate.userName'), trigger: 'blur'}],
  companyName: [{required: true, message: t('licensesManagement.form.validate.companyName'), trigger: 'blur'}],
  productVersion: [{required: true, message: t('licensesManagement.form.validate.productVersion'), trigger: 'blur'}],
  licenseType: [{required: true, message: t('licensesManagement.form.validate.licenseType'), trigger: 'change'}],
  status: [{required: true, message: t('licensesManagement.form.validate.status'), trigger: 'change'}]
}))

const loadAssignedUsers = async (licenseKey: string) => {
  loadingUsers.value = true
  try {
    const {data} = await getUsersByLicenseKey(licenseKey)
    if (data.code === 200 && data.data) {
      currentLicenseUsers.value = humps.camelizeKeys(data.data) as LicenseUserRelation[]
    } else {
      currentLicenseUsers.value = []
    }
  } catch (error) {
    console.error('获取关联用户失败:', error)
    currentLicenseUsers.value = []
  } finally {
    loadingUsers.value = false
  }
}

const handleEdit = async (record: LicenseInfo) => {
  currentLicense.value = record
  formData.userName = record.userName || ''
  formData.companyName = record.companyName || ''
  formData.productVersion = record.productVersion || ''
  formData.licenseType = record.licenseType || ''
  formData.status = record.status || ''
  formData.startTime = undefined
  formData.endTime = undefined
  formData.contactEmail = record.contactEmail || ''
  formData.maxConcurrentUsers = record.maxConcurrentUsers
  formData.allowOffline = record.allowOffline
  formData.features = record.features || ''
  formData.hardwareInfo = record.hardwareInfo || ''
  formData.activationCode = record.activationCode || ''
  formData.remarks = record.remarks || ''
  formData.createdBy = record.createdBy || ''
  currentLicenseUsers.value = []
  drawerVisible.value = true
  if (record.licenseKey) {
    await loadAssignedUsers(record.licenseKey)
  }
}

const handleSubmit = async () => {
  try {
    await drawerRef.value?.validate()
    submitLoading.value = true
    message.info(t('userDropdown.comingSoon'))
    drawerVisible.value = false
  } catch (error) {
    console.error('表单验证失败:', error)
  } finally {
    submitLoading.value = false
  }
}

const handleCancel = () => {
  drawerVisible.value = false
  drawerRef.value?.resetFields()
}

const handleToggleStatus = (record: LicenseInfo) => {
  if (!record.licenseKey) return

  const isActive = record.status === 'ACTIVE'
  const action = isActive ? 'disable' : 'enable'

  Modal.confirm({
    title: t(`licensesManagement.confirm.${action}.title`),
    content: t(`licensesManagement.confirm.${action}.content`, {licenseKey: record.licenseKey}),
    okType: isActive ? 'danger' : 'primary',
    onOk: async () => {
      try {
        const apiFunc = isActive ? disableLicense : enableLicense
        const {data} = await apiFunc(record.licenseKey as string)
        if (data.code === 200 && data.data) {
          message.success(t(`licenses.messages.${action}Success`))
          loadData()
        } else {
          message.error(t(`licenses.messages.${action}Failed`))
        }
      } catch (error) {
        console.error(`${action}许可证失败:`, error)
        message.error(t(`licenses.messages.${action}Failed`))
      }
    }
  })
}

const handleDelete = (record: LicenseInfo) => {
  if (!record.licenseKey) return
  Modal.confirm({
    title: t('licensesManagement.confirm.delete.title'),
    content: t('licensesManagement.confirm.delete.content', {licenseKey: record.licenseKey}),
    okType: 'danger',
    onOk: async () => {
      try {
        const {data} = await deleteAllRelationsByLicenseKey(record.licenseKey as string)
        if (data.code === 200) {
          message.success(t('licensesManagement.messages.deleteSuccess'))
          loadData()
        } else {
          message.error(t('licensesManagement.messages.deleteFailed'))
        }
      } catch (error) {
        console.error('删除许可证失败:', error)
        message.error(t('licensesManagement.messages.deleteFailed'))
      }
    }
  })
}

const goToUserLicense = (userId: number) => {
  router.push({
    path: '/admin/license/personal',
    query: {userId: String(userId)}
  })
  drawerVisible.value = false
}

const handleAddLicense = () => {
  message.info(t('userDropdown.comingSoon'))
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="licenses-management">
    <a-card class="management-card">
      <template #title>
        <div class="card-title">
          <SafetyOutlined/>
          {{ t('licensesManagement.title') }}
        </div>
      </template>

      <template #extra>
        <a-space>
          <a-button type="primary" @click="handleAddLicense">
            <PlusOutlined/>
            {{ t('common.add') }}
          </a-button>
        </a-space>
      </template>

      <div class="search-bar">
        <a-row :gutter="[16, 16]">
          <a-col :xs="24" :sm="12" :md="6">
            <a-input
                v-model:value="searchParams.licenseKey"
                :placeholder="t('licenses.search.licenseKeyPlaceholder')"
                allow-clear
            >
              <template #prefix>
                <SearchOutlined class="search-icon"/>
              </template>
            </a-input>
          </a-col>
          <a-col :xs="24" :sm="12" :md="5">
            <a-select
                v-model:value="searchParams.licenseType"
                :placeholder="t('licensesManagement.search.licenseTypePlaceholder')"
                :options="licenseTypeOptions"
                allow-clear
                style="width: 100%"
            />
          </a-col>
          <a-col :xs="24" :sm="12" :md="5">
            <a-select
                v-model:value="searchParams.status"
                :placeholder="t('licensesManagement.search.statusPlaceholder')"
                :options="statusOptions"
                allow-clear
                style="width: 100%"
            />
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
          :data-source="licenseList"
          :pagination="pagination"
          :loading="loading"
          row-key="licenseKey"
          :scroll="{ x: 1200 }"
          @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'licenseKey'">
            <a-typography-text :copyable="{ text: record.licenseKey }">
              {{ record.licenseKey }}
            </a-typography-text>
          </template>
          <template v-else-if="column.key === 'licenseType'">
            <a-tag :color="getLicenseTypeMeta(record.licenseType).color">
              {{ t(getLicenseTypeMeta(record.licenseType).i18nKey) }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'status'">
            <a-tag :color="getLicenseStatusMeta(record.status).color">
              {{ t(getLicenseStatusMeta(record.status).i18nKey) }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'startTime'">
            <span>{{ formatDateTime(record.startTime) }}</span>
          </template>
          <template v-else-if="column.key === 'endTime'">
            <span>{{ formatDateTime(record.endTime) }}</span>
          </template>
          <template v-else-if="column.key === 'assignedUsers'">
            <a-button type="link" size="small" @click="handleEdit(record)">
              {{ t('licensesManagement.action.viewUsers') }}
            </a-button>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="goToDetail(record)">
                {{ t('licenses.userManagement.action.detail') }}
              </a-button>
              <a-button type="link" size="small" @click="handleEdit(record)">
                {{ t('common.edit') }}
              </a-button>
              <a-button
                  type="link"
                  size="small"
                  :danger="record.status === 'ACTIVE'"
                  @click="handleToggleStatus(record)"
              >
                {{
                  record.status === 'ACTIVE' ? t('licensesManagement.action.disable') : t('licensesManagement.action.enable')
                }}
              </a-button>
              <a-button type="link" size="small" danger @click="handleDelete(record)">
                {{ t('common.delete') }}
              </a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>

    <FormDrawer
        ref="drawerRef"
        v-model:open="drawerVisible"
        :title="t('licensesManagement.form.editTitle')"
        :model-value="formData"
        :rules="rules"
        :width="700"
        :panels="panels"
        :confirm-loading="submitLoading"
        @ok="handleSubmit"
        @cancel="handleCancel"
    >
      <template #extra>
        <a-descriptions :column="2" size="small" bordered style="padding-bottom: 24px">
          <a-descriptions-item :label="t('licenses.columns.licenseKey')">
            <a-typography-text :copyable="{ text: currentLicense?.licenseKey }">
              {{ currentLicense?.licenseKey }}
            </a-typography-text>
          </a-descriptions-item>
          <a-descriptions-item :label="t('licenses.columns.licenseId')">
            {{ currentLicense?.licenseId || '-' }}
          </a-descriptions-item>
        </a-descriptions>
      </template>
      <template #basic>
        <a-form-item :label="t('licenses.columns.userName')" name="userName">
          <a-input
              v-model:value="formData.userName"
              :placeholder="t('licensesManagement.form.userNamePlaceholder')"
          />
        </a-form-item>
        <a-form-item :label="t('licenses.columns.companyName')" name="companyName">
          <a-input
              v-model:value="formData.companyName"
              :placeholder="t('licensesManagement.form.companyNamePlaceholder')"
          />
        </a-form-item>
        <a-form-item :label="t('licenses.columns.productVersion')" name="productVersion">
          <a-input
              v-model:value="formData.productVersion"
              :placeholder="t('licensesManagement.form.productVersionPlaceholder')"
          />
        </a-form-item>
        <a-form-item :label="t('licenses.columns.licenseType')" name="licenseType">
          <a-select
              v-model:value="formData.licenseType"
              :placeholder="t('licensesManagement.form.selectLicenseType')"
              :options="licenseTypeOptions"
          />
        </a-form-item>
        <a-form-item :label="t('licenses.columns.status')" name="status">
          <a-select
              v-model:value="formData.status"
              :placeholder="t('licensesManagement.form.selectStatus')"
              :options="statusOptions"
          />
        </a-form-item>
        <a-form-item :label="t('licenses.columns.startTime')" name="startTime">
          <a-date-picker
              v-model:value="formData.startTime"
              show-time
              :placeholder="t('licensesManagement.form.selectStartTime')"
              style="width: 100%"
          />
        </a-form-item>
        <a-form-item :label="t('licenses.columns.endTime')" name="endTime">
          <a-date-picker
              v-model:value="formData.endTime"
              show-time
              :placeholder="t('licensesManagement.form.selectEndTime')"
              style="width: 100%"
          />
        </a-form-item>
      </template>
      <template #extended>
        <a-form-item :label="t('licenses.columns.contactEmail')" name="contactEmail">
          <a-input
              v-model:value="formData.contactEmail"
              :placeholder="t('licensesManagement.form.contactEmailPlaceholder')"
          />
        </a-form-item>
        <a-form-item :label="t('licenses.columns.maxConcurrentUsers')" name="maxConcurrentUsers">
          <a-input-number
              v-model:value="formData.maxConcurrentUsers"
              :min="1"
              :placeholder="t('licensesManagement.form.maxConcurrentUsersPlaceholder')"
              style="width: 100%"
          />
        </a-form-item>
        <a-form-item :label="t('licenses.columns.allowOffline')" name="allowOffline">
          <a-select
              v-model:value="formData.allowOffline"
              :placeholder="t('licensesManagement.form.selectAllowOffline')"
          >
            <a-select-option :value="0">{{ t('licensesManagement.form.offlineDisabled') }}</a-select-option>
            <a-select-option :value="1">{{ t('licensesManagement.form.offlineEnabled') }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="t('licenses.columns.features')" name="features">
          <a-textarea
              v-model:value="formData.features"
              :placeholder="t('licensesManagement.form.featuresPlaceholder')"
              :rows="3"
          />
        </a-form-item>
        <a-form-item :label="t('licenses.columns.hardwareInfo')" name="hardwareInfo">
          <a-textarea
              v-model:value="formData.hardwareInfo"
              :placeholder="t('licensesManagement.form.hardwareInfoPlaceholder')"
              :rows="2"
          />
        </a-form-item>
        <a-form-item :label="t('licenses.columns.activationCode')" name="activationCode">
          <a-input
              v-model:value="formData.activationCode"
              :placeholder="t('licensesManagement.form.activationCodePlaceholder')"
          />
        </a-form-item>
        <a-form-item :label="t('licenses.columns.remarks')" name="remarks">
          <a-textarea
              v-model:value="formData.remarks"
              :placeholder="t('licensesManagement.form.remarksPlaceholder')"
              :rows="3"
          />
        </a-form-item>
        <a-form-item :label="t('licenses.columns.createdBy')" name="createdBy">
          <a-input
              v-model:value="formData.createdBy"
              disabled
          />
        </a-form-item>
      </template>
      <template #users>
        <a-spin :spinning="loadingUsers">
          <a-empty v-if="!currentLicenseUsers.length" :description="t('licensesManagement.modal.noAssignedUsers')"/>
          <a-list v-else :data-source="currentLicenseUsers" item-layout="horizontal">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta>
                  <template #avatar>
                    <a-avatar shape="square" :style="{ backgroundColor: 'var(--primary-color)' }">
                      <UserOutlined/>
                    </a-avatar>
                  </template>
                  <template #title>
                    <a @click="goToUserLicense(item.userId!)">{{ t('licensesManagement.modal.userId') }}: {{
                        item.userId
                      }}</a>
                  </template>
                  <template #description>
                    <a-space direction="vertical" :size="4">
                      <span>{{ t('licensesManagement.modal.status') }}:
                        <a-tag :color="item.status === 'ACTIVE' ? 'green' : 'default'">
                          {{ item.status || '-' }}
                        </a-tag>
                      </span>
                      <span v-if="item.assignedAt">
                        {{ t('licensesManagement.modal.assignedAt') }}: {{ formatDateTime(item.assignedAt) }}
                      </span>
                    </a-space>
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
        </a-spin>
      </template>
    </FormDrawer>
  </div>
</template>

<style scoped lang="scss">

</style>
