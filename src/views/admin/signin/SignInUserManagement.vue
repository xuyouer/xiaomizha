<script setup lang="ts">
import {ref, reactive, computed, onMounted, watch} from 'vue'
import {message, Modal} from 'ant-design-vue'
import {
  TeamOutlined,
  SearchOutlined,
  ReloadOutlined,
  CalendarOutlined,
  ExportOutlined
} from '@ant-design/icons-vue'
import type {ColumnsType} from 'ant-design-vue/es/table'
import type {TablePaginationConfig} from 'ant-design-vue/es/table'
import type {SorterResult} from 'ant-design-vue/es/table/interface'
import {useI18n} from 'vue-i18n'
import {useRouter} from 'vue-router'
import {type Dayjs} from 'dayjs'
import dayjs from 'dayjs'
import {getUserSignInList, getMonthlySignInRecord} from '@/api/signin/signIn'
import type {SignInUserListItem, PageResult} from '@/types/api'
import humps from 'humps'
import {ExportUtils} from "@/utils"

const {t} = useI18n()
const router = useRouter()

const searchParams = reactive({
  userId: undefined as number | undefined,
  userName: '',
  month: null as Dayjs | null
})

const loading = ref(false)

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
  pageSizeOptions: ['10', '20', '50', '100'],
  showTotal: (total: number) => t('signInUserManagement.pagination.total', {total})
})

const userSignInList = ref<SignInUserListItem[]>([])

const sortInfo = ref<{ field: string; order: 'ascend' | 'descend' } | null>(null)

const columns = computed<ColumnsType>(() => [
  {
    title: t('signInUserManagement.columns.userId'),
    dataIndex: 'userId',
    key: 'userId',
    width: 100,
    align: 'center'
  },
  {
    title: t('signInUserManagement.columns.userName'),
    dataIndex: 'userName',
    key: 'userName',
    width: 120
  },
  {
    title: t('signInUserManagement.columns.totalSignIns'),
    dataIndex: 'totalSignIns',
    key: 'totalSignIns',
    width: 100,
    align: 'center',
    sorter: true
  },
  {
    title: t('signInUserManagement.columns.continuousDays'),
    dataIndex: 'continuousDays',
    key: 'continuousDays',
    width: 100,
    align: 'center',
    sorter: true
  },
  {
    title: t('signInUserManagement.columns.maxContinuousDays'),
    dataIndex: 'maxContinuousDays',
    key: 'maxContinuousDays',
    width: 120,
    align: 'center'
  },
  {
    title: t('signInUserManagement.columns.monthlySignIns'),
    dataIndex: 'monthlySignIns',
    key: 'monthlySignIns',
    width: 100,
    align: 'center'
  },
  {
    title: t('signInUserManagement.columns.pointsEarned'),
    dataIndex: 'pointsEarned',
    key: 'pointsEarned',
    width: 100,
    align: 'center',
    sorter: true
  },
  {
    title: t('signInUserManagement.columns.todaySigned'),
    dataIndex: 'todaySigned',
    key: 'todaySigned',
    width: 100,
    align: 'center'
  },
  {
    title: t('signInUserManagement.columns.lastSignInDate'),
    dataIndex: 'lastSignInDate',
    key: 'lastSignInDate',
    width: 160,
    align: 'center'
  },
  {
    title: t('signInUserManagement.columns.action'),
    key: 'action',
    width: 140,
    fixed: 'right',
    align: 'center'
  }
])

const briefVisible = ref(false)
const briefLoading = ref(false)
const currentBrief = ref<SignInUserListItem | null>(null)
const briefMonthlyRecords = ref<number[]>([])
const briefSelectedMonth = ref<Dayjs | null>(null)

