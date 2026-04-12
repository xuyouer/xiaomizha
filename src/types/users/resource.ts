import type {PageParams} from "@/types"

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

export interface UserResourceRelations {
    relationId?: number
    userId?: number
    resourceId?: number
    permissionType?: string
    grantType?: string
    sourceId?: number
    sourceType?: string
    expiresAt?: string
    isActive?: number
    priority?: number
    conditionJson?: string
    grantedBy?: number
    grantReason?: string
    createdAt?: string
    updatedAt?: string
    revokedAt?: string
    revokedBy?: number
    revokeReason?: string
}

export interface ResourceRelationsListParams extends PageParams {
}
