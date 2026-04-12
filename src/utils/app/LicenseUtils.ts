import type {ComputedRef} from 'vue'
import {computed} from 'vue'
import {useI18n} from 'vue-i18n'

export type LicenseStatus = 'ACTIVE' | 'EXPIRED' | 'REVOKED' | 'INACTIVE' | 'SUSPENDED' | string
export type LicenseType = 'TRIAL' | 'BASIC' | 'PREMIUM' | 'STANDARD' | 'PROFESSIONAL' | 'ENTERPRISE' | 'CUSTOM' | string

export interface LicenseMeta {
    color: string
    i18nKey: string
}

export interface LicenseOption {
    value: string
    label: string
}

export const LICENSE_TYPES: LicenseType[] = ['TRIAL', 'BASIC', 'STANDARD', 'PREMIUM', 'PROFESSIONAL', 'ENTERPRISE', 'CUSTOM']
export const LICENSE_STATUSES: LicenseStatus[] = ['ACTIVE', 'INACTIVE', 'EXPIRED', 'REVOKED', 'SUSPENDED']

export const getLicenseStatusMeta = (status?: LicenseStatus): LicenseMeta => {
    const key = (status || '').toString().toUpperCase()
    switch (key) {
        case 'ACTIVE':
            return {color: 'success', i18nKey: 'licenses.status.active'}
        case 'EXPIRED':
            return {color: 'default', i18nKey: 'licenses.status.expired'}
        case 'REVOKED':
            return {color: 'error', i18nKey: 'licenses.status.revoked'}
        case 'INACTIVE':
            return {color: 'warning', i18nKey: 'licenses.status.inactive'}
        case 'SUSPENDED':
            return {color: 'orange', i18nKey: 'licenses.status.suspended'}
        default:
            return {color: 'default', i18nKey: key ? `licenses.status.${key}` : 'licenses.status.active'}
    }
}

export const getLicenseTypeMeta = (type?: LicenseType): LicenseMeta => {
    const key = (type || '').toString().toUpperCase()
    switch (key) {
        case 'TRIAL':
            return {color: 'processing', i18nKey: 'licenses.type.trial'}
        case 'BASIC':
            return {color: 'cyan', i18nKey: 'licenses.type.basic'}
        case 'PREMIUM':
            return {color: 'purple', i18nKey: 'licenses.type.premium'}
        case 'STANDARD':
            return {color: 'blue', i18nKey: 'licenses.type.standard'}
        case 'PROFESSIONAL':
            return {color: 'gold', i18nKey: 'licenses.type.professional'}
        case 'ENTERPRISE':
            return {color: 'geekblue', i18nKey: 'licenses.type.enterprise'}
        case 'CUSTOM':
            return {color: 'magenta', i18nKey: 'licenses.type.custom'}
        default:
            return {color: 'default', i18nKey: key ? `licenses.type.${key}` : 'licenses.type.standard'}
    }
}

export const useLicenseTypeOptions = (): ComputedRef<LicenseOption[]> => {
    const {t} = useI18n()
    return computed(() => LICENSE_TYPES.map(type => ({
        value: type,
        label: t(getLicenseTypeMeta(type).i18nKey)
    })))
}

export const useLicenseStatusOptions = (): ComputedRef<LicenseOption[]> => {
    const {t} = useI18n()
    return computed(() => LICENSE_STATUSES.map(status => ({
        value: status,
        label: t(getLicenseStatusMeta(status).i18nKey)
    })))
}
