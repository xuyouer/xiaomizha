import request from '@/utils/request'
import type {
    ApiResponse,
    PageResult,
    Role,
    RoleRelationsListParams,
    UserRoleRelations
} from '@/types'
import humps from 'humps'

/**
 * 分页获取用户角色关联列表
 * @param params 分页参数
 * @returns 用户角色关联分页数据
 */
export function getRoleRelationsPage(params: RoleRelationsListParams = {}) {
    return request.get<PageResult<UserRoleRelations>>('/api/role-relations/list', {
        params: humps.decamelizeKeys(params)
    })
}

/**
 * 根据关联ID获取用户角色关联详情
 * @param relationId 关联ID
 * @returns 用户角色关联详情
 */
export function getRoleRelationById(relationId: number) {
    return request.get<ApiResponse<UserRoleRelations>>(`/api/role-relations/${relationId}`)
}

/**
 * 新增用户角色关联
 * @param data 用户角色关联信息
 * @returns 操作结果
 */
export function addRoleRelation(data: Partial<UserRoleRelations>) {
    return request.post<ApiResponse<void>>('/api/role-relations', humps.decamelizeKeys(data))
}

/**
 * 更新用户角色关联
 * @param relationId 关联ID
 * @param data 用户角色关联信息
 * @returns 操作结果
 */
export function updateRoleRelation(relationId: number, data: Partial<UserRoleRelations>) {
    return request.put<ApiResponse<void>>(`/api/role-relations/${relationId}`, humps.decamelizeKeys(data))
}

/**
 * 删除用户角色关联
 * @param relationId 关联ID
 * @returns 操作结果
 */
export function deleteRoleRelation(relationId: number) {
    return request.delete<ApiResponse<void>>(`/api/role-relations/${relationId}`)
}

/**
 * 根据用户ID获取角色列表
 * @param userId 用户ID
 * @returns 用户拥有的角色列表
 */
export function getUserRolesByUserId(userId: number) {
    return request.get<ApiResponse<Role[]>>(`/api/role-relations/user/${userId}/roles`)
}

/**
 * 根据用户ID更新用户角色(全量替换)
 * @param userId 用户ID
 * @param roleIds 角色ID列表
 * @returns 操作结果
 */
export function updateUserRolesByUserId(userId: number, roleIds: number[]) {
    return request.put<ApiResponse<void>>(`/api/role-relations/user/${userId}/roles`, {roleIds})
}

/**
 * 创建默认角色关联
 * @param userId 用户ID
 * @returns 操作结果
 */
export function createDefaultRoleRelation(userId: number) {
    return request.post<ApiResponse<void>>(`/api/role-relations/default/${userId}`)
}

/**
 * 激活用户角色关联
 * @param userId 用户ID
 * @returns 操作结果
 */
export function activateRoleRelation(userId: number) {
    return request.put<ApiResponse<void>>(`/api/role-relations/activate/${userId}`)
}

/**
 * 批量添加用户角色关联
 * @param dataList 用户角色关联列表
 * @returns 操作结果
 */
export function batchAddRoleRelations(dataList: Partial<UserRoleRelations>[]) {
    return request.post<ApiResponse<void>>('/api/role-relations/batch', humps.decamelizeKeys(dataList))
}

/**
 * 批量更新用户角色关联
 * @param dataList 用户角色关联列表
 * @returns 操作结果
 */
export function batchUpdateRoleRelations(dataList: Partial<UserRoleRelations>[]) {
    return request.put<ApiResponse<void>>('/api/role-relations/batch', humps.decamelizeKeys(dataList))
}

/**
 * 批量删除用户角色关联
 * @param relationIds 关联ID列表
 * @returns 操作结果
 */
export function batchDeleteRoleRelations(relationIds: number[]) {
    return request.delete<ApiResponse<void>>('/api/role-relations/batch', {data: relationIds})
}
