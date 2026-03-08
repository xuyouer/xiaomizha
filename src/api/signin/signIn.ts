import request from '@/utils/request'
import type {
    ApiResponse,
    SignInResponse,
    SignInStatusResponse,
    SignInRankingParams,
    SignInRankingResult,
    MonthlySignInRecordParams,
    ContinuousDaysResponse,
    SignInRewardResponse,
    CheckTodayResponse,
    MonthlySignInRecordResponse,
    UserSignInListParams,
    PageResult,
    SignInUserListItem
} from '@/types/api'

/**
 * 用户签到
 * @param userId 用户ID
 * @returns 签到结果
 */
export function signIn(userId: number) {
    return request.post<ApiResponse<SignInResponse>>('/api/signin/sign', null, {params: {userId}})
}

/**
 * 检查今日是否已签到
 * @param userId 用户ID
 * @returns 签到状态
 */
export function checkTodaySignIn(userId: number) {
    return request.get<ApiResponse<CheckTodayResponse>>('/api/signin/check', {params: {userId}})
}

/**
 * 获取用户签到状态
 * @param userId 用户ID
 * @returns 签到状态
 */
export function getSignInStatus(userId: number) {
    return request.get<ApiResponse<SignInStatusResponse>>('/api/signin/status', {params: {userId}})
}

/**
 * 获取用户月度签到记录
 * @param params 月度签到记录参数
 * @returns 月度签到记录
 */
export function getMonthlySignInRecord(params: MonthlySignInRecordParams) {
    const now = new Date()
    const {userId, year = now.getFullYear(), month = now.getMonth() + 1} = params
    return request.get<ApiResponse<MonthlySignInRecordResponse>>('/api/signin/monthly', {params: {userId, year, month}})
}

/**
 * 获取连续签到天数
 * @param userId 用户ID
 * @returns 连续签到天数
 */
export function getContinuousSignInDays(userId: number) {
    return request.get<ApiResponse<ContinuousDaysResponse>>('/api/signin/continuous', {params: {userId}})
}

/**
 * 计算签到积分奖励
 * @param userId 用户ID
 * @returns 积分奖励
 */
export function calculateSignInReward(userId: number) {
    return request.get<ApiResponse<SignInRewardResponse>>('/api/signin/reward', {params: {userId}})
}

/**
 * 获取签到排行榜
 * @param params 排行参数
 * @returns 排行榜数据
 */
export function getSignInRanking(params: SignInRankingParams) {
    const {type = 1, limit = 10} = params
    return request.get<ApiResponse<SignInRankingResult>>('/api/signin/ranking', {params: {type, limit}})
}

export function getUserSignInList(params: UserSignInListParams) {
    const {current = 1, pageSize = 10, userId, userName, year, month, sortField, sortOrder} = params
    return request.get<PageResult<SignInUserListItem>>('/api/signin/users', {
        params: {current, pageSize, userId, userName, year, month, sortField, sortOrder}
    })
}
