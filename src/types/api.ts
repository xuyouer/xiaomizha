// ========== 通用响应与分页 ==========

/** 后端统一 API 响应 */
export interface ApiResponse<T = unknown> {
    code: number
    message: string
    data: T
    timestamp?: number
    success?: boolean
}

/** 分页结果 - 匹配后端 ResponseResultPage 结构 */
export interface PageResult<T> {
    code: number
    message: string
    data: T[]
    current: number
    pageSize: number
    total: number
    pages?: number
    hasNext?: boolean
    hasPrevious?: boolean
    isFirst?: boolean
    isLast?: boolean
    timestamp?: number
    success?: boolean
}

/** 通用分页参数 */
export interface PageParams {
    current?: number
    pageSize?: number
}
