import request from '@/utils/request'
import type {ApiResponse, PageResult, SystemConfigsPageParams, SystemConfigsRecord} from '@/types'
import humps from 'humps'

export type {SystemConfigsRecord}

export function getAllSystemConfigs() {
    return request.get<ApiResponse<SystemConfigsRecord[]>>('/api/configs/list')
}

export function getSystemConfigsPage(params: SystemConfigsPageParams) {
    return request.get<PageResult<SystemConfigsRecord>>('/api/configs/list/page', {params})
}

export function getConfigByKey(configKey: string) {
    return request.get<ApiResponse<string>>(`/api/configs/value/${configKey}`)
}

export function getConfigDetailByKey(configKey: string) {
    return request.get<ApiResponse<SystemConfigsRecord>>(`/api/configs/detail/${configKey}`)
}

export function checkConfig(configKey: string) {
    return request.get<ApiResponse<boolean>>(`/api/configs/check/${configKey}`)
}

export function addSystemConfig(data: SystemConfigsRecord) {
    return request.post<ApiResponse<void>>('/api/configs', humps.decamelizeKeys(data))
}

export function updateSystemConfig(id: number, data: SystemConfigsRecord) {
    return request.put<ApiResponse<void>>(`/api/configs/${id}`, humps.decamelizeKeys(data))
}

export function deleteSystemConfig(id: number) {
    return request.delete<ApiResponse<void>>(`/api/configs/${id}`)
}
