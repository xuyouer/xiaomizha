<script setup lang="ts">
import {ref, onMounted, computed} from 'vue'
import {message} from 'ant-design-vue'
import {useI18n} from 'vue-i18n'
import {useRoute} from "vue-router"
import dayjs from 'dayjs'
import {CalendarOutlined, TrophyOutlined} from '@ant-design/icons-vue'
import {
  getSignInStatus,
  getMonthlySignInRecord,
  getSignInRanking
} from '@/api'
import type {SignInStatusResponse, SignInRankingResponse, MonthlySignInRecordResponse} from '@/types/api'
import type {ColumnsType} from 'ant-design-vue/es/table'
import type {Dayjs} from 'dayjs'
import {useUserStore} from '@/stores/user'
import {CACHE_PREFIX_SIGNIN, CACHE_EXPIRY} from '@/constants'
import {Base64Utils, localStorageCache} from "@/utils"
import {
  FireOutlined,
  StarOutlined,
  HeartOutlined,
  LikeOutlined
} from '@ant-design/icons-vue'

const {t} = useI18n()
const route = useRoute()

const userStore = useUserStore()

const signInStatus = ref<SignInStatusResponse>({
  todaySigned: false,
  continuousDays: 0,
  totalSignIns: 0,
  maxContinuousDays: 0,
  isContinuous: false
})

const loadingRanking = ref(false)

const monthlyRecord = ref({
  signedDays: [] as number[],
  maxContinuousDays: 0,
  startDate: "",
  endDate: "",
  totalSignIns: 0,
  totalPoints: 0
})

const rankingList = ref<SignInRankingResponse[]>([])

const rankingType = ref('1')

const selectedMonth = ref<Dayjs>(dayjs())

const rankingColumns = computed<ColumnsType<SignInRankingResponse>>(() => [
  {
    title: t('signIn.rank'),
    dataIndex: 'rank',
    key: 'rank',
    width: 80
  },
  {
    title: t('signIn.userId'),
    dataIndex: 'userId',
    key: 'userId',
    width: 120
  },
  {
    title: rankingType.value === '1' ? t('signIn.totalSignInsRanking') : rankingType.value === '2' ? t('signIn.continuousDaysRanking') : t('signIn.monthlySignInsRanking'),
    dataIndex: rankingType.value === '1' ? 'totalSignIns' : rankingType.value === '2' ? 'continuousDays' : 'monthlySignIns',
    key: 'value'
  }
])

const isSignedDay = (date: any) => {
  try {
    const currentMonth = selectedMonth.value.month() + 1
    const currentYear = selectedMonth.value.year()
    const dateMonth = date.month() + 1
    const dateYear = date.year()
    const day = date.date()

    if (dateMonth === currentMonth && dateYear === currentYear) {
      return monthlyRecord.value.signedDays.includes(day)
    }
  } catch (error) {
    console.error('日期处理错误:', error)
  }
  return false
}

const handleMonthChange = (date: any, mode: string) => {
  try {
    let year: number
    let month: number

    if (date && typeof date.year === 'function') {
      selectedMonth.value = date
      year = date.year()
      month = date.month() + 1
    } else {
      const d = new Date(date)
      selectedMonth.value = dayjs(d)
      year = d.getFullYear()
      month = d.getMonth() + 1
    }

    if (mode === 'month') {
      getMonthlyRecord(year, month)
    }
  } catch (error) {
    console.error('月份变化处理错误:', error)
  }
}

const getUserId = () => {
  const queryUserId = route.query.userId
  if (queryUserId) {
    return Number(queryUserId)
  }
  return userStore.currentUserId || 0
}

const getSignInStatusData = async () => {
  try {
    const userId = getUserId()
    const cacheKey = `${CACHE_PREFIX_SIGNIN}status_${userId}_${dayjs().format('YYYY-MM-DD')}`

    const cachedData = localStorageCache.get(cacheKey)
    if (cachedData) {
      signInStatus.value = cachedData
      return
    }

    const response = await getSignInStatus(userId)
    const {data} = response
    if (data.code === 200) {
      signInStatus.value = data.data
      localStorageCache.set(cacheKey, data.data, CACHE_EXPIRY.signInStatus)
    }
  } catch (error) {
    console.error('获取签到状态失败:', error)
    message.error(t('signIn.getStatusFailed'))
  }
}

