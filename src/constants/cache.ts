// 缓存键前缀
export const CACHE_PREFIX_SIGNIN = 'sign_in_'

// 缓存过期时间(毫秒)
export const CACHE_EXPIRY = {
    signInStatus: 24 * 60 * 60 * 1000, // 24小时
    monthlyRecord: 7 * 24 * 60 * 60 * 1000, // 7天
    ranking: 60 * 60 * 1000, // 1小时
    user: 7 * 24 * 60 * 60 * 1000, // 7天
    theme: 365 * 24 * 60 * 60 * 1000, // 1年
    locale: 365 * 24 * 60 * 60 * 1000, // 1年
}
