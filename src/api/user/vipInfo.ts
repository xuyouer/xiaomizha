import request from '@/utils/request'
import type {
    ApiResponse,
    PageResult,
    UserVipInfo,
    VipInfoListParams
} from '@/types'
import humps from 'humps'

/**
 * 分页获取VIP信息列表
 * @param params 分页参数
 * @returns VIP信息分页数据
 */
export function getVipInfoPage(params: VipInfoListParams = {}) {
    return request.get<PageResult<UserVipInfo>>('/api/vip-info/list', {
        params: humps.decamelizeKeys(params)
    })
}

/**
 * 根据VIP ID获取VIP信息详情
 * @param vipId VIP ID
 * @returns VIP信息详情
 */
export function getVipInfoById(vipId: number) {
    return request.get<ApiResponse<UserVipInfo>>(`/api/vip-info/${vipId}`)
}

/**
 * 根据用户ID获取VIP信息
 * @param userId 用户ID
 * @returns 用户VIP信息
 */
export function getUserVipInfoByUserId(userId: number) {
    return request.get<ApiResponse<UserVipInfo>>(`/api/vip-info/user/${userId}`)
}

/**
 * 根据用户ID更新VIP信息
 * @param userId 用户ID
 * @param data VIP信息(可包含vipLevel、vipExpireDate、vipPoints等)
 * @returns 操作结果
 */
export function updateVipInfoByUserId(userId: number, data: Partial<UserVipInfo>) {
    return request.put<ApiResponse<void>>(`/api/vip-info/user/${userId}`, humps.decamelizeKeys(data))
}

/**
 * 新增VIP信息
 * @param data VIP信息
 * @returns 操作结果
 */
export function addVipInfo(data: Partial<UserVipInfo>) {
    return request.post<ApiResponse<void>>('/api/vip-info', humps.decamelizeKeys(data))
}

/**
 * 更新VIP信息
 * @param vipId VIP ID
 * @param data VIP信息
 * @returns 操作结果
 */
export function updateVipInfo(vipId: number, data: Partial<UserVipInfo>) {
    return request.put<ApiResponse<void>>(`/api/vip-info/${vipId}`, humps.decamelizeKeys(data))
}

/**
 * 删除VIP信息
 * @param vipId VIP ID
 * @returns 操作结果
 */
export function deleteVipInfo(vipId: number) {
    return request.delete<ApiResponse<void>>(`/api/vip-info/${vipId}`)
}

/**
 * 创建默认VIP信息
 * @param userId 用户ID
 * @returns 操作结果
 */
export function createDefaultVipInfo(userId: number) {
    return request.post<ApiResponse<void>>(`/api/vip-info/default/${userId}`)
}

/**
 * 激活VIP信息
 * @param userId 用户ID
 * @returns 操作结果
 */
export function activateVipInfo(userId: number) {
    return request.put<ApiResponse<void>>(`/api/vip-info/activate/${userId}`)
}

/**
 * 批量添加VIP信息
 * @param dataList VIP信息列表
 * @returns 操作结果
 */
export function batchAddVipInfo(dataList: Partial<UserVipInfo>[]) {
    return request.post<ApiResponse<void>>('/api/vip-info/batch', humps.decamelizeKeys(dataList))
}

/**
 * 批量更新VIP信息
 * @param dataList VIP信息列表
 * @returns 操作结果
 */
export function batchUpdateVipInfo(dataList: Partial<UserVipInfo>[]) {
    return request.put<ApiResponse<void>>('/api/vip-info/batch', humps.decamelizeKeys(dataList))
}

/**
 * 批量删除VIP信息
 * @param vipIds VIP ID列表
 * @returns 操作结果
 */
export function batchDeleteVipInfo(vipIds: number[]) {
    return request.delete<ApiResponse<void>>('/api/vip-info/batch', {data: vipIds})
}
