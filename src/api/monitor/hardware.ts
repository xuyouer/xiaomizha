import request from '@/utils/request'
import type {ApiResponse} from '@/types'

/**
 * 获取完整系统硬件信息
 *
 * 包含: 操作系统、CPU、内存、磁盘、网络等所有信息
 */
export function getHardwareInfo() {
    return request.get<ApiResponse<Record<string, unknown>>>('/api/system/hardware/info')
}

/**
 * 获取操作系统信息
 *
 * 包含: 名称、版本、运行时间等
 */
export function getOsInfo() {
    return request.get<ApiResponse<Record<string, unknown>>>('/api/system/hardware/os')
}

/**
 * 获取CPU信息
 *
 * 包含: 型号、核心数、使用率等
 */
export function getCpuInfo() {
    return request.get<ApiResponse<Record<string, unknown>>>('/api/system/hardware/cpu')
}

/**
 * 获取内存信息
 *
 * 包含: 总容量、可用、已用、使用率等
 */
export function getMemoryInfo() {
    return request.get<ApiResponse<Record<string, unknown>>>('/api/system/hardware/memory')
}
