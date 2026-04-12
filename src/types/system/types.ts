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
