import request from '@/utils/request'
import type {ApiResponse, PageResult, User, UserDetailDTO, UserListParams} from '@/types/api'
import humps from "humps";

// 获取用户列表
export function getUserList(params: UserListParams) {
  return request.get<PageResult<User>>('/api/users/list', { params })
}

// 获取用户详情
export function getUserDetail(userId: number) {
  return request.get<ApiResponse<UserDetailDTO>>(`/api/users/${userId}`)
}

// 注册用户
export function registerUser(data: User) {
  // // 后端使用 SNAKE_CASE 命名策略，需要转换字段名
  // const requestData: any = { ...data }
  // if (requestData.passwordHash !== undefined) {
  //   requestData.password_hash = requestData.passwordHash
  //   delete requestData.passwordHash
  // }
  // return request.post<ApiResponse<void>>('/api/users/register', requestData)
  return request.post<ApiResponse<void>>('/api/users/register', humps.decamelizeKeys(data))
}

// 更新用户
export function updateUser(userId: number, data: User) {
  // // 后端使用 SNAKE_CASE 命名策略，需要转换字段名
  // const requestData: any = { ...data }
  // if (requestData.passwordHash !== undefined) {
  //   requestData.password_hash = requestData.passwordHash
  //   delete requestData.passwordHash
  // }
  // return request.put<ApiResponse<void>>(`/api/users/update/${userId}`, requestData)
  return request.put<ApiResponse<void>>(`/api/users/update/${userId}`, humps.decamelizeKeys(data))
}

// 注销用户
export function logoutUser(userId: number) {
  return request.delete<ApiResponse<void>>(`/api/users/logout/${userId}`)
}

// 根据用户名获取用户ID
export function getUserIdByUsername(username: string) {
  return request.get<ApiResponse<number>>(`/api/users/username/${username}`)
}
