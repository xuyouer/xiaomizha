import {defineStore} from 'pinia'
import {computed, ref} from 'vue'
import type {LoginRequest, LoginResponse, UserDetailDTO} from '@/types'
import {login as loginApi, logout as logoutApi, getCurrentUserInfo, refreshToken as refreshTokenApi} from '@/api'
import humps from 'humps'
import {
    getCreateNameFromDetail,
    getDisplayNameFromDetail,
    getNicknameFromDetail,
    getUserIdFromDetail,
    getUsernameFromDetail,
    localStorageCache,
    sessionStorageCache,
} from "@/utils"
import {generateTrialLicense as generateTrialLicenseApi} from "@/api"
import {CACHE_EXPIRY, CACHE_KEYS} from "@/constants"

export const useUserStore = defineStore('user', () => {
    // 优先从localStorage读取token（自动登录）, 然后从sessionStorage读取（会话登录）
    const token = ref<string>(localStorageCache.get(CACHE_KEYS.token) || sessionStorageCache.get(CACHE_KEYS.token) || '')
    const refreshToken = ref<string>(localStorageCache.get(CACHE_KEYS.refreshToken) || sessionStorageCache.get(CACHE_KEYS.refreshToken) || '')
    const userInfo = ref<UserDetailDTO | null>(null)
    const licenseKey = ref<string>(localStorageCache.get(CACHE_KEYS.licenseKey) || sessionStorageCache.get(CACHE_KEYS.licenseKey) || '')

    // 当前登录用户 ID
    const currentUserId = computed<number | undefined>(() => getUserIdFromDetail(userInfo.value))
    // 当前登录用户名
    const currentUsername = computed<string>(() => getUsernameFromDetail(userInfo.value))
    // 当前登录用户昵称
    const currentNickname = computed<string>(() => getNicknameFromDetail(userInfo.value))
    // 当前登录用户创建名称
    const currentCreateName = computed<string>(() => getCreateNameFromDetail(userInfo.value))
    // 当前登录用户显示名称
    const currentDisplayName = computed<string>(() => getDisplayNameFromDetail(userInfo.value))

    // 登录
    const login = async (credentials: LoginRequest, autoLogin: boolean = true) => {
        try {
            const response = await loginApi(credentials)
            if (import.meta.env.DEV) console.log('登录响应: ', response)
            const {data} = response
            if (data.code === 200 && data.data) {
                const {
                    accessToken: userToken,
                    refreshToken: userRefreshToken,
                    userInfo: userDetailDTO
                } = humps.camelizeKeys(data.data) as LoginResponse
                token.value = userToken
                userInfo.value = userDetailDTO

                // 根据autoLogin参数决定存储方式
                const cache = autoLogin ? localStorageCache : sessionStorageCache
                cache.set(CACHE_KEYS.token, userToken, CACHE_EXPIRY.user)
                cache.set(CACHE_KEYS.userInfo, userDetailDTO, CACHE_EXPIRY.user)
                if (userRefreshToken) {
                    refreshToken.value = userRefreshToken
                    cache.set(CACHE_KEYS.refreshToken, userRefreshToken, CACHE_EXPIRY.user)
                }

                // 同步生成试用许可证
                if (userDetailDTO && userDetailDTO.user) {
                    await generateTrialLicense(userDetailDTO.user.userId!, userDetailDTO.user.username!, cache)
                }

                return true
            }
            return false
        } catch (error) {
            console.error('登录失败:', error)
            return false
        }
    }

    // 刷新 AccessToken
    const refreshAccessToken = async (): Promise<boolean> => {
        if (!refreshToken.value) {
            if (import.meta.env.DEV) console.warn('无refreshToken, 无法刷新')
            return false
        }
        try {
            const response = await refreshTokenApi(refreshToken.value)
            if (import.meta.env.DEV) console.log('刷新Token响应: ', response)
            const {data} = response
            if (data.code === 200 && data.data) {
                const newTokenData = humps.camelizeKeys(data.data) as {
                    accessToken: string;
                    expiresIn: number;
                    refreshToken?: string
                }
                token.value = newTokenData.accessToken

                // 判断当前使用的是哪种存储
                const cache = localStorageCache.get(CACHE_KEYS.token) ? localStorageCache : sessionStorageCache
                cache.set(CACHE_KEYS.token, newTokenData.accessToken, CACHE_EXPIRY.user)

                // 如果返回了新的 refreshToken, 也一并更新
                if (newTokenData.refreshToken) {
                    refreshToken.value = newTokenData.refreshToken
                    cache.set(CACHE_KEYS.refreshToken, newTokenData.refreshToken, CACHE_EXPIRY.user)
                }

                if (import.meta.env.DEV) console.log('Token刷新成功')
                return true
            }
            return false
        } catch (error) {
            console.error('刷新Token失败:', error)
            return false
        }
    }

    // 生成试用许可证
    const generateTrialLicense = async (userId: number, userName: string, cache: any) => {
        try {
            if (import.meta.env.DEV) console.log('生成试用许可证:', {userId, userName})
            const response = await generateTrialLicenseApi({userId, userName: userName})
            if (import.meta.env.DEV) console.log('生成试用许可证响应:', response)
            const {data} = response
            if (data.code === 200 && data.data) {
                const {licenseKey: trialLicenseKey} = humps.camelizeKeys(data.data) as { licenseKey: string }
                licenseKey.value = trialLicenseKey
                cache.set(CACHE_KEYS.licenseKey, trialLicenseKey, CACHE_EXPIRY.user)
                if (import.meta.env.DEV) console.log('试用许可证生成成功:', trialLicenseKey)
            }
        } catch (error) {
            console.error('生成试用许可证失败:', error)
        }
    }

    // 登出
    const logout = async () => {
        try {
            await logoutApi()
        } catch (error) {
            console.error('登出失败:', error)
        } finally {
            token.value = ''
            refreshToken.value = ''
            userInfo.value = null
            licenseKey.value = ''

            localStorageCache.remove(CACHE_KEYS.token)
            localStorageCache.remove(CACHE_KEYS.userInfo)
            localStorageCache.remove(CACHE_KEYS.licenseKey)
            localStorageCache.remove(CACHE_KEYS.refreshToken)
            sessionStorageCache.remove(CACHE_KEYS.token)
            sessionStorageCache.remove(CACHE_KEYS.userInfo)
            sessionStorageCache.remove(CACHE_KEYS.licenseKey)
            sessionStorageCache.remove(CACHE_KEYS.refreshToken)
        }
    }

    // 获取用户信息
    const fetchUserInfo = async () => {
        try {
            const response = await getCurrentUserInfo()
            if (import.meta.env.DEV) console.log('用户信息响应: ', response)
            const {data} = response
            if (data.code === 200 && data.data) {
                userInfo.value = humps.camelizeKeys(data.data) as UserDetailDTO
                localStorageCache.set(CACHE_KEYS.userInfo, data.data, CACHE_EXPIRY.user)
                return true
            }
            return false
        } catch (error) {
            console.error('获取用户信息失败:', error)
            return false
        }
    }

    // 初始化用户信息
    const initUserInfo = () => {
        // 优先从localStorage读取（自动登录）, 然后从sessionStorage读取（会话登录）
        const storedUserInfo = localStorageCache.get(CACHE_KEYS.userInfo) || sessionStorageCache.get(CACHE_KEYS.userInfo)
        if (storedUserInfo) {
            try {
                userInfo.value = humps.camelizeKeys(storedUserInfo) as UserDetailDTO
                if (import.meta.env.DEV) console.log('用户信息: ', userInfo.value)
            } catch (error) {
                console.error('解析用户信息失败:', error)
            }
        }
        const storedRefreshToken = localStorageCache.get(CACHE_KEYS.refreshToken) || sessionStorageCache.get(CACHE_KEYS.refreshToken)
        if (storedRefreshToken) {
            refreshToken.value = storedRefreshToken
        }
    }

    return {
        token,
        refreshToken,
        userInfo,
        licenseKey,
        currentUserId,
        currentUsername,
        currentNickname,
        currentCreateName,
        currentDisplayName,
        login,
        refreshAccessToken,
        logout,
        fetchUserInfo,
        initUserInfo
    }
})
