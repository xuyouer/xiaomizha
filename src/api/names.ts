import request from '@/utils/request'
import type { ApiResponse, PageResult, NamesListParams, UserNames } from '@/types/api'
import humps from 'humps'

export type { UserNames }

export function getNamesList(params: NamesListParams) {
    return request.get<PageResult<UserNames>>('/api/names/list', { params })
}

export function getNameById(nameId: number) {
    return request.get<ApiResponse<UserNames>>(`/api/names/${nameId}`)
}

export function getNameByUserId(userId: number) {
    return request.get<ApiResponse<UserNames>>(`/api/names/user/${userId}`)
}

export function addName(data: UserNames) {
    return request.post<ApiResponse<void>>('/api/names', humps.decamelizeKeys(data))
}

export function updateName(nameId: number, data: UserNames) {
    return request.put<ApiResponse<void>>(`/api/names/${nameId}`, humps.decamelizeKeys(data))
}

export function deleteName(nameId: number) {
    return request.delete<ApiResponse<void>>(`/api/names/${nameId}`)
}
