import request from '@/utils/request'
import type {ApiResponse, PageResult, ResourceListParams} from '@/types/api'
import type { Resource } from '@/types/api'
import humps from "humps";

export type { Resource }

// 获取资源列表
export function getResourceList(params: ResourceListParams) {
  return request.get<PageResult<Resource>>('/api/resources/list', { params })
}

// 获取资源详情
export function getResourceDetail(resourceId: number) {
  return request.get<ApiResponse<Resource>>(`/api/resources/${resourceId}`)
}

// 创建资源
export function createResource(data: Resource) {
  return request.post<ApiResponse<void>>('/api/resources', humps.decamelizeKeys(data))
}

// 更新资源
export function updateResource(resourceId: number, data: Resource) {
  return request.put<ApiResponse<void>>(`/api/resources/${resourceId}`, humps.decamelizeKeys(data))
}

// 删除资源
export function deleteResource(resourceId: number) {
  return request.delete<ApiResponse<void>>(`/api/resources/${resourceId}`)
}

// 根据用户ID获取资源列表
export function getUserResources(userId: number) {
  return request.get<ApiResponse<Resource[]>>(`/api/resources/list/user/${userId}`)
}

// 批量添加资源
export function batchAddResources(data: Resource[]) {
  return request.post<ApiResponse<void>>('/api/resources/batch', humps.decamelizeKeys(data))
}

// 批量更新资源
export function batchUpdateResources(data: Resource[]) {
  return request.put<ApiResponse<void>>('/api/resources/batch', humps.decamelizeKeys(data))
}

// 批量删除资源
export function batchDeleteResources(resourceIds: number[]) {
  return request.delete<ApiResponse<void>>('/api/resources/batch', { data: resourceIds })
}
