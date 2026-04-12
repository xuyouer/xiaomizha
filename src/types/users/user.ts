import type {LicenseInfo, PageParams, Resource, Role} from "@/types"

export interface User {
    userId?: number
    username: string
    passwordHash?: string
    accountStatus?: number
    createdAt?: string
    updatedAt?: string
}

export interface UserListParams extends PageParams {
    keyword?: string
}

export interface UserAssignItem {
    userId: number
    username: string
    roles: { roleId: number; roleName: string }[]
    vipLevel: number
    points: number
    accountStatus: number
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

export interface PointsListParams extends PageParams {
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

export interface VipInfoListParams extends PageParams {
}

/** 用户详情DTO */
export interface UserDetailDTO {
    user?: User
    userProfile?: UserProfile
    userNames?: UserNames
    userNameHistories?: UserNameHistories[]
    userPoints?: UserPoints
    userVipInfo?: UserVipInfo
    userRoles?: Role[]
    userResources?: Resource[]
    userLicenses?: LicenseInfo[]
}
