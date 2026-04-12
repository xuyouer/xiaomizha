import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.extend(dayOfYear)
dayjs.extend(weekOfYear)
dayjs.extend(quarterOfYear)

export const formatDateTime = (value?: string | number | Date, pattern = 'YYYY-MM-DD HH:mm:ss'): string => {
    if (!value) return '-'
    const d = dayjs(value)
    if (!d.isValid()) return String(value)
    return d.format(pattern)
}

export const formatDate = (value?: string | number | Date): string => {
    return formatDateTime(value, 'YYYY-MM-DD')
}

export const formatTime = (value?: string | number | Date): string => {
    return formatDateTime(value, 'HH:mm:ss')
}

export const formatTimeShort = (value?: string | number | Date): string => {
    return formatDateTime(value, 'HH:mm')
}

export const formatDateCN = (value?: string | number | Date): string => {
    return formatDateTime(value, 'YYYY年MM月DD日')
}

export const formatDateTimeCN = (value?: string | number | Date): string => {
    return formatDateTime(value, 'YYYY年MM月DD日 HH:mm:ss')
}

export const getRelativeTime = (value?: string | number | Date, locale = 'zh-cn'): string => {
    if (!value) return '-'
    const d = dayjs(value)
    if (!d.isValid()) return String(value)
    return d.locale(locale).fromNow()
}

export const isToday = (value?: string | number | Date): boolean => {
    if (!value) return false
    return dayjs(value).isSame(dayjs(), 'day')
}

export const isYesterday = (value?: string | number | Date): boolean => {
    if (!value) return false
    return dayjs(value).isSame(dayjs().subtract(1, 'day'), 'day')
}

export const isTomorrow = (value?: string | number | Date): boolean => {
    if (!value) return false
    return dayjs(value).isSame(dayjs().add(1, 'day'), 'day')
}

export const isThisWeek = (value?: string | number | Date): boolean => {
    if (!value) return false
    return dayjs(value).isSame(dayjs(), 'week')
}

export const isThisMonth = (value?: string | number | Date): boolean => {
    if (!value) return false
    return dayjs(value).isSame(dayjs(), 'month')
}

export const isThisYear = (value?: string | number | Date): boolean => {
    if (!value) return false
    return dayjs(value).isSame(dayjs(), 'year')
}

export const getStartOfDay = (value?: string | number | Date): dayjs.Dayjs => {
    return dayjs(value).startOf('day')
}

export const getEndOfDay = (value?: string | number | Date): dayjs.Dayjs => {
    return dayjs(value).endOf('day')
}

export const getStartOfWeek = (value?: string | number | Date): dayjs.Dayjs => {
    return dayjs(value).startOf('week')
}

export const getEndOfWeek = (value?: string | number | Date): dayjs.Dayjs => {
    return dayjs(value).endOf('week')
}

export const getStartOfMonth = (value?: string | number | Date): dayjs.Dayjs => {
    return dayjs(value).startOf('month')
}

export const getEndOfMonth = (value?: string | number | Date): dayjs.Dayjs => {
    return dayjs(value).endOf('month')
}

export const getStartOfYear = (value?: string | number | Date): dayjs.Dayjs => {
    return dayjs(value).startOf('year')
}

export const getEndOfYear = (value?: string | number | Date): dayjs.Dayjs => {
    return dayjs(value).endOf('year')
}

export const getDaysInMonth = (value?: string | number | Date): number => {
    const d = dayjs(value)
    return d.isValid() ? d.daysInMonth() : dayjs().daysInMonth()
}

export const getDayOfYear = (value?: string | number | Date): number => {
    const d = dayjs(value)
    return d.isValid() ? d.dayOfYear() : 0
}

export const getWeekOfYear = (value?: string | number | Date): number => {
    const d = dayjs(value)
    return d.isValid() ? d.week() : 0
}

export const getQuarter = (value?: string | number | Date): number => {
    const d = dayjs(value)
    return d.isValid() ? d.quarter() : 0
}

export const addMilliseconds = (value: string | number | Date, amount: number): dayjs.Dayjs => {
    return dayjs(value).add(amount, 'millisecond')
}

export const addSeconds = (value: string | number | Date, amount: number): dayjs.Dayjs => {
    return dayjs(value).add(amount, 'second')
}

export const addMinutes = (value: string | number | Date, amount: number): dayjs.Dayjs => {
    return dayjs(value).add(amount, 'minute')
}

export const addHours = (value: string | number | Date, amount: number): dayjs.Dayjs => {
    return dayjs(value).add(amount, 'hour')
}

export const addDays = (value: string | number | Date, amount: number): dayjs.Dayjs => {
    return dayjs(value).add(amount, 'day')
}

export const addWeeks = (value: string | number | Date, amount: number): dayjs.Dayjs => {
    return dayjs(value).add(amount, 'week')
}

export const addMonths = (value: string | number | Date, amount: number): dayjs.Dayjs => {
    return dayjs(value).add(amount, 'month')
}

export const addYears = (value: string | number | Date, amount: number): dayjs.Dayjs => {
    return dayjs(value).add(amount, 'year')
}

export const subtractDays = (value: string | number | Date, amount: number): dayjs.Dayjs => {
    return dayjs(value).subtract(amount, 'day')
}

export const subtractMonths = (value: string | number | Date, amount: number): dayjs.Dayjs => {
    return dayjs(value).subtract(amount, 'month')
}

