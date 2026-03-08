import {createI18n} from 'vue-i18n'
import {zhCN, zhTW, enUS, ruRU} from './lang'
import {localStorageCache} from "@/utils"
import {CACHE_EXPIRY} from "@/constants"

export const LOCALE_KEY = 'xiaomizha_locale'
export const SUPPORTED_LOCALES = [
    'zh-CN',
    'zh-TW',
    'en-US',
    'ru-RU'
] as const
export type LocaleType = (typeof SUPPORTED_LOCALES)[number]

const defaultLocale: LocaleType = (localStorageCache.get(LOCALE_KEY) as LocaleType) || 'zh-CN'

const i18n = createI18n({
    legacy: false, // 使用 Composition API 模式
    locale: defaultLocale,
    fallbackLocale: 'zh-CN',
    messages: {
        'zh-CN': zhCN,
        'zh-TW': zhTW,
        'en-US': enUS,
        'ru-RU': ruRU,
    },
})

export function setLocale(locale: LocaleType): void {
    i18n.global.locale.value = locale
    localStorageCache.set(LOCALE_KEY, locale, CACHE_EXPIRY.locale)
}

export function getLocale(): LocaleType {
    return i18n.global.locale.value as LocaleType
}

export function isZhLocale(): boolean {
    return i18n.global.locale.value.startsWith('zh')
}

export default i18n
