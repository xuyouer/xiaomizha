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

// ========== 认证 ==========

/** 登录请求 */
export interface LoginRequest {
    username: string
    passwordHash: string
}

/** 登录响应 */
export interface LoginResponse {
    token: string
    userInfo: UserDetailDTO
}

// ========== 用户相关 ==========

export interface User {
    userId?: number
    username: string
    passwordHash?: string
    accountStatus?: number
    createdAt?: string
    updatedAt?: string
}

export interface UserListParams extends PageParams {
}

export interface UserProfile {
    profileId?: number
    userId?: number
    nickname?: string
    email?: string
    phone?: string
    avatarUrl?: string
    birthDate?: string
    gender?: string
    bio?: string
    createdAt?: string
    updatedAt?: string
}

export interface ProfileListParams extends PageParams {
}

export interface UserNames {
    nameId?: number
    userId?: number
    createName?: string
    displayName?: string
    isDefaultDisplay?: number
    createdAt?: string
    updatedAt?: string
}

export type UserNamesRecord = UserNames

export interface NamesListParams extends PageParams {
}

export interface UserNameHistories {
    historyId?: number
    userId?: number
    oldDisplayName?: string
    newDisplayName?: string
    changedBy?: number
    changedAt?: string
}

export type UserNameHistoryRecord = UserNameHistories

export interface NameHistoryListParams extends PageParams {
}

export interface UserPoints {
    pointsId?: number
    userId?: number
    totalPoints?: number
    availablePoints?: number
    frozenPoints?: number
    consumedPoints?: number
    createdAt?: string
    updatedAt?: string
}

export interface UserVipInfo {
    vipId?: number
    userId?: number
    vipLevel?: number
    vipPoints?: number
    nextLevelRequired?: number
    totalEarnedPoints?: number
    pointsToday?: number
    pointsThisMonth?: number
    lastPointsDate?: string
    vipExpireDate?: string
    levelExpireDate?: string
    vipStatus?: string
    vipUpgradeDate?: string
    totalRechargeAmount?: string
    lastRechargeDate?: string
    lastRechargeAmount?: string
    createdAt?: string
    updatedAt?: string
}

export interface UserRoles {
    roleId?: number
    roleName?: string
    roleCode?: string
    roleDescription?: string
    isSystemRole?: number
    isDefault?: number
    sortOrder?: number
    status?: number
    createdAt?: string
    updatedAt?: string
}

/** 用户详情DTO */
export interface UserDetailDTO {
    user?: User
    userProfile?: UserProfile
    userNames?: UserNames
    userNameHistories?: UserNameHistories[]
    userPoints?: UserPoints
    userVipInfo?: UserVipInfo
    userRoles?: UserRoles[]
    userResources?: Resource[]
}

// ========== 角色相关 ==========

/** 角色信息 */
export interface Role {
    roleId?: number
    roleName?: string
    roleCode?: string
    roleDescription?: string
    isSystemRole?: number
    isDefault?: number
    sortOrder?: number
    status?: number
    createdAt?: string
    updatedAt?: string
}

export interface RoleListParams extends PageParams {
}

// ========== 资源相关 ==========

/** 资源信息 */
export interface Resource {
    resourceId?: number
    resourceName?: string
    resourceCode?: string
    resourceDescription?: string
    resourceCategory?: string
    resourcePath?: string
    resourceComponent?: string
    resourceIcon?: string
    parentId?: number
    level?: number
    sortOrder?: number
    status?: number
    visible?: number
    isSystem?: number
    permissionFlag?: string
    requiresAuth?: number
    keepAlive?: number
    externalLink?: number
    target?: string
    badge?: string
    badgeType?: string
    metaJson?: string
    createBy?: number
    updateBy?: number
    createdAt?: string
    updatedAt?: string
}

export interface ResourceListParams extends PageParams {
}

// ========== VIP 等级配置 ==========

export interface VipLevelConfigRecord {
    levelId?: number
    vipLevel?: number
    levelName?: string
    minPoints?: number
    maxPoints?: number | null
    iconUrl?: string | null
    badgeColor?: string | null
    dailyPointsLimit?: number
    monthlyPointsLimit?: number
    benefitsJson?: string | null
    status?: number
    createdAt?: string
    updatedAt?: string
}

export interface VipLevelConfigListParams extends PageParams {
}

// ========== 系统配置 ==========

export interface SystemConfigsRecord {
    id?: number
    configKey?: string
    configValue?: string
    configType?: string
    description?: string | null
    isPublic?: number
    createdAt?: string
    updatedAt?: string
}

export interface SystemConfigsPageParams {
    page?: number
    size?: number
}

// ========== 用户反馈 ==========

export interface UserFeedbackRecord {
    id?: number
    userId?: number
    type?: number
    content?: string
    contactInfo?: string | null
    status?: number
    reply?: string | null
    createdAt?: string
    updatedAt?: string
}

