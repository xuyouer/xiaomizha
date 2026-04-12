import type {PageParams} from "@/types"

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