const handleSignInSuccess = async () => {
  const userId = getUserId()
  const statusCacheKey = `${CACHE_PREFIX_SIGNIN}status_${userId}_${dayjs().format('YYYY-MM-DD')}`
  const recordCacheKey = `${CACHE_PREFIX_SIGNIN}record_${userId}_${dayjs().format('YYYY-MM')}`

  localStorageCache.remove(statusCacheKey)
  localStorageCache.remove(recordCacheKey)
  for (let i = 1; i <= 3; i++) {
    localStorageCache.remove(`${CACHE_PREFIX_SIGNIN}ranking_${i}`)
  }

  await getSignInStatusData()
  await getMonthlyRecord()
  await getRanking()
}

const getMonthlyRecord = async (year?: number, month?: number) => {
  try {
    const currentYear = year || selectedMonth.value.year()
    const currentMonth = month || selectedMonth.value.month() + 1
    const userId = getUserId()
    const cacheKey = `${CACHE_PREFIX_SIGNIN}record_${userId}_${currentYear}-${String(currentMonth).padStart(2, '0')}`

    const cachedData = localStorageCache.get(cacheKey)
    if (cachedData) {
      monthlyRecord.value = cachedData
      return
    }

    const response = await getMonthlySignInRecord({userId, year: currentYear, month: currentMonth})
    const {data: result} = response
    if (result.code === 200) {
      const data = result.data as MonthlySignInRecordResponse
      const recordData = {
        signedDays: data.signedDays || [],
        maxContinuousDays: data.maxContinuousDays || 0,
        startDate: data.startDate || "",
        endDate: data.endDate || "",
        totalSignIns: data.totalSignIns || 0,
        totalPoints: data.totalPoints || 0
      }
      monthlyRecord.value = recordData
      localStorageCache.set(cacheKey, recordData, CACHE_EXPIRY.monthlyRecord)
    }
  } catch (error) {
    console.error('获取月度签到记录失败:', error)
    message.error(t('signIn.getMonthlyRecordFailed'))
  }
}

const getRanking = async () => {
  try {
    const cacheKey = `${CACHE_PREFIX_SIGNIN}ranking_${rankingType.value}`

    const cachedData = localStorageCache.get(cacheKey)
    if (cachedData) {
      rankingList.value = cachedData
      return
    }

    loadingRanking.value = true
    const response = await getSignInRanking({type: Number(rankingType.value) as 1 | 2 | 3})
    const {data} = response
    if (data.code === 200) {
      const rankingData = data.data.rankingList || []
      rankingList.value = rankingData
      localStorageCache.set(cacheKey, rankingData, CACHE_EXPIRY.ranking)
    }
  } catch (error) {
    console.error('获取排行榜失败:', error)
    message.error(t('signIn.getRankingFailed'))
  } finally {
    loadingRanking.value = false
  }
}

onMounted(async () => {
  selectedMonth.value = dayjs()

  await getSignInStatusData()
  await getMonthlyRecord()
  await getRanking()
})
</script>