export interface FeedbackListParams extends PageParams {
}

// ========== 许可证 ==========

export interface GenerateTrialLicenseRequest {
    userId: number;
    userName: string;
}

/** 许可证信息 */
export interface LicenseInfo {
    licenseKey?: string;
    licenseId?: string;
    userName?: string;
    companyName?: string;
    contactEmail?: string;
    productVersion?: string;
    features?: string;
    startTime?: string;
    endTime?: string;
    hardwareInfo?: string;
    licenseType?: string;
    maxConcurrentUsers?: number;
    allowOffline?: number;
    status?: string;
    activationCode?: string;
    lastActivationTime?: string;
    createdBy?: string;
    updatedBy?: string;
    remarks?: string;
}

/** 许可证变更记录 */
export interface LicenseChangeLog {
    licenseKey?: string;
    changeType?: string;
    oldValue?: string;
    newValue?: string;
    operator?: string;
    reason?: string;
}

/** 许可证使用记录 */
export interface LicenseUsageLog {
    licenseKey?: string;
    action?: string;
    ipAddress?: string;
    userAgent?: string;
    deviceInfo?: string;
    details?: string;
    status?: number;
    failureReason?: string;
}

/** 许可证用户关联 */
export interface LicenseUserRelation {
    licenseKey?: string;
    userId?: number;
    status?: string;
    assignedBy?: number;
    assignedAt?: string;
    expiresAt?: string;
    lastUsedAt?: string;
}

export interface LicenseListParams extends PageParams {
}

export interface LicenseChangeLogListParams extends PageParams {
}

export interface LicenseUsageLogListParams extends PageParams {
}

export interface LicenseUserRelationListParams extends PageParams {
}

// ========== 签到相关 ==========

/** 签到记录 */
export interface SignIn {
    userId?: number
    signInDate?: string
    continuousDays?: number
    pointsReward?: number
}

/** 签到配置 */
export interface SignInConfig {
    continuousDays?: number
    pointsReward?: number
    isActive?: number
}

/** 用户签到列表项 */
export interface SignInUserListItem {
    userId: number
    userName?: string
    totalSignIns: number
    continuousDays: number
    maxContinuousDays: number
    monthlySignIns: number
    pointsEarned: number
    todaySigned: boolean
    lastSignInDate?: string
}

/** 月度签到报告 */
export interface SignInMonthlyReport {
    reportMonth?: string
    userId?: number
    totalSignIns?: number
    continuousDays?: number
    pointsEarned?: number
    rank?: number
}

/** 签到状态 */
export interface SignInStatus {
    userId?: number
    currentContinuousDays?: number
    lastSignInDate?: string
    isContinuous?: number
    totalSignIns?: number
    maxContinuousDays?: number
}

/** 签到响应 */
export interface SignInResponse {
    success: boolean
    message: string
    continuousDays?: number
    pointsReward?: number
    signInDate?: string
}

/** 签到状态响应 */
export interface SignInStatusResponse {
    todaySigned: boolean
    continuousDays: number
    totalSignIns: number
    maxContinuousDays: number
    lastSignInDate?: string
    isContinuous: boolean
    tomorrowReward?: number
}

/** 签到排行响应 */
export interface SignInRankingResponse {
    userId: number
    totalSignIns?: number
    continuousDays?: number
    monthlySignIns?: number
    rank: number
}

/** 签到排行参数 */
export interface SignInRankingParams {
    type: 1 | 2 | 3
    limit?: number
}

/** 月度签到记录参数 */
export interface MonthlySignInRecordParams {
    userId: number
    year?: number
    month?: number
}

/** 月度签到响应 */
export interface MonthlySignInRecordResponse {
    year?: number
    month?: number
    maxContinuousDays?: number
    signedDays?: number[]
    startDate?: string
    endDate?: string
    totalSignIns?: number
    totalPoints?: number
}

/** 今日已签到响应 */
export interface CheckTodayResponse {
    signed: boolean
    message: string
}

/** 连续签到天数响应 */
export interface ContinuousDaysResponse {
    continuousDays: number
    message: string
}

/** 签到奖励响应 */
export interface SignInRewardResponse {
    pointsReward: number
    message: string
}

/** 签到排行榜响应 */
export interface SignInRankingResult {
    success: boolean
    message?: string
    rankingList: SignInRankingResponse[]
    type: number
    limit: number
}

/** 签到配置列表参数 */
export interface SignInConfigListParams extends PageParams {
}

/** 月度签到报告列表参数 */
export interface SignInMonthlyReportListParams extends PageParams {
    userId?: number
    reportMonth?: string
}

export interface UserSignInListParams extends PageParams {
    userId?: number
    userName?: string
    year?: number
    month?: number
    sortField?: string
    sortOrder?: 'ascend' | 'descend'
}
