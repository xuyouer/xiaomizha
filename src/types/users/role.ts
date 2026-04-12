import type {PageParams} from "@/types"

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

export interface UserRoleRelations {
    relationId?: number
    userId?: number
    roleId?: number
    assignedBy?: number
    expiresAt?: string
    isPrimary?: number
    status?: string
    revokeReason?: string
    createdAt?: string
    updatedAt?: string
}

export interface RoleRelationsListParams extends PageParams {
}
