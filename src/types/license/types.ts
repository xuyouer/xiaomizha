import type {PageParams} from "@/types"

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