import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/zh-tw'
import 'dayjs/locale/en'
import 'dayjs/locale/ru'
import {getLocale} from "@/locales"

function getDayjsLocale(): string {
    const locale = getLocale()
    switch (locale) {
        case 'zh-CN':
            return 'zh-cn'
        case 'zh-TW':
            return 'zh-tw'
        case 'en-US':
            return 'en'
        case 'ru-RU':
            return 'ru'
        default:
            return 'zh-cn'
    }
}

dayjs.locale(getDayjsLocale())

export default dayjs
