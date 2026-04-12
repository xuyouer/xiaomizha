import request from '@/utils/request'
import type {PageResult} from "@/types"

/**
 * 根据用户ID查询单个用户的操作日志
 */
export function getUserLogs(userId: number) {
    return request.get<PageResult<Record<string, unknown>>>(`/api/users/${userId}/logs`)
}

/**
 * 根据用户ID查询单个用户的VIP日志
 */
export function getUserVipLogs(userId: number) {
    return request.get<PageResult<Record<string, unknown>>>(`/api/users/${userId}/vip-logs`)
}

/**
 * 根据用户ID查询单个用户的VIP积分日志
 */
export function getUserVipPointsLogs(userId: number) {
    return request.get<PageResult<Record<string, unknown>>>(`/api/users/${userId}/vip-points-logs`)
}

/**
 * 根据用户ID查询单个用户的登录记录
 */
export function getUserLoginRecords(userId: number) {
    return request.get<PageResult<Record<string, unknown>>>(`/api/users/${userId}/login-records`)
}
