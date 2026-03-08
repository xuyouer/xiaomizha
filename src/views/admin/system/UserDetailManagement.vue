<script setup lang="ts">
import {ref, computed, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {message} from 'ant-design-vue'
import {
  SearchOutlined,
  ReloadOutlined,
  CrownOutlined,
  IdcardOutlined,
  UserOutlined,
  SolutionOutlined,
  TrophyOutlined,
  SafetyOutlined,
  HistoryOutlined,
  MessageOutlined,
  KeyOutlined,
  EditOutlined
} from '@ant-design/icons-vue'
import type {ColumnType} from 'ant-design-vue/es/table'
import {getUserDetail, getUserIdByUsername} from '@/api'
import {getFeedbacksByUserId} from '@/api/feedback'
import {getLicensesByUserId} from '@/api/license'
import type {UserDetailDTO, UserFeedbackRecord, LicenseInfo} from '@/types/api'
import humps from 'humps'
import {useI18n} from 'vue-i18n'
import {useUserStore} from '@/stores/user'

const {t} = useI18n()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const searchUserId = ref<number | undefined>()
const searchUsername = ref<string>('')
const userDetail = ref<UserDetailDTO | null>(null)
const userFeedbacks = ref<UserFeedbackRecord[]>([])
const userLicenses = ref<LicenseInfo[]>([])

const roleColumns = computed<ColumnType[]>(() => [
  {
    title: t('userDetail.roleId'),
    dataIndex: 'roleId',
    key: 'roleId',
    width: 100
  },
  {
    title: t('userDetail.roleName'),
    dataIndex: 'roleName',
    key: 'roleName'
  },
  {
    title: t('userDetail.roleCode'),
    dataIndex: 'roleCode',
    key: 'roleCode'
  },
  {
    title: t('userDetail.isSystemRole'),
    key: 'isSystemRole',
    width: 100
  },
  {
    title: t('userDetail.status'),
    key: 'status',
    width: 80
  }
])

const nameHistoryColumns = computed<ColumnType[]>(() => [
  {
    title: t('userDetail.historyId'),
    dataIndex: 'historyId',
    key: 'historyId',
    width: 100
  },
  {
    title: t('userDetail.oldDisplayName'),
    dataIndex: 'oldDisplayName',
    key: 'oldDisplayName'
  },
  {
    title: t('userDetail.newDisplayName'),
    dataIndex: 'newDisplayName',
    key: 'newDisplayName'
  },
  {
    title: t('userDetail.changedAt'),
    dataIndex: 'changedAt',
    key: 'changedAt',
    width: 180
  }
])

const feedbackColumns = computed<ColumnType[]>(() => [
  {
    title: t('userDetail.feedbackId'),
    dataIndex: 'id',
    key: 'id',
    width: 80
  },
  {
    title: t('userDetail.feedbackType'),
    key: 'type',
    width: 120
  },
  {
    title: t('userDetail.feedbackContent'),
    dataIndex: 'content',
    key: 'content',
    ellipsis: true
  },
  {
    title: t('userDetail.feedbackStatus'),
    key: 'status',
    width: 100
  },
  {
    title: t('userDetail.feedbackCreatedAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 180
  }
])

const licenseColumns = computed<ColumnType[]>(() => [
  {
    title: t('userDetail.licenseKey'),
    dataIndex: 'licenseKey',
    key: 'licenseKey',
    width: 200,
    ellipsis: true
  },
  {
    title: t('userDetail.licenseType'),
    dataIndex: 'licenseType',
    key: 'licenseType',
    width: 100
  },
  {
    title: t('userDetail.licenseStatus'),
    key: 'status',
    width: 100
  },
  {
    title: t('userDetail.licenseStartTime'),
    dataIndex: 'startTime',
    key: 'startTime',
    width: 120
  },
  {
    title: t('userDetail.licenseEndTime'),
    dataIndex: 'endTime',
    key: 'endTime',
    width: 120
  }
])

const getGenderText = (gender?: string): string => {
  if (!gender) return '-'
  switch (gender.toUpperCase()) {
    case 'MALE':
      return t('userDetail.genderMale')
    case 'FEMALE':
      return t('userDetail.genderFemale')
    default:
      return t('userDetail.genderOther')
  }
}

const getFeedbackTypeText = (type?: number): string => {
  if (type === undefined) return '-'
  switch (type) {
    case 1:
      return t('userFeedback.common.type.systemIssue')
    case 2:
      return t('userFeedback.common.type.featureSuggestion')
    case 3:
      return t('userFeedback.common.type.bugReport')
    default:
      return t('userFeedback.common.type.other')
  }
}

const getFeedbackStatusText = (status?: number): string => {
  if (status === undefined) return '-'
  switch (status) {
    case 0:
      return t('userFeedback.common.status.pending')
    case 1:
      return t('userFeedback.common.status.accepted')
    case 2:
      return t('userFeedback.common.status.resolved')
    default:
      return t('userFeedback.common.status.closed')
  }
}

const getFeedbackStatusColor = (status?: number): string => {
  if (status === undefined) return 'default'
  switch (status) {
    case 0:
      return 'orange'
    case 1:
      return 'blue'
    case 2:
      return 'green'
    default:
      return 'default'
  }
}

const getLicenseStatusColor = (status?: string): string => {
  if (!status) return 'default'
  switch (status.toUpperCase()) {
    case 'ACTIVE':
      return 'green'
    case 'EXPIRED':
      return 'red'
    case 'DISABLED':
      return 'orange'
    default:
      return 'default'
  }
}

const handleSearch = async (): Promise<void> => {
  if (!searchUserId.value && !searchUsername.value) {
    message.warning(t('userDetail.search.selectOne'))
    return
  }

  loading.value = true
  try {
    let userId = searchUserId.value

    if (!userId && searchUsername.value) {
      const response = await getUserIdByUsername(searchUsername.value)
      if (response.data.code === 200 && response.data.data) {
        userId = response.data.data
      } else {
        message.error(t('userDetail.messages.userNotFound'))
        return
      }
    }

    if (userId) {
      await loadUserDetail(userId)
    }
  } catch (error) {
    console.error('获取用户详情失败:', error)
    message.error(t('userDetail.messages.loadFailed'))
  } finally {
    loading.value = false
  }
}

const handleReset = (): void => {
  searchUserId.value = undefined
  searchUsername.value = ''
  userDetail.value = null
  userFeedbacks.value = []
  userLicenses.value = []
}

const loadUserDetail = async (userId: number): Promise<void> => {
  loading.value = true
  try {
    const [detailRes, feedbackRes, licenseRes] = await Promise.all([
      getUserDetail(userId),
      getFeedbacksByUserId(userId, {current: 1, pageSize: 100}),
      getLicensesByUserId(userId, {current: 1, pageSize: 100})
    ])

    if (detailRes.data.code === 200 && detailRes.data.data) {
      userDetail.value = humps.camelizeKeys(detailRes.data.data) as UserDetailDTO
      searchUserId.value = userId
    } else {
      message.error(t('userDetail.messages.loadFailed'))
    }

    if (feedbackRes.data.code === 200 && feedbackRes.data.data) {
      const feedbackData = humps.camelizeKeys(feedbackRes.data) as { data: UserFeedbackRecord[] }
      userFeedbacks.value = feedbackData.data || []
    }

    if (licenseRes.data.code === 200 && licenseRes.data.data) {
      const licenseData = humps.camelizeKeys(licenseRes.data) as { data: LicenseInfo[] }
      userLicenses.value = licenseData.data || []
    }
  } catch (error) {
    console.error('获取用户详情失败:', error)
    message.error(t('userDetail.messages.loadFailed'))
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  const queryUserId = route.query.userId
  if (queryUserId) {
    const userId = Number(queryUserId)
    if (!isNaN(userId)) {
      await loadUserDetail(userId)
    }
  } else if (userStore.currentUserId) {
    await loadUserDetail(userStore.currentUserId)
  }
})
</script>

<template>

  <div class="user-detail-management">
    <a-card>
      <template #title>
        <span>{{ t('userDetail.title') }}</span>
      </template>

      <div class="search-section">
        <a-form layout="inline">
          <a-form-item :label="t('userDetail.search.userId')">
            <a-input-number
                v-model:value="searchUserId"
                :placeholder="t('userDetail.search.userIdPlaceholder')"
                style="width: 200px"
                :min="1"
            />
          </a-form-item>
          <a-form-item :label="t('userDetail.search.username')">
            <a-input
                v-model:value="searchUsername"
                :placeholder="t('userDetail.search.usernamePlaceholder')"
                style="width: 200px"
                allow-clear
            />
          </a-form-item>
          <a-form-item>
            <a-space>
              <a-button type="primary" @click="handleSearch" :loading="loading">
                <template #icon>
                  <SearchOutlined/>
                </template>
                {{ t('common.search') }}
              </a-button>
              <a-button @click="handleReset">
                <template #icon>
                  <ReloadOutlined/>
                </template>
                {{ t('common.reset') }}
              </a-button>
            </a-space>
          </a-form-item>
        </a-form>
      </div>
    </a-card>

    <div v-if="userDetail" class="detail-content">
      <a-row :gutter="16">
        <a-col :span="24">
          <a-card class="info-card">
            <template #title>
              <a-typography-text class="card-title">
                <IdcardOutlined/>
                {{ t('userDetail.basicInfo') }}
              </a-typography-text>
            </template>
            <template #extra>
              <a-tag :color="userDetail.user?.accountStatus === 1 ? 'green' : 'red'">
                {{
                  userDetail.user?.accountStatus === 1 ? t('userManagement.status.normal') : t('userManagement.status.disabled')
                }}
              </a-tag>
            </template>
            <a-descriptions :column="3" bordered>
              <a-descriptions-item :label="t('userDetail.userId')">
                {{ userDetail.user?.userId }}
              </a-descriptions-item>
              <a-descriptions-item :label="t('userDetail.username')">
                {{ userDetail.user?.username }}
              </a-descriptions-item>
              <a-descriptions-item :label="t('userDetail.createdAt')">
                {{ userDetail.user?.createdAt }}
              </a-descriptions-item>
            </a-descriptions>
          </a-card>
        </a-col>
      </a-row>

      <a-row :gutter="16" style="margin-top: 16px">
        <a-col :span="12">
          <a-card class="info-card">
            <template #title>
              <a-typography-text class="card-title">
                <UserOutlined/>
                {{ t('userDetail.profileInfo') }}
              </a-typography-text>
            </template>
            <template #extra>
              <a-button type="link"
                        @click="router.push({path: '/admin/system/profiles', query: {userId: searchUserId}})">
                <EditOutlined/>
              </a-button>
            </template>
            <a-descriptions :column="1" bordered size="small">
              <a-descriptions-item :label="t('userDetail.nickname')">
                {{ userDetail.userProfile?.nickname || '-' }}
              </a-descriptions-item>
              <a-descriptions-item :label="t('userDetail.email')">
                {{ userDetail.userProfile?.email || '-' }}
              </a-descriptions-item>
              <a-descriptions-item :label="t('userDetail.phone')">
                {{ userDetail.userProfile?.phone || '-' }}
              </a-descriptions-item>
              <a-descriptions-item :label="t('userDetail.gender')">
                {{ getGenderText(userDetail.userProfile?.gender) }}
              </a-descriptions-item>
              <a-descriptions-item :label="t('userDetail.birthDate')">
                {{ userDetail.userProfile?.birthDate || '-' }}
              </a-descriptions-item>
              <a-descriptions-item :label="t('userDetail.bio')">
                {{ userDetail.userProfile?.bio || '-' }}
              </a-descriptions-item>
            </a-descriptions>
          </a-card>
        </a-col>

        <a-col :span="12">
          <a-card class="info-card">
            <template #title>
              <a-typography-text class="card-title">
                <SolutionOutlined/>
                {{ t('userDetail.nameInfo') }}
              </a-typography-text>
            </template>
            <template #extra>
              <a-button type="link"
                        @click="router.push({path: '/admin/system/names', query: {userId: searchUserId}})">
                <EditOutlined/>
              </a-button>
            </template>
            <a-descriptions :column="1" bordered size="small">
              <a-descriptions-item :label="t('userDetail.createName')">
                {{ userDetail.userNames?.createName || '-' }}
              </a-descriptions-item>
              <a-descriptions-item :label="t('userDetail.displayName')">
                {{ userDetail.userNames?.displayName || '-' }}
              </a-descriptions-item>
              <a-descriptions-item :label="t('userDetail.isDefaultDisplay')">
                <a-tag :color="userDetail.userNames?.isDefaultDisplay === 1 ? 'blue' : 'default'">
                  {{
                    userDetail.userNames?.isDefaultDisplay === 1 ? t('userNames.common.yes') : t('userNames.common.no')
                  }}
                </a-tag>
              </a-descriptions-item>
            </a-descriptions>
          </a-card>
        </a-col>
      </a-row>

      <a-row :gutter="16" style="margin-top: 16px">
        <a-col :span="12">
          <a-card class="info-card">
            <template #title>
              <a-typography-text class="card-title">
                <TrophyOutlined/>
                {{ t('userDetail.pointsInfo') }}
              </a-typography-text>
            </template>
            <a-descriptions :column="1" bordered size="small">
              <a-descriptions-item :label="t('userDetail.totalPoints')">
                <a-tag color="gold">{{ userDetail.userPoints?.totalPoints || 0 }}</a-tag>
              </a-descriptions-item>
              <a-descriptions-item :label="t('userDetail.availablePoints')">
                <a-tag color="green">{{ userDetail.userPoints?.availablePoints || 0 }}</a-tag>
              </a-descriptions-item>
              <a-descriptions-item :label="t('userDetail.frozenPoints')">
                <a-tag color="orange">{{ userDetail.userPoints?.frozenPoints || 0 }}</a-tag>
              </a-descriptions-item>
              <a-descriptions-item :label="t('userDetail.consumedPoints')">
                <a-tag color="purple">{{ userDetail.userPoints?.consumedPoints || 0 }}</a-tag>
              </a-descriptions-item>
            </a-descriptions>
          </a-card>
        </a-col>

        <a-col :span="12">
          <a-card class="info-card">
            <template #title>
              <a-typography-text class="card-title">
                <CrownOutlined/>
                {{ t('userDetail.vipInfo') }}
              </a-typography-text>
            </template>
            <a-descriptions :column="1" bordered size="small">
              <a-descriptions-item :label="t('userDetail.vipLevel')">
                <a-tag color="gold">
                  <CrownOutlined/>
                  VIP {{ userDetail.userVipInfo?.vipLevel || 0 }}
                </a-tag>
              </a-descriptions-item>
              <a-descriptions-item :label="t('userDetail.vipPoints')">
                {{ userDetail.userVipInfo?.vipPoints || 0 }}
              </a-descriptions-item>
              <a-descriptions-item :label="t('userDetail.totalEarnedPoints')">
                {{ userDetail.userVipInfo?.totalEarnedPoints || 0 }}
              </a-descriptions-item>
              <a-descriptions-item :label="t('userDetail.vipStatus')">
                <a-tag :color="userDetail.userVipInfo?.vipStatus === 'ACTIVE' ? 'green' : 'default'">
                  {{ userDetail.userVipInfo?.vipStatus || '-' }}
                </a-tag>
              </a-descriptions-item>
            </a-descriptions>
          </a-card>
        </a-col>
      </a-row>

      <a-row :gutter="16" style="margin-top: 16px">
        <a-col :span="24">
          <a-card class="info-card">
            <template #title>
              <a-typography-text class="card-title">
                <SafetyOutlined/>
                {{ t('userDetail.rolesInfo') }}
              </a-typography-text>
            </template>
            <a-table
                :columns="roleColumns"
                :data-source="userDetail.userRoles || []"
                :pagination="false"
                size="small"
                row-key="roleId"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'isSystemRole'">
                  <a-tag :color="record.isSystemRole === 1 ? 'blue' : 'default'">
                    {{ record.isSystemRole === 1 ? t('role.common.systemRole') : t('role.common.normalRole') }}
                  </a-tag>
                </template>
                <template v-if="column.key === 'status'">
                  <a-tag :color="record.status === 1 ? 'green' : 'red'">
                    {{ record.status === 1 ? t('role.common.enabled') : t('role.common.disabled') }}
                  </a-tag>
                </template>
              </template>
            </a-table>
          </a-card>
        </a-col>
      </a-row>

      <a-row :gutter="16" style="margin-top: 16px">
        <a-col :span="24">
          <a-card class="info-card">
            <template #title>
              <a-typography-text class="card-title">
                <HistoryOutlined/>
                {{ t('userDetail.nameHistory') }}
              </a-typography-text>
            </template>
            <template #extra>
              <a-button type="link"
                        @click="router.push({path: '/admin/system/name-history', query: {userId: searchUserId}})">
                <EditOutlined/>
              </a-button>
            </template>
            <a-table
                :columns="nameHistoryColumns"
                :data-source="userDetail.userNameHistories || []"
                :pagination="false"
                size="small"
                row-key="historyId"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'changedAt'">
                  {{ record.changedAt }}
                </template>
              </template>
            </a-table>
          </a-card>
        </a-col>
      </a-row>

      <a-row :gutter="16" style="margin-top: 16px">
        <a-col :span="24">
          <a-card class="info-card">
            <template #title>
              <a-typography-text class="card-title">
                <MessageOutlined/>
                {{ t('userDetail.feedbackInfo') }}
              </a-typography-text>
            </template>
            <template #extra>
              <a-button type="link"
                        @click="router.push({path: '/admin/system/feedback', query: {userId: searchUserId}})">
                <EditOutlined/>
              </a-button>
            </template>
            <a-table
                :columns="feedbackColumns"
                :data-source="userFeedbacks"
                :pagination="false"
                size="small"
                row-key="id"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'type'">
                  <a-tag>{{ getFeedbackTypeText(record.type) }}</a-tag>
                </template>
                <template v-if="column.key === 'status'">
                  <a-tag :color="getFeedbackStatusColor(record.status)">
                    {{ getFeedbackStatusText(record.status) }}
                  </a-tag>
                </template>
              </template>
            </a-table>
          </a-card>
        </a-col>
      </a-row>

      <a-row :gutter="16" style="margin-top: 16px">
        <a-col :span="24">
          <a-card class="info-card">
            <template #title>
              <a-typography-text class="card-title">
                <KeyOutlined/>
                {{ t('userDetail.licenseInfo') }}
              </a-typography-text>
            </template>
            <template #extra>
              <a-button type="link"
                        @click="router.push({path: '/admin/system/licenses', query: {userId: searchUserId}})">
                <EditOutlined/>
              </a-button>
            </template>
            <a-table
                :columns="licenseColumns"
                :data-source="userLicenses"
                :pagination="false"
                size="small"
                row-key="licenseKey"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'status'">
                  <a-tag :color="getLicenseStatusColor(record.status)">
                    {{ record.status || '-' }}
                  </a-tag>
                </template>
              </template>
            </a-table>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <a-empty v-else-if="!loading" :description="t('userDetail.noData')" style="margin-top: 50px"/>
  </div>
</template>

<style scoped lang="scss">

</style>
