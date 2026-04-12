import request from '@/utils/request'
import type {ApiResponse, LoginRequest, LoginResponse, UserDetailDTO} from '@/types'
import humps from "humps"

// 登录
export function login(data: LoginRequest) {
    // // 后端使用 SNAKE_CASE 命名策略，需要发送 password_hash 字段
    // const requestData = {
    //   username: data.username,
    //   password_hash: data.passwordHash // 后端 JSON 序列化使用下划线命名
    // }
    // console.log('登录API调用，数据:', { username: requestData.username, password_hash: '***' })
    // return request.post<ApiResponse<LoginResponse>>('/api/auth/login', requestData)

    // humps.decamelizeKeys(data)
    if (import.meta.env.DEV) console.log('登录API调用，数据:', humps.camelizeKeys(data))
    return request.post<ApiResponse<LoginResponse>>('/api/auth/login', humps.camelizeKeys(data))
}

// 获取当前用户信息
export function getCurrentUserInfo() {
    return request.get<ApiResponse<UserDetailDTO>>('/api/auth/info')
}

// 登出
export function logout() {
    return request.post<ApiResponse<void>>('/api/auth/logout')
}

// 刷新AccessToken
export function refreshToken(refreshToken: string) {
    return request.post<ApiResponse<Record<string, unknown>>>('/api/auth/refresh-token', null, {
        params: {refreshToken}
    })
}
