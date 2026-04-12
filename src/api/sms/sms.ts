import request from '@/utils/request'
import type {ApiResponse} from '@/types'

/**
 * 发送短信验证码
 * @param phone 手机号
 * @returns 发送结果
 */
export function sendSmsVerificationCode(phone: string) {
    return request.post<ApiResponse<void>>(`/api/sms/verification-code/${phone}`)
}

/**
 * 校验短信验证码
 * @param phone 手机号
 * @param code 用户输入的验证码
 * @returns 校验结果
 */
export function verifySmsCode(phone: string, code: string) {
    return request.post<ApiResponse<void>>('/api/sms/verify-code', null, {
        params: {phone, code}
    })
}

/**
 * 发送自定义短信内容
 * @param phone 手机号
 * @param content 短信模板内容
 * @param args 模板参数
 * @returns 发送结果
 */
export function sendCustomSms(phone: string, content: string, args?: string[]) {
    return request.post<ApiResponse<void>>('/api/sms/custom', null, {
        params: {phone, content, ...(args ? {args: args.join(',')} : {})}
    })
}
