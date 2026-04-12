import type {ComputedRef} from 'vue'
import {computed} from 'vue'
import {useI18n} from 'vue-i18n'

export interface PaginationConfig {
    current: number
    pageSize: number
    total: number
    showSizeChanger: boolean
    showQuickJumper: boolean
    pageSizeOptions: string[]
    showTotal: (total: number) => string
}

export const usePaginationTotal = (i18nKey: string = 'common.total'): ComputedRef<(total: number) => string> => {
    const {t} = useI18n()
    return computed(() => (total: number) => t(i18nKey, {total}))
}

export const usePaginationConfig = (i18nKey: string = 'common.total'): ComputedRef<PaginationConfig> => {
    const showTotal = usePaginationTotal(i18nKey)
    return computed(() => ({
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        showTotal: showTotal.value
    }))
}
