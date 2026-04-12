import request from '@/utils/request'
import type {ApiResponse} from '@/types'

/**
 * 生成行为验证码
 * @param type 验证码类型: SLIDER(滑块) | ROTATE(旋转) | WORD_IMAGE_CLICK(文字点选)
 * @returns 验证码数据（包含图片Base64、校验ID等）
 */
export function generateCaptcha(type: 'SLIDER' | 'ROTATE' | 'WORD_IMAGE_CLICK' = 'SLIDER') {
    return request.post<ApiResponse<Record<string, unknown>>>('/api/captcha/generate', null, {
        params: {type}
    })
}

/**
 * 校验验证码
 * @param data 校验参数 { id: 验证码唯一ID, data: 用户操作轨迹数据 }
 * @returns 校验成功返回一次性 captchaToken
 */
export function checkCaptcha(data: { id: string; data: unknown }) {
    return request.post<ApiResponse<string>>('/api/captcha/check', data)
}

/**
 * 二次校验验证码token（业务接口调用前使用）
 * @param captchaToken 生成接口返回的一次性token
 * @returns 校验结果
 */
export function verifyCaptchaToken(captchaToken: string) {
    return request.post<ApiResponse<void>>('/api/captcha/verify-token', null, {
        params: {captchaToken}
    })
}
