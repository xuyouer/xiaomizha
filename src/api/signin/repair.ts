import request from '@/utils/request'
import type {ApiResponse} from '@/types'

/**
 * 补签
 * @param userId 用户ID
 * @param repairDate 补签日期(格式: YYYY-MM-DD)
 * @returns 补签结果
 */
export function doRepair(userId: number, repairDate: string) {
    return request.post<ApiResponse<Record<string, unknown>>>('/api/signin/repair/do', null, {
        params: {userId, repairDate}
    })
}

/**
 * 批量补签
 * @param userId 用户ID
 * @param repairDates 补签日期列表
 * @returns 补签结果
 */
export function batchRepair(userId: number, repairDates: string[]) {
    return request.post<ApiResponse<Record<string, unknown>>>('/api/signin/repair/batch', {
        repairDates
    }, {
        params: {userId}
    })
}

/**
 * 获取补签状态
 * @param userId 用户ID
 * @returns 补签状态(包含补签卡数量和可补签日期)
 */
export function getRepairStatus(userId: number) {
    return request.get<ApiResponse<Record<string, unknown>>>('/api/signin/repair/status', {
        params: {userId}
    })
}

/**
 * 获取可补签日期列表
 * @param userId 用户ID
 * @returns 可补签日期列表
 */
export function getAvailableRepairDates(userId: number) {
    return request.get<ApiResponse<string[]>>('/api/signin/repair/available-dates', {
        params: {userId}
    })
}

/**
 * 补签预览
 * @param userId 用户ID
 * @param repairDate 补签日期
 * @returns 预览结果(包含连续签到天数变化和积分奖励)
 */
export function getRepairPreview(userId: number, repairDate: string) {
    return request.get<ApiResponse<Record<string, unknown>>>('/api/signin/repair/preview', {
        params: {userId, repairDate}
    })
}

/**
 * 获取补签卡数量
 * @param userId 用户ID
 * @returns 补签卡信息
 */
export function getRepairCards(userId: number) {
    return request.get<ApiResponse<Record<string, unknown>>>('/api/signin/repair/cards', {
        params: {userId}
    })
}

/**
 * 领取免费补签卡
 * @param userId 用户ID
 * @param cardType 补签卡类型: 1-普通补签卡, 2-高级补签卡
 * @returns 领取结果
 */
export function claimFreeCard(userId: number, cardType: number) {
    return request.post<ApiResponse<Record<string, unknown>>>('/api/signin/repair/claim-card', null, {
        params: {userId, cardType}
    })
}

/**
 * 检查本月是否已领取补签卡
 * @param userId 用户ID
 * @param cardType 补签卡类型: 1-普通补签卡, 2-高级补签卡
 * @returns 领取状态
 */
export function getClaimStatus(userId: number, cardType: number) {
    return request.get<ApiResponse<{
        hasClaimed: boolean;
        cardType: number;
        userId: number
    }>>('/api/signin/repair/claim-status', {
        params: {userId, cardType}
    })
}

/**
 * 获取补签记录
 * @param userId 用户ID
 * @param current 当前页码
 * @param pageSize 每页数量
 * @returns 补签记录列表
 */
export function getRepairRecords(userId: number, current: number = 1, pageSize: number = 10) {
    return request.get<ApiResponse<Record<string, unknown>>>('/api/signin/repair/records', {
        params: {userId, current, pageSize}
    })
}
