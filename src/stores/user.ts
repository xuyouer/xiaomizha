import {defineStore} from 'pinia'
import {computed, ref} from 'vue'
import type {LoginRequest, LoginResponse, UserDetailDTO} from '@/types/api'
import {login as loginApi, logout as logoutApi, getCurrentUserInfo} from '@/api'
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
import {CACHE_EXPIRY} from "@/constants"

export const useUserStore = defineStore('user', () => {
    // 优先从localStorage读取token（自动登录），然后从sessionStorage读取（会话登录）
    const token = ref<string>(localStorageCache.get('token') || sessionStorageCache.get('token') || '')
    const userInfo = ref<UserDetailDTO | null>(null)
    const licenseKey = ref<string>(localStorageCache.get('licenseKey') || sessionStorageCache.get('licenseKey') || '')

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
                const {token: userToken, userInfo: userDetailDTO} = humps.camelizeKeys(data.data) as LoginResponse
                token.value = userToken
                userInfo.value = userDetailDTO

                // 根据autoLogin参数决定存储方式
                const cache = autoLogin ? localStorageCache : sessionStorageCache
                cache.set('token', userToken, CACHE_EXPIRY.user)
                cache.set('userInfo', userDetailDTO, CACHE_EXPIRY.user)

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
                cache.set('licenseKey', trialLicenseKey, CACHE_EXPIRY.user)
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
            userInfo.value = null
            licenseKey.value = ''

            localStorageCache.remove('token')
            localStorageCache.remove('userInfo')
            localStorageCache.remove('licenseKey')
            sessionStorageCache.remove('token')
            sessionStorageCache.remove('userInfo')
            sessionStorageCache.remove('licenseKey')
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
                localStorageCache.set('userInfo', data.data, CACHE_EXPIRY.user)
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
        // 优先从localStorage读取（自动登录），然后从sessionStorage读取（会话登录）
        const storedUserInfo = localStorageCache.get('userInfo') || sessionStorageCache.get('userInfo')
        if (storedUserInfo) {
            try {
                userInfo.value = humps.camelizeKeys(storedUserInfo) as UserDetailDTO
                if (import.meta.env.DEV) console.log('用户信息: ', userInfo.value)
            } catch (error) {
                console.error('解析用户信息失败:', error)
            }
        }
    }

    return {
        token,
        userInfo,
        currentUserId,
        currentUsername,
        currentNickname,
        currentCreateName,
        currentDisplayName,
        login,
        logout,
        fetchUserInfo,
        initUserInfo
    }
})
