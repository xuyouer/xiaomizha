<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {message, Modal} from 'ant-design-vue'
import {useI18n} from 'vue-i18n'
import {useRoute} from "vue-router"
import type {Dayjs} from 'dayjs'
import dayjs from 'dayjs'
import {
  CalendarOutlined,
  ClockCircleOutlined,
  DownOutlined,
  FireOutlined,
  GiftOutlined,
  HeartOutlined,
  LikeOutlined,
  StarOutlined,
  TrophyOutlined,
  UpOutlined
} from '@ant-design/icons-vue'
import {
  claimFreeCard,
  doRepair,
  getAvailableRepairDates,
  getClaimStatus,
  getMonthlySignInRecord,
  getRepairCards,
  getSignInRanking,
  getSignInStatus
} from '@/api'
import type {
  MonthlySignInRecordResponse,
  SignInRankingResponse,
  SignInStatusResponse
} from '@/types'
import type {ColumnsType} from 'ant-design-vue/es/table'
import {useUserStore} from '@/stores/user'
import {CACHE_EXPIRY, CACHE_PREFIX_SIGNIN} from '@/constants'
import {Base64Utils, localStorageCache} from "@/utils"

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

const repairCards = ref({
  normalCardCount: 0,
  advancedCardCount: 0,
  totalCardCount: 0
})

const availableRepairDates = ref<string[]>([])

const claimStatus = ref({
  normal: {hasClaimed: false},
  advanced: {hasClaimed: false}
})

const repairLoading = ref(false)
const claimLoading = ref<Record<string, boolean>>({normal: false, advanced: false})

const isExpanded = ref(false)
const DATES_PER_ROW = 4
const MAX_ROWS = 2

const displayedDates = computed(() => {
  const maxVisible = DATES_PER_ROW * MAX_ROWS
  if (isExpanded.value || availableRepairDates.value.length <= maxVisible) {
    return availableRepairDates.value
  }
  return availableRepairDates.value.slice(0, maxVisible)
})

const hasMoreDates = computed(() => {
  return availableRepairDates.value.length > DATES_PER_ROW * MAX_ROWS
})

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

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

const clearCacheAndRefresh = async () => {
  const userId = getUserId()
  const statusCacheKey = `${CACHE_PREFIX_SIGNIN}status_${userId}_${dayjs().format('YYYY-MM-DD')}`
  const recordCacheKey = `${CACHE_PREFIX_SIGNIN}record_${userId}_${selectedMonth.value.format('YYYY-MM')}`

  localStorageCache.remove(statusCacheKey)
  localStorageCache.remove(recordCacheKey)
  for (let i = 1; i <= 3; i++) {
    localStorageCache.remove(`${CACHE_PREFIX_SIGNIN}ranking_${i}`)
  }

  await Promise.all([
    getRepairCardsData(),
    getAvailableRepairDatesData(),
    getMonthlyRecord(),
    getSignInStatusData(),
    getRanking()
  ])
}

