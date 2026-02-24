import request from '@/utils/request'
import type { ApiResponse, GenerateTrialLicenseRequest, LicenseInfo, LicenseUserRelation, PageResult, PageParams } from '@/types/api'
import humps from "humps"

export type { LicenseInfo, LicenseUserRelation }

// 生成试用许可证
export function generateTrialLicense(data: GenerateTrialLicenseRequest) {
    return request.post<ApiResponse<{ licenseKey: string }>>('/api/license/generate-trial', humps.decamelizeKeys(data))
}

// 获取许可证信息
export function getLicense(licenseKey: string) {
    return request.get<ApiResponse<LicenseInfo>>(`/api/license/get/${licenseKey}`)
}

// 激活许可证
export function activateLicense(data: { licenseKey: string; activationCode: string }) {
    return request.post<ApiResponse<boolean>>('/api/license/activate', humps.decamelizeKeys(data))
}

// 验证许可证
export function validateLicense(licenseKey: string) {
    return request.post<ApiResponse<Record<string, any>>>(`/api/license/validate/${licenseKey}`)
}

// 生成激活码
export function generateActivationCode(expireDays: number) {
    return request.post<ApiResponse<{ activationCode: string }>>(`/api/license/generate-activation-code/${expireDays}`)
}

// 禁用许可证
export function disableLicense(licenseKey: string) {
    return request.post<ApiResponse<boolean>>(`/api/license/disable/${licenseKey}`)
}

// 启用许可证
export function enableLicense(licenseKey: string) {
    return request.post<ApiResponse<boolean>>(`/api/license/enable/${licenseKey}`)
}

// 更新硬件绑定
export function updateHardwareBinding(licenseKey: string) {
    return request.post<ApiResponse<boolean>>(`/api/license/update-hardware-binding/${licenseKey}`)
}

// 验证功能访问权限
export function validateFeatureAccess(licenseKey: string, featureCode: string) {
    return request.get<ApiResponse<boolean>>(`/api/license/validate-feature/${licenseKey}/${featureCode}`)
}

// 获取授权功能列表
export function getAuthorizedFeatures(licenseKey: string) {
    return request.get<ApiResponse<string[]>>(`/api/license/features/${licenseKey}`)
}

// 获取即将过期的许可证
export function getExpiringLicenses(days: number) {
    return request.get<ApiResponse<LicenseInfo[]>>(`/api/license/expiring/${days}`)
}

// 统计许可证数量
export function countLicenses() {
    return request.get<ApiResponse<Record<string, number>>>('/api/license/count')
}

// 批量更新许可证状态
export function batchUpdateStatus(data: { licenseKeys: string[]; status: string }) {
    return request.post<ApiResponse<boolean>>('/api/license/batch-update-status', humps.decamelizeKeys(data))
}

// 根据用户ID查询用户名下的所有许可证
export function getLicensesByUserId(userId: number, params?: PageParams) {
    return request.get<PageResult<LicenseInfo>>(`/api/license/user/${userId}`, { params })
}

// 根据许可证ID查询关联的用户
export function getUsersByLicenseId(licenseId: string, params?: PageParams) {
    return request.get<PageResult<LicenseUserRelation>>(`/api/license/relations/license/${licenseId}`, { params })
}

// 根据用户ID和许可证类型查询许可证
export function getLicensesByUserIdAndType(userId: number, licenseType: string, params?: PageParams) {
    return request.get<PageResult<LicenseInfo>>(`/api/license/user/${userId}/type/${licenseType}`, { params })
}

// 检查用户是否已有指定类型的许可证
export function hasLicenseByType(userId: number, licenseType: string) {
    return request.get<ApiResponse<boolean>>(`/api/license/user/${userId}/has-type/${licenseType}`)
}

// 创建用户与许可证的关联
export function createUserLicenseRelation(userId: number, licenseId: string) {
    return request.post<ApiResponse<boolean>>('/api/license/relations', humps.decamelizeKeys({ userId, licenseId }))
}

// 根据许可证密钥创建用户与许可证的关联
export function createUserLicenseRelationByKey(userId: number, licenseKey: string) {
    return request.post<ApiResponse<boolean>>('/api/license/relations/by-key', humps.decamelizeKeys({ userId, licenseKey }))
}

// 根据用户ID和许可证ID删除关联
export function deleteUserLicenseRelation(userId: number, licenseId: string) {
    return request.delete<ApiResponse<boolean>>(`/api/license/relations/${userId}/${licenseId}`)
}

// 根据用户ID删除所有关联
export function deleteAllRelationsByUserId(userId: number) {
    return request.delete<ApiResponse<boolean>>(`/api/license/relations/user/${userId}`)
}

// 根据许可证ID删除所有关联
export function deleteAllRelationsByLicenseId(licenseId: string) {
    return request.delete<ApiResponse<boolean>>(`/api/license/relations/license/${licenseId}`)
}

// 根据许可证密钥查询关联的用户
export function getUsersByLicenseKey(licenseKey: string) {
    return request.get<ApiResponse<LicenseUserRelation[]>>(`/api/license/relations/key/${licenseKey}`)
}

// 根据许可证密钥和用户ID检查关联是否存在
export function existsByLicenseKeyAndUserId(licenseKey: string, userId: number) {
    return request.get<ApiResponse<boolean>>(`/api/license/relations/exists/${licenseKey}/${userId}`)
}

// 根据许可证密钥删除所有关联
export function deleteAllRelationsByLicenseKey(licenseKey: string) {
    return request.delete<ApiResponse<boolean>>(`/api/license/relations/key/${licenseKey}`)
}

// 根据许可证密钥和用户ID删除关联
export function deleteRelationByLicenseKeyAndUserId(licenseKey: string, userId: number) {
    return request.delete<ApiResponse<boolean>>(`/api/license/relations/key/${licenseKey}/${userId}`)
}

// 根据许可证密钥查询许可证信息
export function getLicenseByLicenseKey(licenseKey: string) {
    return request.get<ApiResponse<LicenseInfo>>(`/api/license/info/key/${licenseKey}`)
}

// 根据许可证ID查询许可证信息
export function getLicenseByLicenseId(licenseId: string) {
    return request.get<ApiResponse<LicenseInfo>>(`/api/license/info/id/${licenseId}`)
}

// 批量创建用户与许可证的关联
export function batchCreateUserLicenseRelations(userId: number, licenseKeys: string[]) {
    return request.post<ApiResponse<boolean>>('/api/license/relations/batch', humps.decamelizeKeys({ userId, licenseKeys }))
}

// 批量删除用户与许可证的关联
export function batchDeleteUserLicenseRelations(userId: number, licenseKeys: string[]) {
    return request.delete<ApiResponse<boolean>>('/api/license/relations/batch', { data: humps.decamelizeKeys({ userId, licenseKeys }) })
}