<template>
  <div class="sign-in-center">
    <a-row :gutter="[16, 16]">
      <a-col :xs="24" :md="8">
        <a-card class="status-card">
          <template #title>
            <a-typography-text>
              <CalendarOutlined/>
              {{ t('signIn.signInStatus') }}
            </a-typography-text>
          </template>

          <template #extra>
            <div class="sign-in-status">
              <a-tag v-if="signInStatus.todaySigned" color="success">
                {{ t('signIn.signed') }}
              </a-tag>
              <a-tag v-else color="processing">
                {{ t('signIn.notSigned') }}
              </a-tag>
            </div>
          </template>

          <template #cover>
            <img alt="example" :src="Base64Utils.get('sunflower')"/>
          </template>

          <div class="status-content">
            <a-row :gutter="[12, 12]">
              <a-col :span="12">
                <a-statistic
                    :title="t('signIn.continuousDays')"
                    :value="signInStatus.continuousDays"
                    :suffix="t('signIn.day')"
                >
                  <template #prefix>
                    <FireOutlined class="stat-icon"/>
                  </template>
                </a-statistic>
              </a-col>

              <a-col :span="12">
                <a-statistic
                    :title="t('signIn.totalSignIns')"
                    :value="signInStatus.totalSignIns"
                    :suffix="t('signIn.times')"
                >
                  <template #prefix>
                    <StarOutlined class="stat-icon"/>
                  </template>
                </a-statistic>
              </a-col>

              <a-col :span="12">
                <a-statistic
                    :title="t('signIn.maxContinuous')"
                    :value="signInStatus.maxContinuousDays"
                    :suffix="t('signIn.day')"
                >
                  <template #prefix>
                    <HeartOutlined class="stat-icon"/>
                  </template>
                </a-statistic>
              </a-col>

              <a-col :span="12" v-if="signInStatus.tomorrowReward">
                <a-statistic
                    :title="t('signIn.tomorrowReward')"
                    :value="signInStatus.tomorrowReward"
                    :suffix="t('signIn.points')"
                >
                  <template #prefix>
                    <LikeOutlined class="stat-icon"/>
                  </template>
                </a-statistic>
              </a-col>
            </a-row>

            <div v-if="signInStatus.lastSignInDate" class="last-sign-in">
              <a-typography-text type="secondary">
                {{ t('signIn.lastSignIn') }}: {{ signInStatus.lastSignInDate }}
              </a-typography-text>
            </div>

            <div class="sign-in-action">
              <SignInButton
                  block
                  :user-id="getUserId()"
                  :signed="signInStatus.todaySigned"
                  :signed-style="{ color: 'rgba(255, 255, 255, 0.4)', borderColor: 'rgba(255, 255, 255, 0.4)' }"
                  @success="handleSignInSuccess"
              />
            </div>
          </div>
        </a-card>
      </a-col>

      <a-col :xs="24" :md="16">
        <a-card class="monthly-card">
          <template #title>
            <a-typography-text>
              <CalendarOutlined/>
              {{ t('signIn.monthlyRecord') }}
            </a-typography-text>
          </template>

          <template #extra>
            <div class="monthly-summary">
              <a-space :size="12">
                <a-tag color="blue">{{ t('signIn.monthlySignIns') }}: {{ monthlyRecord.totalSignIns }}
                  {{ t('signIn.times') }}
                </a-tag>
                <a-tag color="green">{{ t('signIn.monthlyContinuous') }}: {{ monthlyRecord.maxContinuousDays }}
                  {{ t('signIn.day') }}
                </a-tag>
                <a-tag color="orange">{{ t('signIn.monthlyPoints') }}: {{ monthlyRecord.totalPoints }}
                  {{ t('signIn.pointsUnit') }}
                </a-tag>
              </a-space>
            </div>
          </template>

          <div class="calendar-wrapper">
            <a-calendar
                v-model:value="selectedMonth"
                :fullscreen="false"
                @panelChange="handleMonthChange"
            >
              <template #dateFullCellRender="{ current }">
                <a-tag v-if="isSignedDay(current)" :bordered="false" :color="'var(--primary-color)'"
                       :class="{ 'signed-day': isSignedDay(current) }">
                  {{ current.date() }}
                </a-tag>
                <span v-else>{{ current.date() }}</span>
              </template>
            </a-calendar>
          </div>
        </a-card>
      </a-col>

      <a-col :xs="24">
        <a-card class="ranking-card">
          <template #title>
            <a-typography-text>
              <TrophyOutlined/>
              {{ t('signIn.ranking') }}
            </a-typography-text>
          </template>

          <template #extra>
            <a-radio-group v-model:value="rankingType" button-style="solid" @change="getRanking">
              <a-radio-button value="1">{{ t('signIn.totalSignInsRanking') }}</a-radio-button>
              <a-radio-button value="2">{{ t('signIn.continuousDaysRanking') }}</a-radio-button>
              <a-radio-button value="3">{{ t('signIn.monthlySignInsRanking') }}</a-radio-button>
            </a-radio-group>
          </template>

          <div class="ranking-list">
            <a-table
                :columns="rankingColumns"
                :data-source="rankingList"
                :pagination="false"
                row-key="userId"
                :loading="loadingRanking"
                size="middle"
            >
              <template #bodyCell="{ column, record, index }">
                <template v-if="column.key === 'rank'">
                  <a-tag :color="index < 3 ? ['#f5222d', '#fa8c16', '#1890ff'][index] : '#d9d9d9'">
                    {{ record.rank }}
                  </a-tag>
                </template>
                <template v-else-if="column.key === 'userId'">
                  <a-tag :bordered="false" :color="'var(--primary-color)'">
                    {{ record.userId }}
                  </a-tag>
                </template>
                <template v-else-if="column.key === 'value'">
                  <a-tag :color="rankingType === '1' ? 'green' : rankingType === '2' ? 'orange' : 'purple'">
                    {{
                      rankingType === '1' ? record.totalSignIns : rankingType === '2' ? record.continuousDays : record.monthlySignIns
                    }}
                    {{ rankingType === '1' || rankingType === '3' ? '次' : '天' }}
                  </a-tag>
                </template>
              </template>
            </a-table>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="scss">

</style>