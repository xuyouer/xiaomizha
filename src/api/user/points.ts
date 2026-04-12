import request from '@/utils/request'
import type {ApiResponse, PageResult, PointsListParams, UserPoints} from '@/types'
import humps from 'humps'

/**
 * 分页获取积分列表
 * @param params 分页参数
 * @returns 积分分页数据
 */
export function getPointsList(params: PointsListParams = {}) {
    return request.get<PageResult<UserPoints>>('/api/points/list', {
        params: humps.decamelizeKeys(params)
    })
}

/**
 * 根据积分ID获取积分详情
 * @param pointsId 积分ID
 * @returns 积分详情
 */
export function getPointsById(pointsId: number) {
    return request.get<ApiResponse<UserPoints>>(`/api/points/${pointsId}`)
}

/**
 * 根据用户ID获取积分信息
 * @param userId 用户ID
 * @returns 用户积分信息
 */
export function getUserPointsByUserId(userId: number) {
    return request.get<ApiResponse<UserPoints>>(`/api/points/user/${userId}`)
}

/**
 * 根据用户ID增加积分
 * @param userId 用户ID
 * @param points 增加的积分数量(必须大于0)
 * @returns 操作结果
 */
export function addPointsByUserId(userId: number, points: number) {
    return request.post<ApiResponse<void>>(`/api/points/user/${userId}/add`, null, {
        params: {points}
    })
}

/**
 * 根据用户ID扣除积分
 * @param userId 用户ID
 * @param points 扣除的积分数量(必须大于0)
 * @returns 操作结果
 */
export function deductPointsByUserId(userId: number, points: number) {
    return request.post<ApiResponse<void>>(`/api/points/user/${userId}/deduct`, null, {
        params: {points}
    })
}

/**
 * 根据用户ID设置积分
 * @param userId 用户ID
 * @param points 设置的积分值(直接设置为指定值,不能为负数)
 * @returns 操作结果
 */
export function setPointsByUserId(userId: number, points: number) {
    return request.put<ApiResponse<void>>(`/api/points/user/${userId}/set`, null, {
        params: {points}
    })
}

/**
 * 根据用户ID更新积分信息
 * @param userId 用户ID
 * @param data 积分信息(包含totalPoints、availablePoints、frozenPoints、consumedPoints等)
 * @returns 操作结果
 */
export function updatePointsByUserId(userId: number, data: Partial<UserPoints>) {
    return request.put<ApiResponse<void>>(`/api/points/user/${userId}`, humps.decamelizeKeys(data))
}

/**
 * 新增积分记录
 * @param data 积分记录信息
 * @returns 操作结果
 */
export function addPoints(data: Partial<UserPoints>) {
    return request.post<ApiResponse<void>>('/api/points', humps.decamelizeKeys(data))
}

/**
 * 更新积分记录
 * @param pointsId 积分ID
 * @param data 积分信息
 * @returns 操作结果
 */
export function updatePoints(pointsId: number, data: Partial<UserPoints>) {
    return request.put<ApiResponse<void>>(`/api/points/${pointsId}`, humps.decamelizeKeys(data))
}

/**
 * 删除积分记录
 * @param pointsId 积分ID
 * @returns 操作结果
 */
export function deletePoints(pointsId: number) {
    return request.delete<ApiResponse<void>>(`/api/points/${pointsId}`)
}

/**
 * 批量添加积分记录
 * @param dataList 积分记录列表
 * @returns 操作结果
 */
export function batchAddPoints(dataList: Partial<UserPoints>[]) {
    return request.post<ApiResponse<void>>('/api/points/batch', humps.decamelizeKeys(dataList))
}

/**
 * 批量更新积分记录
 * @param dataList 积分记录列表
 * @returns 操作结果
 */
export function batchUpdatePoints(dataList: Partial<UserPoints>[]) {
    return request.put<ApiResponse<void>>('/api/points/batch', humps.decamelizeKeys(dataList))
}

/**
 * 批量删除积分记录
 * @param pointsIds 积分ID列表
 * @returns 操作结果
 */
export function batchDeletePoints(pointsIds: number[]) {
    return request.delete<ApiResponse<void>>('/api/points/batch', {data: pointsIds})
}