const handleSignInSuccess = async () => {
  await clearCacheAndRefresh()
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

const getRepairCardsData = async () => {
  try {
    const userId = getUserId()
    const response = await getRepairCards(userId)
    const {data} = response
    if (data.code === 200) {
      const cardData = data.data as { normalCardCount?: number; advancedCardCount?: number; totalCardCount?: number }
      repairCards.value = {
        normalCardCount: cardData.normalCardCount || 0,
        advancedCardCount: cardData.advancedCardCount || 0,
        totalCardCount: cardData.totalCardCount || 0
      }
    }
  } catch (error) {
    console.error('获取补签卡信息失败:', error)
  }
}

const getAvailableRepairDatesData = async () => {
  try {
    const userId = getUserId()
    const response = await getAvailableRepairDates(userId)
    const {data} = response
    if (data.code === 200) {
      const dates = data.data || []
      availableRepairDates.value = [...dates].sort((a, b) => b.localeCompare(a))
    }
  } catch (error) {
    console.error('获取可补签日期失败:', error)
  }
}

const getClaimStatusData = async () => {
  try {
    const userId = getUserId()
    const [normalRes, advancedRes] = await Promise.all([
      getClaimStatus(userId, 1),
      getClaimStatus(userId, 2)
    ])
    if (normalRes.data.code === 200) {
      claimStatus.value.normal = normalRes.data.data as { hasClaimed: boolean; cardType: number; userId: number }
    }
    if (advancedRes.data.code === 200) {
      claimStatus.value.advanced = advancedRes.data.data as { hasClaimed: boolean; cardType: number; userId: number }
    }
  } catch (error) {
    console.error('获取领取状态失败:', error)
  }
}

const handleClaimCard = async (cardType: number) => {
  const userId = getUserId()
  const typeKey = cardType === 1 ? 'normal' : 'advanced'

  if (claimStatus.value[typeKey].hasClaimed) {
    message.warning('本月已领取过该类型补签卡')
    return
  }

  claimLoading.value[typeKey] = true
  try {
    const response = await claimFreeCard(userId, cardType)
    const {data} = response
    if (data.code === 200) {
      const claimResult = data.data as { message?: string; success?: boolean }
      message.success(claimResult.message || '领取成功')
      claimStatus.value[typeKey] = {hasClaimed: true}
      await getRepairCardsData()
    } else {
      message.error(data.message || '领取失败')
    }
  } catch (error: any) {
    console.error('领取补签卡失败:', error)
    message.error(error.response?.data?.message || '领取失败')
  } finally {
    claimLoading.value[typeKey] = false
  }
}

const handleRepair = async (date: string) => {
  const userId = getUserId()

  if (repairCards.value.totalCardCount <= 0) {
    message.warning(t('signIn.repair.noCard'))
    return
  }

  Modal.confirm({
    title: t('signIn.repair.confirmRepair'),
    content: t('signIn.repair.confirmRepairContent', {date}),
    okText: t('common.confirm'),
    cancelText: t('common.cancel'),
    onOk: async () => {
      repairLoading.value = true
      try {
        const response = await doRepair(userId, date)
        const {data} = response
        if (data.code === 200) {
          const repairResult = data.data as { success?: boolean; message?: string }
          if (repairResult.success) {
            message.success(t('signIn.repair.repairSuccess'))
            await clearCacheAndRefresh()
          } else {
            message.error(repairResult.message || t('signIn.repair.repairFailed'))
          }
        } else {
          message.error(data.message || t('signIn.repair.repairFailed'))
        }
      } catch (error: any) {
        console.error('补签失败:', error)
        message.error(error.response?.data?.message || t('signIn.repair.repairFailed'))
      } finally {
        repairLoading.value = false
      }
    }
  })
}

onMounted(async () => {
  selectedMonth.value = dayjs()

  await getSignInStatusData()
  await getMonthlyRecord()
  await getRanking()
  await getRepairCardsData()
  await getAvailableRepairDatesData()
  await getClaimStatusData()
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

      <a-col :xs="24" :md="8">
        <!-- :style="`background: url(${Base64Utils.get('fairy-tale-road')}) no-repeat center / cover`" -->
        <a-card class="repair-card">
          <template #title>
            <a-typography-text>
              <GiftOutlined/>
              {{ t('signIn.repair.repairCard') }}
            </a-typography-text>
          </template>

          <div class="repair-card-content">
            <a-row :gutter="[12, 12]" style="text-align: center">
              <a-col :span="12">
                <a-statistic
                    :title="t('signIn.repair.normalCard')"
                    :value="repairCards.normalCardCount"
                    :suffix="t('signIn.times')"
                />
              </a-col>
              <a-col :span="12">
                <a-statistic
                    :title="t('signIn.repair.advancedCard')"
                    :value="repairCards.advancedCardCount"
                    :suffix="t('signIn.times')"
                />
              </a-col>
            </a-row>

            <div class="claim-section">
              <a-space direction="vertical" style="width: 100%" :size="8">
                <a-button
                    type="primary"
                    block
                    :disabled="claimStatus.normal.hasClaimed"
                    :loading="claimLoading.normal"
                    @click="handleClaimCard(1)"
                >
                  {{
                    claimStatus.normal.hasClaimed ? t('signIn.repair.alreadyClaimed') : t('signIn.repair.claimNormalCard')
                  }}
                </a-button>
                <a-button
                    type="primary"
                    block
                    :disabled="claimStatus.advanced.hasClaimed"
                    :loading="claimLoading.advanced"
                    @click="handleClaimCard(2)"
                >
                  {{
                    claimStatus.advanced.hasClaimed ? t('signIn.repair.alreadyClaimed') : t('signIn.repair.claimAdvancedCard')
                  }}
                </a-button>
              </a-space>
            </div>
          </div>
        </a-card>
      </a-col>

      <a-col :xs="24" :md="16">
        <a-card class="available-dates-card">
          <template #title>
            <a-typography-text>
              <ClockCircleOutlined/>
              {{ t('signIn.repair.availableDates') }}
            </a-typography-text>
          </template>

          <template #extra>
            <a-space :size="8">
              <a-tag color="blue">
                {{ t('signIn.repair.normalCard') }}: {{ repairCards.normalCardCount }}
              </a-tag>
              <a-tag color="purple">
                {{ t('signIn.repair.advancedCard') }}: {{ repairCards.advancedCardCount }}
              </a-tag>
            </a-space>
          </template>

          <div v-if="availableRepairDates.length > 0" class="available-dates">
            <a-row :gutter="[8, 8]">
              <a-col v-for="date in displayedDates" :key="date" :span="6">
                <a-card
                    size="small"
                    :class="{'date-card': true, 'date-card-disabled': repairCards.totalCardCount <= 0}"
                    @click="repairCards.totalCardCount > 0 && handleRepair(date)"
                >
                  <div class="date-content">
                    <a-typography-text class="date-text">{{ date }}</a-typography-text>
                    <a-button
                        type="link"
                        size="small"
                        :disabled="repairCards.totalCardCount <= 0"
                        :loading="repairLoading"
                    >
                      {{ t('signIn.repair.repairNow') }}
                    </a-button>
                  </div>
                </a-card>
              </a-col>
            </a-row>
            <div v-if="hasMoreDates" class="expand-btn-wrapper">
              <a-button type="link" @click="toggleExpand">
                {{
                  isExpanded ? t('common.collapse') : t('signIn.repair.showMore', {count: availableRepairDates.length - DATES_PER_ROW * MAX_ROWS})
                }}
                <DownOutlined v-if="!isExpanded"/>
                <UpOutlined v-else/>
              </a-button>
            </div>
          </div>
          <a-empty v-else :description="t('signIn.repair.noAvailableDates')"/>
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