export const subtractYears = (value: string | number | Date, amount: number): dayjs.Dayjs => {
    return dayjs(value).subtract(amount, 'year')
}

export const isBefore = (value: string | number | Date, compare: string | number | Date): boolean => {
    return dayjs(value).isBefore(dayjs(compare))
}

export const isAfter = (value: string | number | Date, compare: string | number | Date): boolean => {
    return dayjs(value).isAfter(dayjs(compare))
}

export const isSame = (value: string | number | Date, compare: string | number | Date, unit?: dayjs.OpUnitType): boolean => {
    return dayjs(value).isSame(dayjs(compare), unit)
}

export const isBetween = (
    value: string | number | Date,
    start: string | number | Date,
    end: string | number | Date,
    unit?: dayjs.OpUnitType
): boolean => {
    const d = dayjs(value)
    return (d.isAfter(dayjs(start), unit) || d.isSame(dayjs(start), unit)) &&
        (d.isBefore(dayjs(end), unit) || d.isSame(dayjs(end), unit))
}

export const diffInSeconds = (value: string | number | Date, compare: string | number | Date): number => {
    return dayjs(value).diff(dayjs(compare), 'second')
}

export const diffInMinutes = (value: string | number | Date, compare: string | number | Date): number => {
    return dayjs(value).diff(dayjs(compare), 'minute')
}

export const diffInHours = (value: string | number | Date, compare: string | number | Date): number => {
    return dayjs(value).diff(dayjs(compare), 'hour')
}

export const diffInDays = (value: string | number | Date, compare: string | number | Date): number => {
    return dayjs(value).diff(dayjs(compare), 'day')
}

export const diffInMonths = (value: string | number | Date, compare: string | number | Date): number => {
    return dayjs(value).diff(dayjs(compare), 'month')
}

export const diffInYears = (value: string | number | Date, compare: string | number | Date): number => {
    return dayjs(value).diff(dayjs(compare), 'year')
}

export const getAge = (birthDate: string | number | Date): number => {
    return dayjs().diff(dayjs(birthDate), 'year')
}

export const getDuration = (
    start: string | number | Date,
    end: string | number | Date
): { days: number; hours: number; minutes: number; seconds: number; totalSeconds: number } => {
    const totalSeconds = diffInSeconds(end, start)
    const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor((totalSeconds % 86400) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    return {days, hours, minutes, seconds, totalSeconds}
}

export const formatDuration = (
    start: string | number | Date,
    end: string | number | Date
): string => {
    const duration = getDuration(start, end)
    const parts: string[] = []
    if (duration.days > 0) parts.push(`${duration.days}天`)
    if (duration.hours > 0) parts.push(`${duration.hours}小时`)
    if (duration.minutes > 0) parts.push(`${duration.minutes}分钟`)
    if (duration.seconds > 0 || parts.length === 0) parts.push(`${duration.seconds}秒`)
    return parts.join('')
}

export const parseDate = (value: string, format?: string): dayjs.Dayjs | null => {
    const d = format ? dayjs(value, format) : dayjs(value)
    return d.isValid() ? d : null
}

export const isValidDate = (value?: string | number | Date): boolean => {
    if (!value) return false
    return dayjs(value).isValid()
}

export const now = (): dayjs.Dayjs => {
    return dayjs()
}

export const today = (): string => {
    return dayjs().format('YYYY-MM-DD')
}

export const nowDateTime = (): string => {
    return dayjs().format('YYYY-MM-DD HH:mm:ss')
}

export const getWeekday = (value?: string | number | Date): number => {
    const d = dayjs(value)
    return d.isValid() ? d.day() : -1
}

export const getWeekdayName = (value?: string | number | Date, locale = 'zh-cn'): string => {
    const d = dayjs(value)
    if (!d.isValid()) return '-'
    const weekdays: string[] = locale === 'zh-cn'
        ? ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return weekdays[d.day()] ?? '-'
}

export const isWeekend = (value?: string | number | Date): boolean => {
    const d = dayjs(value)
    if (!d.isValid()) return false
    const day = d.day()
    return day === 0 || day === 6
}

export const isWorkday = (value?: string | number | Date): boolean => {
    return !isWeekend(value)
}

export const getMaxDate = (...dates: (string | number | Date)[]): dayjs.Dayjs | null => {
    if (dates.length === 0) return null
    return dates.reduce((max, date) => {
        const d = dayjs(date)
        if (!d.isValid()) return max
        return d.isAfter(max) ? d : max
    }, dayjs(dates[0]))
}

export const getMinDate = (...dates: (string | number | Date)[]): dayjs.Dayjs | null => {
    if (dates.length === 0) return null
    return dates.reduce((min, date) => {
        const d = dayjs(date)
        if (!d.isValid()) return min
        return d.isBefore(min) ? d : min
    }, dayjs(dates[0]))
}

export const getMonthName = (value?: string | number | Date, locale = 'zh-cn'): string => {
    const d = dayjs(value)
    if (!d.isValid()) return '-'
    const months: string[] = locale === 'zh-cn'
        ? ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return months[d.month()] ?? '-'
}

export const getRangeDescription = (start?: string | number | Date, end?: string | number | Date): string => {
    if (!start && !end) return '-'
    if (!start) return `至 ${formatDate(end)}`
    if (!end) return `从 ${formatDate(start)} 起`
    if (isSame(start, end, 'day')) return formatDate(start)
    return `${formatDate(start)} 至 ${formatDate(end)}`
}
