import request from '@/utils/request'
import type {
    ApiResponse,
    PageResult,
    Resource,
    ResourceRelationsListParams,
    UserResourceRelations
} from '@/types'
import humps from 'humps'

/**
 * 分页获取用户资源关联列表
 * @param params 分页参数
 * @returns 用户资源关联分页数据
 */
export function getUserResourceRelationsPage(params: ResourceRelationsListParams = {}) {
    return request.get<PageResult<UserResourceRelations>>('/api/user-resource-relations/list', {
        params: humps.decamelizeKeys(params)
    })
}

/**
 * 根据关联ID获取用户资源关联详情
 * @param relationId 关联ID
 * @returns 用户资源关联详情
 */
export function getUserResourceRelationById(relationId: number) {
    return request.get<ApiResponse<UserResourceRelations>>(`/api/user-resource-relations/${relationId}`)
}

/**
 * 新增用户资源关联
 * @param data 用户资源关联信息
 * @returns 操作结果
 */
export function addUserResourceRelation(data: Partial<UserResourceRelations>) {
    return request.post<ApiResponse<void>>('/api/user-resource-relations', humps.decamelizeKeys(data))
}

/**
 * 更新用户资源关联
 * @param relationId 关联ID
 * @param data 用户资源关联信息
 * @returns 操作结果
 */
export function updateUserResourceRelation(relationId: number, data: Partial<UserResourceRelations>) {
    return request.put<ApiResponse<void>>(`/api/user-resource-relations/${relationId}`, humps.decamelizeKeys(data))
}

/**
 * 删除用户资源关联
 * @param relationId 关联ID
 * @returns 操作结果
 */
export function deleteUserResourceRelation(relationId: number) {
    return request.delete<ApiResponse<void>>(`/api/user-resource-relations/${relationId}`)
}

/**
 * 根据用户ID获取资源列表
 * @param userId 用户ID
 * @returns 用户拥有的资源列表
 */
export function getUserResourcesByUserId(userId: number) {
    return request.get<ApiResponse<Resource[]>>(`/api/user-resource-relations/user/${userId}/resources`)
}

/**
 * 根据用户ID更新用户资源(全量替换)
 * @param userId 用户ID
 * @param resourceIds 资源ID列表
 * @returns 操作结果
 */
export function updateUserResourcesByUserId(userId: number, resourceIds: number[]) {
    return request.put<ApiResponse<void>>(`/api/user-resource-relations/user/${userId}/resources`, {resourceIds})
}

/**
 * 根据用户ID获取资源关联列表
 * @param userId 用户ID
 * @returns 用户资源关联列表
 */
export function getUserResourceRelationsByUserId(userId: number) {
    return request.get<ApiResponse<UserResourceRelations[]>>(`/api/user-resource-relations/user/${userId}/relations`)
}

/**
 * 批量添加用户资源关联
 * @param dataList 用户资源关联列表
 * @returns 操作结果
 */
export function batchAddUserResourceRelations(dataList: Partial<UserResourceRelations>[]) {
    return request.post<ApiResponse<void>>('/api/user-resource-relations/batch', humps.decamelizeKeys(dataList))
}

/**
 * 批量更新用户资源关联
 * @param dataList 用户资源关联列表
 * @returns 操作结果
 */
export function batchUpdateUserResourceRelations(dataList: Partial<UserResourceRelations>[]) {
    return request.put<ApiResponse<void>>('/api/user-resource-relations/batch', humps.decamelizeKeys(dataList))
}

/**
 * 批量删除用户资源关联
 * @param relationIds 关联ID列表
 * @returns 操作结果
 */
export function batchDeleteUserResourceRelations(relationIds: number[]) {
    return request.delete<ApiResponse<void>>('/api/user-resource-relations/batch', {data: relationIds})
}
