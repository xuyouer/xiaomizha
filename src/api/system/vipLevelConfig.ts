import request from '@/utils/request'
import type { ApiResponse, PageResult, VipLevelConfigListParams, VipLevelConfigRecord } from '@/types/api'
import humps from 'humps'

export type { VipLevelConfigRecord }

export function getVipLevelConfigList(params: VipLevelConfigListParams) {
    return request.get<PageResult<VipLevelConfigRecord>>('/api/vip-level-config/list', { params })
}

export function getVipLevelConfigById(levelId: number) {
    return request.get<ApiResponse<VipLevelConfigRecord>>(`/api/vip-level-config/${levelId}`)
}

export function addVipLevelConfig(data: VipLevelConfigRecord) {
    return request.post<ApiResponse<void>>('/api/vip-level-config', humps.decamelizeKeys(data))
}

export function updateVipLevelConfig(levelId: number, data: VipLevelConfigRecord) {
    return request.put<ApiResponse<void>>(`/api/vip-level-config/${levelId}`, humps.decamelizeKeys(data))
}

export function deleteVipLevelConfig(levelId: number) {
    return request.delete<ApiResponse<void>>(`/api/vip-level-config/${levelId}`)
}
