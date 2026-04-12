import request from '@/utils/request'
import type {ApiResponse} from '@/types'

/**
 * 生成登录二维码, 前端调用
 * @returns 二维码 Base64 + 临时凭证 uuid + 过期时间
 */
export function generateLoginQrCode() {
    return request.get<ApiResponse<Record<string, unknown>>>('/api/auth/scan/login/qrcode')
}

/**
 * 查询扫码状态, 前端轮询调用, 间隔1-2秒
 * @param uuid 临时凭证
 * @returns 扫码状态 + 登录Token, 确认登录后返回
 */
export function queryScanState(uuid: string) {
    return request.get<ApiResponse<Record<string, unknown>>>('/api/auth/scan/login/state', {
        params: {uuid}
    })
}

/**
 * 扫码确认登录, 手机端调用
 * @param uuid 临时凭证, 手机端解析二维码获取
 * @param userId 手机端当前登录用户ID
 * @returns 确认结果
 */
export function confirmScanLogin(uuid: string, userId: number) {
    return request.post<ApiResponse<string>>('/api/auth/scan/login/confirm', null, {
        params: {uuid, userId}
    })
}

/**
 * 标记已扫码, 手机端扫描二维码后调用, 未确认前
 * @param uuid 临时凭证
 * @returns 操作结果
 */
export function markScanned(uuid: string) {
    return request.post<ApiResponse<string>>('/api/auth/scan/login/scanned', null, {
        params: {uuid}
    })
}