const loadData = async () => {
  loading.value = true
  try {
    const params: {
      current: number
      pageSize: number
      userId?: number
      userName?: string
      year?: number
      month?: number
      sortField?: string
      sortOrder?: 'ascend' | 'descend'
    } = {
      current: pagination.current,
      pageSize: pagination.pageSize
    }

    if (searchParams.userId !== undefined && searchParams.userId !== null) {
      params.userId = searchParams.userId
    }
    if (searchParams.userName) {
      params.userName = searchParams.userName
    }
    if (searchParams.month) {
      params.year = searchParams.month.year()
      params.month = searchParams.month.month() + 1
    }
    if (sortInfo.value) {
      params.sortField = sortInfo.value.field
      params.sortOrder = sortInfo.value.order
    }

    const response = await getUserSignInList(params)
    let {data} = response
    if (data.code === 200 && data.data) {
      data = humps.camelizeKeys(data) as PageResult<SignInUserListItem>
      userSignInList.value = (data.data || []).map(item => ({
        ...item,
        totalSignIns: item.totalSignIns ?? 0,
        continuousDays: item.continuousDays ?? 0,
        maxContinuousDays: item.maxContinuousDays ?? 0,
        monthlySignIns: item.monthlySignIns ?? 0,
        pointsEarned: item.pointsEarned ?? 0,
        todaySigned: item.todaySigned ?? false
      }))
      pagination.total = data.total || 0
      pagination.current = data.current || 1
      pagination.pageSize = data.pageSize || 10
    }
  } catch (error) {
    console.error('加载数据失败:', error)
    message.error(t('signInUserManagement.messages.loadFailed'))
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  pagination.current = 1
  loadData()
}

const resetSearch = () => {
  searchParams.userId = undefined
  searchParams.userName = ''
  searchParams.month = null
  sortInfo.value = null
  handleSearch()
}

const handleTableChange = (
    pag: TablePaginationConfig,
    _filters: Record<string, unknown>,
    sorter: SorterResult<SignInUserListItem> | SorterResult<SignInUserListItem>[]
) => {
  pagination.current = pag.current || 1
  pagination.pageSize = pag.pageSize || 10

  if (Array.isArray(sorter)) {
    const firstSorter = sorter[0]
    if (firstSorter?.field && firstSorter?.order) {
      sortInfo.value = {
        field: firstSorter.field as string,
        order: firstSorter.order as 'ascend' | 'descend'
      }
    } else {
      sortInfo.value = null
    }
  } else if (sorter.field && sorter.order) {
    sortInfo.value = {
      field: sorter.field as string,
      order: sorter.order as 'ascend' | 'descend'
    }
  } else {
    sortInfo.value = null
  }

  loadData()
}

const showBrief = (record: SignInUserListItem) => {
  currentBrief.value = record
  briefVisible.value = true

  const now = new Date()
  const year = searchParams.month ? searchParams.month.year() : now.getFullYear()
  const month = searchParams.month ? searchParams.month.month() + 1 : now.getMonth() + 1

  briefSelectedMonth.value = dayjs(`${year}-${String(month).padStart(2, '0')}-01`)
}

const loadBriefMonthlyRecords = async (year: number, month: number) => {
  if (!currentBrief.value) return

  briefLoading.value = true
  try {
    const response = await getMonthlySignInRecord({
      userId: currentBrief.value.userId,
      year,
      month
    })
    const {data: result} = response
    if (result.code === 200 && result.data) {
      briefMonthlyRecords.value = result.data.signedDays || []
    } else {
      briefMonthlyRecords.value = []
    }
  } catch (error) {
    console.error('加载简讯失败:', error)
    briefMonthlyRecords.value = []
  } finally {
    briefLoading.value = false
  }
}

watch(briefSelectedMonth, (newMonth) => {
  if (newMonth && briefVisible.value && currentBrief.value) {
    loadBriefMonthlyRecords(newMonth.year(), newMonth.month() + 1)
  }
})

const isBriefSignedDay = (date: Dayjs) => {
  if (!briefSelectedMonth.value) return false

  const currentMonth = briefSelectedMonth.value.month() + 1
  const currentYear = briefSelectedMonth.value.year()
  const dateMonth = date.month() + 1
  const dateYear = date.year()
  const day = date.date()

  if (dateMonth === currentMonth && dateYear === currentYear) {
    return briefMonthlyRecords.value.includes(day)
  }
  return false
}

const goToDetail = (record: SignInUserListItem) => {
  router.push({
    path: '/admin/sign-in/center',
    query: {userId: record.userId}
  })
}

const exportLoading = ref(false)

const exportData = () => {
  Modal.confirm({
    title: t('signInUserManagement.export.title'),
    content: t('signInUserManagement.export.content'),
    onOk: async () => {
      exportLoading.value = true
      try {
        const columns = [
          {key: 'userId', title: t('signInUserManagement.columns.userId')},
          {key: 'userName', title: t('signInUserManagement.columns.userName')},
          {key: 'totalSignIns', title: t('signInUserManagement.columns.totalSignIns')},
          {key: 'continuousDays', title: t('signInUserManagement.columns.continuousDays')},
          {key: 'maxContinuousDays', title: t('signInUserManagement.columns.maxContinuousDays')},
          {key: 'monthlySignIns', title: t('signInUserManagement.columns.monthlySignIns')},
          {key: 'pointsEarned', title: t('signInUserManagement.columns.pointsEarned')},
          {key: 'todaySignedText', title: t('signInUserManagement.columns.todaySigned')},
          {key: 'lastSignInDate', title: t('signInUserManagement.columns.lastSignInDate')}
        ]

        const exportData = userSignInList.value.map(item => ({
          ...item,
          todaySignedText: item.todaySigned ? t('signIn.signed') : t('signIn.notSigned')
        }))

        ExportUtils.exportToCSV(exportData, columns, {
          filename: `sign_in_records_${dayjs().format('YYYY-MM-DD_HH-mm-ss')}.csv`
        })

        message.success(t('signInUserManagement.export.success'))
      } catch (error) {
        console.error('导出失败:', error)
        message.error(t('signInUserManagement.export.failed'))
      } finally {
        exportLoading.value = false
      }
    }
  })
}

const getSignedTagColor = (signed: boolean) => {
  return signed ? 'success' : 'default'
}

const getContinuousDaysColor = (days: number) => {
  if (days >= 100) return 'pink'
  if (days >= 30) return 'volcano'
  if (days >= 7) return 'gold'
  return 'blue'
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="sign-in-user-management">
    <a-card class="management-card">
      <template #title>
        <div class="card-title">
          <TeamOutlined/>
          {{ t('signInUserManagement.title') }}
        </div>
      </template>

      <template #extra>
        <a-button type="primary" :loading="exportLoading" @click="exportData">
          <ExportOutlined/>
          {{ t('signInUserManagement.export.button') }}
        </a-button>
      </template>

      <div class="search-bar">
        <a-row :gutter="[16, 16]">
          <a-col :xs="24" :sm="12" :md="6">
            <a-input-number
                v-model:value="searchParams.userId"
                :placeholder="t('signInUserManagement.search.userIdPlaceholder')"
                style="width: 100%"
                :min="1"
                allow-clear
            >
              <template #prefix>
                <SearchOutlined class="search-icon"/>
              </template>
            </a-input-number>
          </a-col>
          <a-col :xs="24" :sm="12" :md="6">
            <a-input
                v-model:value="searchParams.userName"
                :placeholder="t('signInUserManagement.search.userNamePlaceholder')"
                allow-clear
            >
              <template #prefix>
                <SearchOutlined class="search-icon"/>
              </template>
            </a-input>
          </a-col>
          <a-col :xs="24" :sm="12" :md="6">
            <a-date-picker
                v-model:value="searchParams.month"
                picker="month"
                style="width: 100%"
                :placeholder="t('signInUserManagement.search.monthPlaceholder')"
            />
          </a-col>
          <a-col :xs="24" :sm="12" :md="6">
            <a-space>
              <a-button type="primary" @click="handleSearch">
                <SearchOutlined/>
                {{ t('signInUserManagement.search.search') }}
              </a-button>
              <a-button @click="resetSearch">
                <ReloadOutlined/>
                {{ t('signInUserManagement.search.reset') }}
              </a-button>
            </a-space>
          </a-col>
        </a-row>
      </div>

      <a-table
          :columns="columns"
          :data-source="userSignInList"
          :pagination="pagination"
          :loading="loading"
          row-key="userId"
          :scroll="{ x: 1200 }"
          @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'userId'">
            <a-tag color="var(--primary-color)">
              {{ record.userId }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'userName'">
            <a-typography-text class="user-name">{{ record.userName }}</a-typography-text>
          </template>
          <template v-else-if="column.key === 'totalSignIns'">
            <a-tag color="geekblue">
              {{ record.totalSignIns }} {{ t('signIn.times') }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'continuousDays'">
            <a-tag :color="getContinuousDaysColor(record.continuousDays || 0)">
              {{ record.continuousDays }} {{ t('signIn.day') }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'maxContinuousDays'">
            <a-typography-text class="max-continuous">{{ record.maxContinuousDays }} {{
                t('signIn.day')
              }}
            </a-typography-text>
          </template>
          <template v-else-if="column.key === 'monthlySignIns'">
            <a-tag>
              {{ record.monthlySignIns }} {{ t('signIn.times') }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'pointsEarned'">
            <a-typography-text class="points-earned">{{ record.pointsEarned }} {{
                t('signIn.points')
              }}
            </a-typography-text>
          </template>
          <template v-else-if="column.key === 'todaySigned'">
            <a-tag :color="getSignedTagColor(record.todaySigned ?? false)">
              {{ record.todaySigned ? t('signIn.signed') : t('signIn.notSigned') }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'lastSignInDate'">
            <a-typography-text class="last-sign-date">{{ record.lastSignInDate }}</a-typography-text>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="showBrief(record)">
                {{ t('signInUserManagement.action.brief') }}
              </a-button>
              <a-button type="link" size="small" @click="goToDetail(record)">
                {{ t('signInUserManagement.action.viewDetail') }}
              </a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>

    <a-modal
        v-model:open="briefVisible"
        :title="t('signInUserManagement.brief.title')"
        :width="600"
        :footer="null"
    >
      <a-spin :spinning="briefLoading">
        <template v-if="currentBrief">
          <a-descriptions :column="2" bordered>
            <a-descriptions-item :label="t('signInUserManagement.columns.userId')">
              <a-tag color="var(--primary-color)">{{ currentBrief.userId }}</a-tag>
            </a-descriptions-item>
            <a-descriptions-item :label="t('signInUserManagement.columns.userName')">
              {{ currentBrief.userName }}
            </a-descriptions-item>
            <a-descriptions-item :label="t('signInUserManagement.columns.totalSignIns')">
              <a-tag color="geekblue">{{ currentBrief.totalSignIns }} {{ t('signIn.times') }}</a-tag>
            </a-descriptions-item>
            <a-descriptions-item :label="t('signInUserManagement.columns.continuousDays')">
              <a-tag :color="getContinuousDaysColor(currentBrief.continuousDays || 0)">
                {{ currentBrief.continuousDays }} {{ t('signIn.day') }}
              </a-tag>
            </a-descriptions-item>
            <a-descriptions-item :label="t('signInUserManagement.columns.maxContinuousDays')">
              {{ currentBrief.maxContinuousDays }} {{ t('signIn.day') }}
            </a-descriptions-item>
            <a-descriptions-item :label="t('signInUserManagement.columns.pointsEarned')">
              <a-typography-text class="points-earned">{{ currentBrief.pointsEarned }} {{
                  t('signIn.points')
                }}
              </a-typography-text>
            </a-descriptions-item>
            <a-descriptions-item :label="t('signInUserManagement.columns.todaySigned')">
              <a-tag :color="getSignedTagColor(currentBrief.todaySigned ?? false)">
                {{ currentBrief.todaySigned ? t('signIn.signed') : t('signIn.notSigned') }}
              </a-tag>
            </a-descriptions-item>
            <a-descriptions-item :label="t('signInUserManagement.columns.lastSignInDate')">
              {{ currentBrief.lastSignInDate }}
            </a-descriptions-item>
          </a-descriptions>

          <a-divider>
            <CalendarOutlined/>
            {{ t('signInUserManagement.brief.monthlyRecord') }}
          </a-divider>

          <div class="monthly-calendar">
            <a-calendar v-model:value="briefSelectedMonth" :fullscreen="false">
              <template #dateFullCellRender="{ current }">
                <a-tag v-if="isBriefSignedDay(current)" :bordered="false" color="processing">
                  {{ current.date() }}
                </a-tag>
                <span v-else>{{ current.date() }}</span>
              </template>
            </a-calendar>
          </div>
        </template>
      </a-spin>
    </a-modal>
  </div>
</template>

<style scoped lang="scss">

</style>
