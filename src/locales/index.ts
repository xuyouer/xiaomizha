import { createI18n } from 'vue-i18n'
import zhCN from './lang/zh-CN'
import enUS from './lang/en-US'

export const LOCALE_KEY = 'xiaomizha_locale'
export const SUPPORTED_LOCALES = [
    'zh-CN',
    'en-US'
] as const
export type LocaleType = (typeof SUPPORTED_LOCALES)[number]

const defaultLocale: LocaleType =
    (localStorage.getItem(LOCALE_KEY) as LocaleType) || 'zh-CN'

const i18n = createI18n({
    legacy: false, // 使用 Composition API 模式
    locale: defaultLocale,
    fallbackLocale: 'zh-CN',
    messages: {
        'zh-CN': zhCN,
        'en-US': enUS,
    },
})

export function setLocale(locale: LocaleType): void {
    i18n.global.locale.value = locale
    localStorage.setItem(LOCALE_KEY, locale)
}

export function getLocale(): LocaleType {
    return i18n.global.locale.value as LocaleType
}

export default i18n
