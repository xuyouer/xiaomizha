import request from '@/utils/request'
import type {ApiResponse, PageResult, RoleListParams} from '@/types/api'
import type { Role } from '@/types/api'
import humps from "humps";

export type { Role }

// 获取角色列表
export function getRoleList(params: RoleListParams) {
  return request.get<PageResult<Role>>('/api/roles/list', { params })
}

// 获取角色详情
export function getRoleDetail(roleId: number) {
  return request.get<ApiResponse<Role>>(`/api/roles/${roleId}`)
}

// 创建角色
export function createRole(data: Role) {
  return request.post<ApiResponse<void>>('/api/roles', humps.decamelizeKeys(data))
}

// 更新角色
export function updateRole(roleId: number, data: Role) {
  return request.put<ApiResponse<void>>(`/api/roles/${roleId}`, humps.decamelizeKeys(data))
}

// 删除角色
export function deleteRole(roleId: number) {
  return request.delete<ApiResponse<void>>(`/api/roles/${roleId}`)
}

// 批量添加角色
export function batchAddRoles(data: Role[]) {
  return request.post<ApiResponse<void>>('/api/roles/batch', humps.decamelizeKeys(data))
}

// 批量更新角色
export function batchUpdateRoles(data: Role[]) {
  return request.put<ApiResponse<void>>('/api/roles/batch', humps.decamelizeKeys(data))
}

// 批量删除角色
export function batchDeleteRoles(roleIds: number[]) {
  return request.delete<ApiResponse<void>>('/api/roles/batch', { data: roleIds })
}
