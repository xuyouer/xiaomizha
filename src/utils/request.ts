import axios, {
    type AxiosInstance,
    type InternalAxiosRequestConfig,
    type AxiosResponse,
    type AxiosError
} from 'axios'
import router from '@/router'
import type {ApiResponse} from '@/types/api'
import {message} from "ant-design-vue"
import {localStorageCache, sessionStorageCache} from "@/utils/app"

export type {ApiResponse} from '@/types/api'

// 开发环境：使用空字符串，通过Vite代理转发（避免CORS问题）
// 生产环境：使用环境变量或默认值
const baseURL = import.meta.env.PROD
    ? (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8092/api')
    : '' // 开发环境为空，使用相对路径，由Vite代理处理

const service: AxiosInstance = axios.create({
    baseURL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    // 开发环境不使用 withCredentials，避免CORS问题
    withCredentials: import.meta.env.PROD
})

// 请求拦截器
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const url = config.url || ''
        const isAuth = url.includes('/api/auth/')
        const isGenerateTrial = url.includes('/api/license/generate-trial')

        // 设置Authorization头
        const token = localStorageCache.get('token') || sessionStorageCache.get('token')
        if (token && config.headers) {
            config.headers.Authorization = isAuth ? '' : `${token}`
        }
        // 添加X-License-Key头
        const licenseKey = localStorageCache.get('licenseKey') || sessionStorageCache.get('licenseKey')
        if (licenseKey && config.headers && !isAuth && !isGenerateTrial) {
            config.headers['X-License-Key'] = licenseKey
        }
        // 设置Content-Type头
        if ((config.method === 'post' || config.method === 'put' || config.method === 'patch') &&
            config.data && typeof config.data === 'object' && !(config.data instanceof FormData) &&
            config.headers) {
            config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        }

        // 开发环境打印请求信息
        if (import.meta.env.DEV) {
            console.log('请求拦截器:', {
                url: config.url,
                method: config.method,
                baseURL: config.baseURL,
                data: config.data,
                headers: config.headers
            })
            // 确保 data 存在
            if (!config.data && config.method === 'post') {
                console.warn('警告: POST 请求的 data 为空', config)
            }
        }
        return config
    },
    (err) => {
        console.error('请求拦截器错误: ', err)
        return Promise.reject(err)
    }
)

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
        const res = response.data
        const {code, message: errorMessage} = res

        // 开发环境打印响应信息
        if (import.meta.env.DEV) {
            console.log('响应拦截器:', {
                url: response.config.url,
                status: response.status,
                code: code,
                data: res
            })
        }

        if (code === 200 || code === 0) {
            return response
        }
        // 处理错误
        handleError(code, errorMessage, res)
        return Promise.reject(new Error(errorMessage || '请求失败'))
    },
    (err: AxiosError<ApiResponse>) => {
        const {response} = err

        // 开发环境打印错误详情
        if (import.meta.env.DEV) {
            console.error('请求错误详情:', {
                url: err.config?.url,
                status: response?.status,
                statusText: response?.statusText,
                data: response?.data
            })
        }

        if (response?.status === 401) {
            message.error('未授权，请重新登录')
            localStorageCache.remove('token')
            localStorageCache.remove('userInfo')
            router.replace('/login')
        } else if (response?.data) {
            // 后端返回了错误信息，使用后端消息
            const errorMessage = response.data.message || `请求错误: ${response.status || '网络错误'}`
            message.error(errorMessage)
        } else {
            message.error(`请求错误: ${response?.status || '网络错误'}`)
        }
        return Promise.reject(err)
    }
)

// 处理错误
function handleError(code: number, errorMessage: string, res: ApiResponse) {
    if (code === 401) {
        message.error('未授权，请重新登录')
        localStorageCache.remove('token')
        localStorageCache.remove('userInfo')
        router.replace('/login')
    } else if (code >= 500) {
        message.error(`服务器错误: ${errorMessage || '服务器异常'}`)
        if (import.meta.env.DEV) {
            console.error('服务器错误详情:', res)
        }
    } else {
        message.error(errorMessage || '请求失败')
    }
}

// 封装请求
export const requestApi = {
    get: <T = any>(url: string, params: Record<string, any> = {}): Promise<T> => service.get(url, {params}),
    post: <T = any>(url: string, data: Record<string, any> = {}): Promise<T> => service.post(url, data),
    put: <T = any>(url: string, data: Record<string, any> = {}): Promise<T> => service.put(url, data),
    del: <T = any>(url: string, data?: Record<string, any>): Promise<T> => service.delete(url, {data})
}

// 封装上传文件请求
export const upload = <T = any>(
    url: string,
    file: File,
    onUploadProgress?: (progressEvent: any) => void,
    extraData?: Record<string, any>
): Promise<T> => {
    const formData = new FormData()
    formData.append('file', file)

    if (extraData) {
        Object.entries(extraData).forEach(([key, value]) => formData.append(key, value))
    }

    return service.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress
    })
}

export default service
