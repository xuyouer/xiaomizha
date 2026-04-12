import request from '@/utils/request'
import type {ApiResponse, PageResult, UserProfile, ProfileListParams} from '@/types'
import humps from "humps"

export type {UserProfile}

/**
 * 获取用户资料列表(分页)
 * @param params 查询参数, 可选的分页和筛选条件
 * @returns 返回分页后的用户资料列表
 */
export function getProfileList(params?: ProfileListParams) {
    return request.get<PageResult<UserProfile>>('/api/profiles/list', {params})
}

/**
 * 根据资料ID获取用户资料详情
 * @param profileId 用户资料ID
 * @returns 返回单个用户资料详情
 */
export function getProfileById(profileId: number) {
    return request.get<ApiResponse<UserProfile>>(`/api/profiles/${profileId}`)
}

/**
 * 根据用户ID获取用户资料详情
 * @param userId 用户ID
 * @returns 返回该用户的资料详情
 */
export function getProfileByUserId(userId: number) {
    return request.get<ApiResponse<UserProfile>>(`/api/profiles/user/${userId}`)
}

/**
 * 创建用户资料
 * @param data 用户资料数据, 键名会自动转换为下划线格式
 * @returns 返回操作结果
 */
export function createProfile(data: UserProfile) {
    return request.post<ApiResponse<void>>('/api/profiles', humps.decamelizeKeys(data))
}

/**
 * 更新用户资料
 * @param profileId 用户资料ID
 * @param data 更新的用户资料数据, 键名会自动转换为下划线格式
 * @returns 返回操作结果
 */
export function updateProfile(profileId: number, data: UserProfile) {
    return request.put<ApiResponse<void>>(`/api/profiles/${profileId}`, humps.decamelizeKeys(data))
}

/**
 * 删除用户资料
 * @param profileId 用户资料ID
 * @returns 返回操作结果
 */
export function deleteProfile(profileId: number) {
    return request.delete<ApiResponse<void>>(`/api/profiles/${profileId}`)
}

/**
 * 批量创建用户资料
 * @param dataList 用户资料数据数组, 键名会自动转换为下划线格式
 * @returns 返回操作结果
 */
export function batchCreateProfiles(dataList: UserProfile[]) {
    return request.post<ApiResponse<void>>('/api/profiles/batch', humps.decamelizeKeys(dataList))
}

/**
 * 批量更新用户资料
 * @param dataList 用户资料数据数组, 键名会自动转换为下划线格式
 * @returns 返回操作结果
 */
export function batchUpdateProfiles(dataList: UserProfile[]) {
    return request.put<ApiResponse<void>>('/api/profiles/batch', humps.decamelizeKeys(dataList))
}

/**
 * 批量删除用户资料
 * @param profileIds 用户资料ID数组
 * @returns 返回操作结果
 */
export function batchDeleteProfiles(profileIds: number[]) {
    return request.delete<ApiResponse<void>>('/api/profiles/batch', {data: profileIds})
}
