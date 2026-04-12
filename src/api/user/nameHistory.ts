import request from '@/utils/request'
import type {ApiResponse, NameHistoryListParams, PageResult, UserNameHistories} from '@/types'
import humps from 'humps'

export type {UserNameHistories}

export function getNameHistoryList(params: NameHistoryListParams) {
    return request.get<PageResult<UserNameHistories>>('/api/name-history/list', {params})
}

export function getHistoryById(historyId: number) {
    return request.get<ApiResponse<UserNameHistories>>(`/api/name-history/${historyId}`)
}

export function getHistoriesByUserId(userId: number) {
    return request.get<ApiResponse<UserNameHistories[]>>(`/api/name-history/user/${userId}`)
}

export function getHistoriesByUserIdWithPage(userId: number, current: number = 1, pageSize: number = 10) {
    return request.get<PageResult<UserNameHistories>>(`/api/name-history/user/${userId}/page`, {
        params: {current, pageSize}
    })
}

export function addHistory(data: UserNameHistories) {
    return request.post<ApiResponse<void>>('/api/name-history', humps.decamelizeKeys(data))
}

export function updateHistory(historyId: number, data: UserNameHistories) {
    return request.put<ApiResponse<void>>(`/api/name-history/${historyId}`, humps.decamelizeKeys(data))
}

export function deleteHistory(historyId: number) {
    return request.delete<ApiResponse<void>>(`/api/name-history/${historyId}`)
}

export function batchAddHistories(dataList: UserNameHistories[]) {
    return request.post<ApiResponse<void>>('/api/name-history/batch', humps.decamelizeKeys(dataList))
}

export function batchUpdateHistories(dataList: UserNameHistories[]) {
    return request.put<ApiResponse<void>>('/api/name-history/batch', humps.decamelizeKeys(dataList))
}

export function batchDeleteHistories(historyIds: number[]) {
    return request.delete<ApiResponse<void>>('/api/name-history/batch', {data: historyIds})
}
