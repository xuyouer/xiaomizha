// 缓存键前缀
export const CACHE_PREFIX_SIGNIN = 'sign_in_'

// 缓存键
export const CACHE_KEYS = {
    adminTabs: 'xiaomizha_admin_tabs',
    adminActiveTab: 'xiaomizha_admin_active_tab',
    theme: 'xiaomizha_theme',
    themePrimary: 'xiaomizha_theme_primary',
    locale: 'xiaomizha_locale',
    token: 'xiaomizha_token',
    refreshToken: 'xiaomizha_refresh_token',
    userInfo: 'xiaomizha_user_info',
    licenseKey: 'xiaomizha_license_key',
}

// 缓存过期时间(毫秒)
export const CACHE_EXPIRY = {
    signInStatus: 24 * 60 * 60 * 1000, // 24小时
    monthlyRecord: 7 * 24 * 60 * 60 * 1000, // 7天
    ranking: 60 * 60 * 1000, // 1小时
    user: 7 * 24 * 60 * 60 * 1000, // 7天
    theme: 365 * 24 * 60 * 60 * 1000, // 1年
    locale: 365 * 24 * 60 * 60 * 1000, // 1年
    long: 365 * 24 * 60 * 60 * 1000, // 1年
}
