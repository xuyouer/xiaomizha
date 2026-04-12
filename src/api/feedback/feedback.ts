import request from '@/utils/request'
import type {ApiResponse, PageResult, FeedbackListParams, UserFeedbackRecord} from '@/types'
import humps from 'humps'

export type {UserFeedbackRecord}

export function getFeedbackList(params: FeedbackListParams) {
    return request.get<PageResult<UserFeedbackRecord>>('/api/feedback/list', {params})
}

export function getFeedbackById(id: number) {
    return request.get<ApiResponse<UserFeedbackRecord>>(`/api/feedback/${id}`)
}

export function getFeedbacksByUserId(userId: number, params?: FeedbackListParams) {
    return request.get<PageResult<UserFeedbackRecord>>(`/api/feedback/list/user/${userId}`, {params})
}

export function addFeedback(data: UserFeedbackRecord) {
    return request.post<ApiResponse<void>>('/api/feedback', humps.decamelizeKeys(data))
}

export function updateFeedback(id: number, data: UserFeedbackRecord) {
    return request.put<ApiResponse<void>>(`/api/feedback/${id}`, humps.decamelizeKeys(data))
}

export function deleteFeedback(id: number) {
    return request.delete<ApiResponse<void>>(`/api/feedback/${id}`)
}

export function batchAddFeedback(dataList: UserFeedbackRecord[]) {
    return request.post<ApiResponse<void>>('/api/feedback/batch', humps.decamelizeKeys(dataList))
}

export function batchUpdateFeedback(dataList: UserFeedbackRecord[]) {
    return request.put<ApiResponse<void>>('/api/feedback/batch', humps.decamelizeKeys(dataList))
}

export function batchDeleteFeedback(ids: number[]) {
    return request.delete<ApiResponse<void>>('/api/feedback/batch', {data: ids})
}
