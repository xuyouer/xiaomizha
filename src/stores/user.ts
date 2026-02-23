import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { LoginRequest, LoginResponse, UserDetailDTO } from '@/types/api';
import { login as loginApi, logout as logoutApi, getCurrentUserInfo } from '@/api/auth'
import humps from 'humps';
import {
  getCreateNameFromDetail,
  getDisplayNameFromDetail,
  getNicknameFromDetail,
  getUserIdFromDetail,
  getUsernameFromDetail,
} from "@/utils";

export const useUserStore = defineStore('user', () => {
  // 优先从localStorage读取token（自动登录），然后从sessionStorage读取（会话登录）
  const token = ref<string>(localStorage.getItem('token') || sessionStorage.getItem('token') || '')
  const userInfo = ref<UserDetailDTO | null>(null)
  const licenseKey = ref<string>(localStorage.getItem('licenseKey') || sessionStorage.getItem('licenseKey') || '')

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
      const { data } = response
      if (data.code === 200 && data.data) {
        const { token: userToken, userInfo: userDetailDTO, trialLicenseKey } = humps.camelizeKeys(data.data) as LoginResponse
        token.value = userToken
        userInfo.value = userDetailDTO

        if (trialLicenseKey) {
          licenseKey.value = trialLicenseKey
        }

        // 根据autoLogin参数决定存储方式
        const storage = autoLogin ? localStorage : sessionStorage
        storage.setItem('token', userToken)
        storage.setItem('userInfo', JSON.stringify(userDetailDTO))
        if (trialLicenseKey) {
          storage.setItem('licenseKey', trialLicenseKey)
        }

        return true
      }
      return false
    } catch (error) {
      console.error('登录失败:', error)
      return false
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

      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('licenseKey')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('userInfo')
      sessionStorage.removeItem('licenseKey')
    }
  }

  // 获取用户信息
  const fetchUserInfo = async () => {
    try {
      const response = await getCurrentUserInfo()
      if (import.meta.env.DEV) console.log('用户信息响应: ', response)
      const { data } = response
      if (data.code === 200 && data.data) {
        userInfo.value = humps.camelizeKeys(data.data) as UserDetailDTO
        localStorage.setItem('userInfo', JSON.stringify(data.data))
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
    const storedUserInfo = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo')
    if (storedUserInfo) {
      try {
        const parsedUserInfo = JSON.parse(storedUserInfo)
        userInfo.value = humps.camelizeKeys(parsedUserInfo) as UserDetailDTO
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
