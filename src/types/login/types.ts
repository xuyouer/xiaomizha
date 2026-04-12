import type {UserDetailDTO} from "@/types"

/** 登录请求 */
export interface LoginRequest {
    username: string
    passwordHash: string
    authMode?: string
}

/** 登录响应 */
export interface LoginResponse {
    accessToken: string
    authMode: string
    expiresIn: number
    refreshToken: string | null
    tokenType: string
    userInfo: UserDetailDTO
}