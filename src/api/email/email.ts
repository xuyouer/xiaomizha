import request from '@/utils/request'
import type {ApiResponse, EmailCodeScene, EmailValidateType} from "@/types"

/**
 * 发送邮箱验证邮件
 * @param userId 用户ID
 * @param email 邮箱地址
 * @param validateType 验证类型: REGISTER-注册, RESET-重置密码, BIND-绑定
 * @returns 发送结果 (包含脱敏邮箱、有效期等)
 */
export function sendValidationEmail(userId: number, email: string, validateType: EmailValidateType = 'REGISTER') {
    return request.post<ApiResponse<Record<string, unknown>>>('/api/email/send-validate', null, {
        params: {userId, email, validateType}
    })
}

/**
 * 校验邮箱验证Token
 * @param token 验证Token (从邮件链接中获取)
 * @returns 验证结果
 */
export function validateEmailToken(token: string) {
    return request.get<ApiResponse<Record<string, unknown>>>('/api/email/validate', {
        params: {token}
    })
}

/**
 * 查询邮箱验证状态
 * @param userId 用户ID
 * @param email 邮箱地址
 * @returns 是否已验证
 */
export function checkEmailValidated(userId: number, email: string) {
    return request.get<ApiResponse<Record<string, unknown>>>('/api/email/status', {
        params: {userId, email}
    })
}

/**
 * 重新发送验证邮件
 * @param userId 用户ID
 * @param email 邮箱地址
 * @returns 重发结果
 */
export function resendValidationEmail(userId: number, email: string) {
    return request.post<ApiResponse<Record<string, unknown>>>('/api/email/resend', null, {
        params: {userId, email}
    })
}

/**
 * 撤销验证Token
 * @param token 要撤销的Token值
 * @returns 撤销结果
 */
export function revokeEmailToken(token: string) {
    return request.post<ApiResponse<void>>('/api/email/revoke', null, {
        params: {token}
    })
}

/**
 * 发送邮箱验证码
 * @param email 邮箱地址
 * @param scene 使用场景: REGISTER-注册, LOGIN-登录, RESET-重置密码, BIND-绑定, MODIFY-修改信息
 * @returns 发送结果 (包含脱敏邮箱、有效期等)
 */
export function sendVerificationCode(email: string, scene: EmailCodeScene = 'REGISTER') {
    return request.post<ApiResponse<Record<string, unknown>>>('/api/email/send-code', null, {
        params: {email, scene}
    })
}

/**
 * 校验邮箱验证码
 * @param email 邮箱地址
 * @param code 用户输入的6位验证码
 * @returns 校验结果
 */
export function verifyEmailCode(email: string, code: string) {
    return request.post<ApiResponse<Record<string, unknown>>>('/api/email/verify-code', null, {
        params: {email, code}
    })
}

/**
 * 查询验证码发送冷却状态
 * @param email 邮箱地址
 * @param scene 使用场景
 * @returns 是否可发送、剩余冷却时间等
 */
export function checkCodeSendStatus(email: string, scene: EmailCodeScene = 'REGISTER') {
    return request.get<ApiResponse<Record<string, unknown>>>('/api/email/code-status', {
        params: {email, scene}
    })
}
