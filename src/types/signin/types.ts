import type {PageParams} from "@/types"

/** 签到记录 */
export interface SignIn {
    userId?: number
    signInDate?: string
    continuousDays?: number
    pointsReward?: number
}

/** 签到配置 */
export interface SignInConfig {
    continuousDays?: number
    pointsReward?: number
    isActive?: number
}

/** 用户签到列表项 */
export interface SignInUserListItem {
    userId: number
    userName?: string
    totalSignIns: number
    continuousDays: number
    maxContinuousDays: number
    monthlySignIns: number
    pointsEarned: number
    todaySigned: boolean
    lastSignInDate?: string
}

/** 月度签到报告 */
export interface SignInMonthlyReport {
    reportMonth?: string
    userId?: number
    totalSignIns?: number
    continuousDays?: number
    pointsEarned?: number
    rank?: number
}

/** 签到状态 */
export interface SignInStatus {
    userId?: number
    currentContinuousDays?: number
    lastSignInDate?: string
    isContinuous?: number
    totalSignIns?: number
    maxContinuousDays?: number
}

/** 签到响应 */
export interface SignInResponse {
    success: boolean
    message: string
    continuousDays?: number
    pointsReward?: number
    signInDate?: string
}

/** 签到状态响应 */
export interface SignInStatusResponse {
    todaySigned: boolean
    continuousDays: number
    totalSignIns: number
    maxContinuousDays: number
    lastSignInDate?: string
    isContinuous: boolean
    tomorrowReward?: number
}

/** 签到排行响应 */
export interface SignInRankingResponse {
    userId: number
    totalSignIns?: number
    continuousDays?: number
    monthlySignIns?: number
    rank: number
}

/** 签到排行参数 */
export interface SignInRankingParams {
    type: 1 | 2 | 3
    limit?: number
}

/** 月度签到记录参数 */
export interface MonthlySignInRecordParams {
    userId: number
    year?: number
    month?: number
}

/** 月度签到响应 */
export interface MonthlySignInRecordResponse {
    year?: number
    month?: number
    maxContinuousDays?: number
    signedDays?: number[]
    startDate?: string
    endDate?: string
    totalSignIns?: number
    totalPoints?: number
}

/** 今日已签到响应 */
export interface CheckTodayResponse {
    signed: boolean
    message: string
}

/** 连续签到天数响应 */
export interface ContinuousDaysResponse {
    continuousDays: number
    message: string
}

/** 签到奖励响应 */
export interface SignInRewardResponse {
    pointsReward: number
    message: string
}

/** 签到排行榜响应 */
export interface SignInRankingResult {
    success: boolean
    message?: string
    rankingList: SignInRankingResponse[]
    type: number
    limit: number
}

/** 签到配置列表参数 */
export interface SignInConfigListParams extends PageParams {
}

/** 月度签到报告列表参数 */
export interface SignInMonthlyReportListParams extends PageParams {
    userId?: number
    reportMonth?: string
}

export interface UserSignInListParams extends PageParams {
    userId?: number
    userName?: string
    year?: number
    month?: number
    sortField?: string
    sortOrder?: 'ascend' | 'descend'
}

export interface RepairCardRecord {
    userId: number
    username: string
    normalCardCount: number
    advancedCardCount: number
    totalCardCount: number
}

export interface GrantRecord {
    grantId: number
    userId: number
    username: string
    cardType: number
    quantity: number
    source: string
    grantMonth: string
    remark: string
    createdAt: string
}